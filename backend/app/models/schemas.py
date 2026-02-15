from pydantic import BaseModel
from typing import Optional


class AnalyzeRequest(BaseModel):
    text: str
    api_key: str
    model: str = "gpt-4o-mini"
    provider: str = "openai"  # "openai" or "gemini"
    source_lang: str = "ja"  # language of the input text
    target_lang: str = "zh-TW"  # user's native language
    level: str = "N3"  # JLPT or CEFR level
    system_prompt: Optional[str] = None


class VocabularyRequest(BaseModel):
    text: str
    api_key: str
    model: str = "gpt-4o-mini"
    provider: str = "openai"
    source_lang: str = "ja"
    target_lang: str = "zh-TW"
    level: str = "N3"
    system_prompt: Optional[str] = None


class GrammarRequest(BaseModel):
    text: str
    api_key: str
    model: str = "gpt-4o-mini"
    provider: str = "openai"
    source_lang: str = "ja"
    target_lang: str = "zh-TW"
    level: str = "N3"
    system_prompt: Optional[str] = None


class TTSRequest(BaseModel):
    text: str
    api_key: str
    provider: str = "openai"  # "openai" or "google"
    voice: str = "alloy"
    lang: str = "ja"


class HandoutRequest(BaseModel):
    analyze_data: dict
    vocabulary_data: dict
    grammar_data: dict
    format: str = "pdf"  # "pdf" or "html"
    title: Optional[str] = "Language Study Handout"
    source_lang: str = "ja"
    target_lang: str = "zh-TW"
    level: str = "N3"


class SentenceAnalysis(BaseModel):
    original: str
    translation: str
    words: list = []


class AnalyzeResponse(BaseModel):
    sentences: list[SentenceAnalysis]
    full_text: str


class WordEntry(BaseModel):
    word: str
    reading: str = ""
    pos: str = ""  # part of speech
    meaning: str = ""
    level: str = ""
    synonyms: list[str] = []
    antonyms: list[str] = []
    example: str = ""
    example_translation: str = ""


class VocabularyResponse(BaseModel):
    words: list[WordEntry]


class GrammarPoint(BaseModel):
    pattern: str
    explanation: str
    level: str = ""
    example: str = ""
    example_translation: str = ""


class GrammarResponse(BaseModel):
    grammar_points: list[GrammarPoint]
