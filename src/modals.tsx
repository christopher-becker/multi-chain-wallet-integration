import BitcoinOptionsModal from "./components/modal/BitcoinOptionsModal";
import SolanaOptionsModal from "./components/modal/SolanaOptionsModal";
import WagmiOptionsModal from "./components/modal/WagmiOptionsModal";
import useModalStore from "./core/stores/modals.store";

export default function Modals() {
  const {
    isWagmiOptionsModalVisible,
    isSolanaOptionsModalVisible,
    isBitcoinOptionsModalVisible,
  } = useModalStore((state) => state);
  return (
    <>
      {isWagmiOptionsModalVisible && <WagmiOptionsModal />}
      {isSolanaOptionsModalVisible && <SolanaOptionsModal />}
      {isBitcoinOptionsModalVisible && <BitcoinOptionsModal />}
    </>
  );
}
