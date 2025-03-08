type BaseModalProps = React.PropsWithChildren<{
  handle: () => void;
}>;

export default function BaseModal(props: BaseModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-blue-500/50 z-10 backdrop-blur-xs"
      onClick={props.handle}
      aria-modal="true"
      role="dialog"
    >
      <button
        onClick={props.handle}
        aria-label="Close modal"
        className="fixed top-2 right-2"
      >
        ✕
      </button>
      <div
        className="rounded-2xl bg-white p-6 min-w-[300px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}
