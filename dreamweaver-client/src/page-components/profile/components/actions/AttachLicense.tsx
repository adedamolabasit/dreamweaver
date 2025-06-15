import React, { useState, useEffect } from "react";
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
  CheckCircle,
} from "lucide-react";
import { ProductionResponse } from "../../types";
import { useStoryClient } from "../../../../client/storyClient";
import { useAccount } from "wagmi";
import { licenseFlavors } from "../../config/PilFlavours";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { useUpdateProfile } from "../../../../hooks/useAuth";
import { ProfileResp } from "../../types";
import { useToast } from "../../../../components/Toast";
import { createLicenseTerms } from "../../config/PilFlavours";

interface MintDreamProps {
  story?: ProductionResponse;
  profile: ProfileResp;
  onClose?: () => void;
}

export const RegisterLicense: React.FC<MintDreamProps> = ({
  story,
  profile,
  onClose,
}) => {
  const [mintingStage, setMintingStage] = useState(0);
  const [legalName, setLegalName] = useState("");
  const [mintingFee, setMintingFee] = useState<string>("0.01"); // Default value as string
  const [revShare, setRevShare] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<LicenseFlavor>(
    "nonCommercialSocialRemix"
  );
  const [attachedLicenses, setAttachedLicenses] = useState<Set<LicenseFlavor>>(
    new Set()
  );

  const { mutate: updateProfile } = useUpdateProfile();
  const { showError, showDream } = useToast();
  const { address } = useAccount();

  const client = useStoryClient();

  type LicenseFlavor =
    | "nonCommercialSocialRemix"
    | "commercialUse"
    | "commercialRemix";

  const validateMintingFee = (value: string): boolean => {
    if (value === "") return true; // Allow empty input for UX
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= 0 && numValue <= 1000; // Set reasonable upper limit
  };

  const handleMintFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || validateMintingFee(value)) {
      setMintingFee(value);
    }
  };

  const handleRevShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setRevShare(value);
    }
  };

