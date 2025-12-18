# Progress / roadmap

This file tracks what `harelcoman.dev` is today and where it’s going next.

## Now (current)

- **Personal hub**: a clean "Coming soon" homepage with links and contact.
- **SEO baseline**: robots.txt, sitemap, JSON‑LD, and social preview images.
- **Harel chatbot**: a chatbot that answers questions about Harel's content (experience, skills, writing, interests) using a system prompt with static content.

## Next (near-term)

### Content site

- **About**: bio, “now” section, photo, contact CTA
- **Workshops/Consulting**: offer, topics, outcomes, social proof, CTA
- **Writing**: index + posts (likely MDX)
- **Talks**: talks list + resources
- **Projects**: curated projects with short writeups

### Presentation companion (Coming soon)

Goal: during a live talk, you ask a question → audience opens a deep link → you show results live with a great UI.

- **Live polling (MVP)**:
  - Create polls from an **admin panel**
  - Anonymous voting via deep link
  - Real-time results UI
- **Real-time**:
  - Use **Ably** pub/sub for instant updates
- **Abuse resistance** (minimal first):
  - Validate poll state server-side
  - Rate limit (IP-based) to reduce spam
- **Presenter UX**:
  - “Presenter mode” results screen (big numbers + animations)
  - QR code + short link for the audience

### Harel chatbot (Future enhancements)

- RAG over MDX/content index for more accurate answers with source citations
- Conversation history (privacy-first storage)

## Decisions (current assumptions)

- **Stack**: Next.js (App Router) on Vercel
- **DB**: Postgres
- **Polling**: anonymous open link
- **Realtime**: Ably
- **Admin auth**: GitHub OAuth

## Open questions

- Do we want polls to be indexable? (likely **no**)
- Do we need multi-language support?
- What’s the first “real” page to launch after the coming soon homepage: **/workshops** or **/about**?
