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
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "burn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_receiver",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_quantity",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "_currency",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_pricePerToken",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "bytes32[]",
              name: "proof",
              type: "bytes32[]",
            },
            {
              internalType: "uint256",
              name: "quantityLimitPerWallet",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "pricePerToken",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "currency",
              type: "address",
            },
          ],
          internalType:
            "struct IClaimConditionV2.AllowlistProof",
          name: "_allowlistProof",
          type: "tuple",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "claim",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    // ... tambahkan semua entri fungsi dari "ABI read-only" dan "write" di atas dengan pola ini ...
    // Jika mau cuma claim saja, cukup cukupkan ygn approve, claim, dll. Tapi agar tidak error, ABI lengkap lebih baik.
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

