// import React, { useState } from "react";
// import {
//   Star,
//   ArrowRight,
//   Shield,
//   Sparkles,
//   X,
//   User,
//   Percent,
//   DollarSign,
//   FileText,
//   Layers,
//   Globe,
//   BadgeCheck,
//   RefreshCw,
//   Copy,
//   Check,
//   Share2,
//   Lock,
//   Unlock,
//   Users as UsersIcon,
//   Repeat2,
// } from "lucide-react";
// import { ProductionResponse } from "../../types";
// import { IpMetadata } from "@story-protocol/core-sdk";
// import { uploadJSONToIPFS } from "../../../../storyservice/utils/functions/uploadToIpfs";
// import { client } from "../../../../storyservice/utils/config";
// import { SPGNFTContractAddress } from "../../../../storyservice/utils/utils";
// import { useUpdateProduction } from "../../../../hooks/useProduction";
// import { ProfileResp } from "../../types";
// import { createLicenseTerms } from "./License/PilFlavours";
// import { LicenseTerms } from "@story-protocol/core-sdk";
// import { toHex } from "viem";
// import { keccak256 } from "viem";

// // PIL Flavor Types
// type PILFlavor =
//   | "nonCommercialSocialRemix"
//   | "commercialUse"
//   | "commercialRemix"
//   | "creativeCommons";

// interface MintDreamProps {
//   story?: ProductionResponse;
//   profile: ProfileResp;
//   onClose?: () => void;
// }

// const MintAndRegisterIP: React.FC<MintDreamProps> = ({
//   story,
//   profile,
//   onClose,
// }) => {
//   const [mintingStage, setMintingStage] = useState(0);
//   const [legalName, setLegalName] = useState(profile.user.username || "");
//   const [mintingFee, setMintingFee] = useState(0.1);
//   const [revShare, setRevShare] = useState(10);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedFlavor, setSelectedFlavor] =
//     useState<PILFlavor>("commercialRemix");
//   const [isCopied, setIsCopied] = useState(false);
//   const [ipDetails, setIpDetails] = useState<{
//     ipId?: string;
//     licenseTermsIds?: string[];
//     tokenId?: string;
//   }>({});

//   const { mutate: updateProduction } = useUpdateProduction();

//   const handleMintFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseFloat(e.target.value);
//     if (!isNaN(value) && value >= 0) {
//       setMintingFee(value);
//     }
//   };

//   const handleRevShareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value);
//     if (!isNaN(value) && value >= 0 && value <= 100) {
//       setRevShare(value);
//     }
//   };

//   const getFirstSceneComicImage = (): any => {
//     if (story?.visuals) {
//       const flatVisuals = Array.isArray(story.visuals)
//         ? story.visuals[0]
//         : story.visuals;
//       return (
//         flatVisuals?.generatedImages.find((img: any) =>
//           img.style.toLowerCase().includes("comic")
//         ) || null
//       );
//     }
//     return null;
//   };

//   const image = getFirstSceneComicImage();
//   const cid = image?.ipfsHash;
//   const imageUrl = `https://jade-peaceful-macaw-761.mypinata.cloud/ipfs/${cid}`;

//   const startMinting = async () => {
//     setIsLoading(true);
//     setMintingStage(1);

//     try {
//       // Validate required fields
//       if (!SPGNFTContractAddress) {
//         throw new Error("SPG NFT Contract Address is not configured");
//       }
//       if (!story?._id) {
//         throw new Error("Story ID is missing");
//       }
//       if (!profile?.user?.username) {
//         throw new Error("Profile username is missing");
//       }

//       const ipMetadata: IpMetadata = {
//         name: story?.story?.title || "Untitled Story",
//         description: story?.story?.synopsis || "",
//         image: imageUrl,
//         mediaUrl: imageUrl,
//         mediaHash: cid || "",
//         mediaType: "image/png",
//         properties: {
//           creator: profile.user.username,
//           createdAt: new Date().toISOString(),
//           address: "0xA2f9Cf1E40D7b03aB81e34BC50f0A8c67B4e9112",
//         },
//       };

//       const nftMetadata = {
//         name: story?.story?.title || "Untitled Story",
//         description: story?.story?.synopsis || "",
//         image: imageUrl,
//         attributes: [
//           {
//             trait_type: "Creator",
//             value: profile.user.username,
//           },
//           {
//             trait_type: "Source",
//             value: "DreamWeaver",
//           },
//         ],
//       };

