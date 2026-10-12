"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  src?: string;
  autoPlay?: boolean;
  className?: string;
}

export default function AudioPlayer({
  src = "/assets/audio/wedding-bgm.mp3",
  autoPlay = false,
  className,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        // Autoplay policy prevented playback, wait for user gesture
        setIsPlaying(false);
      });
    }
  }, [autoPlay]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="metadata" />
      <button
        type="button"
        onClick={toggle}
        className={
          className ||
          "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md border border-white/20 bg-black/60 text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        }
        aria-label={isPlaying ? "Mute Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-5 h-5 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
            </span>
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-zinc-400" />
        )}
      </button>
    </>
  );
}
export { AudioPlayer };