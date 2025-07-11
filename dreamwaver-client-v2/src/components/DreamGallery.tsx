import React from 'react';
import { Images, RefreshCcw, Bookmark, Share2 } from 'lucide-react';

interface DreamCardProps {
  title: string;
  imageUrl: string;
  tags: string[];
}

const DreamCard: React.FC<DreamCardProps> = ({ title, imageUrl, tags }) => (
  <div className="group relative rounded-xl overflow-hidden dreamcard">
    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-900/30 to-transparent z-10"></div>
    <img 
      src={imageUrl} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-700 ease-dream group-hover:scale-110"
    />
    
    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="text-xs py-1 px-2 rounded-full bg-purple-500/30 backdrop-blur-sm border border-purple-400/20"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <RefreshCcw size={16} />
        </button>
        
        <div className="space-x-2">
          <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Bookmark size={16} />
          </button>
          <button className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const DreamGallery: React.FC = () => {
  const dreamWorlds = [
    {
      title: "Celestial Gardens",
      imageUrl: "https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg",
      tags: ["mystical", "serene", "floating"]
    },
    {
      title: "Crystal Caverns",
      imageUrl: "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg",
      tags: ["glowing", "underground", "magical"]
    },
    {
      title: "Neon Metropolis",
      imageUrl: "https://images.pexels.com/photos/1434608/pexels-photo-1434608.jpeg",
      tags: ["futuristic", "vibrant", "urban"]
    },
    {
      title: "Whispering Forest",
      imageUrl: "https://images.pexels.com/photos/1671324/pexels-photo-1671324.jpeg",
      tags: ["nature", "mysterious", "ancient"]
    },
    {
      title: "Ocean of Stars",
      imageUrl: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
      tags: ["cosmic", "vast", "inspiring"]
    },
    {
      title: "Forgotten Temple",
      imageUrl: "https://images.pexels.com/photos/3214944/pexels-photo-3214944.jpeg",
      tags: ["ruins", "sacred", "timeless"]
    }
  ];
  
  const characters = [
    {
      title: "The Guardian",
      imageUrl: "https://images.pexels.com/photos/6577903/pexels-photo-6577903.jpeg",
      tags: ["protector", "wise", "eternal"]
    },
    {
      title: "Spectral Guide",
      imageUrl: "https://images.pexels.com/photos/3362698/pexels-photo-3362698.jpeg",
      tags: ["ethereal", "mentor", "enigmatic"]
    },
    {
      title: "Forgotten King",
      imageUrl: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg",
      tags: ["regal", "fallen", "powerful"]
    },
    {
      title: "Starborn Child",
      imageUrl: "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg",
      tags: ["innocent", "magical", "hopeful"]
    }
  ];
  
  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <div className="text-center mb-8 dreamfade-in">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-wide">
          Dream Gallery
        </h2>
        <p className="text-blue-100/80 max-w-2xl font-light">
          Explore and remix your collection of dream worlds and characters.
        </p>
      </div>
      
      <div className="w-full mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium flex items-center">
            <Images className="mr-2 text-blue-300" size={20} />
            <span>Dream Worlds</span>
          </h3>
          
          <button className="text-sm py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            Create New
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dreamWorlds.map((dream, index) => (
            <DreamCard key={index} {...dream} />
          ))}
        </div>
      </div>
      
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium flex items-center">
            <User className="mr-2 text-pink-300" size={20} />
            <span>Dream Characters</span>
          </h3>
          
          <button className="text-sm py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            Create New
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {characters.map((character, index) => (
            <DreamCard key={index} {...character} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamGallery;