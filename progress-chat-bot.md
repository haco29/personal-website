# Chatbot Progress / PR Plan

This file tracks the implementation of the RAG-powered chatbot feature, broken down into small, focused PRs.

## Goal

A chatbot that answers questions about Harel's content (talks, writing, projects) using RAG (Retrieval-Augmented Generation) with source citations.

## Architecture

- **Stack**: Next.js (App Router) on Vercel
- **Database**: Vercel Postgres with pgvector extension
- **Embeddings**: OpenAI `text-embedding-3-small` (1536 dimensions)
- **LLM**: OpenAI GPT-4o-mini
- **SDK**: Vercel AI SDK for streaming chat

## Implementation PRs

### PR 1: Project Setup & Dependencies

**Goal**: Install dependencies and set up project structure

**Changes**:

- Add dependencies: `@vercel/ai`, `@vercel/postgres`, `openai`
- Add dev dependencies: `gray-matter` (for markdown parsing)
- Create folder structure: `lib/`, `scripts/`, `scripts/migrations/`
- Add TypeScript types file: `types/embeddings.ts`
- Update `.env.example` with required variables

**Verification**:

- `pnpm install` succeeds
- No TypeScript errors
- Folder structure exists

---

### PR 2: Database Connection & Types

**Goal**: Set up database connection utilities and TypeScript types

**Changes**:

- Create `lib/db.ts` with Postgres connection using `@vercel/postgres`
- Define types in `types/embeddings.ts`:
  - `EmbeddingRow` (database row type)
  - `ChunkMetadata` (metadata structure)
  - `ContentChunk` (processed chunk type)
- Add helper functions: `getDb()`, basic query utilities
- Add environment variable: `POSTGRES_URL`

**Verification**:

- Database connection works (test query)
- Types compile without errors
- Can read from database

---

### PR 3: Database Schema Migration

**Goal**: Create embeddings table with pgvector support

**Changes**:

- Create `scripts/migrations/001_create_embeddings.sql`
- SQL to enable pgvector extension
- Create `embeddings` table:
  - `id` (uuid, primary key)
  - `content` (text)
  - `embedding` (vector(1536))
  - `metadata` (jsonb)
  - `created_at` (timestamp)
- Add index on embedding column for vector search
- Create migration runner script (optional, or manual run)

**Verification**:

- Migration runs successfully
- Table exists with correct schema
- Can insert test row with vector

---

### PR 4: Markdown Content Processor

**Goal**: Read and chunk markdown blog posts

**Changes**:

- Create `lib/process-markdown.ts`
- Function to read markdown files from `../ai-driven/blog-posts/*.md`
- Parse frontmatter (title, published date, URL, tags) using `gray-matter`
- Split into semantic chunks (~500-800 tokens, preserve section boundaries)
- Extract metadata: file path, section title, URL, published date
- Return array of `ContentChunk` objects

**Verification**:

- Can process all markdown files
- Chunks are reasonable size
- Metadata is preserved correctly
- Test with sample file

---

### PR 5: TypeScript Content Processor

**Goal**: Process TypeScript content files (profile, writing, life)

**Changes**:

- Create `lib/process-ts-content.ts`
- Process `content/profile.ts`:
  - Convert bio, highlights, experience, skills to readable text
  - Preserve context (e.g., "Experience at Verbit.ai: ...")
- Process `content/writing.ts`: convert to readable format
- Process `content/life.ts`: convert hobbies/interests to text
- Chunk appropriately (smaller chunks for structured data)
- Extract metadata: content type, field name

**Verification**:

- All TypeScript content files processed
- Text is readable and contextual
- Metadata correctly identifies source

---

### PR 6: Embedding Generation Utilities

**Goal**: Generate embeddings using OpenAI API

**Changes**:

- Create `lib/embeddings.ts`
- Function: `generateEmbedding(text: string): Promise<number[]>`
- Use OpenAI `text-embedding-3-small` model
- Batch processing function for multiple texts
- Error handling and retry logic
- Rate limiting considerations

**Verification**:

- Can generate embedding for sample text
- Embedding is 1536 dimensions
- Handles errors gracefully
- Test with batch of texts

---

### PR 7: Content Indexing Script

