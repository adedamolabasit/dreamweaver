import { useEffect, useState } from "react";
import { uploadJSONToIPFS } from "../../../storyservice/utils/functions/uploadToIpfs";
import { IpMetadata } from "@story-protocol/core-sdk";
import { ProductionResponse } from "../types";
import { ProfileResp } from "../types";
import { useStoryClient } from "../../../client/storyClient";
import {
  SPGNFTContractAddress,
  NonCommercialSocialRemixingTerms,
  createCommercialRemixTerms,
} from "../../../storyservice/utils/utils";
import { useUpdateProduction } from "../../../hooks/useProduction";
import { Sparkles, BadgeCheck } from "lucide-react";
import { useToast } from "../../../components/Toast";
import { WIP_TOKEN_ADDRESS } from "@story-protocol/core-sdk";

interface RegisterIPProps {
  story?: ProductionResponse;
  profile: ProfileResp;
  onClose?: () => void;
}

type LicenseType = {
  id: string;
  name: string;
  description: string;
  terms: any;
  requiresCommercialConfig?: boolean;
};

export const RegisterIpAsset: React.FC<RegisterIPProps> = ({
  story,
  profile,
  onClose,
}) => {
  const { mutate: updateProduction } = useUpdateProduction();
  const [isLoading, setIsLoading] = useState(false);
  const [mintingStage, setMintingStage] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState<string>("");
  const [commercialRevShare, setCommercialRevShare] = useState<number>(10); // Default 10% for commercial licenses
  const [mintingFee, setMintingFee] = useState<number>(0); // Default 0 WIP tokens
  const { showError, showDream } = useToast();

  const client = useStoryClient();

  const licenseOptions: LicenseType[] = [
    {
      id: "nonCommercialSocialRemix",
      name: "Non-Commercial Social Remix",
      description:
        "Allows non-commercial sharing and remixing with attribution",
      terms: NonCommercialSocialRemixingTerms,
    },
    {
      id: "commercialRemix",
      name: "Commercial Remix",
      description: "Allows commercial use and remixing with revenue sharing",
      terms: createCommercialRemixTerms({
        commercialRevShare: commercialRevShare,
        defaultMintingFee: mintingFee,
      }),
      requiresCommercialConfig: true,
    },
  ];

  const getLicenseTerms = (licenseId: string): any => {
    if (licenseId === "commercialRemix") {
      return createCommercialRemixTerms({
        commercialRevShare: commercialRevShare,
        defaultMintingFee: mintingFee,
      });
    }
    return NonCommercialSocialRemixingTerms;
  };

  const handledRegisterIp = async () => {
    if (!selectedLicense) {
      showError("Please select a license type");
      return;
    }

    setIsLoading(true);
    setMintingStage(1);

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

    const ipMetadata: IpMetadata = client?.ipAsset.generateIpMetadata({
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
      mediaUrl: `https://dreamweaver-six.vercel.app/${story?._id}`,
      mediaHash:
        "0xb52a44f53b2485ba772bd4857a443e1fb942cf5dda73c870e2d2238ecd607aee",
      mediaType: "text/html; charset=UTF-8",
    }) as typeof ipMetadata;

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
        {
          key: "LicenseType",
          value: selectedLicense,
        },
        ...(selectedLicense === "commercialRemix"
          ? [
              {
                key: "CommercialRevShare",
                value: `${commercialRevShare}%`,
              },
              {
                key: "MintingFee",
                value: `${mintingFee} WIP`,
              },
            ]
          : []),
      ],
    };

    try {
      const [ipIpfsHash, nftIpfsHash] = await Promise.all([
        uploadJSONToIPFS(ipMetadata),
        uploadJSONToIPFS(nftMetadata),
      ]);

      const response = await client?.ipAsset.mintAndRegisterIpAssetWithPilTerms(
        {
          spgNftContract: SPGNFTContractAddress,
          licenseTermsData: [
            {
              terms: getLicenseTerms(selectedLicense),
            },
          ],
          ipMetadata: {
            ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
            nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
          },
          txOptions: { waitForTransaction: true },
        }
      );

      console.log(response, "llkk");

      const newIpEntry = {
        ipId: response?.ipId as `0x${string}`,
        status: "registered",
        licenseTermsIds: response?.licenseTermsIds?.toString(),
        tokenId: response?.tokenId?.toString(),
        fee: mintingFee,
        revShare: commercialRevShare,
        license: {
          pilFlavors: selectedLicense,
          ...(selectedLicense === "commercialRemix"
            ? {
                commercialRevShare,
                mintingFee,
                currency: WIP_TOKEN_ADDRESS,
              }
            : {}),
        },
      };

      const updatedIpArray = [...(story?.ipRegistration?.ip ?? []), newIpEntry];

      const obj = {
        ipRegistration: {
          ip: updatedIpArray,
        },
      };

      updateProduction(
        { id: story?._id as string, obj },
        {
          onSuccess: () => {
            showDream(
              "Your story has been successfully registered as intellectual property."
            );
          },
          onError: () => showError("Something went wrong"),
        }
      );
      setMintingStage(2);
    } catch (error) {
      console.error("Registration error:", error);
      showError("Registration failed. Please try again.");
      setMintingStage(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mintingStage === 2) {
      onClose && onClose();
    }
  }, [onClose, mintingStage]);

  return (
    <div className="">
      {!isLoading && mintingStage === 0 && (
        <div className="flex flex-col items-center text-center py-8">
          <div className="p-4 bg-green-900/30 rounded-full mb-6 border border-green-800/50">
            <BadgeCheck size={48} className="text-green-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Register IP</h3>
          <p className="text-gray-400 mb-6 max-w-md">
            Choose a license type to protect your creative work on the
            blockchain with Story Protocol.
          </p>

          {/* License selection */}
          <div className="w-full max-w-md mb-6">
            {licenseOptions.map((license) => (
              <div
                key={license.id}
                className={`p-4 mb-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedLicense === license.id
                    ? "border-purple-500 bg-purple-900/20"
                    : "border-gray-700 hover:bg-gray-800/50"
                }`}
                onClick={() => setSelectedLicense(license.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                      selectedLicense === license.id
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedLicense === license.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-white">{license.name}</h4>
                    <p className="text-sm text-gray-400">
                      {license.description}
                    </p>
                    {license.requiresCommercialConfig &&
                      selectedLicense === license.id && (
                        <div className="mt-3 space-y-2">
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Revenue Share (%)
                            </label>
                            <input
                              type="number"
                              max="100"
                              value={commercialRevShare}
                              onChange={(e) =>
                                setCommercialRevShare(Number(e.target.value))
                              }
                              className="w-full bg-gray-700 rounded px-3 py-2 text-sm text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-400 mb-1">
                              Minting Fee (WIP)
                            </label>
                            <input
                              type="number"
                              value={mintingFee}
                              onChange={(e) =>
                                setMintingFee(Number(e.target.value))
                              }
                              className="w-full bg-gray-700 rounded px-3 py-2 text-sm text-white"
                            />
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            <button
              onClick={onClose}
              className="py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button
              onClick={handledRegisterIp}
              disabled={!selectedLicense}
              className={`py-3 rounded-xl text-white ${
                !selectedLicense
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400"
              }`}
            >
              Register
            </button>
          </div>
        </div>
      )}

      {mintingStage === 1 && isLoading && (
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

      {mintingStage === 2 && isLoading && (
        <div className="flex flex-col items-center text-center py-8">
          <div className="p-4 bg-green-900/30 rounded-full mb-6 border border-green-800/50">
            <BadgeCheck size={48} className="text-green-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">IP Registered!</h3>
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
  );
};
