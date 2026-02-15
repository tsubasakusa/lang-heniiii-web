# Lang Heniiii Web

Language learning tool website. Users input text, AI generates sentence-by-sentence translation, vocabulary, grammar analysis, and downloadable handouts (PDF/HTML). Supports Japanese (JLPT N5-N1) and English (CEFR A1-C2).

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + shadcn/ui + Tailwind CSS + Zustand
- **Backend**: FastAPI (Python 3.12)
- **AI**: User-provided API keys (OpenAI / Google Gemini)
- **TTS**: User-provided (OpenAI TTS / Google Cloud TTS)
- **PDF**: WeasyPrint

## Project Structure
- `frontend/` — Next.js app (port 3000)
- `backend/` — FastAPI app (port 8000)

## Commands

### Frontend
```bash
cd frontend
# Use Node 20+
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 20
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # ESLint
```

### Backend
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload  # Start dev server on port 8000
```

## Key Patterns
- Frontend stores settings (API keys, preferences) in browser localStorage via Zustand persist
- Analysis results stored in sessionStorage for page navigation
- All API endpoints receive user's API key in request body (no server-side secrets)
- Backend proxies requests to AI providers (OpenAI / Gemini)
