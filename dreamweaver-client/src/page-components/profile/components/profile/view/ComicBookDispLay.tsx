import React from "react";
import { BookOpen, Camera, Info } from "lucide-react";
import {
  Visual,
  Story,
  ComicBookDisplayProps,
} from "../../../../stories/types";

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
    const flatVisuals = Array.isArray(visuals[0]) ? visuals[0] : visuals;

    const sceneId = `scene${index + 1}`;

    const visual = flatVisuals.find((v) => {
      return v.id === sceneId;
    });

    if (visual) {
      const comicImage = visual.generatedImages.find((img: any) => {
        return img.style === "Comic Book";
      });
      return comicImage || null;
    }
    return null;
  };

  const safeStory = story || defaultStory;

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-center">
          {safeStory.title}
        </h2>
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
                <div
                  key={index}
                  className="bg-purple-900/10 rounded-lg overflow-hidden border border-purple-500/20"
                >
                  <div className="p-4 bg-purple-900/20 border-b border-purple-500/20">
                    <h4 className="text-lg font-medium text-purple-200">
                      Scene {index + 1}
                    </h4>
                    <p className="text-blue-100/80 md:text-2xl mt-1">
                      {scene.description || "No scene description"}
                    </p>
                  </div>

                  <div className="aspect-[4/3] bg-purple-900/10">
                    {comicImage ? (
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-purple-900/10 to-blue-900/10 bg-purple-900/20">
                        {comicImage?.url && (
                          <img
                            src={`https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${comicImage.ipfsHash}?pinataGatewayToken=BmZjUB5nCCxIeDdY6v_uM2RJhyqwnTKtGFnahd_IsPXD9He4pVRxPOcSvDfCpYwM`}
                            alt={`${
                              scene.visualPrompt || "Scene"
                            } - Comic Book`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src =
                                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzJhMTAzMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxMCI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=";
                            }}
                          />
                        )}

                        <div className="flex">
                          <div className="absolute top-2 right-2 left-2  text-white text-xs px-2 py-1 rounded">
                            <div className="">DreamWeaver</div>
                          </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                          <p className="text-white/90 text-lg line-clamp-2">
                            {scene.visualPrompt || "No description available"}
                          </p>
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
                        {scene.description?.substring(0, 100) ||
                          "No description available"}
                        ...
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
