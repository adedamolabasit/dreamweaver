import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Eye, Calendar, User, Download, ZoomIn, ZoomOut, Palette, Info } from 'lucide-react';

export function ArtworkDetail() {
  const { id } = useParams();
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // Mock artwork data
  const artwork = {
    id: '1',
    title: 'Cosmic Consciousness',
    artist: 'DreamArtist',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
    date: '2024-01-15',
    likes: 3456,
    comments: 234,
    views: 15600,
    image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=1200',
    description: 'An abstract interpretation of consciousness floating through cosmic dimensions. This piece explores the relationship between mind and universe, depicting the moment when awareness expands beyond physical boundaries into the infinite expanse of cosmic consciousness.',
    tags: ['cosmic', 'abstract', 'consciousness', 'digital'],
    style: 'Digital Art',
    dimensions: '1920x1080',
    fileSize: '2.4 MB',
    medium: 'Digital Painting',
    software: 'AI Generated + Digital Enhancement',
    colorPalette: ['#1a1a2e', '#16213e', '#0f3460', '#533483', '#7209b7'],
    inspiration: 'Based on a lucid dream about floating through star-filled dimensions',
    technique: 'Advanced AI generation with manual post-processing and color grading',
    metadata: {
      created: '2024-01-15',
      modified: '2024-01-16',
      camera: 'AI Generated',
      exposure: 'N/A',
      aperture: 'N/A',
      iso: 'N/A'
    }
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
          {/* Back Button */}
          <Link to="/gallery">
            <motion.button
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Gallery</span>
            </motion.button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Artwork Display */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                {/* Image Controls */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                      <span>{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
                    </motion.button>

                    <motion.button
                      onClick={() => setShowInfo(!showInfo)}
                      className={`flex items-center space-x-2 border text-white px-3 py-2 rounded-lg transition-colors ${
                        showInfo 
                          ? 'bg-purple-500 border-purple-400' 
                          : 'bg-white/10 border-white/20 hover:bg-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Info className="h-4 w-4" />
                      <span>Info</span>
                    </motion.button>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </motion.button>
                </div>

                {/* Artwork Image */}
                <div className="relative">
                  <motion.img
                    src={artwork.image}
                    alt={artwork.title}
                    className={`w-full object-contain transition-transform duration-500 ${
                      isZoomed ? 'scale-150 cursor-move' : 'scale-100'
                    }`}
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Info Overlay */}
                  {showInfo && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/80 backdrop-blur-sm p-6 flex items-center justify-center"
                    >
                      <div className="bg-white/10 rounded-xl p-6 max-w-md">
                        <h3 className="text-white font-bold mb-4">Artwork Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Dimensions:</span>
                            <span className="text-white">{artwork.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">File Size:</span>
                            <span className="text-white">{artwork.fileSize}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Medium:</span>
                            <span className="text-white">{artwork.medium}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Software:</span>
                            <span className="text-white">{artwork.software}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Artwork Details */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={artwork.avatar}
                    alt={artwork.artist}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-white/50" />
                      <span className="text-white font-medium">{artwork.artist}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-white/50" />
                      <span className="text-white/70 text-sm">{artwork.date}</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-white mb-4">
                  {artwork.title}
                </h1>

                <p className="text-white/80 leading-relaxed mb-4">
                  {artwork.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {artwork.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-200 text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Engagement */}
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

              {/* Color Palette */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Palette className="h-5 w-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Color Palette</h3>
                </div>
                <div className="flex space-x-2">
                  {artwork.colorPalette.map((color, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div
                        className="w-8 h-8 rounded-lg border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-white/60 text-xs font-mono">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Technical Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Style:</span>
                    <span className="text-white">{artwork.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Dimensions:</span>
                    <span className="text-white">{artwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">File Size:</span>
                    <span className="text-white">{artwork.fileSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Medium:</span>
                    <span className="text-white">{artwork.medium}</span>
                  </div>
                </div>
              </div>

              {/* Artist's Note */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Artist's Note</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-white/70 font-medium">Inspiration:</span>
                    <p className="text-white/80 mt-1">{artwork.inspiration}</p>
                  </div>
                  <div>
                    <span className="text-white/70 font-medium">Technique:</span>
                    <p className="text-white/80 mt-1">{artwork.technique}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}