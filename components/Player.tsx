"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import Image from 'next/image';
import { usePlayer } from '@/contexts/PlayerContext';
import { Slider } from '@/components/ui/slider';

const Player = () => {
  const {
    currentSong,
    isPlaying,
    volume,
    currentTime,
    duration,
    isPlayerVisible,
    togglePlayPause,
    nextSong,
    previousSong,
    setVolume,
    seekTo,
    hidePlayer,
  } = usePlayer();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number[]) => {
    seekTo(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  if (!isPlayerVisible || !currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* Song Info */}
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="relative w-12 h-12 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={currentSong.cover}
                  alt={currentSong.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/48x48/374151/ffffff?text=${encodeURIComponent(currentSong.title)}`;
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-white text-sm sm:text-sm truncate">
                  {currentSong.title}
                </h4>
                <p className="text-gray-400 text-xs truncate">
                  {currentSong.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-2 flex-1 max-w-md">
              {/* Control Buttons - Mobile Optimized */}
              <div className="flex items-center space-x-6 sm:space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={previousSong}
                  className="text-gray-400 hover:text-white transition-colors p-2 sm:p-1 touch-manipulation"
                >
                  <SkipBack className="w-6 h-6 sm:w-5 sm:h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlayPause}
                  className="w-12 h-12 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-orange-500/25 transition-shadow touch-manipulation"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-6 h-6 sm:w-5 sm:h-5 ml-0.5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextSong}
                  className="text-gray-400 hover:text-white transition-colors p-2 sm:p-1 touch-manipulation"
                >
                  <SkipForward className="w-6 h-6 sm:w-5 sm:h-5" />
                </motion.button>
              </div>

              {/* Progress Bar - Mobile Optimized */}
              <div className="flex flex-col space-y-2 w-full">
                {/* Time Display */}
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm text-gray-300 font-mono">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-sm text-gray-300 font-mono">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Enhanced Progress Bar for Mobile */}
                <div className="relative group">
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="w-full cursor-pointer touch-manipulation
                      [&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-track]]:sm:h-2
                      [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-6
                      [&_[data-slot=slider-thumb]]:sm:h-4 [&_[data-slot=slider-thumb]]:sm:w-4
                      [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-2
                      [&_[data-slot=slider-thumb]]:border-orange-500 [&_[data-slot=slider-thumb]]:shadow-lg
                      [&_[data-slot=slider-thumb]]:hover:scale-110 [&_[data-slot=slider-thumb]]:transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* Volume & Close */}
            <div className="flex items-center justify-end flex-1">
              {/* Volume Control - Hidden on Mobile */}
              <div className="hidden md:flex items-center space-x-2 min-w-[120px]">
                {volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-gray-400" />
                ) : (
                  <Volume2 className="w-4 h-4 text-gray-400" />
                )}
                <Slider
                  value={[volume * 100]}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="w-20"
                />
              </div>

              {/* Close Button - Mobile Optimized */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={hidePlayer}
                className="text-gray-400 hover:text-white transition-colors p-2 sm:p-1 touch-manipulation ml-4"
              >
                <X className="w-6 h-6 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Animated Progress Bar Background */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-pink-500"
          style={{
            width: duration ? `${(currentTime / duration) * 100}%` : '0%',
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Player;
