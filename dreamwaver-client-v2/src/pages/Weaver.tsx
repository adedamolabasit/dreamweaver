import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, Image, Video, Sparkles, Download, Share2, Loader2 } from 'lucide-react';

export function Weaver() {
  const [selectedDream, setSelectedDream] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'comic' | 'video'>('comic');
  const [generatedContent, setGeneratedContent] = useState<{
    comic?: string;
    video?: string;
  }>({});

  // Mock dream data
  const dreams = [
    { id: '1', title: 'Flying Through Cosmic Clouds' },
    { id: '2', title: 'The Underwater City' },
    { id: '3', title: 'Dancing with Light Beings' },
  ];

  const handleGenerate = async () => {
    if (!selectedDream) return;
    
    setIsGenerating(true);
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (activeTab === 'comic') {
      setGeneratedContent(prev => ({ ...prev, comic: 'generated-comic-url' }));
    } else {
      setGeneratedContent(prev => ({ ...prev, video: 'generated-video-url' }));
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="pt-20 min-h-screen">
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
              Dream Weaver
            </h1>
            <p className="text-xl text-white/70">
              Transform your dreams into stunning visual stories with AI magic.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Dream Selection & Controls */}
            <div className="space-y-6">
              {/* Dream Selection */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Select a Dream</h3>
                <select
                  value={selectedDream}
                  onChange={(e) => setSelectedDream(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-dream-400 focus:ring-2 focus:ring-dream-400/20"
                >
                  <option value="" className="bg-gray-800 text-white">Choose a dream to weave...</option>
                  {dreams.map((dream) => (
                    <option key={dream.id} value={dream.id} className="bg-gray-800 text-white">
                      {dream.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Type Toggle */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">What would you like to create?</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('comic')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                      activeTab === 'comic'
                        ? 'bg-dream-500 text-white'
                        : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <Image className="h-5 w-5" />
                    <span>Comic Book</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                      activeTab === 'video'
                        ? 'bg-cosmic-500 text-white'
                        : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <Video className="h-5 w-5" />
                    <span>Dream Video</span>
                  </button>
                </div>
              </div>

              {/* Generation Settings */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Style Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Art Style</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-dream-400">
                      <option value="cosmic" className="bg-gray-800">Cosmic Surreal</option>
                      <option value="watercolor" className="bg-gray-800">Watercolor Dreams</option>
                      <option value="cyberpunk" className="bg-gray-800">Cyberpunk Fantasy</option>
                      <option value="minimalist" className="bg-gray-800">Minimalist Abstract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Color Palette</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Purple & Blue', 'Warm Sunset', 'Monochrome', 'Rainbow', 'Earth Tones', 'Neon Bright'].map((palette) => (
                        <button
                          key={palette}
                          className="py-2 px-3 text-xs bg-white/10 border border-white/20 rounded-lg text-white/80 hover:bg-white/20 transition-colors"
                        >
                          {palette}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={!selectedDream || isGenerating}
                className="w-full bg-gradient-to-r from-dream-500 to-cosmic-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Weaving Your Dream...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    <span>Weave {activeTab === 'comic' ? 'Comic' : 'Video'}</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Right Panel - Preview */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Preview</h3>
                {(generatedContent.comic || generatedContent.video) && (
                  <div className="flex space-x-2">
                    <motion.button
                      className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </motion.button>
                    <motion.button
                      className="flex items-center space-x-2 bg-gradient-to-r from-dream-500 to-cosmic-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Publish</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="aspect-video bg-gradient-to-br from-dream-500/20 to-cosmic-500/20 rounded-lg border-2 border-dashed border-white/20 flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center space-y-4">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-dream-400 to-cosmic-400 rounded-full mx-auto"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="space-y-2">
                      <p className="text-white font-medium">AI is weaving your dream...</p>
                      <p className="text-white/60 text-sm">This usually takes 2-3 minutes</p>
                    </div>
                  </div>
                ) : generatedContent.comic && activeTab === 'comic' ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Image className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-semibold">Comic Generated!</p>
                      <p className="text-sm opacity-80">Your dream comic is ready</p>
                    </div>
                  </div>
                ) : generatedContent.video && activeTab === 'video' ? (
                  <div className="w-full h-full bg-gradient-to-br from-cosmic-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <div className="text-center text-white">
                      <Video className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-semibold">Video Generated!</p>
                      <p className="text-sm opacity-80">Your dream video is ready</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Sparkles className="h-16 w-16 text-white/30 mx-auto" />
                    <div className="space-y-2">
                      <p className="text-white/60">Select a dream and click "Weave" to begin</p>
                      <p className="text-white/40 text-sm">Your generated content will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Generation Progress */}
              {isGenerating && (
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-sm text-white/70">
                    <span>Progress</span>
                    <span>Step 2 of 4</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-dream-400 to-cosmic-400 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '50%' }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                  <p className="text-sm text-white/60">Analyzing dream narrative...</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Features Info */}
          <div className="bg-gradient-to-r from-dream-900/30 to-cosmic-900/30 border border-white/10 rounded-2xl p-8">
            <div className="text-center space-y-4 mb-8">
              <h3 className="text-2xl font-bold text-white">How Dream Weaving Works</h3>
              <p className="text-white/70">Our AI analyzes your dream narrative and creates visual interpretations</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-dream-500 rounded-full flex items-center justify-center">
                    <Image className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Comic Generation</h4>
                </div>
                <ul className="space-y-2 text-white/70 pl-11">
                  <li>• Panel-by-panel visual storytelling</li>
                  <li>• Character and scene generation</li>
                  <li>• Multiple art style options</li>
                  <li>• Downloadable high-resolution images</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cosmic-500 rounded-full flex items-center justify-center">
                    <Video className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Video Creation</h4>
                </div>
                <ul className="space-y-2 text-white/70 pl-11">
                  <li>• Cinematic dream sequences</li>
                  <li>• Ambient soundtracks</li>
                  <li>• Smooth transitions and effects</li>
                  <li>• Social media ready formats</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}