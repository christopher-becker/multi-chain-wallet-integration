import { useEffect } from "react";
import useModalStore from "../../core/stores/modals.store";
import BaseModal from "./BaseModal";
import UtxoWallet from "../wallet/UtxoWallet";
import { useBitcoinWallet } from "../../core/context/BitcoinWallet.context";

export default function BitcoinOptionsModal() {
  const { setIsBitcoinOptionsModalVisible } = useModalStore((state) => state);

  // BITCOIN Connection
  const { isConnected, address } = useBitcoinWallet();

  const handleCloseModal = () => {
    setIsBitcoinOptionsModalVisible(false);
  };

  useEffect(() => {
    if (isConnected) {
      handleCloseModal();
    }
  }, [isConnected, address]);

  return (
    <BaseModal handle={handleCloseModal}>
      <UtxoWallet />
    </BaseModal>
  );
}
