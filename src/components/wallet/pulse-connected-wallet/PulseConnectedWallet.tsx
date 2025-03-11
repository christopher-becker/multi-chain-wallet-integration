type PulseConnectedWalletProps = {
  classString?: string;
};
export default function PulseConnectedWallet(props: PulseConnectedWalletProps) {
  return (
    <span className={`relative flex size-3 ${props.classString}`}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-100"></span>
      <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
    </span>
  );
}
