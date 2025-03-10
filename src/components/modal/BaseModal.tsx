type BaseModalProps = React.PropsWithChildren<{
  handle: () => void;
}>;

export default function BaseModal(props: BaseModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-950/90 z-10 backdrop-blur-xs"
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
        className="rounded-2xl bg-gray-950 p-6 w-80 min-h-80 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
}
