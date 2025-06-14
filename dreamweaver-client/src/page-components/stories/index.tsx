import { StoryListCard } from "./components/list";
import { DashboardLayout } from "../../components/Layout";
import { useGetAllProductions } from "../../hooks/useProduction";
import { ProductionResponse } from "./types";

function Stories() {
  const {
    data: productions,
    isFetching,
    refetch: refetchProduction,
  } = useGetAllProductions();

  const handleRefetch = () => {
    refetchProduction();
  };

  const publishedProductions = productions?.filter(
    (production: ProductionResponse) => production.publication === "published"
  );

  return (
    <DashboardLayout>
      {publishedProductions?.map((production: ProductionResponse) => (
        <div className="flex flex-col gap-6 items-center max-w-4xl mx-auto h-full p-4">
          <StoryListCard
            key={production._id}
            production={production}
            isFetching={isFetching}
            handleRefetch={handleRefetch}
          />
        </div>
      ))}
    </DashboardLayout>
  );
}

export default Stories;
