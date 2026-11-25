import React, { useMemo, useState } from "react";
import {
  Download,
  Search,
  Filter,
  CalendarDays,
  Clock3,
  Coffee,
  ChevronDown,
} from "lucide-react";
import type { Employee } from "../types";
import Modal from "../components/Modal";
import {
  Panel,
  DataTable,
  OutlineButton,
  Field,
  inputClass,
} from "../components/Ui";
export default function TimesheetPage({ people }: { people: Employee[] }) {
  const [query, setQuery] = useState(""),
    [filterOpen, setFilterOpen] = useState(false),
    [status, setStatus] = useState("All Statuses"),
    [department, setDepartment] = useState("All Departments"),
    [from, setFrom] = useState("2026-09-18"),
    [to, setTo] = useState("2026-09-18"),
    [employee, setEmployee] = useState("All Employees");
  const departments = [
    "Engineering",
    "Design",
    "Human Resources",
    "Marketing",
    "Operations",
    "Finance",
    "Sales",
  ];
  const rows = useMemo(
    () =>
      people
        .filter(
          (p) =>
            (p.name + " " + p.id).toLowerCase().includes(query.toLowerCase()) &&
            (status === "All Statuses" || p.status === status) &&
            (department === "All Departments" || p.department === department) &&
            (employee === "All Employees" || p.name === employee),
        )
        .flatMap((p, i) =>
          Array.from({ length: 2 }, (_, j) => [
            String(i * 2 + j + 1).padStart(2, "0"),
            p.id,
            j === 0 ? "18-Sep 2026, Friday" : "18-Sep 2026, Friday",
            p.name,
            "04:00 PM\\nTo 01 AM",
            p.role,
            "04:00 PM\\n(18-09-2026)",
            j === 0 ? "01:00 AM\\n(19-09-2026)" : "12:00 PM\\n(19-09-2026)",
          ]),
        ),
    [people, query, status, department, employee],
  );
  const exportCsv = () => {
    const headers = [
      "Sr. No.",
      "Employee No.",
      "Date - Day",
      "Employee Name",
      "Shift Time",
      "Designation",
      "Clock In",
      "Clock Out",
    ];
    const csv = [headers, ...rows]
      .map((r) =>
        r.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
      )
      .join("\\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "time-sheet.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-xl bg-black p-4 text-white shadow sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-lg text-slate-900">
            SP
          </div>
          <div>
            <b className="block text-sm text-amber-300">Shubham Patil</b>
            <small className="text-[10px] text-slate-300">Team Lead</small>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 border-y border-white/15 py-2 sm:border-y-0 sm:border-l sm:pl-5">
          <div>
            <small className="block text-[10px] text-slate-300">
              Clocked In Time
            </small>
            <b className="text-xs text-amber-300">06:00 PM</b>
            <small className="block text-[9px] text-slate-400">
              16-09-2026
            </small>
          </div>
          <div>
            <small className="block text-[10px] text-slate-300">
              Total Break Time
            </small>
            <b className="text-xs text-amber-300">20/60 Min</b>
            <small className="block text-[9px] text-slate-400">Mins</small>
          </div>
          <div>
            <small className="block text-[10px] text-slate-300">
              Total Duration
            </small>
            <b className="text-xs text-amber-300">05 Hr. 25 Mins</b>
          </div>
        </div>
        <div className="flex gap-2 sm:w-auto">
          <button
            onClick={() => alert("Break started. (Demo action)")}
            className="flex-1 rounded border border-amber-400 px-4 py-2 text-xs text-amber-300 sm:flex-none"
          >
            Start Break
          </button>
          <button
            onClick={() => alert("Clock out recorded. (Demo action)")}
            className="flex-1 rounded border border-amber-400 bg-amber-300/20 px-4 py-2 text-xs text-amber-200 sm:flex-none"
          >
            Clock Out
          </button>
        </div>
      </div>
      <Panel className="min-h-[calc(100vh-190px)] p-4 sm:p-5">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h2 className="text-sm font-semibold">Time Sheet</h2>
          <button
            onClick={() => setFilterOpen(true)}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-sm border border-amber-500 bg-black px-6 text-xs font-semibold text-amber-300 hover:bg-neutral-800"
          >
            <Filter size={14} /> Filter
          </button>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex h-9 min-w-[220px] flex-1 items-center gap-2 rounded border border-slate-200 px-3 text-slate-400">
            <Search size={15} />
            <input
              className="w-full text-xs outline-none"
              placeholder="Search employee..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            onClick={exportCsv}
            className="inline-flex h-9 items-center gap-2 rounded border border-slate-300 px-3 text-xs text-slate-600 hover:bg-amber-50"
          >
            <Download size={14} /> Export
          </button>
        </div>
        <DataTable
          headers={[
            "Sr. No.",
            "Employee No.",
            "Date - Day",
            "Employee Name",
            "Shift Time",
            "Designation",
            "Clock In",
            "Clock Out",
          ]}
          rows={rows}
        />
        <div className="mt-4 flex justify-between text-xs text-slate-400">
          Showing {rows.length} records <span>Page 1 of 1</span>
        </div>
        {filterOpen && (
          <Modal title="Filter" onClose={() => setFilterOpen(false)}>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setFilterOpen(false);
              }}
            >
              <Field label="Select Department">
                <select
                  className={inputClass}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option>All Departments</option>
                  {departments.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </Field>
              <Field label="Employee">
                <select
                  className={inputClass}
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                >
                  <option>All Employees</option>
                  {people.map((p) => (
                    <option key={p.id}>{p.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Employee Status">
                <select
                  className={inputClass}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>All Statuses</option>
                  {["Present", "Absent", "On Break", "Late", "Overtime"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="From Date">
                  <input
                    type="date"
                    className={inputClass}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </Field>
                <Field label="To Date">
                  <input
                    type="date"
                    className={inputClass}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </Field>
              </div>
              <div className="flex gap-2">
                <OutlineButton
                  type="button"
                  className="flex-1"
                  onClick={() => {
                    setDepartment("All Departments");
                    setEmployee("All Employees");
                    setStatus("All Statuses");
                    setFrom("2026-09-18");
                    setTo("2026-09-18");
                  }}
                >
                  Reset
                </OutlineButton>
                <button className="h-10 flex-1 rounded bg-black text-xs font-semibold text-amber-300">
                  Apply Filter
                </button>
              </div>
            </form>
          </Modal>
        )}
      </Panel>
    </div>
  );
}
