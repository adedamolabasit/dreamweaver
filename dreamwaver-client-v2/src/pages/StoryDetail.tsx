import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Share2, Eye, Calendar, User, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

export function StoryDetail() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);

  // Mock story data with comic panels
  const story = {
    id: '1',
    title: 'The Cosmic Flight Chronicles',
    author: 'DreamExplorer',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=400',
    date: '2024-01-15',
    likes: 1234,
    comments: 89,
    views: 5600,
    description: 'A breathtaking journey through cosmic clouds and starlit dimensions, where gravity becomes optional and dreams take flight.',
    tags: ['cosmic', 'flying', 'adventure', 'surreal'],
    pages: [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?w=800',
        title: 'The Awakening',
        text: 'I found myself floating in a vast cosmic space, surrounded by swirling galaxies and twinkling stars. The sensation was both peaceful and exhilarating as I drifted through the infinite darkness.',
        narration: 'In the depths of sleep, consciousness awakens to a realm beyond physical boundaries...'
      },
      {
        id: 2,
        image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=800',
        title: 'First Flight',
        text: 'Suddenly, I realized I could control my movement with just a thought. I began to soar through the cosmic clouds, each one shimmering with colors I had never seen before.',
        narration: 'The dreamer discovers the power of intention, where thought becomes motion and will becomes flight...'
      },
      {
        id: 3,
        image: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?w=800',
        title: 'The Cosmic Dance',
        text: 'As I flew deeper into the cosmic expanse, I encountered other beings of light. They welcomed me into their celestial dance, spiraling together through trails of stardust.',
        narration: 'In this realm, the dreamer is not alone. Beings of pure energy perform an ancient cosmic ballet...'
      },
      {
        id: 4,
        image: 'https://images.pexels.com/photos/1089440/pexels-photo-1089440.jpeg?w=800',
        title: 'The Crystal Planet',
        text: 'Our dance led us to a magnificent planet made entirely of crystal. Its surface reflected all the colors of the cosmic clouds above, creating a symphony of light.',
        narration: 'The journey culminates at a world where matter and light merge into crystalline perfection...'
      },
      {
        id: 5,
        image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=800',
        title: 'The Return',
        text: 'As the dream began to fade, I felt myself gently floating back through the cosmic clouds, carrying with me the memory of absolute freedom and the knowledge that such realms exist within us all.',
        narration: 'Every dream journey must end, but the wisdom gained transcends the boundaries of sleep...'
      }
    ]
  };

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageData = story.pages[currentPage];

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
          <Link to="/stories">
            <motion.button
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Stories</span>
            </motion.button>
          </Link>

          {/* Story Header */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={story.avatar}
                  alt={story.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-white/50" />
                    <span className="text-white font-medium">{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4 text-white/50" />
                    <span className="text-white/70 text-sm">{story.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-white/60">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{story.views}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{story.pages.length} pages</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-dream-200 bg-clip-text text-transparent mb-4">
              {story.title}
            </h1>

            <p className="text-white/80 text-lg leading-relaxed mb-6">
              {story.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-dream-500/20 border border-dream-500/30 rounded-full text-dream-200 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Comic Reader */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
            {/* Page Navigation */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-4">
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </motion.button>

                <span className="text-white/80 font-medium">
                  Page {currentPage + 1} of {story.pages.length}
                </span>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === story.pages.length - 1}
                  className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </div>

              <div className="text-white/60 text-sm">
                {currentPageData.title}
              </div>
            </div>

            {/* Current Page */}
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 p-8"
            >
              {/* Page Image */}
              <div className="space-y-4">
                <img
                  src={currentPageData.image}
                  alt={currentPageData.title}
                  className="w-full aspect-[4/3] object-cover rounded-xl border border-white/20"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">{currentPageData.title}</h3>
                  <p className="text-white/60 text-sm italic">{currentPageData.narration}</p>
                </div>
              </div>

              {/* Page Text */}
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <p className="text-white/90 text-lg leading-relaxed">
                    {currentPageData.text}
                  </p>
                </div>

                {/* Page Thumbnails */}
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {story.pages.map((page, index) => (
                    <button
                      key={page.id}
                      onClick={() => setCurrentPage(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentPage
                          ? 'border-dream-400 opacity-100'
                          : 'border-white/20 opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={page.image}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
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
                  <span>{story.likes}</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>{story.comments}</span>
                </motion.button>
              </div>

              <motion.button
                className="flex items-center space-x-2 bg-gradient-to-r from-dream-500 to-cosmic-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="h-4 w-4" />
                <span>Share Story</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}