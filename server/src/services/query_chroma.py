# query_chroma.py
from fastapi import FastAPI, Request
from pydantic import BaseModel
import chromadb
from chromadb.config import Settings

app = FastAPI()

# Setup Chroma
client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory="./chroma_db"
))
collection = client.get_or_create_collection(name="news_articles")

class Query(BaseModel):
    query: str
    top_k: int = 3

@app.post("/retrieve")
def retrieve_docs(q: Query):
    results = collection.query(
        query_texts=[q.query],
        n_results=q.top_k
    )
    return {
        "documents": results["documents"][0],  # List of strings
        "metadatas": results["metadatas"][0]   # Optional: titles/links
    }
