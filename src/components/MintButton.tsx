import {
  TransactionButton,
  useActiveWallet,
  useContract,
} from "thirdweb/react";
import { monadTestnet } from "thirdweb/chains";
import { contractConfig, mintMetadata } from "../config";
import { prepareContractCall } from "thirdweb";
import type { Abi } from "viem";

export function MintButton() {
  const wallet = useActiveWallet();
  // Tidak perlu useContract; cukup ambil address dan abi dari config
  const pricePerToken = BigInt(
    Number(mintMetadata.priceEth ?? "0") * 10 ** 18,
  );

  return (
    <TransactionButton
      chain={monadTestnet}
      // transaction harus PREPARED!
      transaction={() => {
        if (!wallet)
          throw new Error("Connect wallet dulu!");
        return prepareContractCall({
          contractAddress: contractConfig.address,
          abi: contractConfig.abi as Abi,
          method: "claim",
          params: [
            wallet.address,
            1n,
            "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            pricePerToken,
            {
              proof: [],
              quantityLimitPerWallet: 0n,
              pricePerToken: 0n,
              currency:
                "0x0000000000000000000000000000000000000000",
            },
            "0x",
          ],
        });
      }}
      onTransactionConfirmed={() => alert("Mint sukses!")}
      onError={(err: any) =>
        alert("Mint gagal: " + err.message)
      }
      theme="dark"
    >
      Mint NFT
    </TransactionButton>
  );
}
