import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, BookOpen, Wand2, Users, Plus, Image, Video, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Moon, label: 'Home' },
    { path: '/dashboard', icon: Plus, label: 'Submit Dream' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
    { path: '/weaver', icon: Wand2, label: 'Dream Weaver' },
    { path: '/community', icon: Users, label: 'Community' },
  ];

  // Check if we're on any content page
  const isContentPage = ['/stories', '/videos', '/gallery'].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-75"></div>
              <div className="relative p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                <Moon className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                DreamWeaver
              </span>
              <span className="text-xs text-white/60 -mt-1">Journal • Weave • Share</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path} className="relative group">
                  <motion.div
                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'glass-strong text-white shadow-lg'
                        : 'text-white/70 hover:text-white hover:glass'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 rounded-xl border border-white/20"
                    />
                  )}
                </Link>
              );
            })}

            {/* Content Dropdown */}
            <div className="relative group">
              <motion.div
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isContentPage
                    ? 'glass-strong text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:glass'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Image className="h-5 w-5" />
                <span className="font-medium">Explore</span>
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-56 glass-strong border border-white/20 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Link to="/stories" className="block">
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      location.pathname === '/stories'
                        ? 'bg-dream-500/30 text-white border border-dream-400/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <BookOpen className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Stories</div>
                      <div className="text-xs text-white/60">Dream Comics</div>
                    </div>
                  </motion.div>
                </Link>
                
                <Link to="/videos" className="block">
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      location.pathname === '/videos'
                        ? 'bg-cosmic-500/30 text-white border border-cosmic-400/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <Video className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Videos</div>
                      <div className="text-xs text-white/60">Dream Films</div>
                    </div>
                  </motion.div>
                </Link>
                
                <Link to="/gallery" className="block">
                  <motion.div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      location.pathname === '/gallery'
                        ? 'bg-purple-500/30 text-white border border-purple-400/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <Palette className="h-4 w-4" />
                    <div>
                      <div className="font-medium">Art Gallery</div>
                      <div className="text-xs text-white/60">Dream Art</div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-white/70 hover:text-white glass p-3 rounded-xl">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}