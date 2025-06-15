import { FC, useState } from "react";
import { WIP_TOKEN_ADDRESS } from "@story-protocol/core-sdk";
import { useStoryClient } from "../../../../client/storyClient";
import { ProductionResponse } from "../../types";
import { Loader2, X } from "lucide-react";
import { useAccount } from "wagmi";
import { useToast } from "../../../../components/Toast";


interface ClaimRevenueParams {
  story?: ProductionResponse;
  onClose?: () => void;
}

export const ClaimRevenue: FC<ClaimRevenueParams> = ({ story, onClose }) => {
  const client = useStoryClient();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedAmount, setClaimedAmount] = useState<any>(0);
  const { showDream, showError, showInfo } = useToast();

  const ipId = "0x1d1E43b76994039e2d2f7e38Ea553aE5Cc2AD622";

  const { address } = useAccount();

  const handleClaim = async () => {
    if (!ipId || !address) return;

    try {
      setIsClaiming(true);
      setClaimedAmount(0);

      const response = await client?.royalty.claimAllRevenue({
        ancestorIpId: ipId,
        claimer: ipId,
        currencyTokens: [WIP_TOKEN_ADDRESS],
        childIpIds: [],
        royaltyPolicies: [],
        claimOptions: {
          autoTransferAllClaimedTokensFromIp: true,
          autoUnwrapIpTokens: true,
        },
      });

      const amount = response?.claimedTokens?.[0]?.amount ?? "0";
      setClaimedAmount(amount);
      showDream(`Claimed ${amount} tokens`);
    } catch (error: any) {
      showInfo("No revenue to clain");
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto p-6 bg-gray-900 border border-white/10 rounded-2xl shadow-md space-y-4 text-white">
      {/* Close Button (Top-right) */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={isClaiming}
        >
          <X size={20} />
        </button>
      )}

      {/* Header */}
      <div className="pr-6">
        {" "}
        {/* Add padding to prevent overlap with X button */}
        <h2 className="text-xl font-semibold">Claim Revenue</h2>
        <p className="text-sm text-gray-400 mt-1">
          Claim earnings from your registered IP
        </p>
      </div>

      {/* IP ID Display */}
      <div className="space-y-2">
        <label className="text-sm text-gray-400 block">IP Asset</label>
        <div className="font-mono text-sm bg-gray-800 px-4 py-3 rounded-lg break-all">
          {ipId || "Not registered"}
        </div>
      </div>

      {/* Claimed Amount Display */}
      {claimedAmount > 0 && (
        <div className="space-y-2">
          <label className="text-sm text-gray-400 block">Claimed Amount</label>
          <div className="text-green-400 font-bold text-xl">
            {Number(claimedAmount).toFixed(6)} WIP
          </div>
        </div>
      )}

      {/* Claim Button */}
      <button
        onClick={handleClaim}
        disabled={isClaiming || !ipId}
        className={`w-full py-3 rounded-lg font-medium transition-colors mt-4 ${
          isClaiming
            ? "bg-yellow-700 cursor-wait"
            : ipId
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-gray-600 cursor-not-allowed"
        }`}
      >
        {isClaiming ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} />
            Processing Claim...
          </div>
        ) : (
          "Claim Revenue"
        )}
      </button>

      {/* Status Messages */}
      {!ipId && (
        <p className="text-sm text-red-400 text-center mt-2">
          This story is not registered as an IP asset
        </p>
      )}
    </div>
  );
};

export default ClaimRevenue;
