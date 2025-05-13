import {
  TransactionButton,
  useContract,
  useActiveWallet,
} from "thirdweb/react";
import { monadTestnet } from "thirdweb/chains";
import { contractConfig } from "../config";

/**
 * MintButton — Untuk OpenEditionERC721 custom (bukan Drop) HARUS memakai TransactionButton,
 * dengan fungsi transaction={...} yang memanggil method claim pada contract.
 */
export function MintButton() {
  // Dapatkan instance contract dan wallet user
  const { contract } = useContract({
    address: contractConfig.address,
    chain: monadTestnet,
    abi: contractConfig.abi,
  });
  const { data: wallet } = useActiveWallet();

  return (
    <TransactionButton
      transaction={async () => {
        // Dynamic params: claim(target, qty, currency, price, allowlistProof, data)
        const quantity = 1n; // default mint 1
        const currency =
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"; // native token
        const pricePerToken = BigInt(
          Number(contractConfig.pricePublic) * 10 ** 18,
        ); // ganti dp config (jika ada di config), default 0n = gratis
        // parameter allowlistProof bisa diisi default kosong
        const allowlistProof = {
          proof: [],
          quantityLimitPerWallet: 0n,
          pricePerToken: 0n,
          currency:
            "0x0000000000000000000000000000000000000000",
        };
        // data: kosongkan bytes
        const data = "0x";
        if (!wallet)
          throw new Error("Connect wallet dulu!");
        return contract?.prepare("claim", [
          wallet.address,
          quantity,
          currency,
          pricePerToken,
          allowlistProof,
          data,
        ]);
      }}
      onTransactionConfirmed={() => alert("Mint sukses!")}
      onError={(err) => alert("Mint gagal: " + err.message)}
    >
      Mint NFT
    </TransactionButton>
  );
}
