import useWalletStore from "./core/stores/store";

function App() {
  const { address } = useWalletStore((state) => state);
  return (
    <>
      <h1 className="text-4xl">multi-chain-wallet-integration</h1>
      <p>{address ?? "No Account Yet."}</p>
    </>
  );
}

export default App;
