import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Eye, Filter, Play, Star, Clock, User, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Videos() {
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [filterBy, setFilterBy] = useState<'all' | 'lucid' | 'nightmare' | 'adventure'>('all');

  // Mock videos data
  const videos = [
    {
      id: '1',
      title: 'Cosmic Flight: A Dream Journey',
      author: 'DreamExplorer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
      thumbnail: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=800',
      duration: '3:42',
      likes: 2156,
      comments: 134,
      views: 12400,
      timeAgo: '1h ago',
      description: 'Experience the ethereal beauty of soaring through cosmic clouds in this mesmerizing dream visualization.',
      tags: ['cosmic', 'flying', 'adventure', 'surreal'],
      mood: 'euphoric',
      quality: '4K',
    },
    {
      id: '2',
      title: 'Underwater Palace of Wonders',
      author: 'OceanDreamer',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=400',
      thumbnail: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?w=800',
      duration: '2:18',
      likes: 1789,
      comments: 89,
      views: 8900,
      timeAgo: '3h ago',
      description: 'Dive deep into an aquatic realm where coral castles house beings of pure light and ancient wisdom.',
      tags: ['underwater', 'palace', 'mystery', 'peaceful'],
      mood: 'peaceful',
      quality: 'HD',
    },
    {
      id: '3',
      title: 'Dancing with Light Beings',
      author: 'LightSeeker',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=800',
      duration: '4:15',
      likes: 3421,
      comments: 198,
      views: 18700,
      timeAgo: '6h ago',
      description: 'Join ethereal beings in a cosmic dance that defies gravity and transcends dimensional boundaries.',
      tags: ['dancing', 'beings', 'forest', 'mystical'],
      mood: 'joyful',
      quality: '4K',
    },
    {
      id: '4',
      title: 'The Floating Islands Expedition',
      author: 'SkyWalker99',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
      thumbnail: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?w=800',
      duration: '2:56',
      likes: 1234,
      comments: 67,
      views: 6800,
      timeAgo: '12h ago',
      description: 'Soar between magical floating islands where each realm holds unique wonders and impossible architectures.',
      tags: ['floating', 'islands', 'adventure', 'fantasy'],
      mood: 'adventurous',
      quality: 'HD',
    },
    {
      id: '5',
      title: 'Mirror Dimension Odyssey',
      author: 'ReflectionMaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400',
      thumbnail: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?w=800',
      duration: '3:28',
      likes: 1876,
      comments: 112,
      views: 9500,
      timeAgo: '1d ago',
      description: 'Step through mirrors into parallel worlds where reflections have lives of their own and reality bends.',
      tags: ['mirrors', 'parallel', 'mystery', 'surreal'],
      mood: 'mysterious',
      quality: '4K',
    },
    {
      id: '6',
      title: 'The Time Garden Chronicles',
      author: 'ChronosDreamer',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=400',
      thumbnail: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=800',
      duration: '5:12',
      likes: 2543,
      comments: 156,
      views: 14200,
      timeAgo: '2d ago',
      description: 'Wander through a garden where each flower represents a different moment in time and seasons change with every step.',
      tags: ['time', 'garden', 'nature', 'philosophical'],
      mood: 'contemplative',
      quality: '4K',
    },
  ];

  const filteredVideos = videos.filter(video => {
    if (filterBy === 'all') return true;
    return video.tags.includes(filterBy);
  });

  const sortedVideos = [...filteredVideos].sort((a, b) => {
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
    <div className="pt-20 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cosmic-200 bg-clip-text text-transparent">
              Dream Videos
            </h1>
            <p className="text-xl text-white/70">
              Watch cinematic interpretations of dreams brought to life through AI artistry.
            </p>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Videos' },
                  { key: 'lucid', label: 'Lucid Dreams' },
                  { key: 'adventure', label: 'Adventures' },
                  { key: 'mystery', label: 'Mysteries' },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterBy(filter.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterBy === filter.key
                        ? 'bg-cosmic-500 text-white'
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
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cosmic-400"
                >
                  <option value="trending" className="bg-gray-800">Trending</option>
                  <option value="recent" className="bg-gray-800">Most Recent</option>
                  <option value="popular" className="bg-gray-800">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedVideos.map((video, index) => (
              <motion.article
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Mood Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getMoodColor(video.mood)}`}>
                      {video.mood}
                    </div>
                  </div>

                  {/* Duration & Quality */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                      {video.duration}
                    </div>
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                      {video.quality}
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Play className="h-6 w-6 text-white ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Watch Button Overlay */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/video/${video.id}`}>
                      <motion.button
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="h-4 w-4" />
                        <span>Watch Now</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Video Content */}
                <div className="p-6 space-y-4">
                  {/* Author Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={video.avatar}
                      alt={video.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-white/50" />
                        <span className="text-white/80 text-sm font-medium">{video.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-white/50">
                        <Clock className="h-3 w-3" />
                        <span>{video.timeAgo}</span>
                        <span>•</span>
                        <Volume2 className="h-3 w-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Title & Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-cosmic-200 transition-colors mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                      {video.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {video.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-cosmic-500/20 border border-cosmic-500/30 rounded-full text-cosmic-200 text-xs"
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
                        <span>{video.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{video.comments}</span>
                      </motion.button>
                      
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views}</span>
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
              className="bg-gradient-to-r from-cosmic-500 to-dream-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Videos
            </motion.button>
          </div>

          {/* Trending Section */}
          <div className="bg-gradient-to-r from-cosmic-900/30 to-dream-900/30 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-6 w-6 text-cosmic-400" />
              <h3 className="text-xl font-bold text-white">Trending This Week</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sortedVideos.slice(0, 4).map((video, index) => (
                <div key={video.id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                  <div className="text-lg font-bold text-cosmic-400">#{index + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{video.title}</p>
                    <div className="flex items-center space-x-2 text-xs text-white/60">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.duration}</span>
                    </div>
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