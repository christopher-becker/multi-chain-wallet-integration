import { useEffect } from "react";
import useModalStore from "../../core/stores/modals.store";
import WagmiWallet from "../wallet/WagmiWallet";
import BaseModal from "./BaseModal";
import { useWalletConnection } from "../../core/hooks/useWalletConnection";

export default function WagmiOptionsModal() {
  const { setIsWagmiOptionsModalVisible } = useModalStore((state) => state);
  const { status } = useWalletConnection();

  const handleCloseModal = () => {
    setIsWagmiOptionsModalVisible(false);
  };

  useEffect(() => {
    if (status === "success") {
      handleCloseModal();
    }
  }, [status]);

  return (
    <BaseModal handle={handleCloseModal}>
      <WagmiWallet />
    </BaseModal>
  );
}
