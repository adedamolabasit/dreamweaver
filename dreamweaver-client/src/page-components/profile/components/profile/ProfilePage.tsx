// React & External Imports
import { useEffect, useState, useRef } from "react";
import { useAccount, useBalance } from "wagmi";
import {
  Wallet,
  Edit3,
  BookOpen,
  FileText,
  Image,
  Calendar,
  Eye,
  EyeOff,
  DollarSign,
  Upload,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  Plus,
  Coins,
  ArrowDownToLine,
} from "lucide-react";

// Custom Hook Imports
import { useGetAllUsersProductions } from "../../../../hooks/useProduction";
import { useGetAllUsersJournals } from "../../../../hooks/useJournal.";
import { useGetProfile } from "../../../../hooks/useAuth";
import { useUpdateProduction } from "../../../../hooks/useProduction";

// Component Imports
import DreamLoader from "../../../../components/Loader/DreamLoader";
import { DashboardLayout } from "../../../../components/Layout";
import { StatCard } from "../card/StatCard";
import { useToast } from "../../../../components/Toast";
import { StoryView } from "./view/StoryView";

// Action Imports
import { RegisterLicense } from "../actions/RegisterLicense";
import { RegisterIpAsset } from "../actions/RegisterIpAsset";
import ClaimRevenue from "../actions/claimRevenue";

// Type Imports
import { ProductionResponse } from "../../types";

