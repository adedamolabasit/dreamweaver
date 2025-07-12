import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Eye, Calendar, User, Wand2 } from 'lucide-react';

export function DreamDetail() {
  const { id } = useParams();

  // Mock dream data - in a real app, this would be fetched based on the ID
  const dream = {
    id: '1',
    title: 'Flying Through Cosmic Clouds',
    author: 'DreamExplorer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
    date: '2024-01-15',
    content: `I found myself soaring through endless purple clouds, with stars twinkling all around me like diamonds scattered across velvet. The sensation of flight was incredible - not the awkward flapping of wings, but a smooth, effortless gliding through the cosmic expanse.

As I moved through the starlit atmosphere, I noticed that the clouds weren't ordinary water vapor, but seemed to be made of some kind of luminescent mist that sparkled with every color imaginable. Each cloud I passed through left traces of glittering stardust on my skin.

The most amazing part was when I encountered other dream travelers - beings of pure light who welcomed me into their celestial dance. We spiraled together through the cosmic clouds, creating trails of rainbow light that stretched across the dream sky.

The feeling of absolute freedom and weightlessness was overwhelming. I could control my direction with just a thought, diving down toward distant nebulae and then soaring up toward clusters of brilliant stars. The entire experience felt more real than reality itself.

When I finally began to descend, I found myself floating gently down toward what looked like a planet made entirely of crystal, its surface reflecting all the colors of the cosmic clouds above.`,
    hasComic: true,
    hasVideo: true,
    isPublished: true,
    likes: 234,
    comments: 45,
    views: 1200,
    tags: ['flying', 'cosmic', 'surreal', 'peaceful'],
  };

  const comments = [
    {
      id: '1',
      author: 'StarGazer',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=400',
      content: 'This is absolutely beautiful! I had a similar dream about flying, but yours sounds so much more vivid and cosmic.',
      timeAgo: '2h ago',
      likes: 12,
    },
    {
      id: '2',
      author: 'LucidLuna',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400',
      content: 'The way you describe the luminescent clouds is incredible. Have you tried lucid dreaming to revisit this experience?',
      timeAgo: '4h ago',
      likes: 8,
    },
    {
      id: '3',
      author: 'DreamChaser',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400',
      content: 'I love how detailed your dream journal entry is. The crystal planet sounds fascinating!',
      timeAgo: '6h ago',
      likes: 15,
    },
  ];

  return (
    <div className="pt-20 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Link to="/community">
            <motion.button
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Community</span>
            </motion.button>
          </Link>

          {/* Dream Header */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="space-y-6">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={dream.avatar}
                    alt={dream.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-white/50" />
                      <span className="text-white font-medium">{dream.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-white/50" />
                      <span className="text-white/70 text-sm">{dream.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{dream.views}</span>
                  </div>
                </div>
              </div>

              {/* Dream Title */}
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-dream-200 bg-clip-text text-transparent">
                {dream.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {dream.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-dream-500/20 border border-dream-500/30 rounded-full text-dream-200 text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Content */}
          {(dream.hasComic || dream.hasVideo) && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="flex items-center space-x-2 mb-6">
                <Wand2 className="h-5 w-5 text-cosmic-400" />
                <h2 className="text-xl font-semibold text-white">Woven Dreams</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {dream.hasComic && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-white">Comic Version</h3>
                    <div className="aspect-video bg-gradient-to-br from-dream-500/30 to-cosmic-500/30 rounded-lg border border-white/20 flex items-center justify-center">
                      <div className="text-center text-white/80">
                        <div className="w-16 h-16 bg-dream-500/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          📚
                        </div>
                        <p>Comic Book Version</p>
                      </div>
                    </div>
                  </div>
                )}

                {dream.hasVideo && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-white">Video Version</h3>
                    <div className="aspect-video bg-gradient-to-br from-cosmic-500/30 to-dream-500/30 rounded-lg border border-white/20 flex items-center justify-center">
                      <div className="text-center text-white/80">
                        <div className="w-16 h-16 bg-cosmic-500/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          🎬
                        </div>
                        <p>Video Version</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dream Content */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Dream Journal Entry</h2>
            <div className="prose prose-lg max-w-none">
              {dream.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-white/80 leading-relaxed mb-4">
                  {paragraph}
                </p>
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
                  <span>{dream.likes}</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{dream.comments}</span>
                </motion.button>
              </div>

              <motion.button
                className="flex items-center space-x-2 bg-gradient-to-r from-dream-500 to-cosmic-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Comments ({comments.length})</h2>
            
            {/* Comment Form */}
            <div className="mb-8">
              <textarea
                placeholder="Share your thoughts about this dream..."
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-dream-400 focus:ring-2 focus:ring-dream-400/20 resize-none"
                rows={3}
              />
              <div className="flex justify-end mt-3">
                <motion.button
                  className="bg-dream-500 text-white px-6 py-2 rounded-lg hover:bg-dream-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Post Comment
                </motion.button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{comment.author}</span>
                      <span className="text-white/50 text-sm">{comment.timeAgo}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed">{comment.content}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <motion.button
                        className="flex items-center space-x-1 text-white/60 hover:text-red-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes}</span>
                      </motion.button>
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