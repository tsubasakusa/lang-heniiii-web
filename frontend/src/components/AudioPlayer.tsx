"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, Loader2, Square } from "lucide-react";
import { getTTS } from "@/lib/api";
import { useSettingsStore } from "@/stores/settingsStore";

interface AudioPlayerProps {
  text: string;
  size?: "sm" | "default";
}

export function AudioPlayer({ text, size = "default" }: AudioPlayerProps) {
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const settings = useSettingsStore();

  const handlePlay = async () => {
    if (playing && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
      return;
    }

    const apiKey = settings.ttsApiKey || settings.apiKey;
    if (!apiKey) return;

    setLoading(true);
    try {
      const blob = await getTTS({
        text,
        api_key: apiKey,
        provider: settings.ttsProvider,
        voice: settings.ttsVoice,
        lang: settings.learningLang,
      });

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setPlaying(false);
        URL.revokeObjectURL(url);
      };

      audio.play();
      setPlaying(true);
    } catch (err) {
      console.error("TTS error:", err);
    } finally {
      setLoading(false);
    }
  };

  const buttonSize = size === "sm" ? "icon" : "default";

  return (
    <Button
      variant="outline"
      size={buttonSize}
      onClick={handlePlay}
      disabled={loading}
      title="Play audio"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : playing ? (
        <Square className="h-4 w-4" />
      ) : (
        <>
          <Volume2 className="h-4 w-4" />
          {size !== "sm" && <span className="ml-2">Play Audio</span>}
        </>
      )}
    </Button>
  );
}
