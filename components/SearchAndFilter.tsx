"use client";

import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { categories } from '@/data/songs';
import { Button } from '@/components/ui/button';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  selectedCategory: string;
  searchQuery: string;
}

const SearchAndFilter = ({
  onSearch,
  onCategoryFilter,
  selectedCategory,
  searchQuery
}: SearchAndFilterProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(localSearchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchQuery, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setLocalSearchQuery('');
  };

  const handleCategorySelect = (category: string) => {
    onCategoryFilter(category);
    setIsFilterOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mb-8"
    >
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search songs, artists, or keywords..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
          />
          {localSearchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.slice(0, 4).map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}

          {/* More Categories Button */}
          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              isFilterOpen
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4" />
            More
          </motion.button>
        </div>

        {/* Active Filters Display */}
        {(selectedCategory !== 'All' || searchQuery) && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Active filters:</span>
            {selectedCategory !== 'All' && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm flex items-center gap-2"
              >
                {selectedCategory}
                <button
                  onClick={() => handleCategorySelect('All')}
                  className="hover:text-orange-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            )}
            {searchQuery && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm flex items-center gap-2"
              >
                "{searchQuery}"
                <button
                  onClick={clearSearch}
                  className="hover:text-pink-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            )}
          </div>
        )}
      </div>

      {/* Expanded Categories Modal */}
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsFilterOpen(false)}
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 m-4 max-w-md w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-white mb-4">Choose Category</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <Button
              onClick={() => setIsFilterOpen(false)}
              variant="outline"
              className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
            >
              Close
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchAndFilter;
