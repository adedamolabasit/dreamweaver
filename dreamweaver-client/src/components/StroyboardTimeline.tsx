import { FC, useState } from "react";
import { BookOpen, Heart, Users, ImageOff } from "lucide-react";
import { ProductionResponse } from "../types/types";

interface StoryParams {
  production: ProductionResponse | undefined;
}

export const StoryboardTimeline: FC<StoryParams> = ({ production }) => {
  const [imageError, setImageError] = useState(false);

  const { story, analysis, visuals } = production!;
  console.log(production, "production-");
  const getFirstSceneComicImage = (): any => {
    if (visuals) {
      const flatVisuals = Array.isArray(visuals) ? visuals[0] : visuals;
      return (
        flatVisuals.generatedImages.find((img: any) =>
          img.style.toLowerCase().includes("comic")
        ) || null
      );
    }
    return null;
  };

  const coverImage = getFirstSceneComicImage();

  return (
    <div className="w-full space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200">
              {story?.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-200/70">
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{story?.characters?.length} Characters</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>{story?.scenes?.length} Scenes</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={14} className="text-pink-500" />
                <span>Dream Story</span>
              </div>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm whitespace-nowrap">
            Dream Journal
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row md: items-start h-auto md:h-72 gap-6 mb-4 ">
          <div className="aspect-video h-full rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 flex items-center justify-center w-full md:w-1/2 overflow-hidden">
            {!imageError ? (
              <img
                src={coverImage.url}
                alt="Cover Image"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white opacity-70">
                <ImageOff className="w-12 h-12 mb-2" />
                <p className="text-sm font-medium">Image Not Available</p>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/2 gap-4 h-full overflow-auto no-scrollbar">
            {story?.characters?.map((character, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/10"
              >
                <h4 className="text-sm font-medium mb-1 text-blue-200">
                  {character.name}
                </h4>
                <p className="text-xs text-blue-200/70 line-clamp-2">
                  {character.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-100/80 text-sm leading-relaxed mb-4">
          {story?.synopsis}
        </p>

        <div className="flex flex-wrap gap-2">
          {analysis?.emotionalTone.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-200/80 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
