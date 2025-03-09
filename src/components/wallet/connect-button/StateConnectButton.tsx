type StateConnectionButtonProps = {
  isConnected: boolean;
  address: string | null;
  openModal: (data: boolean) => void;
  disconnect: () => void;
  coinIcon: React.ReactNode;
};

export default function StateConnectButton(props: StateConnectionButtonProps) {
  return (
    <>
      {props.isConnected ? (
        <>
          <p>
            {props.coinIcon}
            {props.address}
          </p>
          <button className="btn-primary" onClick={() => props.disconnect()}>
            Disconnect
          </button>
        </>
      ) : (
        <button onClick={() => props.openModal(true)}>{props.coinIcon}</button>
      )}
    </>
  );
}
