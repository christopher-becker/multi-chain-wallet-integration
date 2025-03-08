import { useEffect } from "react";
import useModalStore from "../../core/stores/modals.store";
import BaseModal from "./BaseModal";
import { useSolanaWalletConnection } from "../../core/hooks/useSolanaWalletConnection";
import SolanaWallet from "../wallet/SolanaWallet";

export default function SolanaOptionsModal() {
  const { setIsSolanaOptionsModalVisible } = useModalStore((state) => state);
  const { status } = useSolanaWalletConnection();

  const handleCloseModal = () => {
    setIsSolanaOptionsModalVisible(false);
  };

  useEffect(() => {
    console.log(status);
    if (status === "connected") {
      handleCloseModal();
    }
  }, [status]);

  return (
    <BaseModal handle={handleCloseModal}>
      <SolanaWallet />
    </BaseModal>
  );
}
