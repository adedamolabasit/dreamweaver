import { useEffect, useRef } from "react";
import { Mic, PenTool, Brain, Images, Star } from "lucide-react";
import { Sparkles, Wallet, LogOut } from "lucide-react";
import { useAuthUser } from "../hooks/useAuth";
import Cookies from "js-cookie";
import apiClient from "../api/apiClient";
import { useConnectModal } from "@tomo-inc/tomo-evm-kit";
import { useAccount, useDisconnect } from "wagmi";
import { useUser } from "../context/userContext";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const { openConnectModal } = useConnectModal();

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { mutate: authUser } = useAuthUser();

  const { setUserToken } = useUser();

  const hasAuthenticatedRef = useRef(false);

  const authenticate = async (walletAddress: string) => {
    return new Promise((resolve, reject) => {
      authUser(
        { walletAddress },
        {
          onSuccess: (data) => {
            setUserToken(data.jwt.token);
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

  useEffect(() => {
    const authenticateWithSignature = async () => {
      if (!address || hasAuthenticatedRef.current) return;

      try {
        await authenticate(address);
        hasAuthenticatedRef.current = true;
      } catch (error) {
        console.error("Signature error:", error);
      }
    };

    authenticateWithSignature();
  }, [address]);

  //   authenticateWithSignature();
  // }, [authenticate]);

  // useEffect(() => {
  //   const handleAuthentication = async () => {
  //     if (!address) return;

  //     try {
  //       // const issuer = "dreamweaver";
  //       // 1. Properly await the signature
  //       console.log(address, "adddrees");
  //       const signature = await handleSignMessage(address);

  //       console.log(signature, "sig");

  //       // 2. Store the actual signature (not the Promise)
  //       Cookies.set("signature", signature, {
  //         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  //         secure: process.env.NODE_ENV === "production",
  //         sameSite: "strict",
  //       });

  //       // 3. Include in API requests
  //       apiClient.interceptors.request.use((config) => {
  //         config.headers["x-signature"] = signature;
  //         return config;
  //       });
  //     } catch (error) {
  //       console.error("Signing failed:", error);
  //       Cookies.remove("signature");
  //     }
  //   };

  //   handleAuthentication();
  // }, [address]);

  useEffect(() => {
    const signature = Cookies.get("signature");
    if (!signature && typeof openConnectModal === "function") {
      openConnectModal();
    }
  }, [openConnectModal]);

  const navItems = [
    { id: "journal", icon: <Mic />, label: "Journal" },
    { id: "storyboard", icon: <PenTool />, label: "Storyboard" },
    { id: "archetype", icon: <Brain />, label: "Archetypes" },
    { id: "gallery", icon: <Images />, label: "Gallery" },
    { id: "mint", icon: <Star />, label: "Mint" },
  ];

  return (
    <nav className="relative py-4 px-12 sm:py-6 w-full">
      <div className="nav-blur absolute inset-0 bg-purple-900/20 backdrop-blur-md -z-10"></div>
      <div className="relative w-full py-4 px-2 sm:px-6 flex items-center justify-between">
        {/* Left: Logo/Header */}
        <header className="flex items-center gap-2 z-10">
          <Sparkles className="text-amber-300" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              DreamWeaver
            </span>
            <span className="text-blue-200"> Protocol</span>
          </h1>
        </header>

        {/* Center: Navigation */}
        <ul className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 sm:gap-6 z-0">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`relative flex flex-col items-center p-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white/10 text-white scale-105 shadow-lg shadow-purple-500/20"
                    : "text-blue-100/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg sm:text-xl mb-1">{item.icon}</span>
                <span className="text-xs sm:text-sm font-medium">
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full nav-glow"></span>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Right: Wallet button */}
        <div className="z-10">
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="cursor-pointer px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all font-medium text-sm sm:text-lg shadow-lg shadow-purple-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <LogOut className="group-hover:animate-pulse" />
                <span>Disconnect</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              className="cursor-pointer px-4 py-2 sm:px-6 sm:py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 transition-all font-medium text-sm sm:text-lg shadow-lg shadow-purple-900/30 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Connect</span>
                <Wallet className="group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

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
    params: [message, address],
  });

  return signature;
};
