"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Song } from '@/data/songs';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isPlayerVisible: boolean;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  hidePlayer: () => void;
  showPlayer: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

interface PlayerProviderProps {
  children: React.ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const songsRef = useRef<Song[]>([]);

  // Load songs dynamically (in a real app, this would come from an API)
  useEffect(() => {
    import('@/data/songs').then(({ songs }) => {
      songsRef.current = songs;
    });
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;

      // Audio event listeners
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });

      audioRef.current.addEventListener('ended', () => {
        nextSong();
      });

      audioRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });

      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlayerVisible(true);

    if (audioRef.current) {
      audioRef.current.src = song.src;
      audioRef.current.play().catch(console.error);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const nextSong = () => {
    if (!currentSong || songsRef.current.length === 0) return;

    const currentIndex = songsRef.current.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songsRef.current.length;
    playSong(songsRef.current[nextIndex]);
  };

  const previousSong = () => {
    if (!currentSong || songsRef.current.length === 0) return;

    const currentIndex = songsRef.current.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songsRef.current.length - 1 : currentIndex - 1;
    playSong(songsRef.current[prevIndex]);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const hidePlayer = () => {
    setIsPlayerVisible(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const showPlayer = () => {
    setIsPlayerVisible(true);
  };

  const value: PlayerContextType = {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    isPlayerVisible,
    playSong,
    togglePlayPause,
    nextSong,
    previousSong,
    setVolume,
    seekTo,
    hidePlayer,
    showPlayer,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