//       console.log("Uploading metadata to IPFS...");
//       const [ipIpfsHash, nftIpfsHash] = await Promise.all([
//         uploadJSONToIPFS(ipMetadata),
//         uploadJSONToIPFS(nftMetadata),
//       ]);

//       console.log("IPFS hashes:", { ipIpfsHash, nftIpfsHash });

//       // Generate hashes
//       const ipHash = keccak256(toHex(JSON.stringify(ipMetadata)));
//       const nftHash = keccak256(toHex(JSON.stringify(nftMetadata)));

//       console.log("Selected PIL flavor:", selectedFlavor);
//       const licenseTerms = createLicenseTerms(
//         selectedFlavor,
//         mintingFee,
//         revShare
//       ) as LicenseTerms;

//       console.log("License terms:", licenseTerms);
//       console.log("SPG NFT Contract Address:", SPGNFTContractAddress);

//       const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
//         spgNftContract: SPGNFTContractAddress,
//         licenseTermsData: [{ terms: licenseTerms }],
//         ipMetadata: {
//           ipMetadataURI: `ipfs://${ipIpfsHash}`,
//           ipMetadataHash: ipHash,
//           nftMetadataURI: `ipfs://${nftIpfsHash}`,
//           nftMetadataHash: nftHash,
//         },
//         txOptions: { waitForTransaction: true },
//       });

//       // const response = await client.ipAsset.mintAndRegisterIpAssetWithPilTerms({
//       //   spgNftContract: SPGNFTContractAddress,
//       //   licenseTermsData: [{ terms: licenseTerms }],
//       //   ipMetadata: {
//       //     ipMetadataURI: `ipfs://${ipIpfsHash}`,
//       //     ipMetadataHash: ipHash,
//       //     nftMetadataURI: `ipfs://${nftIpfsHash}`,
//       //     nftMetadataHash: nftHash,
//       //   },
//       //   recipient: account.address, // Add this line - explicitly specify the recipient
//       //   txOptions: { waitForTransaction: true },
//       // });

//       console.log("Minting response:", response);

//       setIpDetails({
//         ipId: response.ipId,
//         licenseTermsIds: response.licenseTermsIds?.map(String) || [],
//         tokenId: response.tokenId?.toString(),
//       });

//       updateProduction(
//         {
//           id: story._id,
//           obj: {
//             ipRegistration: {
//               ipId: response.ipId,
//               status: "verified",
//               licenseTermsIds: response.licenseTermsIds?.join(","),
//               tokenId: response.tokenId,
//             },
//           },
//         },
//         {
//           onSuccess: () => setMintingStage(2),
//           onError: (err) => {
//             console.error("Database update error:", err);
//             setMintingStage(0);
//             alert("IP registered but failed to update database");
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Minting process failed:", error);
//       setMintingStage(0);
//       alert(
//         `IP registration failed: ${
//           error instanceof Error ? error : "Unknown error"
//         }`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };

//   const PILFlavorOption = ({
//     flavor,
//     title,
//     icon,
//     description,
//     allowsCommercial,
//     allowsDerivatives,
//     requiresFee,
//     requiresRevShare,
//   }: {
//     flavor: PILFlavor;
//     title: string;
//     icon: React.ReactNode;
//     description: string;
//     allowsCommercial: boolean;
//     allowsDerivatives: boolean;
//     requiresFee: boolean;
//     requiresRevShare: boolean;
//   }) => (
//     <div
//       className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
//         selectedFlavor === flavor
//           ? "border-purple-500 bg-purple-900/20"
//           : "border-gray-700 hover:border-gray-600"
//       }`}
//       onClick={() => setSelectedFlavor(flavor)}
//     >
//       <div className="flex items-start gap-3">
//         <div className="p-2 rounded-lg bg-gray-800/50">{icon}</div>
//         <div className="flex-1">
//           <div className="flex justify-between items-start">
//             <h4 className="font-medium text-white">{title}</h4>
//             <div className="flex gap-1">
//               <span
//                 className={`text-xs px-2 py-1 rounded ${
//                   allowsCommercial
//                     ? "bg-green-900/30 text-green-400"
//                     : "bg-red-900/30 text-red-400"
//                 }`}
//               >
//                 {allowsCommercial ? "Commercial" : "Non-Commercial"}
//               </span>
//               <span
//                 className={`text-xs px-2 py-1 rounded ${
//                   allowsDerivatives
//                     ? "bg-blue-900/30 text-blue-400"
//                     : "bg-amber-900/30 text-amber-400"
//                 }`}
//               >
//                 {allowsDerivatives ? "Remix Allowed" : "No Remixing"}
//               </span>
//             </div>
//           </div>
//           <p className="text-xs text-gray-400 mt-1">{description}</p>

