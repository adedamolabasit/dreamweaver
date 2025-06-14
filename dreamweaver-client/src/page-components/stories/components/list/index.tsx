import { FC, useEffect, useState } from "react";
import {
  BookOpen,
  Heart,
  Users,
  ImageOff,
  BadgeCheck,
  Globe,
  ArrowRight,
  X,
} from "lucide-react";
import { ProductionResponse } from "../../types";
import { useNavigate } from "react-router-dom";
import DreamLoader from "../../../../components/Loader/DreamLoader";
import { useAccount } from "wagmi";
import { useToast } from "../../../../components/Toast";
import { useStoryClient } from "../../../../client/storyClient";
import axios from "axios";
import { extractMintingParams } from "../../functions";
import apiClient from "../../../../api/apiClient";
import { fetchLicenseTerms } from "../../../../api/authApi";

interface StoryParams {
  production: ProductionResponse | undefined;
  isFetching: boolean;
}

export const StoryListCard: FC<StoryParams> = ({ production, isFetching }) => {
  const navigate = useNavigate();
  const [cid, setCid] = useState<string>();
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const { story, analysis, visuals, ipRegistration } = production!;
  const { address, isConnected } = useAccount();
  const client = useStoryClient();

  const { showInfo } = useToast();

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

  const handleReadStory = (productId: string) => {
    if (!productId) return;
    const currentScroll = window.scrollY;
    sessionStorage.setItem("scrollPosition", currentScroll.toString());
    navigate(`/${productId}`);
  };

  const handleshowLicenseModal = () => {
    if (!isConnected && address) {
      showInfo("Connect your wallet");
      return;
    }

    setShowLicenseModal((prevState) => !prevState);
  };

  useEffect(() => {
    const coverImage = getFirstSceneComicImage();
    if (coverImage) setCid(coverImage.ipfsHash);
  }, []);

  const transformLicenseData = (ipList: any[]) => {
    return ipList.map((item) => {
      const pil = item.license?.pilFlavors;

      let type = "Unknown";
      let terms = "N/A";
      let price = item.fee === 0 ? "Free" : `${item.fee} ETH`;
      let duration = "Permanent"; // assume based on your schema

      if (pil?.includes("nonCommercial")) {
        type = "Personal Use";
        terms = "For non-commercial reading and sharing";
      } else if (pil?.includes("commercial")) {
        type = "Commercial License";
        terms = "For businesses and publishers";
      }

      return {
        id: item._id,
        type,
        terms,
        price,
        duration,
        licenseId: item.licenseTermsIds,
        licesorIpId: item.ipId,
        fee: item.fee,
      };
    });
  };

  const ipLicenses = transformLicenseData(production?.ipRegistration?.ip || []);

  const handleMintLicense = async (license: any) => {
    const licenseResponse = await fetchLicenseTerms(license.licenseId);

    console.log(licenseResponse, "ll");

    const params = extractMintingParams(licenseResponse);

    console.log(params, "pp");

    const response = await client?.license?.mintLicenseTokens({
      licenseTermsId: license.licenseId,
      licensorIpId: license.licesorIpId,
      receiver: address,
      amount: 1,
      maxMintingFee: params ? BigInt(params.mintingFee) : BigInt(0),
      maxRevenueShare: 100,
    });
    console.log("Simulated transaction:", response);
  };

  if (isFetching)
    return <DreamLoader message="Fetching stories..." size="lg" />;

  return (
    <div className="w-full bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/20 overflow-hidden">
      {/* Header with title and license status */}
      <div className="p-5 pb-0 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white">{story?.title}</h2>
          {ipRegistration?.ip[0]?.status === "registered" && (
            <div className="flex items-center gap-1 mt-1 text-sm text-green-400">
              <BadgeCheck size={16} />
              <span>Licensed Content</span>
              <Globe size={16} className="ml-2" />
              <span>View License</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-sm">
            Dream Journal
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-5 flex flex-col md:flex-row gap-6">
        {/* Cover image */}
        <div className="w-full md:w-1/3 aspect-[3/4] rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 overflow-hidden">
          {cid ? (
            <img
              src={`https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${cid}?pinataGatewayToken=BmZjUB5nCCxIeDdY6v_uM2RJhyqwnTKtGFnahd_IsPXD9He4pVRxPOcSvDfCpYwM`}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-white/50">
              <ImageOff size={48} />
            </div>
          )}
        </div>

        {/* Story details */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-blue-200/80">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {story?.characters?.length} Characters
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={14} />
              {story?.scenes?.length} Scenes
            </span>
            <span className="flex items-center gap-1 text-pink-300">
              <Heart size={14} />
              Dream Story
            </span>
          </div>

          <p className="text-blue-100/80 mb-4 line-clamp-3">
            {story?.synopsis || "No synopsis available"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {analysis?.emotionalTone.map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-blue-900/30 text-blue-200/80 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleReadStory(production?._id as string)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
            >
              <BookOpen size={16} />
              Read Story
              <ArrowRight size={16} />
            </button>
            {ipRegistration?.ip[0]?.status === "registered" && (
              <div className="relative group inline-block">
                <button
                  onClick={handleshowLicenseModal}
                  disabled={!isConnected}
                  className="border border-purple-500/50 hover:border-purple-400/80 text-purple-300 hover:text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors  disabled:cursor-not-allowed"
                >
                  <BadgeCheck size={16} />
                  License Options
                </button>

                {!isConnected && (
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    Connect your wallet to proceed
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* License Modal */}
      {showLicenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="relative max-w-md w-full bg-gray-900 rounded-xl border border-white/20 overflow-hidden">
            <button
              onClick={handleshowLicenseModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <BadgeCheck size={24} className="text-green-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">
                    License Options
                  </h2>
                  <p className="text-gray-400">{story?.title}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Registered Licenses
                </h3>
                <div className="space-y-3">
                  {ipLicenses.map((license) => (
                    <div
                      key={license.id}
                      className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-medium">
                          {license.type}
                        </span>
                        <span className="text-sm text-purple-400">
                          {license.price}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        {license.terms}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Duration: {license.duration}
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={() => handleMintLicense(license)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Mint License
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-sm text-gray-400 mt-6">
                <p>All licenses are secured on the blockchain</p>
                <button className="text-purple-400 hover:text-purple-300 mt-2">
                  View license terms
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
