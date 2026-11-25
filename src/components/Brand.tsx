import React from "react";
export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-vmgold">
      <svg
        className="h-14 w-14 shrink-0"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="29" />
        <circle cx="32" cy="32" r="23" />
        <path d="M32 12 36 23 47 17 42 29 54 32 42 36 47 47 36 42 32 54 28 42 17 47 22 36 10 32 22 28 17 17 28 23Z" />
        <circle cx="32" cy="32" r="9" />
        <path d="M26 29q6-9 12 0l-2 9h-8z" fill="currentColor" />
      </svg>
      {!compact && (
        <div className="border-l-2 border-yellow-500 pl-2 text-[15px] font-extrabold leading-[1.02]">
          VM
          <br />
          TIME-
          <br />
          CLOCK
        </div>
      )}
    </div>
  );
}