**Goal**: Script to process all content and store embeddings in database

**Changes**:

- Create `scripts/index-content.ts`
- Orchestrate: read content → chunk → embed → store
- Use markdown and TS content processors
- Generate embeddings in batches
- Store in database with metadata
- Idempotent (can re-run safely, skip existing)
- Progress logging

**Verification**:

- Script runs end-to-end
- All content indexed in database
- Can re-run without duplicates
- Check database has expected rows

---

### PR 8: Vector Search Utilities

**Goal**: Implement vector similarity search using pgvector

**Changes**:

- Create `lib/vector-search.ts`
- Function: `searchSimilarChunks(queryEmbedding: number[], limit: number, threshold?: number)`
- SQL query using pgvector cosine similarity: `1 - (embedding <=> query_embedding::vector)`
- Return chunks with metadata and similarity scores
- Handle edge cases (no results, low similarity)

**Verification**:

- Can search with test embedding
- Returns results ordered by similarity
- Similarity scores are reasonable (0-1 range)
- Handles empty results

---

### PR 9: Context Builder for RAG

**Goal**: Format retrieved chunks for LLM prompt with citations

**Changes**:

- Create `lib/build-context.ts`
- Function: `buildContext(chunks: EmbeddingRow[]): string`
- Format chunks with source citations
- Include metadata (file name, URL if available, section)
- Limit total context tokens (~2000-3000)
- Format: "Source: [title/URL]\n\n[content]\n\n---"

**Verification**:

- Context is well-formatted
- Citations are clear
- Token count is within limits
- Test with various chunk combinations

---

### PR 10: Chat API Route

**Goal**: Create RAG-powered chat API endpoint

**Changes**:

- Create `app/api/chat/route.ts`
- Use Vercel AI SDK `streamText` with OpenAI
- Flow:
  1. Receive user message
  2. Generate query embedding
  3. Search for similar chunks (top 3-5)
  4. Build context with citations
  5. Stream response with source references
- System prompt: instruct LLM to cite sources and only answer from provided context
- Error handling

**Verification**:

- API endpoint responds
- Streaming works
- Responses cite sources
- Handles errors gracefully
- Test with various questions

---

### PR 11: Chat UI Component

**Goal**: Build chat interface with streaming support

**Changes**:

- Create `app/components/Chat.tsx`
- Use Vercel AI SDK `useChat` hook
- Features:
  - Message list (user/assistant)
  - Streaming text display
  - Source citations (links to original content)
  - Loading states
  - Error handling
  - Input field and send button
- Match existing design system (Tailwind, dark mode)
- Accessible (keyboard navigation, ARIA labels)

**Verification**:

- Chat UI renders correctly
- Messages display properly
- Streaming works smoothly
- Citations are clickable
- Responsive design
- Dark mode works

---

### PR 12: Chat Page & Integration

**Goal**: Create chat page and integrate into site

**Changes**:

- Create `app/chat/page.tsx`
- Simple layout with Chat component
- Add SEO metadata
- Optional: Add link to chat from navigation or homepage
- Update `progress.md` to mark chatbot as "Now" instead of "Coming soon"

**Verification**:

- Chat page accessible at `/chat`
- Full flow works: question → answer → citations
- SEO metadata correct
- Integration with site design

---

## Testing Strategy

Each PR should include:

- Manual testing of the specific feature
- TypeScript compilation passes
- No linting errors
- Integration test where applicable (especially PRs 10-12)

## Future Enhancements (Out of Scope)

- Conversation history (privacy-first storage)
- Reranking for better retrieval (Cohere Rerank)
- Fine-tuned chunking strategies
- Analytics on queries
- Admin panel for re-indexing
- Rate limiting for API

## Decisions

- **Embedding Model**: OpenAI `text-embedding-3-small` (1536 dims, cost-effective)
- **LLM**: OpenAI GPT-4o-mini (good balance of quality/cost)
- **Chunk Size**: ~500-800 tokens (preserve semantic meaning)
- **Retrieval**: Top 3-5 chunks (balance context vs. token usage)
- **Vector Similarity**: Cosine similarity via pgvector
- **Streaming**: Yes, for better UX
- **Conversation History**: No (stateless for MVP)
