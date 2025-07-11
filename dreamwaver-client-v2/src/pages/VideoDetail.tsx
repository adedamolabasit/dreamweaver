import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Eye, Calendar, User, Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

export function VideoDetail() {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(222); // 3:42 in seconds

  // Mock video data
  const video = {
    id: '1',
    title: 'Cosmic Flight: A Dream Journey',
    author: 'DreamExplorer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
    date: '2024-01-15',
    likes: 2156,
    comments: 134,
    views: 12400,
    duration: '3:42',
    description: 'Experience the ethereal beauty of soaring through cosmic clouds in this mesmerizing dream visualization. This AI-generated video brings to life the sensation of weightless flight through star-filled dimensions.',
    tags: ['cosmic', 'flying', 'adventure', 'surreal'],
    thumbnail: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=1200',
    quality: '4K',
    chapters: [
      { time: 0, title: 'The Awakening', description: 'Consciousness emerges in the cosmic void' },
      { time: 45, title: 'First Flight', description: 'Discovery of weightless movement' },
      { time: 98, title: 'Cosmic Dance', description: 'Meeting beings of light' },
      { time: 156, title: 'Crystal Planet', description: 'Arrival at the crystalline world' },
      { time: 198, title: 'The Return', description: 'Journey back to waking consciousness' }
    ]
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Simulate video progress
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Link to="/videos">
            <motion.button
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Videos</span>
            </motion.button>
          </Link>

          {/* Video Player */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/20">
                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" fill="currentColor" />
                    ) : (
                      <Play className="h-8 w-8 ml-1" fill="currentColor" />
                    )}
                  </motion.button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-white/20 rounded-full h-1 mb-2">
                      <div
                        className="bg-cosmic-400 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-white/80 text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        onClick={togglePlay}
                        className="text-white hover:text-cosmic-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </motion.button>

                      <motion.button
                        onClick={toggleMute}
                        className="text-white hover:text-cosmic-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
                      </motion.button>

                      <div className="text-white/80 text-sm">
                        {video.quality}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <motion.button
                        className="text-white hover:text-cosmic-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Settings className="h-6 w-6" />
                      </motion.button>

                      <motion.button
                        className="text-white hover:text-cosmic-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Maximize className="h-6 w-6" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Header */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={video.avatar}
                      alt={video.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-white/50" />
                        <span className="text-white font-medium">{video.author}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-4 w-4 text-white/50" />
                        <span className="text-white/70 text-sm">{video.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {video.title}
                </h1>

                <p className="text-white/80 leading-relaxed mb-4">
                  {video.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-cosmic-500/20 border border-cosmic-500/30 rounded-full text-cosmic-200 text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Engagement Bar */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      className="flex items-center space-x-2 text-white/70 hover:text-red-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className="h-5 w-5" />
                      <span>{video.likes}</span>
                    </motion.button>

                    <motion.button
                      className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>{video.comments}</span>
                    </motion.button>
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 bg-gradient-to-r from-cosmic-500 to-dream-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share Video</span>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Chapters Sidebar */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Video Chapters</h3>
                <div className="space-y-3">
                  {video.chapters.map((chapter, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentTime(chapter.time)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentTime >= chapter.time && (index === video.chapters.length - 1 || currentTime < video.chapters[index + 1].time)
                          ? 'bg-cosmic-500/30 border border-cosmic-400/30'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-medium text-sm">{chapter.title}</span>
                        <span className="text-white/60 text-xs">{formatTime(chapter.time)}</span>
                      </div>
                      <p className="text-white/70 text-xs">{chapter.description}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Video Stats */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Video Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Duration:</span>
                    <span className="text-white">{video.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Quality:</span>
                    <span className="text-white">{video.quality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Views:</span>
                    <span className="text-white">{video.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Likes:</span>
                    <span className="text-white">{video.likes.toLocaleString()}</span>
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