import type { Abi, Address } from "viem";
import { monadTestnet } from "viem/chains";

export const mintMetadata = {
  name: "Monad Mini Mint",
  description:
    "A simple example of an onchain action in a Farcaster mini app on Monad Testnet. Tap the button below to mint this image. This mini build is built upon horsefacts.eth & portdev.eth original example. <3",
  imageUrl: "https://mint-alimon.vercel.app/nft.png",
  creator: {
    name: "gotlop.eth",
    fid: 540118,
    profileImageUrl: "https://imgur.com/a/YeFAV11",
  },
  chain: "Monad Testnet",
  priceEth: "0.2",
  startsAt: null,
  endsAt: null,
  isMinting: true,
} as const;

export const contractConfig = {
  address:
    "0xc081F5FEE2939532097d8afAb1d94fD96062eD8a" as Address,
  chain: monadTestnet,
  abi: [
    /* MASUKKAN ABI ASLI full di sini */
  ] as Abi,
} as const;

export const embedConfig = {
  version: "next",
  imageUrl: "https://mint-alimon.vercel.app/nft.png",
  button: {
    title: "Mint",
    action: {
      type: "launch_frame",
      name: "NFT Mint",
      url: "https://mint-alimon.vercel.app/icon.png",
    },
  },
} as const;

export const config = {
  ...mintMetadata,
  contract: contractConfig,
  embed: embedConfig,
} as const;
