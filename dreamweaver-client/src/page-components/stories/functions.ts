import { fetchLicenseTermForIP } from "../../api/storyApi";

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

export const transformLicenseData = (licenseList: any[]) => {
  return licenseList.map((license) => {
    let type = `Custom License (ID: ${license.licenseTermsId})`;
    let terms = "Terms vary by agreement";
    let price = "Free";

    if (["1862", "1866"].includes(license.licenseTermsId)) {
      type = `Commercial License (ID: ${license.licenseTermsId})`;
      terms = "For commercial use and monetization";
      price = license.licensingConfig?.mintingFee
        ? `${license.licensingConfig.mintingFee} IP`
        : "Free";
    } else if (license.licenseTermsId === "386") {
      type = `Personal Use (ID: ${license.licenseTermsId})`;
      terms = "For non-commercial reading and sharing";
    }

    return {
      id: license.id,
      type,
      terms,
      price,
      duration: "Permanent",
      licenseId: license.licenseTermsId,
      licensorIpId: license.ipId,
      fee: license.licensingConfig?.mintingFee || 0,
    };
  });
};

export const fetchAndTransformLicenses = async (ipId: string) => {
  if (!ipId) return [];

  try {
    const ipLicenses = await fetchLicenseTermForIP(ipId);
    return transformLicenseData(ipLicenses);
  } catch (error) {
    console.error("Failed to fetch licenses:", error);
    return [];
  }
};
