import PulseConnectedWallet from "../../../../components/wallet/pulse-connected-wallet/PulseConnectedWallet";
import WalletIcon from "../../../../components/wallet/WalletIcon";
import { formatAddress } from "../../../../core/utils/formatAddress.util";

type StateConnectionButtonProps = {
  isConnected: boolean;
  address: string | null | undefined;
  openModal: (data: boolean) => void;
  disconnect: () => void;
  coinIcon: React.ReactNode;
  title: string;
  balance: React.ReactNode;
};

export default function StateConnectButton(props: StateConnectionButtonProps) {
  return (
    <>
      {props.isConnected && props.address ? (
        <div className="flex flex-col gap-4 p-4 rounded-3xl bg-gray-900/50 border border-white/5 relative">
          <div className="flex gap-4 items-center">
            <WalletIcon>{props.coinIcon}</WalletIcon>
            <PulseConnectedWallet />
            {formatAddress(props.address)}
          </div>
          <div>{props.balance}</div>
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
          data-testid="state-connect-button"
        >
          <WalletIcon>{props.coinIcon}</WalletIcon>
          {props.title}
        </button>
      )}
    </>
  );
}
