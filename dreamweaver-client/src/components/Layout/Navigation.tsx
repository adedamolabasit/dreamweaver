import { useEffect, useRef } from "react";
import {
  Mic,
  PenTool,
  Images,
  Star,
  Sparkles,
  Wallet,
  LogOut,
  User,
} from "lucide-react";
import { useAuthUser } from "../../hooks/useAuth";
import { useConnectModal } from "@tomo-inc/tomo-evm-kit";
import { useAccount, useDisconnect } from "wagmi";
import { useUser } from "../../context/userContext";

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
  const { setUserToken, clearUserToken } = useUser();
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
    clearUserToken();
  };

  useEffect(() => {
    if (!isConnected) clearUserToken();
  }, [isConnected]);

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

  const navItems = [
    { id: "stories", icon: <Star />, label: "Stories" },
    { id: "art-gallery", icon: <Images />, label: "Art Gallery" },
    { id: "journal", icon: <Mic />, label: "Journal" },
    { id: "weave", icon: <PenTool />, label: "Weave" },
    { id: "profile", icon: <User />, label: "Profile" },
  ];

  return (
    <>
      <nav className="hidden sm:block relative py-4 px-12 sm:py-6 w-full">
        <div className="nav-blur absolute inset-0 bg-purple-900/20 backdrop-blur-md -z-10"></div>

        <div className="relative w-full py-4 px-2 sm:px-6 flex items-center justify-between">
          <header className="flex items-center gap-2 z-10">
            <Sparkles width={40} className="text-amber-300 " />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                DreamWeaver
              </span>
              <span className="text-blue-200"> AI</span>
            </h1>
          </header>

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

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="nav-blur absolute inset-0 bg-purple-900/20 backdrop-blur-md -z-10"></div>
        <ul className="flex justify-around items-center p-2">
          {navItems.map((item) => (
            <li key={item.id} className="flex-1">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`relative w-full flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-white/10 text-white scale-105 shadow-lg shadow-purple-500/20"
                    : "text-blue-100/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-300 rounded-full nav-glow"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <header className="sm:hidden sticky top-0 z-40 w-full py-3 px-4 flex items-center justify-between bg-purple-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="text-amber-300" />
          <h1 className="text-xl font-semibold tracking-wider">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              DreamWeaver
            </span>
          </h1>
        </div>
        <div>
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="cursor-pointer px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-sm"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={openConnectModal}
              className="cursor-pointer px-3 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-sm"
            >
              Connect
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navigation;
