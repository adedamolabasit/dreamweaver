import React, { useState } from 'react';
import { Star, ArrowRight, ChevronDown, Shield, Globe, Sparkles } from 'lucide-react';

const MintDream: React.FC = () => {
  const [mintingStage, setMintingStage] = useState(0);
  
  const startMinting = () => {
    setMintingStage(1);
    // Simulate minting progress
    setTimeout(() => setMintingStage(2), 3000);
  };
  
  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto">
      <div className="text-center mb-8 dreamfade-in">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          Dream Minting
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Immortalize your dream creations as unique digital assets in the dreamverse.
        </p>
      </div>
      
      <div className="w-full p-6 mb-8 rounded-2xl bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-400 to-pink-400 opacity-50"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/3 aspect-square rounded-xl bg-gradient-to-br from-purple-700/30 to-blue-800/30 border border-white/10 overflow-hidden relative">
            {mintingStage === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Sparkles className="text-amber-300/70 mb-3" size={36} />
                <p className="text-center text-sm text-blue-100/70">
                  Select a dream creation to mint
                </p>
              </div>
            )}
            
            {mintingStage > 0 && (
              <div className="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/1738667/pexels-photo-1738667.jpeg" 
                  alt="Dream to mint" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-lg font-medium">Ethereal Wanderer</p>
                  <p className="text-xs text-blue-200/70">Dream Character • Unique</p>
                </div>
                
                {mintingStage === 1 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="p-4 text-center">
                      <div className="loading-spinner mb-3">
                        <div className="spinner-circle"></div>
                      </div>
                      <p>Minting your dream...</p>
                    </div>
                  </div>
                )}
                
                {mintingStage === 2 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="p-4 text-center">
                      <div className="mb-3 text-green-300">
                        <Shield size={36} className="mx-auto" />
                      </div>
                      <p className="text-lg mb-1">Successfully Minted!</p>
                      <p className="text-sm text-blue-200/70">Your creation is now part of the dreamverse</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-medium mb-4">Mint Dream Creation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-blue-100/70 mb-2">Creation Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-lg bg-purple-950/50 text-white placeholder-blue-300/40 border border-purple-500/30 focus:border-purple-400/50 focus:outline-none focus:ring-1 focus:ring-purple-400/30"
                  placeholder="Enter a title for your creation"
                  value={mintingStage > 0 ? "Ethereal Wanderer" : ""}
                />
              </div>
              
              <div>
                <label className="block text-sm text-blue-100/70 mb-2">Description</label>
                <textarea 
                  className="w-full h-24 p-3 rounded-lg bg-purple-950/50 text-white placeholder-blue-300/40 border border-purple-500/30 focus:border-purple-400/50 focus:outline-none focus:ring-1 focus:ring-purple-400/30 resize-none"
                  placeholder="Describe your dream creation..."
                  value={mintingStage > 0 ? "A mysterious guardian of the dream realm, shaped from the essence of starlight and memory." : ""}
                ></textarea>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm text-blue-100/70 mb-2">Rarity</label>
                  <div className="relative">
                    <select className="w-full appearance-none p-3 pr-10 rounded-lg bg-purple-950/50 text-white border border-purple-500/30 focus:border-purple-400/50 focus:outline-none focus:ring-1 focus:ring-purple-400/30">
                      <option>Common</option>
                      <option>Uncommon</option>
                      <option selected={mintingStage > 0}>Rare</option>
                      <option>Legendary</option>
                      <option>Mythic</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" size={18} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm text-blue-100/70 mb-2">Category</label>
                  <div className="relative">
                    <select className="w-full appearance-none p-3 pr-10 rounded-lg bg-purple-950/50 text-white border border-purple-500/30 focus:border-purple-400/50 focus:outline-none focus:ring-1 focus:ring-purple-400/30">
                      <option>Dream World</option>
                      <option selected={mintingStage > 0}>Character</option>
                      <option>Artifact</option>
                      <option>Landscape</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300/50 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 rounded-xl bg-white/5 backdrop-blur-sm">
          <div>
            <h4 className="text-lg font-medium">Dream Protocol License</h4>
            <p className="text-sm text-blue-100/70">Define how your creation can be used in the dreamverse</p>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="license-open" 
                name="license" 
                className="h-4 w-4 text-purple-500 border-purple-500/50 focus:ring-purple-400/30"
                checked={mintingStage > 0}
              />
              <label htmlFor="license-open" className="ml-2 text-sm">Open</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                id="license-limited" 
                name="license" 
                className="h-4 w-4 text-purple-500 border-purple-500/50 focus:ring-purple-400/30"
              />
              <label htmlFor="license-limited" className="ml-2 text-sm">Limited</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                id="license-exclusive" 
                name="license" 
                className="h-4 w-4 text-purple-500 border-purple-500/50 focus:ring-purple-400/30"
              />
              <label htmlFor="license-exclusive" className="ml-2 text-sm">Exclusive</label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        {mintingStage === 0 && (
          <button 
            onClick={startMinting}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 mint-button"
          >
            <Star className="text-amber-200" size={18} />
            <span>Mint Dream Creation</span>
            <ArrowRight size={18} />
          </button>
        )}
        
        {mintingStage === 2 && (
          <div className="flex gap-4">
            <button className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md">
              <Globe size={18} />
              <span>View in Dreamverse</span>
            </button>
            
            <button className="flex-1 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 font-medium flex items-center justify-center gap-2">
              <Star size={18} />
              <span>Mint Another</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintDream;