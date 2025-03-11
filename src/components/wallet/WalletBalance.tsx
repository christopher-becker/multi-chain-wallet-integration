import { formatEther } from "viem";
import { useEthWalletConnection } from "../../core/context/EthereumWalletConnection.context";

export default function WalletBalance() {
  const { balance } = useEthWalletConnection();
  if (balance.isLoading) return <>Fetching balance ...</>;
  if (balance.error) return <>Error fetching balance.</>;
  const formattedBalance = balance.data?.value
    ? formatEther(balance.data.value)
    : "0";
  return <>{formattedBalance}</>;
}
