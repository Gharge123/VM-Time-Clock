import React from "react";
import { X } from "lucide-react";
export default function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/60 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className={`my-auto w-full ${wide ? "max-w-3xl" : "max-w-xl"} rounded-xl border border-slate-300 bg-[#f4f6ff] p-5 shadow-2xl`}
      >
        <header className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <button
            className="rounded p-2 text-slate-500 hover:bg-slate-100"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
