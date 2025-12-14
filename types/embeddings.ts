/**
 * Type definitions for the chatbot embedding system
 * These types will be expanded in PR 2 when we implement the database connection
 */

/**
 * Metadata structure for content chunks
 * Contains information about the source of the content chunk
 */
export type ChunkMetadata = {
  /** Source file path or identifier */
  source: string;
  /** Content type: 'markdown' | 'profile' | 'writing' | 'life' */
  contentType: string;
  /** Section or field name within the source */
  section?: string;
  /** URL to the original content (if available) */
  url?: string;
  /** Additional metadata (published date, tags, etc.) */
  [key: string]: unknown;
};

/**
 * Processed content chunk before embedding
 * Represents a piece of content that will be embedded and stored
 */
export type ContentChunk = {
  /** The text content of the chunk */
  content: string;
  /** Metadata about the chunk */
  metadata: ChunkMetadata;
  /** Optional chunk index within the source */
  chunkIndex?: number;
};

/**
 * Database row structure for embeddings table
 * This will be fully defined in PR 2 when we create the database schema
 */
export type EmbeddingRow = {
  /** Unique identifier */
  id: string;
  /** The text content */
  content: string;
  /** The embedding vector (1536 dimensions for OpenAI text-embedding-3-small) */
  embedding: number[];
  /** Metadata as JSON */
  metadata: ChunkMetadata;
  /** Timestamp when the embedding was created */
  created_at: Date;
};