//           {selectedFlavor === flavor && (
//             <div className="mt-3 pt-3 border-t border-gray-700/50">
//               <div className="flex items-center justify-between text-xs">
//                 <span className="text-gray-400">Minting Fee:</span>
//                 <span className="font-medium">
//                   {requiresFee ? `${mintingFee} ETH` : "Free"}
//                 </span>
//               </div>
//               {requiresRevShare && (
//                 <div className="flex items-center justify-between text-xs mt-1">
//                   <span className="text-gray-400">Revenue Share:</span>
//                   <span className="font-medium">{revShare}%</span>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="relative flex flex-col w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
//       <div className="relative p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-gray-800">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
//         >
//           <X size={18} />
//         </button>

//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-lg bg-white/10">
//             <Layers size={24} className="text-purple-400" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-white">Register Your IP</h2>
//             <p className="text-sm text-purple-200">
//               Secure your creative work with Story Protocol
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="p-6">
//         {mintingStage === 0 && (
//           <div className="space-y-6">
//             <div className="relative rounded-xl overflow-hidden border border-gray-800">
//               <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center">
//                 {imageUrl ? (
//                   <img
//                     src={imageUrl}
//                     alt={story?.story?.title || "Story cover"}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="text-center p-4">
//                     <Sparkles
//                       className="mx-auto text-amber-300/70 mb-3"
//                       size={28}
//                     />
//                     <h3 className="text-lg font-semibold text-white mb-1">
//                       {story?.story?.title || "Untitled Story"}
//                     </h3>
//                     <p className="text-sm text-gray-400 max-w-md">
//                       {story?.story?.synopsis || "No description provided"}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
//                   <User size={16} className="text-purple-400" />
//                   Legal Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-3 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
//                   value={legalName}
//                   onChange={(e) => setLegalName(e.target.value)}
//                   placeholder="Your legal name for IP registration"
//                   required
//                 />
//               </div>

//               <div className="space-y-4">
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
//                   <FileText size={16} className="text-amber-400" />
//                   License Type
//                 </label>
//                 <div className="grid grid-cols-1 gap-3">
//                   <PILFlavorOption
//                     flavor="nonCommercialSocialRemix"
//                     title="Non-Commercial Social Remix"
//                     icon={<UsersIcon size={18} className="text-green-400" />}
//                     description="Free remixing with attribution (like TikTok)"
//                     allowsCommercial={false}
//                     allowsDerivatives={true}
//                     requiresFee={false}
//                     requiresRevShare={false}
//                   />

//                   <PILFlavorOption
//                     flavor="commercialUse"
//                     title="Commercial Use"
//                     icon={<DollarSign size={18} className="text-blue-400" />}
//                     description="Paid commercial use without remixing (like Shutterstock)"
//                     allowsCommercial={true}
//                     allowsDerivatives={false}
//                     requiresFee={true}
//                     requiresRevShare={false}
//                   />

//                   <PILFlavorOption
//                     flavor="commercialRemix"
//                     title="Commercial Remix"
//                     icon={<Repeat2 size={18} className="text-purple-400" />}
//                     description="Paid remixing with revenue sharing"
//                     allowsCommercial={true}
//                     allowsDerivatives={true}
//                     requiresFee={true}
//                     requiresRevShare={true}
//                   />

//                   <PILFlavorOption
//                     flavor="creativeCommons"
//                     title="Creative Commons"
//                     icon={<Globe size={18} className="text-amber-400" />}
//                     description="Free remixing and commercial use with attribution"
//                     allowsCommercial={true}
//                     allowsDerivatives={true}
//                     requiresFee={false}
//                     requiresRevShare={false}
//                   />
//                 </div>
//               </div>

//               {(selectedFlavor === "commercialUse" ||
//                 selectedFlavor === "commercialRemix") && (
//                 <div className="grid grid-cols-2 gap-4 pt-2">
//                   <div>
//                     <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
//                       <DollarSign size={16} className="text-green-400" />
//                       Minting Fee (ETH)
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         min="0"
//                         step="0.01"
//                         className="w-full p-3 pl-10 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
//                         value={mintingFee}
//                         onChange={handleMintFeeChange}
//                         disabled={
//                           selectedFlavor === "commercialUse" ||
//                           selectedFlavor === "commercialRemix"
//                         }
//                         //     disabled={selectedFlavor === "" ||
//                         //  selectedFlavor === "creativeCommons"}
//                       />
//                       <span className="absolute left-3 top-3 text-gray-400">
//                         Ξ
//                       </span>
//                     </div>
//                   </div>

