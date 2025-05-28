import { useEffect, useState } from "react";
import { Sparkles, Wallet, LogOut } from "lucide-react";
import Navigation from "./Navigation";
import VoiceJournal from "./VoiceJournal";
import StoryboardConverter from "./StoryboardConverter";
import ArchetypeAnalyzer from "./ArchetypeAnalyzer";
import DreamGallery from "./DreamGallery";
import MintDream from "./MintDream";
import DreamyBackground from "./DreamyBackground";
import { useConnectModal } from "@tomo-inc/tomo-evm-kit";
import { useAccount, useDisconnect } from "wagmi";
import { useAuthUser } from "../hooks/useAuth";
import Cookies from "js-cookie";
import apiClient from "../api/apiClient";

function DreamWeaver() {
  const [activeSection, setActiveSection] = useState("journal");
  const { openConnectModal } = useConnectModal();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { mutate: authUser } = useAuthUser();

  const authenticate = async (walletAddress: string) => {
    return new Promise((resolve, reject) => {
      authUser(
        { walletAddress },
        {
          onSuccess: (data) => {
            resolve(data);
          },
          onError: (error) => {
            reject(error);
          },
        }
      );
    });
  };

  const handleDisconnect = () => {
    disconnect();
    Cookies.remove("signature", {
      path: "/dream",
      domain: window.location.hostname,
    });
  };

  // useEffect(() => {
  //   const authenticateWithSignature = async () => {
  //     if (!address) return;

  //     try {
  //       const issuer = "dreamweaver";
  //       const in24Hours = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  //       // 1. Properly await the signature request
  //       const signature = await window.ethereum.request({
  //         method: "personal_sign",
  //         params: [issuer, address],
  //       });

  //       // 2. Set cookie with proper options
  //       Cookies.set("signature", signature, {
  //         expires: in24Hours,
  //         path: "/dream",
  //         secure: process.env.NODE_ENV === "production",
  //         sameSite: "strict",
  //       });

  //       // 3. Call authenticate after setting cookie
  //       authenticate(address);
  //     } catch (error) {
  //       console.error("Signature error:", error);
  //     }
  //   };

  //   if (address) {
  //     authenticateWithSignature();
  //   }
  // }, [address, authenticate]);

  useEffect(() => {
    const handleAuthentication = async () => {
      if (!address) return;

      try {
        // const issuer = "dreamweaver";
        // 1. Properly await the signature
        console.log(address, "adddrees");
        const signature = await handleSignMessage(address);

        console.log(signature, "sig");

        // 2. Store the actual signature (not the Promise)
        Cookies.set("signature", signature, {
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // 3. Include in API requests
        apiClient.interceptors.request.use((config) => {
          config.headers["x-signature"] = signature;
          return config;
        });
      } catch (error) {
        console.error("Signing failed:", error);
        Cookies.remove("signature");
      }
    };

    handleAuthentication();
  }, [address]);

  useEffect(() => {
    const signature = Cookies.get("signature");
    if (!signature && typeof openConnectModal === "function") {
      openConnectModal();
    }
  }, [openConnectModal]);

  const renderSection = () => {
    switch (activeSection) {
      case "journal":
        return <VoiceJournal />;
      case "storyboard":
        return <StoryboardConverter />;
      case "archetype":
        return <ArchetypeAnalyzer />;
      case "gallery":
        return <DreamGallery />;
      case "mint":
        return <MintDream />;
      default:
        return <VoiceJournal />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-serif text-white">
      <DreamyBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="fixed w-1/2 p-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-300" />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                DreamWeaver
              </span>
              <span className="text-blue-200"> Protocol</span>
            </h1>
          </div>
        </header>

        <div className="w-full flex justify-end p-4">
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="cursor-pointer px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all  font-medium text-lg shadow-lg shadow-purple-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut className="group-hover:animate-pulse" />
                <span>Disconnect Wallet</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              className="cursor-pointer px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all  font-medium text-lg shadow-lg shadow-purple-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Connect Wallet</span>
                <Wallet className="group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          )}
        </div>

        <main className="flex-1 px-4 py-6  mt-28 md:p-8">
          {renderSection()}
        </main>

        <div className="fixed top-0 w-full flex justify-center ">
          <Navigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
      </div>
    </div>
  );
}

export default DreamWeaver;

const handleSignMessage = async (address: string) => {
  // 1. Prepare the message
  const message =
    `DreamWeaver Authentication\n\n` +
    `Address: ${address}\n` +
    `Nonce: ${Math.floor(Math.random() * 1e6)}\n` +
    `Timestamp: ${Date.now()}`;

  // 2. Request signature (properly formatted)
  const signature = await window.ethereum.request({
    method: "personal_sign",
    params: [
      message,
      address,
    ],
  });

  return signature;
};
