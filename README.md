# Lang Heniiii Web

A self-hosted language learning tool. Input text, get AI-powered sentence-by-sentence translation, vocabulary lists, grammar analysis, and downloadable study handouts (PDF/HTML).

## Features

- Sentence-by-sentence translation with word-level annotations
- Vocabulary extraction with readings, POS, synonyms/antonyms, example sentences
- Grammar pattern analysis with explanations and examples
- Text-to-Speech audio playback
- Downloadable study handouts (PDF / HTML)
- Supports Japanese (JLPT N5-N1) and English (CEFR A1-C2)
- User-provided API keys (OpenAI / Google Gemini)

## Prerequisites

- Node.js 20+
- Python 3.10+
- An API key from OpenAI or Google Gemini

## Quick Start

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000, go to **Settings** to configure your API key, then paste text on the home page and click **Analyze Text**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + shadcn/ui + Tailwind CSS + Zustand |
| Backend | FastAPI (Python) |
| AI | OpenAI / Google Gemini (user-provided API key) |
| TTS | OpenAI TTS / Google Cloud TTS |
| PDF | WeasyPrint |

## Privacy

All data stays local. API keys are stored in your browser's localStorage and sent directly to the AI provider. No data is collected by us.
