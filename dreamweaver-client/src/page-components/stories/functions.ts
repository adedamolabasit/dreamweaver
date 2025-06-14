export function extractMintingParams(licenseResponse: any) {
  const terms = licenseResponse.data.licenseTerms || [];
  const termsObj = licenseResponse.data.terms || {};

  const mintingFee = termsObj.defaultMintingFee
    ? BigInt(termsObj.defaultMintingFee)
    : BigInt(
        terms.find((t: any) => t.trait_type === "Default Minting Fee")?.value ||
          "0"
      );

  const currency =
    termsObj.currency ||
    terms.find((t: any) => t.trait_type === "Currency")?.value ||
    "0x1514000000000000000000000000000000000000";

  return {
    mintingFee,
    currency,
  };
}
