import { ProductionResponse } from "./types";
import { useStoryClient } from "../../client/storyClient";
import { ClaimableRevenueRequest } from "@story-protocol/core-sdk";
import { Address } from "viem";
import { WIP_TOKEN_ADDRESS } from "@story-protocol/core-sdk";
import { StoryClient } from "@story-protocol/core-sdk";

export const extractIpIdsWithMetadata = (stories: ProductionResponse[]) => {
  const result = [];

  for (const story of stories) {
    if (story.ipRegistration && story.ipRegistration.ip) {
      for (const ip of story.ipRegistration.ip) {
        result.push({
          ipId: ip.ipId,
          title: story?.story?.title,
          createdAt: `${story.createdAt}`,
        });
      }
    }
  }

  return result;
};

export interface IPEarning {
  ipId: string;
  title: string;
  createdAt: string;
  earnings: number;
}

export const fetchEarningsForIPs = async (
  ipList: { ipId: string; title: string | undefined; createdAt: string }[],
  claimerAddress: `0x${string}`
): Promise<IPEarning[]> => {
  const earningsData: IPEarning[] = [];

  for (const ip of ipList) {
    try {
      const earnings = 13;
      // const earnings = await fetchEarningsByIpId(ip.ipId, claimerAddress);
      earningsData.push({
        ipId: ip?.ipId,
        title: ip?.title as string,
        createdAt: ip?.createdAt,
        earnings: earnings || 0,
      });
    } catch (error) {
      earningsData.push({
        ipId: ip.ipId,
        title: ip?.title as string,
        createdAt: ip.createdAt,
        earnings: 0,
      });
    }
  }

  return earningsData;
};

export const fetchEarningsByIpId = async (
  ipId: string,
  claimerAddress: `0x${string}`,
  client: StoryClient
): Promise<number> => {
  try {
    const request: ClaimableRevenueRequest = {
      royaltyVaultIpId: ipId as Address,
      claimer: claimerAddress as Address,
      token: WIP_TOKEN_ADDRESS,
    };

    const response = await client?.royalty.claimableRevenue(request);

    return Number(response || 0);
  } catch (error) {
    console.error(`Failed to fetch earnings for IP ${ipId}:`, error);
    return 0;
  }
};
