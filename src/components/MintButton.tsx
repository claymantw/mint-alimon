import {
  TransactionButton,
  useContract,
  useActiveWallet,
} from "thirdweb/react";
import { monadTestnet } from "thirdweb/chains";
import { contractConfig } from "../config";

export function MintButton() {
  const { contract } = useContract({
    address: contractConfig.address,
    chain: monadTestnet,
    abi: contractConfig.abi,
  });
  const { data: wallet } = useActiveWallet();

  return (
    <TransactionButton
      transaction={async () => {
        if (!wallet)
          throw new Error("Connect wallet dulu!");
        const quantity = 1n;
        const currency =
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        const pricePerToken = BigInt(
          Number(contractConfig.priceEth ?? "0") * 10 ** 18,
        );
        const allowlistProof = {
          proof: [],
          quantityLimitPerWallet: 0n,
          pricePerToken: 0n,
          currency:
            "0x0000000000000000000000000000000000000000",
        };
        const data = "0x";
        return contract.prepare("claim", [
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
