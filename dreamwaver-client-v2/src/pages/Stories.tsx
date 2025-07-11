import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Eye, Filter, BookOpen, Star, Clock, User, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Stories() {
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [filterBy, setFilterBy] = useState<'all' | 'lucid' | 'nightmare' | 'adventure'>('all');

  // Mock stories data
  const stories = [
    {
      id: '1',
      title: 'The Cosmic Flight Chronicles',
      author: 'DreamExplorer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
      coverImage: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=800',
      pages: 12,
      likes: 1234,
      comments: 89,
      views: 5600,
      timeAgo: '2h ago',
      description: 'A breathtaking journey through cosmic clouds and starlit dimensions, where gravity becomes optional and dreams take flight.',
      tags: ['cosmic', 'flying', 'adventure', 'surreal'],
      mood: 'euphoric',
      readTime: '8 min read',
    },
    {
      id: '2',
      title: 'Underwater Palace of Pearls',
      author: 'OceanDreamer',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=400',
      coverImage: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?w=800',
      pages: 8,
      likes: 892,
      comments: 67,
      views: 3200,
      timeAgo: '5h ago',
      description: 'Dive deep into an aquatic realm where coral castles house beings of pure light and wisdom flows like ocean currents.',
      tags: ['underwater', 'palace', 'mystery', 'peaceful'],
      mood: 'peaceful',
      readTime: '6 min read',
    },
    {
      id: '3',
      title: 'Dancing with Light Beings',
      author: 'LightSeeker',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400',
      coverImage: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=800',
      pages: 15,
      likes: 2156,
      comments: 134,
      views: 8900,
      timeAgo: '1d ago',
      description: 'In a forest of crystal trees, ethereal beings teach the ancient art of gravity-defying dance and cosmic harmony.',
      tags: ['dancing', 'beings', 'forest', 'mystical'],
      mood: 'joyful',
      readTime: '12 min read',
    },
    {
      id: '4',
      title: 'The Floating Islands Adventure',
      author: 'SkyWalker99',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
      coverImage: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?w=800',
      pages: 10,
      likes: 756,
      comments: 45,
      views: 2800,
      timeAgo: '2d ago',
      description: 'Soar between magical floating islands where each realm holds unique wonders and impossible architectures.',
      tags: ['floating', 'islands', 'adventure', 'fantasy'],
      mood: 'adventurous',
      readTime: '7 min read',
    },
    {
      id: '5',
      title: 'The Mirror Dimension',
      author: 'ReflectionMaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400',
      coverImage: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?w=800',
      pages: 9,
      likes: 1089,
      comments: 78,
      views: 4100,
      timeAgo: '3d ago',
      description: 'Step through mirrors into parallel worlds where reflections have lives of their own and reality bends at will.',
      tags: ['mirrors', 'parallel', 'mystery', 'surreal'],
      mood: 'mysterious',
      readTime: '9 min read',
    },
    {
      id: '6',
      title: 'The Time Garden',
      author: 'ChronosDreamer',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=400',
      coverImage: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=800',
      pages: 11,
      likes: 1445,
      comments: 92,
      views: 5300,
      timeAgo: '4d ago',
      description: 'Wander through a garden where each flower represents a different moment in time, and seasons change with every step.',
      tags: ['time', 'garden', 'nature', 'philosophical'],
      mood: 'contemplative',
      readTime: '10 min read',
    },
  ];

  const filteredStories = stories.filter(story => {
    if (filterBy === 'all') return true;
    return story.tags.includes(filterBy);
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.likes + b.views) - (a.likes + a.views);
      case 'recent':
        return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
      case 'popular':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const getMoodColor = (mood: string) => {
    const colors = {
      euphoric: 'from-yellow-400 to-orange-500',
      peaceful: 'from-blue-400 to-indigo-500',
      joyful: 'from-pink-400 to-rose-500',
      adventurous: 'from-green-400 to-emerald-500',
      mysterious: 'from-purple-400 to-indigo-600',
      contemplative: 'from-teal-400 to-cyan-500',
    };
    return colors[mood as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-dream-200 bg-clip-text text-transparent">
              Dream Stories
            </h1>
            <p className="text-xl text-white/70">
              Immerse yourself in visual dream narratives crafted by AI and imagination.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Stories' },
                  { key: 'lucid', label: 'Lucid Dreams' },
                  { key: 'adventure', label: 'Adventures' },
                  { key: 'mystery', label: 'Mysteries' },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterBy(filter.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterBy === filter.key
                        ? 'bg-dream-500 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-white/50" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-dream-400"
                >
                  <option value="trending" className="bg-gray-800">Trending</option>
                  <option value="recent" className="bg-gray-800">Most Recent</option>
                  <option value="popular" className="bg-gray-800">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStories.map((story, index) => (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                {/* Story Cover */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Mood Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getMoodColor(story.mood)}`}>
                      {story.mood}
                    </div>
                  </div>

                  {/* Pages Count */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <div className="flex items-center space-x-1 text-white text-xs">
                      <BookOpen className="h-3 w-3" />
                      <span>{story.pages} pages</span>
                    </div>
                  </div>

                  {/* Read Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/story/${story.id}`}>
                      <motion.button
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>Read Story</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6 space-y-4">
                  {/* Author Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={story.avatar}
                      alt={story.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-white/50" />
                        <span className="text-white/80 text-sm font-medium">{story.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-white/50">
                        <Clock className="h-3 w-3" />
                        <span>{story.timeAgo}</span>
                        <span>•</span>
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Story Title & Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-dream-200 transition-colors mb-2 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                      {story.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {story.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-dream-500/20 border border-dream-500/30 rounded-full text-dream-200 text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <motion.button
                        className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{story.comments}</span>
                      </motion.button>
                      
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{story.views}</span>
                      </div>
                    </div>

                    <motion.button
                      className="text-white/60 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Share2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <motion.button
              className="bg-gradient-to-r from-dream-500 to-cosmic-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Stories
            </motion.button>
          </div>

          {/* Featured Section */}
          <div className="bg-gradient-to-r from-dream-900/30 to-cosmic-900/30 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-6 w-6 text-dream-400" />
              <h3 className="text-xl font-bold text-white">Featured This Week</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sortedStories.slice(0, 4).map((story, index) => (
                <div key={story.id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                  <div className="text-lg font-bold text-dream-400">#{index + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{story.title}</p>
                    <p className="text-white/60 text-xs">{story.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}