import {
  useActiveWallet,
  TransactionButton,
} from "thirdweb/react";
import { monadTestnet } from "thirdweb/chains";
import { contractConfig, mintMetadata } from "../config";
import type { PreparedTransaction } from "thirdweb";

export function MintButton() {
  const wallet = useActiveWallet();
  const priceEth = mintMetadata.priceEth ?? "0";
  const pricePerToken = BigInt(Number(priceEth) * 10 ** 18); // konversi ETH ke wei

  return (
    <TransactionButton
      transaction={async () => {
        if (!wallet)
          throw new Error("Connect wallet dulu!");
        // Siapkan kontrak, ABI dan args sesuai claim
        /* TIDAK gunakan useContract [sudah TIDAK tersedia].
         * Koneksi kontrak dan prepare dipanggil otomatis oleh TransactionButton
         * Argumen sesuai ABI claim kamu:
         * address receiver, uint256 quantity, address currency, uint256 price, allowlistProof struct, bytes data
         */
        return {
          // ! Penting: TransactionButton v5 sekarang hanya perlu tujuannya (contract address) dan method + params
          contractAddress: contractConfig.address,
          chain: monadTestnet,
          method: "claim",
          params: [
            wallet.address, // penerima
            1n, // quantity
            "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // native ETH/Mon
            pricePerToken, // harga ETH per NFT (dalam wei)
            // struct allowlistProof, kosongkan
            {
              proof: [],
              quantityLimitPerWallet: 0n,
              pricePerToken: 0n,
              currency:
                "0x0000000000000000000000000000000000000000",
            },
            "0x", // data kosong (bytes)
          ],
          abi: contractConfig.abi,
        } satisfies PreparedTransaction;
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
