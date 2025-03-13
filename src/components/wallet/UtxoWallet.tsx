import { useBitcoinWallet } from "../../core/context/BitcoinWallet.context";
import { DefaultWalletImage } from "../image/app-images/AppImages";
import ImageWithFallback from "../image/image-with-fallback";

export default function UtxoWallet() {
  const { connect, isConnected, error, isPending } = useBitcoinWallet();

  return (
    <div className="flex flex-col gap-4">
      <h2>{isPending ? "Connecting..." : "Connect"} Bitcoin</h2>
      {!isConnected && (
        <button
          onClick={connect}
          disabled={isPending}
          className="btn-secondary !px-2"
        >
          <ImageWithFallback
            src={"SiBitcoin"}
            alt={"Bitcoin"}
            className="w-6 h-6 rounded-full bg-gray-100"
            fallbackSrc={DefaultWalletImage().props.src}
            loading="lazy"
          />
          Connect
        </button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
