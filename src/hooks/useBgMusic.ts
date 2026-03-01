import { useRef, useState, useEffect, useCallback } from "react";

interface UseBgMusicReturn {
  isPlaying: boolean;
  fileName: string | null;
  volume: number;
  loadFile: (file: File) => void;
  toggle: () => void;
  setVolume: (v: number) => void;
  clear: () => void;
}

export function useBgMusic(): UseBgMusicReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem("bgm-volume");
    return saved ? parseFloat(saved) : 0.5;
  });

  useEffect(() => {
    // Restore saved file name
    const name = localStorage.getItem("bgm-filename");
    if (name) setFileName(name);
  }, []);

  const loadFile = useCallback((file: File) => {
    // Revoke old URL
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
    }

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    setFileName(file.name);
    localStorage.setItem("bgm-filename", file.name);

    audio.play().then(() => setIsPlaying(true)).catch(() => {});
  }, [volume]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    localStorage.setItem("bgm-volume", String(v));
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const clear = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
    setIsPlaying(false);
    setFileName(null);
    localStorage.removeItem("bgm-filename");
  }, []);

  return { isPlaying, fileName, volume, loadFile, toggle, setVolume, clear };
}
