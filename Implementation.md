# NewsMate

## ✅ What Is Implemented

**RAG Pipeline**

- **✅ Ingest ~50 news articles:** Done via RSS feeds using fetchNewsFromRSS().
- **✅ Embed with Open Source Model:** Using Xenova/all-MiniLM-L6-v2 (which is open source and similar in quality to Jina).
- **✅ Store in Vector DB:** Embeddings are stored in Qdrant, using the .upsert() API.
- **✅ Retrieve Top-K Passages:** Done via the searchQdrant(query) function (using .search() on Qdrant).
- **✅ Use Gemini API for Final Answer:** The getBotResponse() function uses Gemini to generate answers from retrieved context.

## ✅/🔲 Caching & Performance

- **Session-Based Conversation Handling:**
  ✅ Currently, a default session ID is being assigned from the client side. This approach works temporarily but should be updated later to implement secure and consistent server-side session management.

- **Caching History in Memory (e.g., Redis):**
  🔲 Store the conversation history (prompt-response pairs) in Redis under the session ID. - Retrieve and optionally use history as context for Gemini or just for UX purposes (e.g., showing previous messages).

## ✅ Final Checklist

| Feature                          | Status | Suggestion                                            |
| -------------------------------- | ------ | ----------------------------------------------------- |
| Article ingestion (RSS)          | ✅     | Done via `fetchNewsFromRSS()`                         |
| Embedding generation             | ✅     | Done via `xenovaEmbedding.js`                         |
| Embedding storage                | ✅     | Done using Qdrant                                     |
| Vector search (top-k)            | ✅     | Implemented in `searchQdrant()`                       |
| Context-based answer with Gemini | ✅     | Implemented in `getBotResponse()`                     |
| Session management               | 🔲     | Add `uuid` + store per-session in Redis               |
| Caching conversation history     | 🔲     | Store `prompt`/`response` in Redis with session key   |
| Clean modular structure          | ✅     | Using `xenovaEmbedding.js`, `gemini.service.js`, etc. |
