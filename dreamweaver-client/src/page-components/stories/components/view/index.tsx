import { useState } from "react";
import { useGetProductionById } from "../../../../hooks/useProduction";
import { Sparkles, Scroll, Wand2, ArrowLeft } from "lucide-react";
import ComicBookDisplay from "./ComicBookDispLay";
import { Visual } from "../../types";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../../components/Layout";
import { useNavigate } from "react-router-dom";
import DreamLoader from "../../../../components/Loader/DreamLoader";

export const StoryView = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [activeView, setActiveView] = useState<"story">("story");
  const { data: production, isLoading } = useGetProductionById(id as string);

  const getComicBookImageForScene = (index: number) => {
    if (!production?.visuals) return null;

    const visuals = Array.isArray(production.visuals)
      ? production.visuals
      : [production.visuals];
    const sceneId = `scene${index + 1}`;

    const visual = visuals.find((v: any) => v.id === sceneId);
    if (!visual) return null;

    return visual.generatedImages?.find(
      (img: any) => img.style === "Comic Book"
    );
  };

  const goBackToStories = () => {
    navigate("/stories");

    setTimeout(() => {
      const scrollPos = sessionStorage.getItem("scrollPosition");

      if (scrollPos !== null) {
        window.scrollTo({ top: parseInt(scrollPos, 10), behavior: "smooth" });
      } else {
        const storiesSection = document.getElementById("stories");
        if (storiesSection) {
          storiesSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 100);
  };

  if (!id || isLoading)
    return (
      <DashboardLayout>
        <DreamLoader message="Fetching story..." size="lg" />;
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto h-full p-4">
        <div className="w-full flex justify-between items-center mb-6">
          <button
            onClick={goBackToStories}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        <div className="w-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 mb-12">
          <h3 className="text-xl font-medium mb-4">Storyboard Timeline</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {production?.story?.scenes
              ? production.story.scenes.map((scene: any, i: number) => {
                  const comicImage = getComicBookImageForScene(i);
                  return (
                    <div
                      key={i}
                      className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-white/10 flex flex-col items-center justify-center overflow-hidden relative hover:border-white/20 transition-all duration-300 cursor-pointer group"
                    >
                      {comicImage?.url && (
                        <img
                          src={comicImage.url}
                          alt={`Scene ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
                        <div className="w-full h-full bg-gradient-to-br from-purple-800/50 to-blue-800/50" />
                      </div>
                      <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md z-10">
                        Scene {i + 1}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10">
                        <p className="text-white/90 text-xs line-clamp-2">
                          {scene.description.substring(0, 60)}...
                        </p>
                      </div>
                    </div>
                  );
                })
              : [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/20 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all duration-300"
                  >
                    <p className="text-blue-200/50 text-sm">Scene {i + 1}</p>
                  </div>
                ))}
          </div>
        </div>

        {
          <div className="w-full mb-10">
            <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-purple-500/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  {["story"].map((view) => {
                    const isActive = activeView === view;
                    const Icon =
                      view === "story"
                        ? Scroll
                        : view === "archetypes"
                        ? Sparkles
                        : Wand2;
                    return (
                      <button
                        key={view}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          isActive
                            ? "bg-purple-600/80"
                            : "bg-purple-900/50 hover:bg-purple-800/60"
                        } transition-colors`}
                        onClick={() => setActiveView(view as typeof activeView)}
                      >
                        <div className="flex items-center gap-2">
                          <Icon size={14} />
                          <span className="capitalize">{view}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-950/30 to-purple-950/30 rounded-lg border border-blue-500/10">
                {activeView === "story" && production && (
                  <ComicBookDisplay
                    story={production.story}
                    visuals={
                      production.visuals
                        ? ([production.visuals] as Visual[])
                        : undefined
                    }
                  />
                )}
              </div>
            </div>
          </div>
        }
      </div>
    </DashboardLayout>
  );
};