//                   {selectedFlavor === "commercialRemix" && (
//                     <div>
//                       <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
//                         <Percent size={16} className="text-blue-400" />
//                         Revenue Share (%)
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="number"
//                           min="0"
//                           max="100"
//                           className="w-full p-3 pl-10 rounded-lg bg-gray-800/50 text-white border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
//                           value={revShare}
//                           onChange={handleRevShareChange}
//                         />
//                         <span className="absolute left-3 top-3 text-gray-400">
//                           %
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={startMinting}
//               disabled={isLoading || !legalName}
//               className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
//                 isLoading || !legalName
//                   ? "bg-gray-800 text-gray-500 cursor-not-allowed"
//                   : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white"
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <RefreshCw size={16} className="animate-spin" />
//                   Preparing...
//                 </>
//               ) : (
//                 <>
//                   <Lock size={16} />
//                   Register IP Asset
//                   <ArrowRight size={16} />
//                 </>
//               )}
//             </button>
//           </div>
//         )}

//         {mintingStage === 1 && (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="mb-6 animate-pulse">
//               <Sparkles size={48} className="text-purple-400" />
//             </div>
//             <h3 className="text-xl font-bold text-white mb-2">
//               Registering Your IP
//             </h3>
//             <p className="text-gray-400 text-center max-w-md">
//               Securing your creative work on the blockchain. This may take a
//               moment...
//             </p>
//             <div className="w-full bg-gray-800 rounded-full h-2.5 mt-8">
//               <div className="bg-gradient-to-r from-purple-500 to-blue-400 h-2.5 rounded-full animate-pulse" />
//             </div>
//           </div>
//         )}

//         {mintingStage === 2 && (
//           <div className="flex flex-col items-center text-center py-8">
//             <div className="p-4 bg-green-900/30 rounded-full mb-6 border border-green-800/50">
//               <BadgeCheck size={48} className="text-green-400" />
//             </div>

//             <h3 className="text-2xl font-bold text-white mb-2">
//               IP Registered Successfully!
//             </h3>
//             <p className="text-gray-400 mb-6 max-w-md">
//               Your creative work is now protected on the blockchain with Story
//               Protocol.
//             </p>

//             <div className="w-full space-y-4 mb-6">
//               <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm text-gray-400">IP ID:</span>
//                   <button
//                     onClick={() => copyToClipboard(ipDetails.ipId || "")}
//                     className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300"
//                   >
//                     {isCopied ? (
//                       <>
//                         <Check size={14} />
//                         Copied!
//                       </>
//                     ) : (
//                       <>
//                         <Copy size={14} />
//                         Copy
//                       </>
//                     )}
//                   </button>
//                 </div>
//                 <p className="text-sm font-mono text-white break-all">
//                   {ipDetails.ipId}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
//                   <span className="text-xs text-gray-400">License Type</span>
//                   <p className="text-sm font-medium text-white mt-1 capitalize">
//                     {selectedFlavor.replace(/([A-Z])/g, " $1").trim()}
//                   </p>
//                 </div>
//                 <div className="p-3 bg-gray-800/30 rounded-lg border border-gray-700">
//                   <span className="text-xs text-gray-400">License ID</span>
//                   <p className="text-sm font-medium text-white mt-1">
//                     {ipDetails.licenseTermsIds?.[0]?.substring(0, 6)}...
//                     {ipDetails.licenseTermsIds?.[0]?.substring(
//                       ipDetails.licenseTermsIds[0].length - 4
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3 w-full">
//               <button
//                 onClick={() => {
//                   // View on blockchain explorer
//                   window.open(
//                     `https://explorer.storyprotocol.xyz/ipa/${ipDetails.ipId}`,
//                     "_blank"
//                   );
//                 }}
//                 className="py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center gap-2"
//               >
//                 <Globe size={16} />
//                 View Details
//               </button>
//               <button
//                 onClick={onClose}
//                 className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white flex items-center justify-center gap-2"
//               >
//                 <Share2 size={16} />
//                 Share
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MintAndRegisterIP;
