import chromadb
from chromadb.config import Settings
import json

# Initialize Chroma client
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"  # Local storage
))

# Create or load a collection
collection = chroma_client.get_or_create_collection(name="news_articles")

# Load embeddings from a JSON file
with open("embeddings.json", "r") as f:
    data = json.load(f)

# Store embeddings in the vector DB
for i, item in enumerate(data):
    collection.add(
        ids=[str(i)],
        embeddings=[item["embedding"]],
        documents=[item["content"]],
        metadatas=[{
            "title": item["title"],
            "link": item["link"]
        }]
    )

print("✅ Embeddings stored in Chroma!")
