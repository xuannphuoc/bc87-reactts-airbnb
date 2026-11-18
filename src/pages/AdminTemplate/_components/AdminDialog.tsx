import { useEffect, useId, useRef, type ReactNode } from "react";
import { HiX } from "react-icons/hi";

export default function AdminDialog({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className="admin-dialog"
      data-wide={wide}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <header className="flex items-center justify-between gap-4 px-5 py-4">
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        >
          <HiX size={20} />
        </button>
      </header>
      {children}
    </dialog>
  );
}
