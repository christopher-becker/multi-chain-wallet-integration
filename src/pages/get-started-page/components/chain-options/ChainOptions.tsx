import { SiBitcoin, SiEthereum, SiSolana } from "react-icons/si";
import StateConnectButton from "./StateConnectButton";
import WalletBalance from "../../../../components/wallet/WalletBalance";
import useModalStore from "../../../../core/stores/modals.store";
import { useBitcoinWallet } from "../../../../core/context/BitcoinWallet.context";
import { useEthWalletConnection } from "../../../../core/context/EthereumWalletConnection.context";
import { useSolanaWallet } from "../../../../core/context/SolanaWalletConnection.context";

export default function ChainOptions() {
  const {
    setIsWagmiOptionsModalVisible,
    setIsSolanaOptionsModalVisible,
    setIsBitcoinOptionsModalVisible,
  } = useModalStore((store) => store);

  // ETHEREUM Connection
  const { isConnected, address, disconnect } = useEthWalletConnection();

  // SOLANA Connection
  const {
    isConnected: isSolanaConnected,
    address: solanaAddress,
    disconnect: solanaDisconnect,
    balance: solanaBalance,
  } = useSolanaWallet();

  // BITCOIN Connection
  const {
    disconnect: bitcoinDisconnect,
    isConnected: isBitcoinConnected,
    address: bitcoinAddress,
    balance: bitcoinBalance,
  } = useBitcoinWallet();

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

      {/* Bitcoin Button State */}
      <StateConnectButton
        address={bitcoinAddress}
        isConnected={isBitcoinConnected}
        coinIcon={<SiBitcoin />}
        disconnect={bitcoinDisconnect}
        openModal={setIsBitcoinOptionsModalVisible}
        title={"Bitcoin"}
        balance={<>{bitcoinBalance ?? "Fetching balance ..."}</>}
      />
    </div>
  );
}
