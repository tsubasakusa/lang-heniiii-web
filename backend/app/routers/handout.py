from fastapi import APIRouter, HTTPException
from fastapi.responses import Response, HTMLResponse
from app.models.schemas import HandoutRequest
from app.services.pdf_service import generate_handout_html, generate_pdf

router = APIRouter()


@router.post("/handout/html")
async def get_handout_html(req: HandoutRequest):
    try:
        html = generate_handout_html(
            analyze_data=req.analyze_data,
            vocabulary_data=req.vocabulary_data,
            grammar_data=req.grammar_data,
            title=req.title or "Language Study Handout",
            source_lang=req.source_lang,
            target_lang=req.target_lang,
            level=req.level,
        )
        return HTMLResponse(content=html)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/handout/pdf")
async def get_handout_pdf(req: HandoutRequest):
    try:
        html = generate_handout_html(
            analyze_data=req.analyze_data,
            vocabulary_data=req.vocabulary_data,
            grammar_data=req.grammar_data,
            title=req.title or "Language Study Handout",
            source_lang=req.source_lang,
            target_lang=req.target_lang,
            level=req.level,
        )
        pdf_bytes = generate_pdf(html)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=handout.pdf"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
