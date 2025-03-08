import { useSolanaWalletConnection } from "../../../core/hooks/useSolanaWalletConnection";
import { useWalletConnection } from "../../../core/hooks/useWalletConnection";
import useModalStore from "../../../core/stores/modals.store";
import { SiEthereum, SiSolana } from "react-icons/si";
import StateConnectButton from "./StateConnectButton";

export default function ConnectButton() {
  const { setIsWagmiOptionsModalVisible, setIsSolanaOptionsModalVisible } =
    useModalStore((store) => store);
  const { isConnected, address, disconnect } = useWalletConnection();
  const {
    isConnected: isSolanaConnected,
    address: solanaAddress,
    disconnect: solanaDisconnect,
  } = useSolanaWalletConnection();
  return (
    <div>
      {/* Wagmi Button State */}
      <StateConnectButton
        address={address}
        isConnected={isConnected}
        coinIcon={<SiEthereum />}
        disconnect={disconnect}
        openModal={setIsWagmiOptionsModalVisible}
      />

      {/* Solana Button State */}
      <StateConnectButton
        address={solanaAddress}
        isConnected={isSolanaConnected}
        coinIcon={<SiSolana />}
        disconnect={solanaDisconnect}
        openModal={setIsSolanaOptionsModalVisible}
      />
    </div>
  );
}
