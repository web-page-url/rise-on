"use client";

import { motion } from 'framer-motion';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-pink-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_70%)]" />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-4 py-20 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo and Brand */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center space-x-3 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl"
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Rise On
          </h1>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
        >
          Fuel your focus.<br />
          <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            Feed your fire.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Discover powerful motivational songs that keep you inspired, focused, and moving forward.
          Your soundtrack to success awaits.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/discover">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2 fill-white" />
              Start Listening
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </Link>
        </motion.div>

        {/* Stats or Additional Info */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-orange-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            >
              6
            </motion.div>
            <div className="text-gray-400">Motivational Tracks</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-pink-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
            >
              24/7
            </motion.div>
            <div className="text-gray-400">Access Anytime</div>
          </div>
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-purple-400 mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
            >
              ∞
            </motion.div>
            <div className="text-gray-400">Inspiration</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
