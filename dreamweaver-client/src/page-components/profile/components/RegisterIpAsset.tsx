import { useEffect, useState } from "react";
import { uploadJSONToIPFS } from "../../../storyservice/utils/functions/uploadToIpfs";
import { IpMetadata } from "@story-protocol/core-sdk";
import { ProductionResponse } from "../types";
import { ProfileResp } from "../types";
import { client } from "../../../storyservice/utils/config";
import { SPGNFTContractAddress } from "../../../storyservice/utils/utils";
import { NonCommercialSocialRemixingTerms } from "../../../storyservice/utils/utils";
import { useUpdateProduction } from "../../../hooks/useProduction";
import { Sparkles, BadgeCheck } from "lucide-react";

import { useToast } from "../../../components/Toast";

interface RegisterIPProps {
  story?: ProductionResponse;
  profile: ProfileResp;
  onClose?: () => void;
}
export const RegisterIpAsset: React.FC<RegisterIPProps> = ({
  story,
  profile,
  onClose,
}) => {
  const { mutate: updateProduction } = useUpdateProduction();
  const [isLoading, setIsLoading] = useState(false);

  const [mintingStage, setMintingStage] = useState(0);

  const { showError, showDream } = useToast();

  const handledRegisterIp = async () => {
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
      mediaUrl: `https://dreamweaver-six.vercel.app/${story?._id}`,
      mediaHash:
        "0xb52a44f53b2485ba772bd4857a443e1fb942cf5dda73c870e2d2238ecd607aee",
      mediaType: "text/html; charset=UTF-8",
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

    try {
      const [ipIpfsHash, nftIpfsHash] = await Promise.all([
        uploadJSONToIPFS(ipMetadata),
        uploadJSONToIPFS(nftMetadata),
      ]);

      const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
        spgNftContract: SPGNFTContractAddress,
        licenseTermsData: [
          {
            terms: NonCommercialSocialRemixingTerms,
          },
        ],
        ipMetadata: {
          ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
          nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
        },
        txOptions: { waitForTransaction: true },
      });

      const newIpEntry = {
        ipId: response.ipId as `0x${string}`,
        status: "registered",
        licenseTermsIds: response.licenseTermsIds?.toString(),
        tokenId: response.tokenId?.toString(),
        fee: 0,
        revShare: 0,
        license: {
          pilFlavors: "nonCommercialSocialRemix",
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
      showError("Unknown error"), setMintingStage(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (mintingStage === 2) {
      onClose;
    }
  }, [onClose, mintingStage]);
  return (
    <div className="">
      {!isLoading && (
        <div className="flex flex-col items-center text-center py-8">
          <div className="p-4 bg-green-900/30 rounded-full mb-6 border border-green-800/50">
            <BadgeCheck size={48} className="text-green-400" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">IP Registered!</h3>
          <p className="text-gray-400 mb-6 max-w-md">
            Your creative work is now protected on the blockchain with Story
            Protocol.
          </p>

          <div className="grid grid-cols-2 gap-3 w-1/2">
            <button
              onClick={onClose}
              className="py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white"
            >
              Close
            </button>
            <button
              onClick={handledRegisterIp}
              className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white"
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
