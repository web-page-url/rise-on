"use client";

import { motion } from 'framer-motion';
import { Heart, Target, Zap, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: Heart,
    title: "Fuel Your Passion",
    description: "Every song is carefully selected to ignite your inner fire and keep you motivated through challenges.",
    color: "text-red-400",
    bgColor: "from-red-500/10 to-pink-500/10",
  },
  {
    icon: Target,
    title: "Stay Focused",
    description: "Block out distractions and maintain razor-sharp focus on your goals with our curated soundtrack.",
    color: "text-blue-400",
    bgColor: "from-blue-500/10 to-cyan-500/10",
  },
  {
    icon: Zap,
    title: "Boost Energy",
    description: "Transform ordinary moments into extraordinary achievements with high-energy motivational tracks.",
    color: "text-yellow-400",
    bgColor: "from-yellow-500/10 to-orange-500/10",
  },
  {
    icon: Users,
    title: "Join the Community",
    description: "Connect with like-minded individuals who are also on their journey to greatness.",
    color: "text-purple-400",
    bgColor: "from-purple-500/10 to-pink-500/10",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-medium">About Rise On</span>
          </motion.div>

          <motion.h1
            variants={cardVariants}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Rise On is built to keep you {' '}
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              moving, focused, and inspired
            </span>
          </motion.h1>

          <motion.p
            variants={cardVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            We believe that the right soundtrack can transform your mindset, boost your productivity,
            and help you achieve your dreams. Every beat, every lyric, every moment is designed to
            fuel your journey toward success.
          </motion.p>
        </div>

        {/* Mission Statement */}
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-r from-orange-500/5 to-pink-500/5 border border-orange-500/20 rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              In a world full of noise and distractions, RiseOn provides the perfect harmony of motivation
              and focus. We curate songs that speak to the champion within you, reminding you that every
              step forward, no matter how small, brings you closer to your goals. Whether you're grinding
              through a tough workout, powering through a late-night study session, or chasing your dreams
              against all odds, we've got the soundtrack that will keep you going.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`bg-gradient-to-r ${feature.bgColor} border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.bgColor} border border-white/10`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={cardVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/5 to-pink-500/5 border border-orange-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of motivated individuals who have discovered their inner strength
              through the power of music. Your transformation starts with one song.
            </p>

            <Link href="/discover">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
