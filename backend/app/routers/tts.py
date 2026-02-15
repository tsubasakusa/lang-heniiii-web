from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
from app.models.schemas import TTSRequest
from app.services.tts_service import generate_tts

router = APIRouter()


@router.post("/tts")
async def text_to_speech(req: TTSRequest):
    try:
        audio_bytes = await generate_tts(
            api_key=req.api_key,
            text=req.text,
            provider=req.provider,
            voice=req.voice,
            lang=req.lang,
        )
        return Response(content=audio_bytes, media_type="audio/mpeg")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
