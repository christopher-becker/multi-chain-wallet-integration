import { useEffect } from "react";
import useModalStore from "../../core/stores/modals.store";
import WagmiWallet from "../wallet/WagmiWallet";
import BaseModal from "./BaseModal";
import { useWalletConnection } from "../../core/hooks/useWalletConnection";

export default function WagmiOptionsModal() {
  const { setIsWagmiOptionsModalVisible } = useModalStore((state) => state);
  const { isConnected } = useWalletConnection();

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
