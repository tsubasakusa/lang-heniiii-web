from fastapi import APIRouter, HTTPException
from app.models.schemas import AnalyzeRequest
from app.services.llm_service import call_llm

router = APIRouter()

ANALYZE_SYSTEM_PROMPT = """You are a language learning assistant. Analyze the given text and break it down sentence by sentence.
For each sentence, provide:
1. The original sentence
2. Translation to the target language
3. Key words with their readings and meanings

Respond in JSON format:
{
  "sentences": [
    {
      "original": "original sentence",
      "translation": "translated sentence",
      "words": [
        {
          "word": "word",
          "reading": "reading/pronunciation",
          "pos": "part of speech",
          "meaning": "meaning in target language",
          "level": "difficulty level (e.g. N3, B1)"
        }
      ]
    }
  ]
}"""


@router.post("/analyze")
async def analyze_text(req: AnalyzeRequest):
    system_prompt = req.system_prompt or ANALYZE_SYSTEM_PROMPT
    system_prompt += f"\n\nSource language: {req.source_lang}\nTarget language: {req.target_lang}\nLevel: {req.level}"

    user_prompt = f"Please analyze the following text:\n\n{req.text}"

    try:
        result = await call_llm(
            api_key=req.api_key,
            model=req.model,
            provider=req.provider,
            system_prompt=system_prompt,
            user_prompt=user_prompt,
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
