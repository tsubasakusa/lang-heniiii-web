from fastapi import APIRouter, HTTPException
from app.models.schemas import VocabularyRequest
from app.services.llm_service import call_llm

router = APIRouter()

VOCABULARY_SYSTEM_PROMPT = """You are a language learning assistant. Extract vocabulary from the given text.
For each word, provide:
1. The word itself
2. Reading/pronunciation
3. Part of speech
4. Meaning in the target language
5. Difficulty level
6. Synonyms and antonyms (if applicable)
7. An example sentence with translation

Filter words based on the specified difficulty level — include words at or below the specified level.

Respond in JSON format:
{
  "words": [
    {
      "word": "word",
      "reading": "reading",
      "pos": "noun/verb/adjective/etc",
      "meaning": "meaning",
      "level": "N3",
      "synonyms": ["syn1", "syn2"],
      "antonyms": ["ant1"],
      "example": "example sentence",
      "example_translation": "translation of example"
    }
  ]
}"""


@router.post("/vocabulary")
async def get_vocabulary(req: VocabularyRequest):
    system_prompt = req.system_prompt or VOCABULARY_SYSTEM_PROMPT
    system_prompt += f"\n\nSource language: {req.source_lang}\nTarget language: {req.target_lang}\nLevel: {req.level}"

    user_prompt = f"Please extract vocabulary from the following text:\n\n{req.text}"

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
