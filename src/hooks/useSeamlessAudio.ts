"use client";

import { useEffect, RefObject } from "react";

const BGM_COMBINED_SRC = "/assets/silly-n-valley/audio/snv-maxi-combined.mp3";
const BGM_TARGET_VOLUME = 0.36;

export function useSeamlessAudio(audioRef: RefObject<HTMLAudioElement | null>) {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let disposed = false;
    let blobUrl: string | null = null;
    let usingBlob = false;
    let playPending = false;
    const abortController = new AbortController();

    const makeFreshStreamUrl = () =>
      `${BGM_COMBINED_SRC}?s=${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    audio.volume = BGM_TARGET_VOLUME;
    audio.muted = false;
    audio.loop = true;
    audio.src = makeFreshStreamUrl();

    const gestureEvents = [
      "pointerdown",
      "mousedown",
      "click",
      "touchstart",
      "touchend",
      "keydown",
      "wheel",
      "scroll",
    ] as const;

    function tryPlay() {
      const el = audioRef.current;
      if (disposed || !el) return;
      el.volume = BGM_TARGET_VOLUME;
      el.muted = false;

      if (!el.paused || playPending) return;

      playPending = true;
      const p = el.play();
      if (p !== undefined) {
        p.catch(() => {}).finally(() => {
          playPending = false;
        });
      } else {
        playPending = false;
      }
    }

    function swapToBlobAndPlay(resumeAt = 0) {
      const el = audioRef.current;
      if (disposed || !el || !blobUrl) return;
      usingBlob = true;
      el.src = blobUrl;
      el.loop = true;
      el.volume = BGM_TARGET_VOLUME;
      el.muted = false;
      if (resumeAt > 0) {
        try {
          el.currentTime = resumeAt;
        } catch {}
      }
      playPending = false;
      tryPlay();
    }

    function onCanPlay() {
      tryPlay();
    }

    function onEnded() {
      const el = audioRef.current;
      if (disposed || !el) return;
      if (blobUrl && !usingBlob) {
        swapToBlobAndPlay(0);
        return;
      }
      try {
        el.currentTime = 0;
      } catch {}
      playPending = false;
      tryPlay();
    }

    function onStreamError() {
      const el = audioRef.current;
      if (disposed || !el) return;
      const resumeAt = Number.isFinite(el.currentTime) ? el.currentTime : 0;
      if (blobUrl && !usingBlob) {
        swapToBlobAndPlay(resumeAt);
      } else if (!usingBlob) {
        el.src = makeFreshStreamUrl();
        el.load();
        playPending = false;
        tryPlay();
      }
    }

    function onPause() {
      const el = audioRef.current;
      if (disposed || !el) return;
      if (
        el.ended ||
        (Number.isFinite(el.duration) &&
          el.duration > 0 &&
          el.currentTime >= el.duration - 0.2)
      ) {
        onEnded();
      }
    }

    function onVisibility() {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    }

    function releaseAudioStream() {
      const el = audioRef.current;
      if (!el) return;
      try {
        el.pause();
        el.removeAttribute("src");
        el.load();
      } catch {}
    }

    fetch(BGM_COMBINED_SRC, { signal: abortController.signal })
      .then((res) => (res.ok ? res.blob() : null))
      .then((blob) => {
        if (!blob || disposed) return;
        blobUrl = URL.createObjectURL(blob);
        const el = audioRef.current;
        if (el && el.paused && el.currentTime === 0) {
          swapToBlobAndPlay(0);
        }
      })
      .catch(() => {});

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onStreamError);
    audio.addEventListener("pause", onPause);

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, tryPlay, { capture: true, passive: true });
    });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", releaseAudioStream);
    window.addEventListener("beforeunload", releaseAudioStream);

    tryPlay();

    return () => {
      disposed = true;
      abortController.abort();
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onStreamError);
      audio.removeEventListener("pause", onPause);
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, tryPlay, true);
      });
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", releaseAudioStream);
      window.removeEventListener("beforeunload", releaseAudioStream);
      releaseAudioStream();
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrl = null;
      }
    };
  }, [audioRef]);
}
