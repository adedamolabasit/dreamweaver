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
import { ProductionResponse } from "../types";
import { client } from "../../../storyservice/utils/config";
import { useAccount, useBalance } from "wagmi";

import { useUpdateProduction } from "../../../hooks/useProduction";
import { licenseFlavors } from "../config/PilFlavours";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { useUpdateProfile } from "../../../hooks/useAuth";
import { ProfileResp } from "../types";
import { useToast } from "../../../components/Toast";

interface MintDreamProps {
  story?: ProductionResponse;
  profile: ProfileResp;
  onClose?: () => void;
}

export const RegisterLicense: React.FC<MintDreamProps> = ({
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

  const { mutate: updateProfile } = useUpdateProfile();
  const { showError, showDream } = useToast();
  const { address } = useAccount();

  const provider = new ethers.JsonRpcProvider("https://aeneid.storyrpc.io");

  type LicenseFlavor =
    | "nonCommercialSocialRemix"
    | "commercialUse"
    | "commercialRemix";

  const getLicenseFlavorTerms = async (
    flavor: LicenseFlavor,
    mintingFee?: number,
    revShare?: number
  ) => {
    if (flavor === "commercialUse" && mintingFee === undefined) {
      throw new Error("mintingFee is required for Commercial Use flavor");
    }
    if (
      flavor === "commercialRemix" &&
      (mintingFee === undefined || revShare === undefined)
    ) {
      throw new Error(
        "Both mintingFee and revShare are required for Commercial Remix flavor"
      );
    }

    try {
      let response;

      if (flavor === "commercialUse") {
        const requestParams = {
          currency:
            "0x1514000000000000000000000000000000000000" as `0x${string}`,
          royaltyPolicyAddress:
            "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E" as `0x${string}`,
          defaultMintingFee: parseEther('11'),
          // defaultMintingFee: parseEther(mintingFee!.toString()),
        };

        console.log("Sending CommercialUse request:", requestParams);
        response = await client.license.registerCommercialUsePIL(requestParams);

        console.log(response.licenseTermsId, "resppp");

        const licenseData = {
          licenseType: flavor,
          licenseTermId: response.licenseTermsId,
          transactionHash: response.txHash,
          isAvailable: true,
          timestamp: new Date().toISOString(), // Add timestamp for tracking
          mintingFee: mintingFee,
          revShare: revShare,
        };

        const updateResponse = await updateProfile({
          walletAddress: address as string,
          obj: {
            license: {
              registeredLicense: {
                ...licenseData, // Use flavor as key for better organization
              },
            },
          },
        });

        console.log("Profile update response:", updateResponse);
      } else if (flavor === "commercialRemix") {
        const requestParams = {
          currency:
            "0x1514000000000000000000000000000000000000" as `0x${string}`,
          royaltyPolicyAddress:
            "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E" as `0x${string}`,
          defaultMintingFee: parseEther("64"),
          // defaultMintingFee: parseEther(mintingFee!.toString()),
          commercialRevShare: revShare!,
        };

        console.log("Sending CommercialRemix request:", requestParams);
        response = await client.license.registerCommercialRemixPIL(
          requestParams
        );

        console.log(response.licenseTermsId, "resppp");

        const licenseData = {
          licenseType: flavor,
          licenseTermId: response.licenseTermsId,
          transactionHash: response.txHash,
          isAvailable: true,
          timestamp: new Date().toISOString(), // Add timestamp for tracking
          mintingFee: mintingFee,
          revShare: revShare,
        };

        const updateResponse = await updateProfile({
          walletAddress: address as string,
          obj: {
            license: {
              registeredLicense: {
                ...licenseData, // Use flavor as key for better organization
              },
            },
          },
        });

        console.log("Profile update response:", updateResponse);
      } else {
        throw new Error("Invalid license flavor selected");
      }

      console.log("Received response:", response);

      if (!response?.txHash) {
        throw new Error(
          "No transaction hash received from the license registration"
        );
      }

      // if (flavor === "commercialUse") {
      //   const updateResponse = await updateProfile({
      //     obj: {
      //       license: {
      //         registeredLicense: [
      //           [
      //             {
      //               licenseTokenId: response.licenseTermsId,
      //               transactionHash: response.txHash,
      //               isAvailable: true,
      //             },
      //           ],
      //         ],
      //       },
      //     },
      //   });
      //   console.log("Profile update response:", updateResponse);
      // }

      // Additional verification for commercialRemix
      if (flavor === "commercialRemix") {
        const [tx, receipt] = await Promise.all([
          provider.getTransaction(response.txHash),
          provider.getTransactionReceipt(response.txHash),
        ]);
        console.log("Transaction verification:", { tx, receipt });
      }

      showDream(`${flavor} license registered successfully`);
      return response;
    } catch (error) {
      console.error("License registration failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to register license";
      showError(errorMessage);
      throw new Error(errorMessage);
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

  const selected = licenseFlavors.find(
    (flavor) => flavor.type === selectedLicense
  );

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
            <h2 className="text-xl font-bold text-white">Register a license</h2>
            <p className="text-sm text-purple-200">
              Secure your creative work on-chain
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {mintingStage === 0 && (
          <div className="space-y-6">
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
