import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  Sparkles,
  X,
  User,
  Percent,
  DollarSign,
  FileText,
  Layers,
  BadgeCheck,
} from "lucide-react";
import { ProductionResponse } from "../../types";
import { IpMetadata } from "@story-protocol/core-sdk";
import { client } from "../../../../storyservice/utils/config";
import { useUpdateProduction } from "../../../../hooks/useProduction";
import { ProfileResp } from "../../types";
import { licenseFlavors } from "./License/PilFlavours";
import {
  nonCommercialSocialRemix,
} from "./License/PilFlavours";
import { LicenseTerms } from "@story-protocol/core-sdk";
import { parseEther } from "viem";

interface MintDreamProps {
  story?: ProductionResponse;
  profile: ProfileResp;
  onClose?: () => void;
}

const MintAndRegisterIP: React.FC<MintDreamProps> = ({
  story,
  profile,
  onClose,
}) => {
  const [mintingStage, setMintingStage] = useState(0);
  const [legalName, setLegalName] = useState("");
  const [mintingFee, setMintingFee] = useState(1);
  const [revShare, setRevShare] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<LicenseFlavor | null>(
    "commercialUse"
  );
  const selected = licenseFlavors.find(
    (flavor) => flavor.type === selectedLicense
  );

  console.log(selectedLicense, "ppp>>");

  const { mutate: updateProduction } = useUpdateProduction();

  type LicenseFlavor =
    | "nonCommercialSocialRemix"
    | "commercialUse"
    | "commercialRemix";

  const getLicenseFlavorTerms = async (
    flavor: LicenseFlavor,
    mintingFee?: number,
    revShare?: number
  ) => {
    switch (flavor) {
      case "nonCommercialSocialRemix":
        return nonCommercialSocialRemix as LicenseTerms;

      case "commercialUse":
        if (mintingFee === undefined) {
          throw new Error("mintingFee is required for Commercial Use flavor");
        }
        const commercialUsePILResponse =
          await client.license.registerCommercialUsePIL({
            currency: "0x1514000000000000000000000000000000000000",
            defaultMintingFee: parseEther(mintingFee.toString()),
            royaltyPolicyAddress: "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E",
          });

        return commercialUsePILResponse;

      case "commercialRemix":
        if (mintingFee === undefined || revShare === undefined) {
          throw new Error(
            "Both mintingFee and revShare are required for Commercial Remix flavor"
          );
        }

        const registerCommercialRemixPILResponse =
          await client.license.registerCommercialRemixPIL({
            currency: "0x1514000000000000000000000000000000000000",
            defaultMintingFee: parseEther("1"),
            royaltyPolicyAddress: "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E",
            commercialRevShare: 10,
          });

        console.log(registerCommercialRemixPILResponse);

        return registerCommercialRemixPILResponse;

      default:
        throw new Error("Invalid license flavor selected");
    }
  };

  const handleMintFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setMintingFee(value);
    }
  };

  const handleRevShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setRevShare(value);
    }
  };

  const getFirstSceneComicImage = (): any => {
    if (story?.visuals) {
      const flatVisuals = Array.isArray(story.visuals)
        ? story.visuals[0]
        : story.visuals;
      return (
        flatVisuals?.generatedImages.find((img: any) =>
          img.style.toLowerCase().includes("comic")
        ) || null
      );
    }
    return null;
  };

  const image = getFirstSceneComicImage();

  const cid = image?.ipfsHash;

  const imageUrl = `https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${cid}?pinataGatewayToken=ckardq1C_7H8MBVFx0g6R3zTQ6VRwDP8FyNGMvx_pOAcVrFmYFoBVDknjk4hN3Wm`;

  const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
    title: story?.story?.title,
    description: story?.story?.synopsis,
    createdAt: story?.createdAt
      ? new Date(story.createdAt).toDateString()
      : undefined,
    creators: [
      {
        name: profile.user.username,
        address: profile.user.walletAddress as `0x${string}`,
        contributionPercent: 100,
      },
    ],
    image: imageUrl,
    imageHash: cid,
    mediaUrl: "https://cdn1.suno.ai/dcd3076f-3aa5-400b-ba5d-87d30f27c311.mp3",
    mediaHash:
      "0xb52a44f53b2485ba772bd4857a443e1fb942cf5dda73c870e2d2238ecd607aee",
    mediaType: "audio/mpeg",
  });

  const nftMetadata = {
    name: story?.story?.title,
    description: story?.story?.synopsis,
    image: imageUrl,
    animation_url: imageUrl,
    attributes: [
      {
        key: "DreamWeaver",
        value: profile.user.username,
      },
      {
        key: "WeaverId",
        value: profile.user._id,
      },
      {
        key: "Source",
        value: "DreamWeaver.com",
      },
    ],
  };

  console.log(story, "story...");
  const handleUpdateProduction = async (obj: { [key: string]: any }) => {
    updateProduction(
      { id: story?._id as string, obj },
      {
        onSuccess: (data) => {
          console.log(data, "ooo");
          console.log("success");
        },
        onError: (err) => console.error("Update error:", err),
      }
    );
  };

  // const startMinting = async () => {
  //   setIsLoading(true);
  //   setMintingStage(1);

  //   try {
  //     const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
  //     // const ipHash = createHash('sha256').update(JSON.stringify(ipMetadata)).digest('hex')
  //     const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
  //     // const nftHash = createHash('sha256').update(JSON.stringify(nftMetadata)).digest('hex')

  //     console.log(getLicenseFlavorTerms(selectedLicense!, 1, 5), "kk");
  //     const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
  //       spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
  //       licenseTermsData: [
  //         {
  //           terms: getLicenseFlavorTerms(selectedLicense!, 1, 5),
  //         },
  //       ],
  //       ipMetadata: {
  //         ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
  //         // ipMetadataHash: `0x${ipHash}`,
  //         nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
  //         // nftMetadataHash: `0x${nftHash}`,
  //       },
  //       txOptions: { waitForTransaction: true },
  //     });

  //     console.log("Root IPA created:", {
  //       "Transaction Hash": response.txHash,
  //       "IPA ID": response.ipId,
  //       "License Terms IDs": response.licenseTermsIds,
  //     });

  //     console.log(story?._id, "popow");
  //     const obj = {
  //       ipRegistration: {
  //         ipId: response.ipId,
  //         status: "verified",
  //         licenseTermsIds: response.licenseTermsIds?.toString(),
  //         tokenId: response.tokenId?.toString(),
  //       },
  //     };

  //     await handleUpdateProduction(obj);

  //     setMintingStage(2);
  //   } catch (error) {
  //     console.error(
  //       "Minting error:",
  //       error instanceof Error ? error.message : "Unknown error"
  //     );
  //     setMintingStage(0);
  //     alert(
  //       `Minting failed: ${
  //         error instanceof Error ? error.message : "Unknown error"
  //       }`
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const LicenseOption = ({
    type,
    icon,
    description,
    onClick,
    selected,
  }: {
    type: string;
    icon: React.ReactNode;
    description: string;
    onClick: () => void;
    selected: boolean;
  }) => (
    <div
      className={`p-4 rounded-xl border-2 cursor-pointer ${
        selected
          ? "border-purple-500 bg-purple-900/20"
          : "border-gray-700 hover:border-gray-600"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gray-800/50">{icon}</div>
        <div>
          <h4 className="font-medium text-white">{type}</h4>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative flex flex-col w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl border border-gray-800">
      <div className="relative p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10">
            <Layers size={24} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Register Your IP</h2>
            <p className="text-sm text-purple-200">
              Secure your creative work on-chain
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {mintingStage === 0 && (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-gray-800">
              <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
                <div className="text-center p-4">
                  <Sparkles
                    className="mx-auto text-amber-300/70 mb-3"
                    size={28}
                  />
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {story?.story?.title || "Untitled Story"}
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md">
                    {story?.story?.synopsis || "No description provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <User size={16} className="text-purple-400" />
                  Username
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  value={profile.user.username}
                  onChange={(e) => setLegalName(e.target.value)}
                  placeholder="Your legal name for IP registration"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <DollarSign size={16} className="text-green-400" />
                    Minting Fee (ETH)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="w-full p-3 pl-10 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      value={mintingFee}
                      onChange={handleMintFeeChange}
                    />
                    <span className="absolute left-3 top-3 text-gray-400">
                      Ξ
                    </span>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Percent size={16} className="text-blue-400" />
                    Revenue Share
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full p-3 pl-10 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                      value={revShare}
                      onChange={handleRevShareChange}
                    />
                    <span className="absolute left-3 top-3 text-gray-400">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <FileText size={16} className="text-amber-400" />
                License Type
              </label>

              <div className="grid grid-cols-1 gap-3">
                {licenseFlavors.map((flavor) => (
                  <LicenseOption
                    key={flavor.type}
                    type={flavor.type}
                    icon={flavor.icon}
                    description={flavor.description}
                    selected={selectedLicense === flavor.type}
                    onClick={() =>
                      setSelectedLicense(flavor.type as LicenseFlavor)
                    }
                  />
                ))}
              </div>

              {selected && (
                <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-300">
                  <h4 className="text-white font-semibold mb-2">
                    License Properties
                  </h4>
                  <ul className="space-y-1">
                    {Object.entries(selected.properties).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="text-gray-400">{key}</span>
                        <span className="text-white font-medium">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => getLicenseFlavorTerms(selectedLicense!, 1, 5)}
              className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 ${
                isLoading || legalName
                  ? "bg-gray-800 text-gray-500 "
                  : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <Sparkles size={16} />
                  Preparing...
                </>
              ) : (
                <>
                  <Star size={16} className="text-amber-200" />
                  Register IP Asset
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}

        {mintingStage === 1 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-6">
              <Sparkles size={48} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Registering Your IP
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              Securing your creative work on the blockchain. This may take a
              moment...
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mt-8">
              <div className="bg-gradient-to-r from-purple-500 to-blue-400 h-2.5 rounded-full w-[70%]" />
            </div>
          </div>
        )}

        {mintingStage === 2 && (
          <div className="flex flex-col items-center text-center py-8">
            <div className="p-4 bg-green-900/30 rounded-full mb-6 border border-green-800/50">
              <BadgeCheck size={48} className="text-green-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              IP Registered!
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Your creative work is now protected on the blockchain with Story
              Protocol.
            </p>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button className="py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white">
                View Details
              </button>
              <button
                onClick={onClose}
                className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MintAndRegisterIP;
