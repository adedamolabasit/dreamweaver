import { useState } from "react";
import { StoryView } from "./StroryView";
import { StoryboardTimeline } from "../StroyboardTimeline";
import { useGetAllProductions } from "../../hooks/useProduction";
import VoiceJournal from "../VoiceJournal";

export const StoryFeeds = () => {
  const {
    data: productions,
    isLoading: productionLoading,
    refetch: refetchProduction,
  } = useGetAllProductions();

  const [viewStory, setViewStory] = useState(false);
  const [storyId, setStoryId] = useState<string>();

  const handleActiveStory = (id: string, viewStory: boolean) => {
    setStoryId(id);
    setViewStory(viewStory);
  };

  const publishedProductions = productions?.filter(
    (production) => production.publication === "published"
  );

  return (
    <div className="flex flex-col gap-6 items-center max-w-4xl mx-auto h-full p-4">
      {viewStory && storyId ? (
        <StoryView id={storyId} handleActiveStory={handleActiveStory} />
      ) : productionLoading ? (
        <p>Loading stories...</p>
      ) : publishedProductions?.length === 0 ? (
        <p className="text-gray-400">No published stories available.</p>
      ) : (
        publishedProductions?.map((production) => (
          <StoryboardTimeline
            key={production._id}
            production={production}
            handleActiveStory={handleActiveStory}
          />
        ))
      )}
    </div>
  );
};
