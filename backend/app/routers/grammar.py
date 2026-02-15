from fastapi import APIRouter, HTTPException
from app.models.schemas import GrammarRequest
from app.services.llm_service import call_llm

router = APIRouter()

GRAMMAR_SYSTEM_PROMPT = """You are a language learning assistant. Analyze the grammar patterns used in the given text.
For each grammar point, provide:
1. The grammar pattern
2. Detailed explanation in the target language
3. Difficulty level
4. An example sentence with translation

Respond in JSON format:
{
  "grammar_points": [
    {
      "pattern": "grammar pattern",
      "explanation": "detailed explanation",
      "level": "N3",
      "example": "example sentence using this grammar",
      "example_translation": "translation of the example"
    }
  ]
}"""


@router.post("/grammar")
async def get_grammar(req: GrammarRequest):
    system_prompt = req.system_prompt or GRAMMAR_SYSTEM_PROMPT
    system_prompt += f"\n\nSource language: {req.source_lang}\nTarget language: {req.target_lang}\nLevel: {req.level}"

    user_prompt = f"Please analyze the grammar patterns in the following text:\n\n{req.text}"

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
