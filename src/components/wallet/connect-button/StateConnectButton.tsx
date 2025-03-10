import { formatAddress } from "../../../core/utils/formatAddress.util";
import WalletIcon from "../WalletIcon";

type StateConnectionButtonProps = {
  isConnected: boolean;
  address: string | null;
  openModal: (data: boolean) => void;
  disconnect: () => void;
  coinIcon: React.ReactNode;
  title: string;
};

export default function StateConnectButton(props: StateConnectionButtonProps) {
  return (
    <>
      {props.isConnected && props.address ? (
        <div className="flex flex-col gap-4 p-4 rounded-3xl border border-gray-600">
          <div className="flex gap-4 items-center">
            <WalletIcon>{props.coinIcon}</WalletIcon>
            {formatAddress(props.address)}
          </div>
          <div>Balance: 0.5ETH</div>
          <button
            className="btn-secondary justify-center"
            onClick={() => props.disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={() => props.openModal(true)}
          className="btn-secondary flex items-center gap-4"
        >
          <WalletIcon>{props.coinIcon}</WalletIcon>
          {props.title}
        </button>
      )}
    </>
  );
}
