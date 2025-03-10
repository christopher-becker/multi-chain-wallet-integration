import { useSolanaWalletConnection } from "../../../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../../../core/hooks/useWalletConnection";
import useModalStore from "../../../core/stores/modals.store";
import { SiEthereum, SiSolana } from "react-icons/si";
import StateConnectButton from "./StateConnectButton";
import WalletBalance from "../WalletBalance";

export default function ConnectButton() {
  const { setIsWagmiOptionsModalVisible, setIsSolanaOptionsModalVisible } =
    useModalStore((store) => store);

  // ETHEREUM Connection
  const { isConnected, address, disconnect } = useWalletConnection();

  // SOLANA Connection
  const {
    isConnected: isSolanaConnected,
    address: solanaAddress,
    disconnect: solanaDisconnect,
    balance: solanaBalance,
  } = useSolanaWalletConnection();

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Wagmi Button State */}
      <StateConnectButton
        address={address}
        isConnected={isConnected}
        coinIcon={<SiEthereum />}
        disconnect={disconnect}
        openModal={setIsWagmiOptionsModalVisible}
        title={"Ethereum"}
        balance={<WalletBalance />}
      />

      {/* Solana Button State */}
      <StateConnectButton
        address={solanaAddress}
        isConnected={isSolanaConnected}
        coinIcon={<SiSolana />}
        disconnect={solanaDisconnect}
        openModal={setIsSolanaOptionsModalVisible}
        title={"Solana"}
        balance={<>{solanaBalance ?? "Fetching balance ..."}</>}
      />
    </div>
  );
}
