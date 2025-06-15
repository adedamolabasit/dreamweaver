import { ProductionResponse } from "./types";

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
  ipList: { ipId: string; title: string | undefined; createdAt: string }[]
): Promise<IPEarning[]> => {
  const earningsData: IPEarning[] = [];

  for (const ip of ipList) {
    try {
      const earnings = 13;
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