export const ProfilePage = () => {
  // State Management
  const [activeTab, setActiveTab] = useState("stories");
  const [showStory, setShowStory] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showAttachLicenseModal, setShowAttachLicenseModal] = useState(false);
  const [revenueModal, setShowRevenueModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<
    ProductionResponse | undefined
  >();
  const [productId, setProductId] = useState<string>();
  const [showClaimable, setShowClaimable] = useState(false);

  // Refs
  const hasAuthenticatedRef = useRef(false);

  // Wallet & Auth
  const { isConnected, address } = useAccount();
  const { data } = useBalance({ address });

  // Data Fetching
  const { data: usersStory, refetch: refetchUserStory } =
    useGetAllUsersProductions();
  const { data: usersJournal } = useGetAllUsersJournals();
  const { data: profile } = useGetProfile(address as string);
  const { mutate: updateProduction } = useUpdateProduction();

  // Derived Data
  const registeredLicense = profile?.user?.license?.registeredLicense;
  const profileData = {
    username: profile?.user?.username,
    walletAddress: profile?.user?.walletAddress,
    totalEarnings: 12847.32,
    monthlyGrowth: 18.5,
    amount: `${data?.formatted} ${data?.symbol}`,
  };

  // Toast
  const { showError, showDream } = useToast();

  // Tab Configuration
  const tabs = [
    { id: "stories", label: "Stories", icon: <FileText size={18} /> },
    { id: "gallery", label: "Gallery", icon: <Image size={18} /> },
    { id: "journal", label: "Journal", icon: <BookOpen size={18} /> },
  ];

  // Utility Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registered":
        return "text-green-400 bg-green-500/20";
      case "pending":
        return "text-yellow-400 bg-yellow-500/20";
      case "rejected":
        return "text-red-400 bg-red-500/20";
      case "published":
        return "text-blue-400 bg-blue-500/20";
      case "draft":
        return "text-gray-400 bg-gray-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "registered":
        return <CheckCircle size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "rejected":
        return <AlertCircle size={14} />;
      case "published":
        return <Eye size={14} />;
      case "draft":
        return <EyeOff size={14} />;
      default:
        return <AlertCircle size={14} />;
    }
  };

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
                publishStatus: item.publication,
                licenses: registeredLicense || [],
              });
            });
          }
        });
      }
    });
    return result;
  };

  const ipfsHashesList = extractIPFSHashes(usersStory as ProductionResponse[]);

  // Event Handlers
  const handleClaimRevenue = async () => {
    try {
      showDream("Revenue claimed successfully!");
      setShowClaimable(false);
    } catch (error) {
      console.error("Claim failed:", error);
      showError("Failed to claim revenue. Please try again.");
    }
  };

  const handleReadStory = (productId: string) => {
    setProductId(productId), setShowStory((prevState) => !prevState);
  };

  const handleRegisterIP = (story: ProductionResponse) => {
    setSelectedStory(story);
    setShowRegistrationModal(true);
  };

  const handleAttachLicense = (story: ProductionResponse) => {
    setSelectedStory(story);
    setShowLicenseModal(true);
  };

  const handleRegisterLisense = () => {
    setShowLicenseModal(true);
  };

  const handleRevenueclaim = (story: ProductionResponse) => {
    setSelectedStory(story);
    setShowRevenueModal(true);
  };

  const handleChangePublication = async (
    storyId: string,
    newStatus: string
  ) => {
    const obj = { publication: newStatus };
    updateProduction(
      { id: storyId as string, obj },
      {
        onSuccess: (data) => {
          console.log(data, "ooo");
          console.log("success");
        },
        onError: (err) => console.error("Update error:", err),
      }
    );
  };

  // Effects
  useEffect(() => {
    if (isConnected) {
      hasAuthenticatedRef.current = true;
      if (hasAuthenticatedRef.current === true) {
        refetchUserStory();
      }
    }
  });

  // Loading States
  if (!profile || !usersStory || !usersJournal) {
    if (!isConnected || !address) {
      return (
        <div className="h-80 flex flex-col items-center justify-center bg-purple-900/10 rounded-xl border border-purple-500/10 p-6 text-center mt-28">
          <Wallet className="text-purple-400 mb-3" size={24} />
          <p className="text-purple-200/80 mb-4">
            Connect your wallet to see profile
          </p>
        </div>
      );
    }

    return (
      <DashboardLayout>
        <DreamLoader message="Fetching Arts..." size="lg" />
      </DashboardLayout>
    );
  }

  return (
    <div>
      {showStory ? (
        <StoryView
          productId={productId as string}
          setShowStory={setShowStory}
        />
      ) : (
        <div className="flex flex-col items-center w-full px-4 md:px-6 lg:max-w-4xl lg:mx-auto">
          <div className="w-full bg-gradient-to-r from-transparent via-blue-300/30 to-transparent rounded-2xl p-4 md:p-8 mb-6 md:mb-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
              <div className="flex-1 w-full space-y-6 px-4 py-6">
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-white">
                      {profileData.username}
                    </h1>
                    <button
                      className="text-purple-400 hover:text-purple-300 transition"
                      aria-label="Edit profile"
                    >
                      <Edit3 size={20} />
                    </button>
                  </div>
                  <button
                    onClick={handleRegisterLisense}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  >
                    <Plus size={18} />
                    Create License
                  </button>
                </div>

                {/* Address & Balance */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-lg hover:bg-gray-800/80 transition-colors">
                    <div className="bg-purple-500/20 p-1 rounded-full">
                      <Wallet size={16} className="text-purple-400" />
                    </div>
                    <span className="font-mono text-gray-300 truncate max-w-[180px]">
                      {profileData.walletAddress}
                    </span>
                    <button className="text-gray-400 hover:text-gray-300 transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-lg hover:bg-gray-800/80 transition-colors">
                    <div className="bg-green-500/20 p-1 rounded-full">
                      <DollarSign size={16} className="text-green-400" />
                    </div>
                    <span className="font-mono text-gray-300">
                      {parseInt(profileData.amount).toFixed(3)}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    icon={<BookOpen size={18} />}
                    label="Total Stories"
                    value={3}
                    color="emerald"
                  />
                  <StatCard
                    icon={<FileText size={18} />}
                    label="Total Journals"
                    value={6}
                    color="sky"
                  />
                  <StatCard
                    icon={<Image size={18} />}
                    label="Total Arts"
                    value={7}
                    color="indigo"
                  />
                  <div className="relative group rounded-xl p-5 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border border-yellow-400/30 hover:border-yellow-400/50 transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                          <Coins size={20} className="text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-medium text-yellow-100">
                            Claimable Revenue
                          </h3>
                          <div className="text-2xl font-bold text-white mt-1">
                            {showClaimable ? formatCurrency(4) : "••••"}
                          </div>
                        </div>
                      </div>

                      {showClaimable ? (
                        <button
                          onClick={handleClaimRevenue}
                          className="absolute bottom-4 right-4 bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1"
                        >
                          <ArrowDownToLine size={16} />
                          Claim
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowClaimable(true)}
                          className="absolute bottom-4 right-4 bg-yellow-600/80 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1"
                        >
                          <Eye size={16} />
                          Reveal
                        </button>
                      )}
                    </div>
                    <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 z-40 md:hidden">
            <div className="flex justify-around items-center p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  <span className="text-xs mt-1">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:block w-full rounded-2xl mb-6 md:mb-8 border border-white/20">
            <div className="flex flex-wrap border-b border-white/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 md:px-6 md:py-4 font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-purple-400 border-b-2 border-purple-400 bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full pb-20 md:pb-0">
            <div className="rounded-2xl mb-6 md:mb-8 border border-white/20">
              <div className="p-4 md:p-6">
                {activeTab === "journal" && (
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        Journal Entries
                      </h2>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base">
                        <Edit3 size={14} className="md:size-4" />
                        New Entry
                      </button>
                    </div>
                    <div className="grid gap-3 md:gap-4">
                      {usersJournal?.map((entry) => (
                        <div
                          key={entry._id}
                          className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-200"
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2 md:mb-3">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                                journal
                              </span>
                              <span>{entry.createdAt}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {entry.transcript}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "stories" && (
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        My Stories
                      </h2>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base">
                        <FileText size={14} className="md:size-4" />
                        New Story
                      </button>
                    </div>

                    <div className="grid gap-4 md:gap-6">
                      {usersStory?.map((story) => {
                        const ipStatus = story.ipRegistration?.ip?.[0]?.status;

                        return (
                          <div
                            key={story._id}
                            className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-200"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                              <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">
                                  {story.story?.title}
                                </h3>
                                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                                  {story.story?.synopsis}
                                </p>
                              </div>

                              <div className="text-right">
                                <div className="text-base md:text-lg font-bold text-green-400 mb-1">
                                  {formatCurrency(10)}
                                </div>
                                <div className="text-xs md:text-sm text-gray-400">
                                  Earnings
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs md:text-sm">
                              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                                <div className="flex items-center gap-1">
                                  <Calendar size={12} className="md:size-4" />
                                </div>

                                <div
                                  className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(
                                    ipStatus as string
                                  )}`}
                                >
                                  {getStatusIcon(ipStatus as string)}
                                  IP: {ipStatus || "not registered"}
                                </div>

                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-700 text-white">
                                  {getStatusIcon(story.publication)}
                                  <select
                                    className="bg-transparent text-white outline-none text-xs md:text-sm"
                                    value={story.publication}
                                    onChange={(e) =>
                                      handleChangePublication(
                                        story._id,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                  </select>
                                </div>
                              </div>

                              <div className="flex gap-4">
                                <button
                                  className={`p-1.5 px-3 md:p-2 md:px-4 rounded-lg font-medium text-xs md:text-sm ${"border border-yellow-600 text-white"}`}
                                  onClick={() => handleRevenueclaim(story)}
                                >
                                  Claim Revenue
                                </button>

                                <button
                                  className={`p-1.5 px-3 md:p-2 md:px-4 rounded-lg font-medium text-xs md:text-sm ${"border border-purple-600 text-white"}`}
                                  onClick={() =>
                                    handleReadStory(story._id as string)
                                  }
                                >
                                  View Your Story
                                </button>

                                {story?.ipRegistration?.ip?.length! > 0 ? (
                                  <button
                                    className="p-1.5 px-3 md:p-2 md:px-4 rounded-lg font-medium text-xs md:text-sm bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => handleAttachLicense(story)}
                                  >
                                    Attach License
                                  </button>
                                ) : (
                                  <button
                                    className="p-1.5 px-3 md:p-2 md:px-4 rounded-lg font-medium text-xs md:text-sm bg-blue-600 hover:bg-blue-700 text-white"
                                    onClick={() => handleRegisterIP(story)}
                                  >
                                    Register IP
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "gallery" && (
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        Art Gallery
                      </h2>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base">
                        <Upload size={14} className="md:size-4" />
                        Upload Image
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
                      {ipfsHashesList.map((art: any) => {
                        const imageUrl = `https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${art.ipfsHash}?pinataGatewayToken=BmZjUB5nCCxIeDdY6v_uM2RJhyqwnTKtGFnahd_IsPXD9He4pVRxPOcSvDfCpYwM`;

                        const downloadImage = async () => {
                          try {
                            const response = await fetch(imageUrl);
                            const blob = await response.blob();
                            const downloadUrl =
                              window.URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = downloadUrl;
                            link.download = `art-${art._id}.jpg`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            window.URL.revokeObjectURL(downloadUrl);
                          } catch (error) {
                            console.error("Error downloading image:", error);
                          }
                        };

                        const enlargeImage = () => {
                          window.open(imageUrl, "_blank");
                        };

                        return (
                          <div key={art._id} className="group relative">
                            <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-200">
                              <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                  src={imageUrl}
                                  alt={art.description || "Art image"}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />

                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                                  <button
                                    onClick={downloadImage}
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
                                      <line
                                        x1="12"
                                        y1="15"
                                        x2="12"
                                        y2="3"
                                      ></line>
                                    </svg>
                                  </button>

                                  <button
                                    onClick={enlargeImage}
                                    className="bg-white/90 hover:bg-white text-black p-2 rounded-full transition-colors duration-200"
                                    title="Enlarge"
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
                                      <circle cx="11" cy="11" r="8"></circle>
                                      <line
                                        x1="21"
                                        y1="21"
                                        x2="16.65"
                                        y2="16.65"
                                      ></line>
                                      <line
                                        x1="11"
                                        y1="8"
                                        x2="11"
                                        y2="14"
                                      ></line>
                                      <line
                                        x1="8"
                                        y1="11"
                                        x2="14"
                                        y2="11"
                                      ></line>
                                    </svg>
                                  </button>
                                </div>
                              </div>

                              <div className="p-2 md:p-4">
                                <div className="flex justify-between items-start mb-1 md:mb-2">
                                  <h3 className="font-semibold text-white text-sm md:text-base truncate flex-1">
                                    {art.description || "Untitled"}
                                  </h3>

                                  {art.publishStatus === "verified" ? (
                                    <span className="flex items-center gap-1 text-green-400 text-xs ml-2">
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
                                      IP Verified
                                    </span>
                                  ) : (
                                    <button
                                      onClick={() => handleRegisterIP(art)}
                                      className="bg-purple-600 hover:bg-purple-700 text-white px-2 py-1 rounded text-xs whitespace-nowrap ml-2"
                                    >
                                      Register IP
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-400">
                                    {new Date(
                                      art.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                  <span className="text-xs text-gray-400">
                                    {art.earnings
                                      ? `Earned: ${formatCurrency(
                                          art.earnings
                                        )}`
                                      : "Not sold"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showAttachLicenseModal && selectedStory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="relative rounded-2xl w-full max-w-md bg-gray-900 border border-white/20 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">
                    Attach License to {selectedStory.story?.title}
                  </h3>
                  <button
                    onClick={() => setShowAttachLicenseModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>
          )}

          {showLicenseModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="relative z-10">
                <RegisterLicense
                  story={selectedStory}
                  profile={profile}
                  onClose={() => setShowLicenseModal(false)}
                />
              </div>
            </div>
          )}

          {showRegistrationModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <RegisterIpAsset
                story={selectedStory}
                profile={profile}
                onClose={() => {
                  setShowRegistrationModal(false);
                  refetchUserStory();
                }}
              />
            </div>
          )}

          {revenueModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <ClaimRevenue
                story={selectedStory}
                onClose={() => {
                  setShowRevenueModal(false);
                  refetchUserStory();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
