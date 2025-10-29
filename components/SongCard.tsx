"use client";

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { Song } from '@/data/songs';
import { usePlayer } from '@/contexts/PlayerContext';

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard = ({ song, index }: SongCardProps) => {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isCurrentSong = currentSong?.id === song.id;

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    playSong(song);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-300"
    >
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={song.cover}
          alt={`${song.title} by ${song.artist}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src = `https://via.placeholder.com/400x400/374151/ffffff?text=${encodeURIComponent(song.title)}`;
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isCurrentSong && isPlaying
              ? 'opacity-100 scale-110 shadow-orange-500/50'
              : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <Play className="w-6 h-6 text-white ml-1" fill="white" />
        </motion.button>

        {/* Now Playing Indicator */}
        {isCurrentSong && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full shadow-lg"
          />
        )}
      </div>

      {/* Song Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white text-lg truncate flex-1 mr-2">
            {song.title}
          </h3>
          <span className="px-2 py-1 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 text-xs font-medium rounded-full border border-orange-500/30 whitespace-nowrap">
            {song.category}
          </span>
        </div>
        <p className="text-gray-400 text-sm truncate">
          {song.artist}
        </p>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-orange-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default SongCard;
