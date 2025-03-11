import { useEffect } from "react";
import useModalStore from "../../core/stores/modals.store";
import BaseModal from "./BaseModal";
import SolanaWallet from "../wallet/SolanaWallet";
import { useSolanaWallet } from "../../core/context/SolanaWalletConnection.context";

export default function SolanaOptionsModal() {
  const { setIsSolanaOptionsModalVisible } = useModalStore((state) => state);
  const { status } = useSolanaWallet();

  const handleCloseModal = () => {
    setIsSolanaOptionsModalVisible(false);
  };

  useEffect(() => {
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
