import { useEffect } from "react";
import useModalStore from "../../core/stores/modals.store";
import WagmiWallet from "../wallet/WagmiWallet";
import BaseModal from "./BaseModal";
import { useEthWalletConnection } from "../../core/context/EthereumWalletConnection.context";

export default function WagmiOptionsModal() {
  const { setIsWagmiOptionsModalVisible } = useModalStore((state) => state);
  const { isConnected } = useEthWalletConnection();

  const handleCloseModal = () => {
    setIsWagmiOptionsModalVisible(false);
  };

  useEffect(() => {
    if (isConnected) {
      handleCloseModal();
    }
  }, [isConnected]);

  return (
    <BaseModal handle={handleCloseModal}>
      <WagmiWallet />
    </BaseModal>
  );
}
