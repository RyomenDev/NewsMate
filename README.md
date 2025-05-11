# 🧠 NewsMate: A RAG-Based News Chatbot
![Image](https://github.com/user-attachments/assets/379ef838-ab02-40c4-a15f-97a7425f2bcd)
## 📌 Objective

NewsMate is an intelligent chatbot that provides real-time, conversational answers based on the latest news articles. It leverages Retrieval-Augmented Generation (RAG) to ground LLM responses in fresh, factual news content sourced from RSS feeds.

## 🛠️ Tech Stack

- **Frontend:** React.js with Vite
- **Backend:** Node.js with Express
- **Embeddings:** @xenova/transformers (MiniLM)
- **Vector Store:** Qdrant (Cloud-hosted)
- **Database/Cache:** Redis (Session management)
- **Language Model:** Gemini API
- **Scheduler:** Custom Node.js cron-like job

## 🔍 Key Features & Architecture

- **RSS Feed Ingestion**

  - Regularly fetches articles from multiple RSS sources (e.g., NYTimes).
  - Extracts title, link, and content.

- **Embedding Generation**

  - Uses @xenova/transformers to create dense vector representations of article content.
  - Ensures semantic similarity can be measured during retrieval.

- **Deduplication**

  - Each article’s link is hashed using SHA-256 and formatted into a UUID-like string.
  - This unique ID prevents duplicate insertion into the vector store.

- **Vector Storage (Qdrant)**

  - Embeddings are upserted into the news_articles collection.
  - Qdrant is queried later for semantically similar chunks during a chatbot session.

- **Chatbot (RAG)**

  - User question triggers a semantic search in Qdrant.
  - Top-k relevant context chunks are injected into the Gemini API prompt.
  - The model generates context-grounded answers.

- **Session Management**
  - Redis is used to track ongoing conversations and maintain continuity.

⚠️ Difficulties Faced & Resolutions
| **Problem** | **Cause** | **Resolution** |
| ------------------------------------------ | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **"Bad Request: Invalid ID" from Qdrant** | Direct use of URLs as point IDs (invalid format) | Introduced hashing (SHA-256) of links into UUID-like strings |
| **Duplicate Data Despite No Uploads** | Same link repeatedly inserted without proper deduplication logic | Added pre-check using `qdrant.retrieve()` to skip already embedded articles |
| **ReferenceError: `stats` is not defined** | Misuse of Qdrant collection metadata in `ensureCollectionExists` | Removed incorrect `stats` reference and replaced with proper collection existence check |
| **Embedding Failures** | Some articles had malformed or insufficient content | Added validation and fallback logic per article to skip bad entries |
| **Silent Failures / Poor Logging** | Errors weren't specific or granular | Improved error logs and debug messaging for each critical operation (embedding, upsert, fetch) |

## ✅ Outcomes

- ✅ Successfully built a full-stack news chatbot using RAG.
- ✅ Embedded 50+ articles into Qdrant and enabled semantic search.
- ✅ Integrated Gemini for high-quality LLM responses.
- ✅ Achieved auto-updating context through periodic embedding refreshes.

## 📘 Future Improvements

- Add user authentication and persistent chat history.
- Integrate summarization and source citation.
- Scale to handle multi-lingual feeds.
