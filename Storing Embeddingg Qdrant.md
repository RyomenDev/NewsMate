## ✅ Summary: Storing Embeddings in Qdrant
successfully built an embedding pipeline that:

- **Fetched Articles:** Collected ~50 news articles using RSS feeds.
- **Generated Embeddings:** Used the @xenova/transformers library and the all-MiniLM-L6-v2 model to generate sentence embeddings.
- **Hashed Article Links:** Converted each article’s link into a UUID-like format using SHA-256, ensuring consistent, valid, and unique IDs for Qdrant.
- **Avoided Duplicates:** Implemented a check (isArticleNew) to query Qdrant before inserting, skipping already-indexed articles.
- **Stored in Qdrant:** Successfully upserted embeddings into the news_articles collection in a managed Qdrant Cloud instance.

## ⚠️ Difficulties Faced

| Issue                                               | Description                                                                              | Resolution                                                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Invalid Point IDs**                               | Initially, raw article links were used as IDs, which Qdrant rejected.                    | Resolved by hashing the links into valid UUID-like formats using `crypto` and formatting them into UUID style. |
| **Collection Check Error (`stats is not defined`)** | Reference error in `ensureCollectionExists`.                                             | Fixed by properly referencing the collection's metadata from the Qdrant API response.                          |
| **Article Existence Check Failing**                 | Incorrect parameter (`id` instead of `ids`) in `qdrant.retrieve()`.                      | Corrected by using `ids: [id]` to properly retrieve items by ID.                                               |
| **Upsert Errors Still Occurring**                   | Even after formatting, errors appeared when embedding failed or invalid data was passed. | Added error handling and logging per article, ensuring bad entries don’t break the entire process.             |