const getLicenseFlavorTerms = async (
  flavor: LicenseFlavor,
  mintingFee?: string,
  revShare?: number
) => {
  if (
    flavor === "commercialUse" &&
    (!mintingFee || parseFloat(mintingFee) <= 0)
  ) {
    throw new Error("Valid minting fee is required for Commercial Use");
  }
  if (
    flavor === "commercialRemix" &&
    (!mintingFee || parseFloat(mintingFee) <= 0 || revShare === undefined)
  ) {
    throw new Error(
      "Both minting fee and revenue share are required for Commercial Remix"
    );
  }

  try {
    setIsLoading(true);
    let response;

    const feeAmount = mintingFee ? parseFloat(mintingFee) : 0;
    const parsedFee = parseEther(feeAmount.toString());

    const MAX_RETRIES = 5;
    const RETRY_DELAY_MS = 2000;
    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const STANDARD_LICENSE_TEMPLATE =
      "0x2E896b0b2Fdb7457499B56AAaA4AE55BCB4Cd316";

    if (flavor === "commercialUse" || flavor === "commercialRemix") {
      let license;
      let attempt = 0;

      while (!license?.licenseTermsId && attempt < MAX_RETRIES) {
        try {
          console.log(`Registering ${flavor} Terms... Attempt ${attempt + 1}`);

          license = await client?.license.registerPILTerms({
            ...createLicenseTerms({
              mintingFee: BigInt(feeAmount),
              revShare: revShare ?? 0,
            }),
          });

          if (!license?.licenseTermsId) {
            console.warn("No licenseTermsId returned, retrying...");
            await wait(RETRY_DELAY_MS);
          }
        } catch (error) {
          console.error("Error registering PIL Terms:", error);
          await wait(RETRY_DELAY_MS);
        }

        attempt++;
      }

      if (!license?.licenseTermsId) {
        throw new Error("Failed to get licenseTermsId after multiple attempts.");
      }

      const licenseId = license.licenseTermsId.toString();

      console.log(story?.ipRegistration?.ip[0]?.ipId, licenseId,"concern")

      response = await client?.license.attachLicenseTerms({
        licenseTermsId: licenseId,
        ipId: story?.ipRegistration?.ip[0]?.ipId as `0x${string}`,
        licenseTemplate: STANDARD_LICENSE_TEMPLATE 
      });

      const licenseData = {
        licenseType: flavor,
        licenseTermId: license.licenseTermsId,
        transactionHash: response?.txHash,
        isAvailable: true,
        timestamp: new Date().toISOString(),
        mintingFee: feeAmount,
        revShare: revShare ?? 0,
      };

      await updateProfile({
        walletAddress: address as string,
        obj: {
          license: {
            registeredLicense: {
              ...licenseData,
            },
          },
        },
      });

      setAttachedLicenses((prev) => new Set(prev).add(flavor));
    } else {
      // nonCommercialSocialRemix
      response = await client?.license.registerNonComSocialRemixingPIL();

      const licenseData = {
        licenseType: flavor,
        licenseTermId: response?.licenseTermsId,
        transactionHash: response?.txHash,
        isAvailable: true,
        timestamp: new Date().toISOString(),
        mintingFee: 0,
        revShare: 0,
      };

      await updateProfile({
        walletAddress: address as string,
        obj: {
          license: {
            registeredLicense: {
              ...licenseData,
            },
          },
        },
      });
    }

    showDream(`${flavor} license registered successfully`);
    setMintingStage(2);
  } catch (error) {
    console.error("License registration failed:", error);
    showError(
      error instanceof Error ? error.message : "Failed to register license"
    );
  } finally {
    setIsLoading(false);
  }
};


  const selected = licenseFlavors.find(
    (flavor) => flavor.type === selectedLicense
  );

  const LicenseOption = ({
    flavor,
  }: {
    flavor: (typeof licenseFlavors)[0];
  }) => {
    const isSelected = selectedLicense === flavor.type;
    const isAttached = attachedLicenses.has(flavor.type as LicenseFlavor);

    return (
      <div
        className={`p-4 rounded-xl border-2 ${
          isAttached
            ? "border-green-500/30 bg-green-900/10"
            : isSelected
            ? "border-purple-500 bg-purple-900/20"
            : "border-gray-700 hover:border-gray-600"
        } ${isAttached ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() =>
          !isAttached && setSelectedLicense(flavor.type as LicenseFlavor)
        }
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gray-800/50">{flavor.icon}</div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-white">{flavor.type}</h4>
              {isAttached && (
                <CheckCircle size={18} className="text-green-400" />
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">{flavor.description}</p>
            {isAttached && (
              <div className="mt-2 text-xs text-green-400">
                Already attached
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

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
            <h2 className="text-xl font-bold text-white">Attach a License</h2>
            <p className="text-sm text-purple-200">
              Select and attach license terms to your IP
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

              {(selectedLicense === "commercialUse" ||
                selectedLicense === "commercialRemix") && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <DollarSign size={16} className="text-green-400" />
                      Minting Fee (ETH)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="decimal"
                        pattern="[0-9]*\.?[0-9]*"
                        className="w-full p-3 pl-10 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        value={mintingFee}
                        onChange={handleMintFeeChange}
                        placeholder="0.01"
                      />
                      <span className="absolute left-3 top-3 text-gray-400">
                        Ξ
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum: 0.01 ETH
                    </p>
                  </div>

                  {selectedLicense === "commercialRemix" && (
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
                  )}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <FileText size={16} className="text-amber-400" />
                License Type
              </label>

              <div className="grid grid-cols-1 gap-3">
                {licenseFlavors.map((flavor) => (
                  <LicenseOption key={flavor.type} flavor={flavor} />
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
              onClick={() => {
                if (attachedLicenses.has(selectedLicense)) {
                  showError("This license is already attached");
                  return;
                }
                if (!selectedLicense) {
                  showError("Please select a license type");
                  return;
                }
                if (
                  (selectedLicense === "commercialUse" ||
                    selectedLicense === "commercialRemix") &&
                  (!mintingFee || parseFloat(mintingFee) <= 0)
                ) {
                  showError("Please enter a valid minting fee");
                  return;
                }
                getLicenseFlavorTerms(selectedLicense, mintingFee, revShare);
              }}
              disabled={isLoading || attachedLicenses.has(selectedLicense)}
              className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 ${
                isLoading || attachedLicenses.has(selectedLicense)
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
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
                  {attachedLicenses.has(selectedLicense)
                    ? "Already Attached"
                    : "Attach License"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
