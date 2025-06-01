import React from "react";
import { BookOpen, Camera, Info } from "lucide-react";

interface Character {
  name?: string;
  description?: string;
}

interface Scene {
  description?: string;
  visualPrompt?: string;
  imageUrl?: string;
}

interface GeneratedImage {
  url: string;
  style: string;
}

export interface Visual {
  id: string;
  description: string;
  originalPrompt: string;
  generatedImages: GeneratedImage[];
}

interface Story {
  title?: string;
  synopsis?: string;
  characters?: Character[];
  scenes?: Scene[];
}

interface ComicBookDisplayProps {
  story?: Story;
  visuals?: Visual[];
}

const defaultStory: Story = {
  title: "Untitled Story",
  synopsis: "No synopsis available",
  characters: [],
  scenes: [],
};

const defaultVisuals: Visual[] = [];

const ComicBookDisplay: React.FC<ComicBookDisplayProps> = ({
  story = defaultStory,
  visuals = defaultVisuals,
}) => {
const getComicBookImageForScene = (index: number) => {
  // First ensure visuals is a flat array
  const flatVisuals = Array.isArray(visuals[0]) ? visuals[0] : visuals;
  
  const sceneId = `scene${index + 1}`;
  console.log('Flat visuals array:', flatVisuals);
  
  const visual = flatVisuals.find((v) => {
    console.log(`Comparing: Looking for ${sceneId} vs ${v.id}`);
    return v.id === sceneId;
  });
  
  if (visual) {
    console.log('Found visual:', visual);
    const comicImage = visual.generatedImages.find((img: any) => {
      console.log(`Checking image style: ${img.style}`);
      return img.style === "Comic Book";
    });
    return comicImage || null;
  }
  
  console.log(`No visual found for ${sceneId}`);
  return null;
};

  console.log(getComicBookImageForScene(1),"ssx")

  // Safe access to story properties
  const safeStory = story || defaultStory;
  const safeVisuals = visuals || defaultVisuals;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-center">{safeStory.title}</h2>
        <p className="text-blue-100/80 text-sm mb-6 text-center max-w-2xl mx-auto">
          {safeStory.synopsis}
        </p>

        {safeStory.characters && safeStory.characters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {safeStory.characters.map((character, index) => (
              <div
                key={index}
                className="bg-purple-900/30 border border-purple-500/20 rounded-lg p-4 w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]"
              >
                <h3 className="text-lg font-medium mb-2 text-purple-200">
                  {character.name || "Unnamed Character"}
                </h3>
                <p className="text-blue-100/70 text-sm">
                  {character.description || "No description available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 flex items-center">
          <BookOpen className="mr-2 text-blue-300" size={20} />
          <span>Comic Book Storyboard</span>
        </h3>

        <div className="space-y-8">
          {safeStory.scenes && safeStory.scenes.length > 0 ? (
            safeStory.scenes.map((scene, index) => {
              const comicImage = getComicBookImageForScene(index);
              return (
                <div key={index} className="bg-purple-900/10 rounded-lg overflow-hidden border border-purple-500/20">
                  {/* Scene header */}
                  <div className="p-4 bg-purple-900/20 border-b border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-200">
                      Scene {index + 1}
                    </h4>
                    <p className="text-blue-100/80 text-sm mt-1">
                      {scene.description || "No scene description"}
                    </p>
                  </div>

                  {/* Visual prompt */}
                  <div className="p-4 bg-purple-900/10 border-b border-purple-500/10">
                    <p className="text-xs text-blue-200/60 italic">
                      <span className="font-medium text-blue-200/80">Visual Prompt:</span> 
                      {scene.visualPrompt || "No visual prompt available"}
                    </p>
                  </div>

                  {/* Single Comic Book Image */}
                  <div className="aspect-[4/3] bg-purple-900/10">
                    {comicImage ? (
                      <div className="relative aspect-[4/3] bg-purple-900/20">
                        <img
                          src={comicImage.url}
                          alt={`${scene.visualPrompt || 'Scene'} - Comic Book`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzJhMTAzMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          Comic Book Style
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] flex items-center justify-center bg-purple-900/20">
                        <Camera className="text-purple-300/40" size={40} />
                        <span className="ml-2 text-purple-200/70">
                          No comic book image available
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-blue-100/60">
              No scenes available for this story
            </div>
          )}
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-blue-500/20">
        <div className="p-4 bg-blue-900/20 flex items-center">
          <Info className="mr-2 text-blue-300" size={18} />
          <h3 className="text-lg font-medium">Story Path</h3>
        </div>
        <div className="p-5 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-1 bg-blue-500/20 rounded-full"></div>

            {safeStory.scenes && safeStory.scenes.length > 0 ? (
              safeStory.scenes.map((scene, index) => (
                <div key={index} className="flex mb-8 relative z-10">
                  <div className="mr-6">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-blue-500"
                          : "bg-blue-900/50 border border-blue-500/30"
                      }`}
                    >
                      <span className="text-xs">{index + 1}</span>
                    </div>
                  </div>

                  <div
                    className={`flex-1 p-3 rounded-lg ${
                      index === 0
                        ? "bg-blue-900/30 border border-blue-500/30"
                        : "bg-blue-900/20 border border-blue-500/10"
                    }`}
                  >
                    <p className="text-sm">
                      {index === 0
                        ? "Beginning: "
                        : index === safeStory.scenes!.length - 1
                        ? "Resolution: "
                        : `Development ${index}: `}
                      <span className="text-blue-200/80">
                        {scene.description?.substring(0, 100) || "No description available"}...
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-blue-100/60">
                No story path available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComicBookDisplay;










// import React from "react";
// import { BookOpen, Camera, Info, ChevronRight } from "lucide-react";

// interface Character {
//   name?: string;
//   description?: string;
// }

// interface Scene {
//   description?: string;
//   visualPrompt?: string;
//   imageUrl?: string;
// }

// interface GeneratedImage {
//   url: string;
//   style: string;
// }

// export interface Visual {
//   id: string;
//   description: string;
//   originalPrompt: string;
//   generatedImages: GeneratedImage[];
// }

// interface Story {
//   title?: string;
//   synopsis?: string;
//   characters?: Character[];
//   scenes?: Scene[];
// }

// interface ComicBookDisplayProps {
//   story?: Story;
//   visuals?: Visual[];
// }

// const defaultStory: Story = {
//   title: "Untitled Story",
//   synopsis: "No synopsis available",
//   characters: [],
//   scenes: [],
// };

// const defaultVisuals: Visual[] = [];

// const ComicBookDisplay: React.FC<ComicBookDisplayProps> = ({
//   story = defaultStory,
//   visuals = defaultVisuals,
// }) => {
//   const getComicBookImageForScene = (index: number) => {
//     const flatVisuals = Array.isArray(visuals[0]) ? visuals[0] : visuals;
//     const sceneId = `scene${index + 1}`;
//     const visual = flatVisuals.find((v) => v.id === sceneId);
    
//     if (visual) {
//       const comicImage = visual.generatedImages.find((img: any) => img.style === "Comic Book");
//       return comicImage || null;
//     }
//     return null;
//   };

//   const safeStory = story || defaultStory;

//   return (
//     <div className="w-full">
//       {/* Story Header */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
//           {safeStory.title}
//         </h2>
//         <p className="text-blue-100/80 text-sm mb-4 text-center max-w-2xl mx-auto leading-relaxed">
//           {safeStory.synopsis}
//         </p>
//       </div>

//       {/* Character Cards */}
//       {safeStory.characters && safeStory.characters.length > 0 && (
//         <div className="mb-8">
//           <h3 className="text-lg font-medium mb-3 flex items-center">
//             <BookOpen className="mr-2 text-purple-300" size={18} />
//             <span>Cast of Characters</span>
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//             {safeStory.characters.map((character, index) => (
//               <div
//                 key={index}
//                 className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 hover:from-purple-900/30 hover:to-blue-900/30 transition-all duration-300"
//               >
//                 <h4 className="text-base font-medium mb-1 text-purple-200">
//                   {character.name || "Unnamed Character"}
//                 </h4>
//                 <p className="text-blue-100/70 text-sm line-clamp-2">
//                   {character.description || "No description available"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Comic Scenes */}
//       <div className="mb-8">
//         <h3 className="text-lg font-medium mb-4 flex items-center">
//           <BookOpen className="mr-2 text-blue-300" size={18} />
//           <span>Story Panels</span>
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {safeStory.scenes && safeStory.scenes.length > 0 ? (
//             safeStory.scenes.map((scene, index) => {
//               const comicImage = getComicBookImageForScene(index);
//               return (
//                 <div key={index} className="bg-gradient-to-br from-purple-900/10 to-blue-900/10 rounded-lg overflow-hidden border border-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
//                   <div className="p-3 bg-purple-900/20 border-b border-purple-500/20 flex items-center justify-between">
//                     <span className="text-sm font-medium text-purple-200">Scene {index + 1}</span>
//                     <div className="px-2 py-1 rounded-full bg-purple-500/20 text-xs text-purple-200">
//                       {index === 0 ? "Opening" : index === safeStory.scenes!.length - 1 ? "Finale" : "Act " + (index + 1)}
//                     </div>
//                   </div>

//                   <div className="aspect-[16/9] bg-purple-900/10 relative overflow-hidden">
//                     {comicImage ? (
//                       <img
//                         src={comicImage.url}
//                         alt={scene.visualPrompt || 'Scene'}
//                         className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                         onError={(e) => {
//                           const target = e.target as HTMLImageElement;
//                           target.onerror = null;
//                           target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzJhMTAzMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
//                         }}
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center bg-purple-900/20">
//                         <Camera className="text-purple-300/40" size={32} />
//                       </div>
//                     )}
//                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
//                       <p className="text-white/90 text-sm line-clamp-2">
//                         {scene.visualPrompt || "No description available"}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="p-3 bg-purple-900/10 border-t border-purple-500/10">
//                     <p className="text-2xl text-blue-200/60 italic ">
//                       {scene.description || "No visual prompt available"}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="col-span-2 text-center py-8 text-blue-100/60">
//               No scenes available for this story
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Story Timeline */}
//       <div className="rounded-xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-900/5 to-purple-900/5">
//         <div className="p-3 bg-blue-900/20 flex items-center">
//           <Info className="mr-2 text-blue-300" size={16} />
//           <h3 className="text-base font-medium">Story Timeline</h3>
//         </div>
//         <div className="p-4">
//           {safeStory.scenes && safeStory.scenes.length > 0 ? (
//             <div className="space-y-3">
//               {safeStory.scenes.map((scene, index) => (
//                 <div key={index} className="flex items-center space-x-3">
//                   <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
//                     index === 0 ? "bg-purple-500" : "bg-purple-900/50 border border-purple-500/30"
//                   }`}>
//                     <span className="text-xs">{index + 1}</span>
//                   </div>
//                   <ChevronRight size={14} className="text-purple-500/50" />
//                   <p className="text-sm flex-1 text-blue-100/80 line-clamp-1">
//                     {scene.description || "No description available"}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-4 text-blue-100/60">
//               No story timeline available
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComicBookDisplay;