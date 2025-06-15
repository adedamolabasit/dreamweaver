import { useState } from "react";
import { ProductionResponse } from "../../types";
import { useGetAllProductions } from "../../../../hooks/useProduction";
import DreamLoader from "../../../../components/Loader/DreamLoader";
import { DashboardLayout } from "../../../../components/Layout";

export const ArtGallery = () => {
  const { data: productions, isFetching } = useGetAllProductions();
  const [selectedArt, setSelectedArt] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const publishedProductions = productions?.filter(
    (production: ProductionResponse) => production.publication === "published"
  );

  const extractIPFSHashes = (data: ProductionResponse[]) => {
    const result = [] as any;

    data?.forEach((item) => {
      if (item.visuals && Array.isArray(item.visuals)) {
        item.visuals.forEach((visual) => {
          if (visual.generatedImages && Array.isArray(visual.generatedImages)) {
            visual.generatedImages.forEach((generatedImage: any) => {
              result.push({
                _id: item._id,
                id: visual.id,
                description: visual.originalPrompt,
                ipfsHash: generatedImage.ipfsHash,
                publishStatus: item?.ipRegistration?.ip[0]?.status,
                createdAt: item.createdAt,
                style: generatedImage.style,
              });
            });
          }
        });
      }
    });

    return result;
  };

  const ipfsHashesList = extractIPFSHashes(publishedProductions!);

  const openModal = (art: any) => {
    setSelectedArt(art);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArt(null);
  };

  const downloadImage = async (imageUrl: string, artId: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `art-${artId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (isFetching)
    return (
      <DashboardLayout>
        <DreamLoader message="Fetching Arts..." size="lg" />;
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto  px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Art Gallery</h1>

        {ipfsHashesList.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No published artworks found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ipfsHashesList.map((art: any) => {
              const imageUrl = `https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${art.ipfsHash}?pinataGatewayToken=BmZjUB5nCCxIeDdY6v_uM2RJhyqwnTKtGFnahd_IsPXD9He4pVRxPOcSvDfCpYwM`;

              return (
                <div key={`${art._id}-${art.id}`} className="group relative">
                  <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200 h-full flex flex-col">
                    <div
                      className="aspect-[4/3] overflow-hidden relative flex-shrink-0 cursor-zoom-in"
                      onClick={() => openModal(art)}
                    >
                      <img
                        src={imageUrl}
                        alt={art.description || "Art image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(imageUrl, art._id);
                          }}
                          className="bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors duration-200"
                          title="Download"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(art);
                          }}
                          className="bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors duration-200"
                          title="View Fullscreen"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2 mb-2">
                          {art.description || "Untitled"}
                        </h3>
                      </div>

                      <div className="flex justify-between items-center mt-auto pt-2">
                        <span className="text-xs text-gray-400">
                          {art.createdAt
                            ? new Date(art.createdAt).toLocaleDateString()
                            : "Unknown date"}
                        </span>

                        {art.publishStatus === "registered" ? (
                          <span className="flex items-center gap-1 text-green-400 text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            IP Registered
                          </span>
                        ) : (
                          <span className="text-xs text-yellow-400">
                            IP Not Registered
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Image View Modal */}
        {isModalOpen && selectedArt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="relative max-w-6xl w-full max-h-[90vh] bg-gray-900 rounded-xl border border-white/20 overflow-hidden flex flex-col">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                <div className="lg:w-2/3 h-64 lg:h-auto overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={`https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${selectedArt.ipfsHash}?pinataGatewayToken=BmZjUB5nCCxIeDdY6v_uM2RJhyqwnTKtGFnahd_IsPXD9He4pVRxPOcSvDfCpYwM`}
                    alt={selectedArt.description || "Art image"}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="lg:w-1/3 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-2">
                        Art Details
                      </h2>
                      <div className="flex items-center gap-2 mb-4">
                        {selectedArt.publishStatus === "verified" ? (
                          <span className="flex items-center gap-1 text-green-400 text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            IP Registered
                          </span>
                        ) : (
                          <span className="text-sm text-yellow-400">
                            IP Not Registered
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {selectedArt.createdAt
                            ? new Date(
                                selectedArt.createdAt
                              ).toLocaleDateString()
                            : "Unknown date"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        Description
                      </h3>
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {selectedArt.description || "No description available"}
                      </p>
                    </div>

                    {selectedArt.style && (
                      <div>
                        <h3 className="font-semibold text-white mb-1">Style</h3>
                        <p className="text-gray-300">{selectedArt.style}</p>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() =>
                          downloadImage(
                            `https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${selectedArt.ipfsHash}?pinataGatewayToken=BmZjUB5nCCxIeDdY6v_uM2RJhyqwnTKtGFnahd_IsPXD9He4pVRxPOcSvDfCpYwM`,
                            selectedArt._id
                          )
                        }
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="7 10 12 15 17 10"></polyline>
                          <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
