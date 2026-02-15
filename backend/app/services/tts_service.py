import httpx
import base64


async def openai_tts(api_key: str, text: str, voice: str = "alloy", model: str = "tts-1") -> bytes:
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            "https://api.openai.com/v1/audio/speech",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "input": text,
                "voice": voice,
            },
        )
        response.raise_for_status()
        return response.content


async def google_tts(api_key: str, text: str, lang: str = "ja-JP", voice_name: str = "") -> bytes:
    lang_code = lang if "-" in lang else f"{lang}-JP" if lang == "ja" else f"{lang}-US"
    async with httpx.AsyncClient(timeout=60.0) as client:
        body: dict = {
            "input": {"text": text},
            "voice": {
                "languageCode": lang_code,
            },
            "audioConfig": {"audioEncoding": "MP3"},
        }
        if voice_name:
            body["voice"]["name"] = voice_name
        response = await client.post(
            f"https://texttospeech.googleapis.com/v1/text:synthesize?key={api_key}",
            json=body,
        )
        response.raise_for_status()
        data = response.json()
        return base64.b64decode(data["audioContent"])


async def generate_tts(
    api_key: str, text: str, provider: str = "openai", voice: str = "alloy", lang: str = "ja"
) -> bytes:
    if provider == "openai":
        return await openai_tts(api_key, text, voice)
    elif provider == "google":
        return await google_tts(api_key, text, lang, voice)
    else:
        raise ValueError(f"Unknown TTS provider: {provider}")
