import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Eye, Filter, TrendingUp, Clock, Star, ChevronDown } from 'lucide-react';

export function Community() {
  const [activeTab, setActiveTab] = useState<'all' | 'comics' | 'videos'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');

  // Mock community posts
  const posts = [
    {
      id: '1',
      title: 'Flying Through Cosmic Clouds',
      author: 'DreamExplorer',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
      type: 'comic',
      thumbnail: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=800',
      likes: 234,
      comments: 45,
      views: 1200,
      timeAgo: '2h ago',
      description: 'A surreal journey through purple clouds and starlit skies...',
    },
    {
      id: '2',
      title: 'The Underwater Palace',
      author: 'OceanDreamer',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=400',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?w=800',
      likes: 189,
      comments: 32,
      views: 890,
      timeAgo: '4h ago',
      description: 'Exploring a magnificent underwater civilization in my dreams...',
    },
    {
      id: '3',
      title: 'Dancing with Light Beings',
      author: 'LightSeeker',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400',
      type: 'comic',
      thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=800',
      likes: 567,
      comments: 89,
      views: 2100,
      timeAgo: '1d ago',
      description: 'A mystical encounter with beings made of pure light...',
    },
    {
      id: '4',
      title: 'The Floating Islands',
      author: 'SkyWalker99',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
      type: 'video',
      thumbnail: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?w=800',
      likes: 145,
      comments: 23,
      views: 670,
      timeAgo: '1d ago',
      description: 'Soaring between magical floating islands in the sky...',
    },
  ];

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    return post.type === activeTab.slice(0, -1); // Remove 's' from 'comics' or 'videos'
  });

  return (
    <div className="pt-20 min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-cosmic-200 bg-clip-text text-transparent">
              Dream Community
            </h1>
            <p className="text-xl text-white/70">
              Discover and share amazing dream stories from dreamers around the world.
            </p>
          </div>

          {/* Filters and Tabs */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Content Type Tabs */}
              <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
                {[
                  { key: 'all', label: 'All Dreams', icon: Star },
                  { key: 'comics', label: 'Comics', icon: Heart },
                  { key: 'videos', label: 'Videos', icon: Eye },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.key
                          ? 'bg-dream-500 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sort Options */}
       <div className="flex items-center space-x-2">
  <Filter className="h-4 w-4 text-white/50" />
  <div className="relative">
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as any)}
      className="appearance-none bg-white/10 border border-white/20 rounded-lg pl-3 pr-8 py-2 text-white text-sm focus:outline-none focus:border-dream-400"
    >
      <option value="trending" className="bg-gray-800">Trending</option>
      <option value="recent" className="bg-gray-800">Most Recent</option>
      <option value="popular" className="bg-gray-800">Most Popular</option>
    </select>
    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
      <ChevronDown className="h-4 w-4 text-white/50" />
    </div>
  </div>
</div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
              >
                {/* Post Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.type === 'comic' 
                        ? 'bg-dream-500/80 text-white' 
                        : 'bg-cosmic-500/80 text-white'
                    }`}>
                      {post.type === 'comic' ? 'Comic' : 'Video'}
                    </div>
                  </div>
                  {post.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-1"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6 space-y-4">
                  {/* Author Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium">{post.author}</p>
                      <div className="flex items-center space-x-2 text-xs text-white/50">
                        <Clock className="h-3 w-3" />
                        <span>{post.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Title & Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-dream-200 transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
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
                        <span>{post.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </motion.button>
                      
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
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
              Load More Dreams
            </motion.button>
          </div>

          {/* Trending Section */}
          <div className="bg-gradient-to-r from-cosmic-900/30 to-dream-900/30 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-6 w-6 text-cosmic-400" />
              <h3 className="text-xl font-bold text-white">Trending This Week</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {posts.slice(0, 4).map((post, index) => (
                <div key={post.id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                  <div className="text-lg font-bold text-cosmic-400">#{index + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{post.title}</p>
                    <p className="text-white/60 text-xs">{post.views} views</p>
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