"use client";

import { motion } from 'framer-motion';
import { Music, Sparkles, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { songs } from '@/data/songs';
import SongCard from '@/components/SongCard';
import SearchAndFilter from '@/components/SearchAndFilter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter songs based on search and category
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || song.category === selectedCategory;

      // Search filter
      const matchesSearch = searchQuery === '' ||
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header Section */}
      <motion.div
        className="container mx-auto px-4 py-12"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Music className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-medium">Discover Music</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Your Soundtrack to{' '}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Success
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choose from our curated collection of motivational songs designed to fuel your drive,
            boost your focus, and keep you moving forward.
          </p>
        </div>

        {/* Stats */}
        <motion.div
          className="flex justify-center items-center space-x-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400">{songs.length}</div>
            <div className="text-gray-400 text-sm">Total Songs</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent" />
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400">{filteredSongs.length}</div>
            <div className="text-gray-400 text-sm">Filtered Results</div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-pink-500/30 to-transparent" />
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">6</div>
            <div className="text-gray-400 text-sm">Categories</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <SearchAndFilter
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
      />

      {/* Songs Grid */}
      <motion.div
        className="container mx-auto px-4 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSongs.map((song, index) => (
              <SongCard key={song.id} song={song} index={index} />
            ))}
          </div>
        ) : (
          /* No Results State */
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No songs found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery && selectedCategory !== 'All'
                ? `No songs match "${searchQuery}" in ${selectedCategory} category`
                : searchQuery
                ? `No songs match "${searchQuery}"`
                : selectedCategory !== 'All'
                ? `No songs in ${selectedCategory} category`
                : 'Try adjusting your search or filters'
              }
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Call to Action Section */}
      <motion.div
        className="container mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-orange-500/5 to-pink-500/5 border border-orange-500/20 rounded-2xl p-8 text-center">
          <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Rise Up?
          </h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Start playing your favorite motivational song and let the inspiration flow.
            Your journey to success begins now.
          </p>
          <div className="flex items-center justify-center space-x-2 text-orange-400">
            <Music className="w-5 h-5" />
            <span className="font-medium">Choose a song above to get started</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
