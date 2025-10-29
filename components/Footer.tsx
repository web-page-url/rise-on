"use client";

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-black/50 backdrop-blur-sm border-t border-white/10 mt-20"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-sm text-gray-400">
              © 2025 Rise On. Built with
            </span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span className="text-sm text-gray-400">
              By Anubhav.
            </span>
          </div>

          <div className="text-sm text-gray-500">
            Fuel your focus. Feed your fire.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
