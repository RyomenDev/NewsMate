// import { pipeline } from "@xenova/transformers";

// const extractor = await pipeline(
//   "feature-extraction",
//   "Xenova/all-MiniLM-L6-v2"
// );

// const texts = ["This is the first sentence.", "Here is another one."];

// const embeddings = await extractor(texts, { pooling: "mean", normalize: true });

// console.log(embeddings);

// src/utils/xenovaEmbedding.js
import { pipeline } from "@xenova/transformers";
import fs from "fs";
import { fetchNewsFromRSS } from "./rssReader.js";

export async function generateEmbeddings() {
  const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const articles = await fetchNewsFromRSS();

  const embeddedArticles = [];

  for (const article of articles) {
    const embedding = await extractor(article.content, {
      pooling: "mean",
      normalize: true,
    });

    embeddedArticles.push({
      title: article.title,
      link: article.link,
      content: article.content,
      embedding: Array.from(embedding.data),
    });
  }

  fs.writeFileSync("embeddings.json", JSON.stringify(embeddedArticles, null, 2));
  console.log("✅ Saved embeddings to embeddings.json");
}


// // xenovaEmbedding.js
// const { fetchNewsFromRSS } = require('./rssReader');
// const fs = require('fs');
// const { pipeline } = require('@xenova/transformers'); // or whatever embedding method you're using

// async function embedArticles() {
//   const articles = await fetchNewsFromRSS();

//   // Assume `generateEmbedding` is your function that returns an embedding vector
//   const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

//   const embeddedArticles = [];

//   for (const article of articles) {
//     const embedding = await embedder(article.content, { pooling: 'mean', normalize: true });
//     embeddedArticles.push({
//       title: article.title,
//       link: article.link,
//       content: article.content,
//       embedding: Array.from(embedding.data),
//     });
//   }

//   fs.writeFileSync('embeddings.json', JSON.stringify(embeddedArticles, null, 2));
//   console.log("✅ Saved embeddings to embeddings.json");
// }

// embedArticles();
