import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Eye, Filter, Palette, Star, Clock, User, Download, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Gallery() {
  const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'popular'>('trending');
  const [filterBy, setFilterBy] = useState<'all' | 'abstract' | 'surreal' | 'cosmic' | 'nature'>('all');
  const [viewMode, setViewMode] = useState<'masonry' | 'grid'>('masonry');

  // Mock art gallery data
  const artworks = [
    {
      id: '1',
      title: 'Cosmic Consciousness',
      artist: 'DreamArtist',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
      image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=800',
      likes: 3456,
      comments: 234,
      views: 15600,
      timeAgo: '2h ago',
      description: 'An abstract interpretation of consciousness floating through cosmic dimensions.',
      tags: ['cosmic', 'abstract', 'consciousness'],
      style: 'Digital Art',
      dimensions: '1920x1080',
      aspectRatio: 'landscape',
    },
    {
      id: '2',
      title: 'Underwater Serenity',
      artist: 'AquaDreamer',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=400',
      image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?w=800',
      likes: 2189,
      comments: 156,
      views: 8900,
      timeAgo: '4h ago',
      description: 'Peaceful underwater realm with ethereal light filtering through crystal waters.',
      tags: ['underwater', 'nature', 'peaceful'],
      style: 'Watercolor',
      dimensions: '1080x1350',
      aspectRatio: 'portrait',
    },
    {
      id: '3',
      title: 'Dancing Light Spirits',
      artist: 'LuminousVisions',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=800',
      likes: 4321,
      comments: 298,
      views: 22100,
      timeAgo: '6h ago',
      description: 'Ethereal beings of light performing an ancient cosmic dance ritual.',
      tags: ['surreal', 'beings', 'dance'],
      style: 'Digital Painting',
      dimensions: '1080x1080',
      aspectRatio: 'square',
    },
    {
      id: '4',
      title: 'Floating Island Paradise',
      artist: 'SkyArtisan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
      image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?w=800',
      likes: 1876,
      comments: 134,
      views: 9800,
      timeAgo: '8h ago',
      description: 'Magical floating islands suspended in an endless sky of possibilities.',
      tags: ['fantasy', 'islands', 'sky'],
      style: 'Concept Art',
      dimensions: '1920x1080',
      aspectRatio: 'landscape',
    },
    {
      id: '5',
      title: 'Mirror Dimension Portal',
      artist: 'ReflectionMaster',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400',
      image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?w=800',
      likes: 2654,
      comments: 187,
      views: 12400,
      timeAgo: '12h ago',
      description: 'A portal through infinite mirror dimensions where reality bends and shifts.',
      tags: ['surreal', 'mirrors', 'portal'],
      style: 'Surreal Art',
      dimensions: '1080x1350',
      aspectRatio: 'portrait',
    },
    {
      id: '6',
      title: 'Time Garden Bloom',
      artist: 'TemporalGardener',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?w=400',
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=800',
      likes: 3124,
      comments: 221,
      views: 16700,
      timeAgo: '1d ago',
      description: 'A garden where flowers bloom across different time periods simultaneously.',
      tags: ['nature', 'time', 'garden'],
      style: 'Fantasy Art',
      dimensions: '1920x1080',
      aspectRatio: 'landscape',
    },
  ];

  const filteredArtworks = artworks.filter(artwork => {
    if (filterBy === 'all') return true;
    return artwork.tags.includes(filterBy);
  });

  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
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
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Dream Art Gallery
            </h1>
            <p className="text-xl text-white/70">
              Discover stunning visual interpretations of dreams crafted by AI and artists.
            </p>
          </div>

          {/* Controls */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Art' },
                  { key: 'abstract', label: 'Abstract' },
                  { key: 'surreal', label: 'Surreal' },
                  { key: 'cosmic', label: 'Cosmic' },
                  { key: 'nature', label: 'Nature' },
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterBy(filter.key as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterBy === filter.key
                        ? 'bg-purple-500 text-white'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* View Mode & Sort */}
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 glass rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'masonry' ? 'bg-purple-500 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm h-2"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-1"></div>
                      <div className="bg-current rounded-sm h-2"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-white/50" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400"
                  >
                    <option value="trending" className="bg-gray-800">Trending</option>
                    <option value="recent" className="bg-gray-800">Most Recent</option>
                    <option value="popular" className="bg-gray-800">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Art Gallery */}
          <div className={
            viewMode === 'masonry' 
              ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
              : 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          }>
            {sortedArtworks.map((artwork, index) => (
              <motion.article
                key={artwork.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:scale-105 transition-all duration-300 ${
                  viewMode === 'masonry' ? 'break-inside-avoid mb-6' : ''
                }`}
              >
                {/* Artwork Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === 'grid' ? 'aspect-square' : 'h-auto'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Style Badge */}
                  <div className="absolute top-3 left-3">
                    <div className="px-3 py-1 rounded-full text-xs font-medium text-white bg-purple-500/80 backdrop-blur-sm">
                      {artwork.style}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/artwork/${artwork.id}`}>
                      <motion.button
                        className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ZoomIn className="h-4 w-4" />
                      </motion.button>
                    </Link>
                    <motion.button
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.button>
                  </div>

                  {/* View Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/artwork/${artwork.id}`}>
                      <motion.button
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ZoomIn className="h-4 w-4" />
                        <span>View Art</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="p-6 space-y-4">
                  {/* Artist Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={artwork.avatar}
                      alt={artwork.artist}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3 text-white/50" />
                        <span className="text-white/80 text-sm font-medium">{artwork.artist}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-white/50">
                        <Clock className="h-3 w-3" />
                        <span>{artwork.timeAgo}</span>
                        <span>•</span>
                        <span>{artwork.dimensions}</span>
                      </div>
                    </div>
                  </div>

                  {/* Artwork Title & Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-200 transition-colors mb-2">
                      {artwork.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
                      {artwork.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-200 text-xs"
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
                        <span>{artwork.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{artwork.comments}</span>
                      </motion.button>
                      
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{artwork.views}</span>
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Artworks
            </motion.button>
          </div>

          {/* Featured Artists */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <Palette className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">Featured Artists This Week</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sortedArtworks.slice(0, 4).map((artwork, index) => (
                <div key={artwork.id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                  <div className="text-lg font-bold text-purple-400">#{index + 1}</div>
                  <img src={artwork.avatar} alt={artwork.artist} className="w-8 h-8 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{artwork.artist}</p>
                    <p className="text-white/60 text-xs">{artwork.likes} likes</p>
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