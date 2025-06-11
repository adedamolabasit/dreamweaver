export const createLicenseTerms = (
  selectedFlavor: string,
  mintingFee?: number,
  revShare?: number
) => {
    console.log(selectedFlavor,"flavour")
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

  switch (selectedFlavor) {
    case "nonCommercialSocialRemix":
      return {
        ...commonTerms,
        defaultMintingFee: BigInt(0),
        commercialUse: false,
        commercialRevShare: 0,
        commercialRevCeiling: BigInt(0),
        derivativesAllowed: true,
        derivativesReciprocal: true,
        uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/NCSR.json",
      };
    case "commercialUse":
      return {
        ...commonTerms,
        defaultMintingFee: BigInt(mintingFee! * 1e18),
        commercialUse: true,
        commercialRevShare: 0,
        commercialRevCeiling: BigInt(0),
        derivativesAllowed: false,
        derivativesReciprocal: false,
        uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/CommercialUse.json",
      };
    case "commercialRemix":
      return {
        ...commonTerms,
        defaultMintingFee: BigInt(mintingFee! * 1e18),
        commercialUse: true,
        commercialRevShare: revShare,
        commercialRevCeiling: BigInt(0),
        derivativesAllowed: true,
        derivativesReciprocal: true,
        uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/CommercialRemix.json",
      };
    case "creativeCommons":
      return {
        ...commonTerms,
        defaultMintingFee: BigInt(0),
        commercialUse: true,
        commercialRevShare: 0,
        commercialRevCeiling: BigInt(0),
        derivativesAllowed: true,
        derivativesReciprocal: true,
        uri: "https://github.com/piplabs/pil-document/blob/main/off-chain-terms/CC-BY.json",
      };
    default:
      return {
        ...commonTerms,
        defaultMintingFee: BigInt(mintingFee! * 1e18),
        commercialUse: true,
        commercialRevShare: revShare,
        commercialRevCeiling: BigInt(0),
        derivativesAllowed: true,
        derivativesReciprocal: true,
        uri: "",
      };
  }
};
