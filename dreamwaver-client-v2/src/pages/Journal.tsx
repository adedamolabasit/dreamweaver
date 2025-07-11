import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, BookOpen, Wand2, Share2, Eye, Filter, Moon, Sun, Cloud, Star, Heart, Zap, Brain, Palette, Tag, Clock, MapPin, Thermometer, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Journal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Advanced filter states
  const [moodFilter, setMoodFilter] = useState('all');
  const [lucidityFilter, setLucidityFilter] = useState('all');
  const [themeFilter, setThemeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  // Mock dream data with enhanced properties
  const dreams = [
    {
      id: '1',
      title: 'Flying Through Cosmic Clouds',
      date: '2024-01-15',
      time: '3:42 AM',
      preview: 'I found myself soaring through endless purple clouds, with stars twinkling all around me like diamonds scattered across velvet...',
      mood: 'euphoric',
      lucidity: 'high',
      themes: ['flying', 'cosmic', 'adventure'],
      location: 'Space',
      weather: 'clear',
      temperature: 'cool',
      sounds: ['wind', 'silence'],
      colors: ['purple', 'silver', 'blue'],
      emotions: ['joy', 'freedom', 'wonder'],
      symbols: ['stars', 'clouds', 'infinity'],
      hasComic: true,
      hasVideo: false,
      isPublished: true,
      views: 234,
      likes: 89,
      sleepQuality: 8,
      dreamLength: 'long',
      vividness: 9,
    },
    {
      id: '2',
      title: 'The Underwater Crystal Palace',
      date: '2024-01-12',
      time: '5:15 AM',
      preview: 'Deep beneath the ocean, I discovered a magnificent palace made entirely of coral and pearls, inhabited by beings of light...',
      mood: 'peaceful',
      lucidity: 'medium',
      themes: ['underwater', 'palace', 'mystery'],
      location: 'Ocean depths',
      weather: 'underwater',
      temperature: 'cool',
      sounds: ['water', 'echoes'],
      colors: ['blue', 'turquoise', 'pearl'],
      emotions: ['calm', 'curiosity', 'awe'],
      symbols: ['water', 'crystals', 'light'],
      hasComic: false,
      hasVideo: true,
      isPublished: false,
      views: 0,
      likes: 0,
      sleepQuality: 7,
      dreamLength: 'medium',
      vividness: 8,
    },
    {
      id: '3',
      title: 'Dancing with Light Beings',
      date: '2024-01-10',
      time: '4:20 AM',
      preview: 'In a forest of crystal trees, I encountered beings made of pure light who taught me to dance in ways that defied gravity...',
      mood: 'joyful',
      lucidity: 'very high',
      themes: ['dancing', 'beings', 'forest', 'light'],
      location: 'Crystal forest',
      weather: 'mystical',
      temperature: 'warm',
      sounds: ['music', 'chimes'],
      colors: ['gold', 'white', 'rainbow'],
      emotions: ['joy', 'connection', 'transcendence'],
      symbols: ['light', 'dance', 'trees'],
      hasComic: true,
      hasVideo: true,
      isPublished: true,
      views: 567,
      likes: 234,
      sleepQuality: 9,
      dreamLength: 'long',
      vividness: 10,
    },
  ];

  const moodIcons = {
    euphoric: { icon: Star, color: 'text-yellow-400' },
    joyful: { icon: Sun, color: 'text-orange-400' },
    peaceful: { icon: Moon, color: 'text-blue-400' },
    mysterious: { icon: Cloud, color: 'text-purple-400' },
    intense: { icon: Zap, color: 'text-red-400' },
  };

  const filteredDreams = dreams.filter(dream => {
    const matchesSearch = dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dream.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dream.themes.some(theme => theme.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'comics' && dream.hasComic) ||
                         (selectedFilter === 'videos' && dream.hasVideo) ||
                         (selectedFilter === 'published' && dream.isPublished) ||
                         (selectedFilter === 'lucid' && dream.lucidity === 'high' || dream.lucidity === 'very high');

    const matchesMood = moodFilter === 'all' || dream.mood === moodFilter;
    const matchesLucidity = lucidityFilter === 'all' || dream.lucidity === lucidityFilter;
    const matchesTheme = themeFilter === 'all' || dream.themes.includes(themeFilter);
    
    return matchesSearch && matchesFilter && matchesMood && matchesLucidity && matchesTheme;
  });

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.h1 
              className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Dream Journal
            </motion.h1>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Your personal sanctuary of dreams, memories, and magical interpretations.
            </motion.p>
          </div>

          {/* Search and Filters */}
          <motion.div 
            className="glass-strong rounded-3xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="space-y-6">
              {/* Main Search and View Toggle */}
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-lg">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search dreams, themes, emotions..."
                    className="w-full glass border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 glass rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <div className="w-4 h-4 flex flex-col space-y-1">
                      <div className="h-0.5 bg-current rounded"></div>
                      <div className="h-0.5 bg-current rounded"></div>
                      <div className="h-0.5 bg-current rounded"></div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3">
                {[
                  { key: 'all', label: 'All Dreams', icon: BookOpen },
                  { key: 'lucid', label: 'Lucid Dreams', icon: Brain },
                  { key: 'comics', label: 'With Comics', icon: Palette },
                  { key: 'videos', label: 'With Videos', icon: Volume2 },
                  { key: 'published', label: 'Published', icon: Share2 },
                ].map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.key}
                      onClick={() => setSelectedFilter(filter.key)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        selectedFilter === filter.key
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'glass text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{filter.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Advanced Filters Toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Advanced Filters</span>
                  <motion.div
                    animate={{ rotate: showAdvancedFilters ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                
                <div className="text-sm text-white/50">
                  {filteredDreams.length} dream{filteredDreams.length !== 1 ? 's' : ''} found
                </div>
              </div>

              {/* Advanced Filters Panel */}
              <motion.div
                initial={false}
                animate={{ height: showAdvancedFilters ? 'auto' : 0, opacity: showAdvancedFilters ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
                  {/* Mood Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">Mood</label>
                    <select
                      value={moodFilter}
                      onChange={(e) => setMoodFilter(e.target.value)}
                      className="w-full glass border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="all" className="bg-gray-800">All Moods</option>
                      <option value="euphoric" className="bg-gray-800">Euphoric</option>
                      <option value="joyful" className="bg-gray-800">Joyful</option>
                      <option value="peaceful" className="bg-gray-800">Peaceful</option>
                      <option value="mysterious" className="bg-gray-800">Mysterious</option>
                      <option value="intense" className="bg-gray-800">Intense</option>
                    </select>
                  </div>

                  {/* Lucidity Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">Lucidity Level</label>
                    <select
                      value={lucidityFilter}
                      onChange={(e) => setLucidityFilter(e.target.value)}
                      className="w-full glass border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="all" className="bg-gray-800">All Levels</option>
                      <option value="low" className="bg-gray-800">Low</option>
                      <option value="medium" className="bg-gray-800">Medium</option>
                      <option value="high" className="bg-gray-800">High</option>
                      <option value="very high" className="bg-gray-800">Very High</option>
                    </select>
                  </div>

                  {/* Theme Filter */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">Theme</label>
                    <select
                      value={themeFilter}
                      onChange={(e) => setThemeFilter(e.target.value)}
                      className="w-full glass border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="all" className="bg-gray-800">All Themes</option>
                      <option value="flying" className="bg-gray-800">Flying</option>
                      <option value="cosmic" className="bg-gray-800">Cosmic</option>
                      <option value="underwater" className="bg-gray-800">Underwater</option>
                      <option value="dancing" className="bg-gray-800">Dancing</option>
                      <option value="adventure" className="bg-gray-800">Adventure</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">Date Range</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full glass border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="all" className="bg-gray-800">All Time</option>
                      <option value="week" className="bg-gray-800">This Week</option>
                      <option value="month" className="bg-gray-800">This Month</option>
                      <option value="year" className="bg-gray-800">This Year</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Dreams Display */}
          <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {filteredDreams.map((dream, index) => {
              const MoodIcon = moodIcons[dream.mood as keyof typeof moodIcons]?.icon || Star;
              const moodColor = moodIcons[dream.mood as keyof typeof moodIcons]?.color || 'text-white';
              
              return (
                <motion.div
                  key={dream.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group glass-strong rounded-3xl p-8 hover:scale-105 transition-all duration-300 border border-white/10 hover:border-white/20 ${
                    viewMode === 'list' ? 'flex space-x-6' : ''
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <div className="space-y-6">
                      {/* Dream Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors mb-2">
                            {dream.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-white/50">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{dream.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{dream.time}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <MoodIcon className={`h-5 w-5 ${moodColor}`} />
                          <div className="flex space-x-1">
                            {dream.hasComic && <div className="w-2 h-2 bg-blue-400 rounded-full" title="Has Comic" />}
                            {dream.hasVideo && <div className="w-2 h-2 bg-purple-400 rounded-full" title="Has Video" />}
                            {dream.isPublished && <div className="w-2 h-2 bg-green-400 rounded-full" title="Published" />}
                          </div>
                        </div>
                      </div>

                      {/* Dream Preview */}
                      <p className="text-white/70 leading-relaxed line-clamp-3">
                        {dream.preview}
                      </p>

                      {/* Dream Metadata */}
                      <div className="space-y-4">
                        {/* Themes */}
                        <div className="flex flex-wrap gap-2">
                          {dream.themes.slice(0, 3).map((theme) => (
                            <span
                              key={theme}
                              className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 text-xs"
                            >
                              #{theme}
                            </span>
                          ))}
                        </div>

                        {/* Dream Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="glass rounded-lg p-3">
                            <div className="text-lg font-bold text-white">{dream.vividness}/10</div>
                            <div className="text-xs text-white/60">Vividness</div>
                          </div>
                          <div className="glass rounded-lg p-3">
                            <div className="text-lg font-bold text-white capitalize">{dream.lucidity}</div>
                            <div className="text-xs text-white/60">Lucidity</div>
                          </div>
                          <div className="glass rounded-lg p-3">
                            <div className="text-lg font-bold text-white">{dream.sleepQuality}/10</div>
                            <div className="text-xs text-white/60">Sleep Quality</div>
                          </div>
                        </div>
                      </div>

                      {/* Engagement Stats */}
                      {dream.isPublished && (
                        <div className="flex items-center space-x-4 text-sm text-white/50 pt-4 border-t border-white/10">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{dream.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{dream.likes}</span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <Link to={`/dream/${dream.id}`}>
                          <motion.button
                            className="flex items-center space-x-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <BookOpen className="h-4 w-4" />
                            <span>Read Full Dream</span>
                          </motion.button>
                        </Link>

                        <div className="flex space-x-3">
                          {!dream.hasComic && !dream.hasVideo && (
                            <Link to="/weaver">
                              <motion.button
                                className="flex items-center space-x-1 text-sm text-purple-300 hover:text-purple-200 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Wand2 className="h-4 w-4" />
                                <span>Weave</span>
                              </motion.button>
                            </Link>
                          )}

                          {(dream.hasComic || dream.hasVideo) && !dream.isPublished && (
                            <motion.button
                              className="flex items-center space-x-1 text-sm text-green-300 hover:text-green-200 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Publish</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List view layout
                    <>
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                              {dream.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-white/50 mt-1">
                              <span>{dream.date}</span>
                              <span>{dream.time}</span>
                              <MoodIcon className={`h-4 w-4 ${moodColor}`} />
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            {dream.hasComic && <div className="w-2 h-2 bg-blue-400 rounded-full" />}
                            {dream.hasVideo && <div className="w-2 h-2 bg-purple-400 rounded-full" />}
                            {dream.isPublished && <div className="w-2 h-2 bg-green-400 rounded-full" />}
                          </div>
                        </div>
                        <p className="text-white/70 line-clamp-2">{dream.preview}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {dream.themes.slice(0, 2).map((theme) => (
                              <span key={theme} className="px-2 py-1 bg-blue-500/20 rounded-full text-blue-200 text-xs">
                                #{theme}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-white/60">Vividness: {dream.vividness}/10</span>
                            {dream.isPublished && (
                              <div className="flex items-center space-x-2 text-white/50">
                                <Eye className="h-3 w-3" />
                                <span>{dream.views}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredDreams.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="glass-strong rounded-3xl p-16 max-w-md mx-auto">
                <BookOpen className="h-20 w-20 text-white/30 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white/70 mb-4">No dreams found</h3>
                <p className="text-white/50 mb-8">
                  {searchTerm ? 'Try adjusting your search or filters' : 'Start by recording your first dream'}
                </p>
                <Link to="/dashboard">
                  <motion.button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-shadow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Record Your First Dream
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}