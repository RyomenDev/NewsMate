## ✅ Utilities (Helper Functions / Low-Level Logic)

- xenovaEmbedding.js

  - **Type:** Utility
  - **Reason:** Responsible for computing embeddings using the Xenova Transformers model. It's a helper module that can be reused in multiple parts of the app.

- rssReader.js

  - **Type:** Utility
  - **Reason:** Responsible for fetching and parsing RSS feeds (or HTML scraping). It's a pure function-like tool that serves other processes.

## ✅ Services (Application Logic / Data Flow Management)

- store_embeddings.py

  - **Type:** Service
  - **Reason:** This handles the ingestion of embeddings into the Chroma vector store. It's managing persistence, so it qualifies as a service.

- query_chroma.py
  - **Type:** Service
  - **Reason:** This provides an API endpoint to retrieve relevant documents from Chroma. It interacts with external requests and the database.

## 🧭 Summary Table

| File Name             | Type    | Purpose                                          |
| --------------------- | ------- | ------------------------------------------------ |
| `xenovaEmbedding.js`  | Utility | Generates embeddings from article content        |
| `rssReader.js`        | Utility | Fetches/parses articles from RSS or websites     |
| `store_embeddings.py` | Service | Stores embedding data into Chroma vector DB      |
| `query_chroma.py`     | Service | Exposes an API to retrieve relevant vectors/docs |

---

**If ✅ Saved embeddings to embeddings.json and ✅ Embedding generation completed successfully! are logging multiple times continuously, it's likely due to one of the following reasons:**

### 🔁 1. generateEmbeddings() is being called repeatedly

Check whether it's being invoked **inside a watcher**, repeated interval, or middleware accidentally.

Since you're calling it in index.js, verify that you're not using nodemon to watch that file and your file isn't being modified continuously (which would trigger a restart loop).

### ✅ Fix:

If you're using nodemon, it might restart your app every time embeddings.json is written.

To ignore changes to that file, create a nodemon.json in your project root:

```json
{
  "ignore": ["embeddings.json"]
}
```

Or modify your nodemon command:

```bash
nodemon --ignore embeddings.json
```

### 🔁 2. Infinite import loop or misplaced logic

Ensure generateEmbeddings() is not called in a file that's being re-imported indirectly via Express or route handlers.

### ✅ Fix:

Make sure generateEmbeddings() is only called once, ideally before the server starts (as you're doing in startServer()).

---
