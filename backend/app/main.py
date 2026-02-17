from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze, vocabulary, grammar, tts, handout

app = FastAPI(title="Lang Heniiii API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://learn.heniiii.cc",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze.router, prefix="/api")
app.include_router(vocabulary.router, prefix="/api")
app.include_router(grammar.router, prefix="/api")
app.include_router(tts.router, prefix="/api")
app.include_router(handout.router, prefix="/api")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
