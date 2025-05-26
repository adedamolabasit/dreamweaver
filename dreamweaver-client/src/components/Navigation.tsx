import React from 'react';
import { Mic, PenTool, Brain, Images, Star } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'journal', icon: <Mic />, label: 'Journal' },
    { id: 'storyboard', icon: <PenTool />, label: 'Storyboard' },
    { id: 'archetype', icon: <Brain />, label: 'Archetypes' },
    { id: 'gallery', icon: <Images />, label: 'Gallery' },
    { id: 'mint', icon: <Star />, label: 'Mint' },
  ];
  
  return (
    <nav className="relative py-4 px-12 sm:py-6">
      <div className="nav-blur absolute inset-0 bg-purple-900/20 backdrop-blur-md -z-10"></div>
      <div className="container mx-auto">
        <ul className="flex justify-center items-center gap-2 sm:gap-6">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex flex-col items-center p-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-white/10 text-white scale-105 shadow-lg shadow-purple-500/20' 
                    : 'text-blue-100/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg sm:text-xl mb-1">
                  {item.icon}
                </span>
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full nav-glow"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;