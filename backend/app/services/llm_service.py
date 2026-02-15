import json
import httpx
from typing import Optional


async def call_openai(
    api_key: str,
    model: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.3,
) -> str:
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": temperature,
                "response_format": {"type": "json_object"},
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]


async def call_gemini(
    api_key: str,
    model: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.3,
) -> str:
    async with httpx.AsyncClient(timeout=120.0) as client:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        response = await client.post(
            url,
            json={
                "contents": [{"parts": [{"text": user_prompt}]}],
                "systemInstruction": {"parts": [{"text": system_prompt}]},
                "generationConfig": {
                    "temperature": temperature,
                    "responseMimeType": "application/json",
                },
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["candidates"][0]["content"]["parts"][0]["text"]


async def call_llm(
    api_key: str,
    model: str,
    provider: str,
    system_prompt: str,
    user_prompt: str,
    temperature: float = 0.3,
) -> dict:
    if provider == "openai":
        raw = await call_openai(api_key, model, system_prompt, user_prompt, temperature)
    elif provider == "gemini":
        raw = await call_gemini(api_key, model, system_prompt, user_prompt, temperature)
    else:
        raise ValueError(f"Unknown provider: {provider}")
    return json.loads(raw)
