import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Type, Save, Wand2, MicOff, Moon, Sun, Cloud, Star, Heart, Brain, Palette, MapPin, Thermometer, Volume2, Tag, Smile, Zap, Eye } from 'lucide-react';

export function Dashboard() {
  const [isRecording, setIsRecording] = useState(false);
  const [inputMethod, setInputMethod] = useState<'text' | 'voice'>('text');
  const [dreamText, setDreamText] = useState('');
  const [dreamTitle, setDreamTitle] = useState('');
  
  // Enhanced dream metadata
  const [dreamMetadata, setDreamMetadata] = useState({
    mood: '',
    lucidity: 'low',
    themes: [] as string[],
    location: '',
    weather: '',
    temperature: '',
    sounds: [] as string[],
    colors: [] as string[],
    emotions: [] as string[],
    symbols: [] as string[],
    sleepQuality: 5,
    dreamLength: 'medium',
    vividness: 5,
    timeOfDream: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleSaveDream = () => {
    console.log('Saving dream:', { 
      title: dreamTitle, 
      content: dreamText, 
      metadata: dreamMetadata 
    });
    // Reset form
    setDreamTitle('');
    setDreamText('');
    setDreamMetadata({
      mood: '',
      lucidity: 'low',
      themes: [],
      location: '',
      weather: '',
      temperature: '',
      sounds: [],
      colors: [],
      emotions: [],
      symbols: [],
      sleepQuality: 5,
      dreamLength: 'medium',
      vividness: 5,
      timeOfDream: '',
    });
    setCurrentStep(1);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const addToArray = (field: keyof typeof dreamMetadata, value: string) => {
    const currentArray = dreamMetadata[field] as string[];
    if (!currentArray.includes(value)) {
      setDreamMetadata(prev => ({
        ...prev,
        [field]: [...currentArray, value]
      }));
    }
  };

  const removeFromArray = (field: keyof typeof dreamMetadata, value: string) => {
    const currentArray = dreamMetadata[field] as string[];
    setDreamMetadata(prev => ({
      ...prev,
      [field]: currentArray.filter(item => item !== value)
    }));
  };

  const moodOptions = [
    { value: 'euphoric', label: 'Euphoric', icon: Star, color: 'from-yellow-400 to-orange-500' },
    { value: 'joyful', label: 'Joyful', icon: Sun, color: 'from-orange-400 to-red-500' },
    { value: 'peaceful', label: 'Peaceful', icon: Moon, color: 'from-blue-400 to-indigo-500' },
    { value: 'mysterious', label: 'Mysterious', icon: Cloud, color: 'from-purple-400 to-indigo-600' },
    { value: 'intense', label: 'Intense', icon: Zap, color: 'from-red-400 to-pink-500' },
    { value: 'contemplative', label: 'Contemplative', icon: Brain, color: 'from-teal-400 to-cyan-500' },
  ];

  const commonThemes = ['flying', 'falling', 'water', 'animals', 'people', 'places', 'colors', 'music', 'food', 'travel', 'fantasy', 'nightmare', 'lucid', 'recurring'];
  const commonEmotions = ['joy', 'fear', 'love', 'anger', 'sadness', 'excitement', 'peace', 'confusion', 'wonder', 'freedom'];
  const commonColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'gold', 'silver'];
  const commonSounds = ['music', 'voices', 'nature', 'silence', 'mechanical', 'water', 'wind', 'animals'];

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Capture Your Dream
            </motion.h1>
            <motion.p 
              className="text-xl text-white/70 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Record every detail of your nocturnal journey and transform it into something magical.
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <div className="glass-strong rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/80 font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-white/60 text-sm">
                {currentStep === 1 ? 'Dream Content' : currentStep === 2 ? 'Dream Details' : 'Final Review'}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step 1: Dream Content */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              {/* Input Method Toggle */}
              <div className="flex justify-center">
                <div className="glass rounded-2xl p-2 border border-white/20">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setInputMethod('text')}
                      className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all ${
                        inputMethod === 'text'
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Type className="h-5 w-5" />
                      <span className="font-medium">Write Dream</span>
                    </button>
                    <button
                      onClick={() => setInputMethod('voice')}
                      className={`flex items-center space-x-3 px-8 py-4 rounded-xl transition-all ${
                        inputMethod === 'voice'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Mic className="h-5 w-5" />
                      <span className="font-medium">Voice Record</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dream Input Form */}
              <div className="glass-strong rounded-3xl p-8 border border-white/10">
                <div className="space-y-8">
                  {/* Dream Title */}
                  <div>
                    <label htmlFor="title" className="block text-lg font-semibold text-white/90 mb-4">
                      Give your dream a title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={dreamTitle}
                      onChange={(e) => setDreamTitle(e.target.value)}
                      placeholder="The Cosmic Flight, The Underwater Palace..."
                      className="w-full glass border border-white/20 rounded-2xl px-6 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                    />
                  </div>

                  {/* Text Input */}
                  {inputMethod === 'text' && (
                    <div>
                      <label htmlFor="dream" className="block text-lg font-semibold text-white/90 mb-4">
                        Describe your dream in detail
                      </label>
                      <textarea
                        id="dream"
                        value={dreamText}
                        onChange={(e) => setDreamText(e.target.value)}
                        placeholder="I found myself floating in a vast cosmic space, surrounded by swirling galaxies and twinkling stars. The sensation was both peaceful and exhilarating as I drifted through the infinite darkness..."
                        rows={12}
                        className="w-full glass border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none transition-all"
                      />
                      <div className="flex justify-between items-center mt-3 text-sm text-white/50">
                        <span>Be as detailed as possible - every detail matters</span>
                        <span>{dreamText.length} characters</span>
                      </div>
                    </div>
                  )}

                  {/* Voice Input */}
                  {inputMethod === 'voice' && (
                    <div className="text-center space-y-8">
                      <div className="flex justify-center">
                        <motion.button
                          onClick={toggleRecording}
                          className={`relative w-40 h-40 rounded-full flex items-center justify-center ${
                            isRecording
                              ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-2xl'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-xl'
                          } transition-all duration-300`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={isRecording ? { 
                            boxShadow: ['0 0 0 0 rgba(239, 68, 68, 0.7)', '0 0 0 20px rgba(239, 68, 68, 0)'],
                            scale: [1, 1.05, 1] 
                          } : {}}
                          transition={isRecording ? { 
                            boxShadow: { duration: 1.5, repeat: Infinity },
                            scale: { duration: 2, repeat: Infinity }
                          } : {}}
                        >
                          {isRecording ? (
                            <MicOff className="h-16 w-16 text-white" />
                          ) : (
                            <Mic className="h-16 w-16 text-white" />
                          )}
                        </motion.button>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-xl text-white/90 font-medium">
                          {isRecording ? 'Recording your dream... Click to stop' : 'Click to start recording your dream'}
                        </p>
                        {isRecording && (
                          <motion.div
                            className="flex justify-center space-x-2"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          </motion.div>
                        )}
                      </div>

                      {/* Transcription Display */}
                      <div className="glass border border-white/20 rounded-2xl p-6 min-h-48">
                        <p className="text-white/70 italic text-lg leading-relaxed">
                          {isRecording 
                            ? "Your voice is being transcribed here in real-time..." 
                            : "Your transcribed dream will appear here..."
                          }
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Continue Button */}
                  <div className="flex justify-end pt-6">
                    <motion.button
                      onClick={() => setCurrentStep(2)}
                      disabled={!dreamTitle || (!dreamText && inputMethod === 'text')}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Continue to Details</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Dream Details */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="glass-strong rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8">Dream Details & Metadata</h3>
                
                <div className="space-y-10">
                  {/* Mood Selection */}
                  <div>
                    <label className="block text-lg font-semibold text-white/90 mb-4">
                      What was the overall mood of your dream?
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {moodOptions.map((mood) => {
                        const Icon = mood.icon;
                        return (
                          <button
                            key={mood.value}
                            onClick={() => setDreamMetadata(prev => ({ ...prev, mood: mood.value }))}
                            className={`p-6 rounded-2xl border-2 transition-all ${
                              dreamMetadata.mood === mood.value
                                ? `bg-gradient-to-r ${mood.color} border-white/30 text-white shadow-lg`
                                : 'glass border-white/20 text-white/70 hover:text-white hover:border-white/30'
                            }`}
                          >
                            <Icon className="h-8 w-8 mx-auto mb-3" />
                            <div className="font-medium">{mood.label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lucidity Level */}
                  <div>
                    <label className="block text-lg font-semibold text-white/90 mb-4">
                      How lucid were you in this dream?
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {['low', 'medium', 'high', 'very high'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setDreamMetadata(prev => ({ ...prev, lucidity: level }))}
                          className={`p-4 rounded-xl border transition-all capitalize ${
                            dreamMetadata.lucidity === level
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-white/30 text-white'
                              : 'glass border-white/20 text-white/70 hover:text-white hover:border-white/30'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vividness Scale */}
                  <div>
                    <label className="block text-lg font-semibold text-white/90 mb-4">
                      How vivid was your dream? ({dreamMetadata.vividness}/10)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={dreamMetadata.vividness}
                      onChange={(e) => setDreamMetadata(prev => ({ ...prev, vividness: parseInt(e.target.value) }))}
                      className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-white/60 mt-2">
                      <span>Barely remember</span>
                      <span>Crystal clear</span>
                    </div>
                  </div>

                  {/* Themes */}
                  <div>
                    <label className="block text-lg font-semibold text-white/90 mb-4">
                      What themes appeared in your dream?
                    </label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {commonThemes.map((theme) => (
                        <button
                          key={theme}
                          onClick={() => 
                            dreamMetadata.themes.includes(theme) 
                              ? removeFromArray('themes', theme)
                              : addToArray('themes', theme)
                          }
                          className={`px-4 py-2 rounded-xl border transition-all ${
                            dreamMetadata.themes.includes(theme)
                              ? 'bg-blue-500 border-blue-400 text-white'
                              : 'glass border-white/20 text-white/70 hover:text-white hover:border-white/30'
                          }`}
                        >
                          #{theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-lg font-semibold text-white/90 mb-4">
                      What colors stood out in your dream?
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {commonColors.map((color) => (
                        <button
                          key={color}
                          onClick={() => 
                            dreamMetadata.colors.includes(color) 
                              ? removeFromArray('colors', color)
                              : addToArray('colors', color)
                          }
                          className={`px-4 py-2 rounded-xl border transition-all capitalize ${
                            dreamMetadata.colors.includes(color)
                              ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-white/30 text-white'
                              : 'glass border-white/20 text-white/70 hover:text-white hover:border-white/30'
                          }`}
                        >
                          <Palette className="h-4 w-4 inline mr-2" />
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between pt-8 border-t border-white/10">
                    <motion.button
                      onClick={() => setCurrentStep(1)}
                      className="glass border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Content
                    </motion.button>
                    
                    <motion.button
                      onClick={() => setCurrentStep(3)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Review & Save
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review & Save */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              <div className="glass-strong rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-8">Review Your Dream</h3>
                
                <div className="space-y-8">
                  {/* Dream Summary */}
                  <div className="glass rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">{dreamTitle}</h4>
                    <p className="text-white/80 leading-relaxed mb-6">
                      {dreamText.substring(0, 200)}...
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-white/90 mb-3">Dream Attributes</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Mood:</span>
                            <span className="text-white capitalize">{dreamMetadata.mood || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Lucidity:</span>
                            <span className="text-white capitalize">{dreamMetadata.lucidity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Vividness:</span>
                            <span className="text-white">{dreamMetadata.vividness}/10</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-white/90 mb-3">Themes & Elements</h5>
                        <div className="flex flex-wrap gap-2">
                          {dreamMetadata.themes.map((theme) => (
                            <span key={theme} className="px-2 py-1 bg-blue-500/30 rounded-lg text-blue-200 text-xs">
                              #{theme}
                            </span>
                          ))}
                          {dreamMetadata.colors.map((color) => (
                            <span key={color} className="px-2 py-1 bg-purple-500/30 rounded-lg text-purple-200 text-xs">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      onClick={handleSaveDream}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Save className="h-5 w-5" />
                      <span>Save to Journal</span>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => {
                        handleSaveDream();
                        // Navigate to weaver
                      }}
                      className="flex-1 glass border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 hover:bg-white/10 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Wand2 className="h-5 w-5" />
                      <span>Save & Weave Dream</span>
                    </motion.button>
                  </div>

                  {/* Back Button */}
                  <div className="flex justify-center pt-4">
                    <motion.button
                      onClick={() => setCurrentStep(2)}
                      className="text-white/70 hover:text-white transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      ← Back to edit details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tips Section */}
          <motion.div 
            className="glass-strong rounded-3xl p-8 border border-blue-500/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Eye className="h-6 w-6 mr-3 text-blue-400" />
              Dream Recording Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Record immediately after waking for maximum detail retention</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include emotions, colors, sounds, and physical sensations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Don't worry about logical consistency - dreams are naturally surreal</span>
                </li>
              </ul>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Note any recurring themes, symbols, or characters</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Rate your lucidity level and sleep quality for pattern tracking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>The more detail you provide, the better AI can weave your dream</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}