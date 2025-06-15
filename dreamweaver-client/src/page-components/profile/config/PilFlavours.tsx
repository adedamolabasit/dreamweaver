import { Check, X, CheckCheck, Globe } from "lucide-react";
import { parseEther } from "viem";
import { RegisterCommercialUsePILRequest } from "@story-protocol/core-sdk";
import { zeroAddress } from "viem";
import { LicenseTerms } from "@story-protocol/core-sdk";

const commonTerms = {
  transferable: true,
  commercialAttribution: true,
  commercializerChecker: "0x0000000000000000000000000000000000000000",
  commercializerCheckerData: "0x",
  derivativesAttribution: true,
  derivativesApproval: false,
  derivativeRevCeiling: BigInt(0),
  currency: "0x0000000000000000000000000000000000000000",
};

export const nonCommercialSocialRemix = {
  ...commonTerms,
  defaultMintingFee: BigInt(0),
  commercialUse: false,
  commercialRevShare: 0,
  commercialRevCeiling: BigInt(0),
  derivativesAllowed: true,
  derivativesReciprocal: true,
  uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/NCSR.json",
};

export const commercialUseParams = (
  mintingFee: number
): RegisterCommercialUsePILRequest => ({
  currency: "0x1514000000000000000000000000000000000000",
  defaultMintingFee: parseEther(mintingFee.toString()),
  royaltyPolicyAddress: "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E",
});

export const commercialRemix = (mintingFee: number, revShare: number) => ({
  ...commonTerms,
  defaultMintingFee: BigInt(mintingFee! * 1e18),
  commercialUse: true,
  commercialRevShare: revShare,
  commercialRevCeiling: BigInt(0),
  derivativesAllowed: true,
  derivativesReciprocal: true,
  uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/CommercialRemix.json",
});

export const creativeCommons = {
  ...commonTerms,
  defaultMintingFee: BigInt(0),
  commercialUse: true,
  commercialRevShare: 0,
  commercialRevCeiling: BigInt(0),
  derivativesAllowed: true,
  derivativesReciprocal: true,
  uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/CC-BY.json",
};

export const licenseFlavors = [
  {
    type: "commercialUse",
    icon: <Check size={18} className="text-green-400" />,
    description: "Commercial use allowed, but no derivatives.",
    default: true,
    properties: {
      "Commercial Use": "Yes",
      "Derivatives Allowed": "No",
      "Attribution Required": "Yes",
      "Revenue Sharing": "No",
      "Minting Fee": "Set by creator",
      Currency: "Specified ERC-20",
      "Ideal Use Cases":
        "Creators who want to allow commercial use of their work without permitting derivatives.",
    },
  },
  {
    type: "commercialRemix",
    icon: <CheckCheck size={18} className="text-blue-400" />,
    description: "Commercial use and remixing allowed with revenue share.",
    default: false,
    properties: {
      "Commercial Use": "Yes",
      "Derivatives Allowed": "Yes",
      "Attribution Required": "Yes",
      "Revenue Sharing": "Yes (configurable)",
      "Minting Fee": "Set by creator",
      Currency: "Specified ERC-20",
      "Ideal Use Cases":
        "Collaborative projects where creators want to allow commercial derivatives and share in the revenue.",
    },
  },
];

interface LicenseTermsInput {
  mintingFee?: bigint;
  revShare?: number;
}

export const createLicenseTerms = ({
  mintingFee = 0n,
  revShare = 0,
}: LicenseTermsInput): LicenseTerms => {
  return {
    defaultMintingFee: mintingFee,
    currency: "0x1514000000000000000000000000000000000000",
    royaltyPolicy: "0xBe54FB168b3c982b7AaE60dB6CF75Bd8447b390E",
    transferable: false,
    expiration: 0n,

    commercialUse: true,
    commercialAttribution: false,
    commercializerChecker: zeroAddress,
    commercializerCheckerData: "0x",
    commercialRevShare: revShare,
    commercialRevCeiling: 0n,

    derivativesAllowed: false,
    derivativesAttribution: false,
    derivativesApproval: false,
    derivativesReciprocal: false,
    derivativeRevCeiling: 0n,

    uri: "",
  };
};
