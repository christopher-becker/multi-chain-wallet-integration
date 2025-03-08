import { useUtxoWallet } from "../../core/hooks/useUtxoWallet";

export default function UtxoWallet() {
  const { utxoAddress } = useUtxoWallet();

  return (
    <div>
      <h2>UTXO (Bitcoin)</h2>
      <p>Address: {utxoAddress || "Generating..."}</p>
    </div>
  );
}
