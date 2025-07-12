import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Moon, BookOpen, Wand2, Users, Sparkles, Heart, MessageCircle, Star, Zap, Eye } from 'lucide-react';

export function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Intelligent Dream Journal',
      description: 'Advanced journaling with mood tracking, dream patterns, and AI-powered insights.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Wand2,
      title: 'AI Dream Weaving',
      description: 'Transform dreams into stunning comics and cinematic videos with cutting-edge AI.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Dream Community',
      description: 'Connect with dreamers worldwide, share stories, and discover incredible content.',
      gradient: 'from-emerald-500 to-teal-500',
    },
  ];

  const stats = [
    { icon: Star, value: '50K+', label: 'Dreams Recorded' },
    { icon: Zap, value: '25K+', label: 'Comics Created' },
    { icon: Eye, value: '100K+', label: 'Community Views' },
    { icon: Heart, value: '500K+', label: 'Likes & Shares' },
  ];

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <motion.div
                className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-full border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <span className="text-white/90 font-medium">Transform Dreams into Stories</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </motion.div>
              
              <div className="space-y-6">
                <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight">
                  <motion.span 
                    className="block bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Dream
                  </motion.span>
                  <motion.span 
                    className="block bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Weaver
                  </motion.span>
                </h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  Journey into the realm of dreams. Record your nocturnal adventures, 
                  transform them into beautiful visual stories, and share your experiences 
                  with a community of fellow dreamers.
                </motion.p>
              </div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Link to="/dashboard">
                <motion.button
                  className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg flex items-center space-x-3 shadow-2xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Begin Your Journey</span>
                  <ArrowRight className="relative z-10 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </motion.button>
              </Link>
              
              <Link to="/community">
                <motion.button
                  className="glass-strong text-white border border-white/30 px-10 py-5 rounded-2xl font-semibold text-lg hover:border-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Dreams
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-32 h-32 rounded-full blur-xl opacity-20 ${
                i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-purple-500' : 'bg-pink-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="glass-strong rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white/80 mx-auto mb-4 group-hover:text-white transition-colors" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Everything you need to capture, interpret, and share your dreams in the most beautiful ways possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="glass-strong rounded-3xl p-10 hover:scale-105 transition-all duration-500 border border-white/10 hover:border-white/20">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
              Dream Community
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Join thousands of dreamers sharing their most incredible nocturnal adventures.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-strong rounded-3xl p-8 hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
                  <Moon className="h-12 w-12 text-white/60 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">The Cosmic Flight</h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  A mesmerizing journey through star-filled clouds and celestial wonders...
                </p>
                <div className="flex items-center justify-between text-sm text-white/50">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>234</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      <span>56</span>
                    </div>
                  </div>
                  <span>2h ago</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/community">
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore All Dreams
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-3xl mx-4"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
              Ready to Begin Your
              <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Dream Journey?
              </span>
            </h2>
            <p className="text-xl text-white/70 leading-relaxed">
              Start capturing your dreams today and watch them transform into incredible visual stories 
              that you can share with the world.
            </p>
            <Link to="/dashboard">
              <motion.button
                className="bg-white text-indigo-900 px-16 py-6 mt-12 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-colors shadow-2xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Dreaming Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}