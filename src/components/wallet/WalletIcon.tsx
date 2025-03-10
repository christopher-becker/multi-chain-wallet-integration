type WalletIconProps = React.PropsWithChildren<{}>;
export default function WalletIcon(props: WalletIconProps) {
  return (
    <span className="h-6 w-6 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center -ml-1 shadow shadow-cyan-700">
      {props.children}
    </span>
  );
}
