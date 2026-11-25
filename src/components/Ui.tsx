import React from "react";
export function GoldButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-amber-500 bg-gradient-to-b from-amber-300 to-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:brightness-105 disabled:opacity-50 ${props.className || ""}`}
    >
      {children}
    </button>
  );
}
export function OutlineButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-700 hover:border-amber-400 hover:bg-amber-50 ${props.className || ""}`}
    >
      {children}
    </button>
  );
}
export function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_5px_rgba(0,0,0,.025)] ${className}`}
    >
      {children}
    </section>
  );
}
export function Status({ value }: { value: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[11px] ${value === "Present" ? "bg-green-100 text-green-700" : value === "Absent" ? "bg-red-100 text-red-600" : value === "On Break" ? "bg-amber-100 text-amber-700" : value === "Late" ? "bg-orange-100 text-orange-700" : "bg-sky-100 text-sky-700"}`}
    >
      {value}
    </span>
  );
}
export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[680px] border-collapse text-center text-xs">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border border-slate-300 bg-neutral-300 px-3 py-3 font-medium text-slate-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-neutral-50 hover:bg-amber-50/50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-slate-100 px-3 py-3 text-slate-500"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-medium text-slate-600">
      {label}
      {children}
    </label>
  );
}
export const inputClass =
  "h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";
