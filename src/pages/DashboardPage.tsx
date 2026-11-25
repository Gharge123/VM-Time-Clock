import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  UsersRound,
  Coffee,
  Timer,
  ChevronRight,
  Filter,
  ChevronDown,
} from "lucide-react";
import type { Employee, PageName } from "../types";
import { Panel, DataTable, Status } from "../components/Ui";

function Metric({
  icon: Icon,
  label,
  value,
  percent,
  tone = "gold",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  percent: number;
  tone?: string;
}) {
  const border =
    tone === "green"
      ? "border-emerald-200"
      : tone === "red"
        ? "border-rose-200"
        : tone === "orange"
          ? "border-orange-200"
          : tone === "blue"
            ? "border-sky-200"
            : "border-amber-200";
  const pct =
    tone === "green"
      ? "text-emerald-500"
      : tone === "red"
        ? "text-rose-500"
        : tone === "blue"
          ? "text-sky-400"
          : "text-amber-500";
  return (
    <div
      className={`flex h-28 min-w-[150px] flex-col justify-between rounded-md border bg-white p-3 shadow-sm ${border}`}
    >
      <div className="flex items-center gap-2 text-[10px] leading-tight text-slate-500">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-amber-300 bg-amber-50 text-amber-700">
          <Icon size={18} />
        </span>
        <span>{label}</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <b className="text-xl text-neutral-700">{value}</b>
          <small className="block text-[9px] text-slate-400">Out Of 60</small>
        </div>
        <span
          className={`grid h-11 w-11 place-items-center rounded-full border-[4px] border-amber-200 text-sm ${pct}`}
        >
          {percent}%
        </span>
      </div>
    </div>
  );
}
const departments = [
  "UI-UX DESIGN",
  "Graphic Design",
  "DEVELOPMENT",
  "TESTING TEAM",
  "SEO TEAM",
  "SOCIAL MEDIA",
];
const timeFilters = ["Late Mark", "Over Time", "Leave", "Break Over Time"];
export default function DashboardPage({
  people,
  onNavigate,
  onAction,
}: {
  people: Employee[];
  onNavigate: (p: PageName) => void;
  onAction: (k: "employee" | "notification" | "meeting") => void;
}) {
  const [timeOpen, setTimeOpen] = useState(false),
    [teamOpen, setTeamOpen] = useState(false),
    [timeFilter, setTimeFilter] = useState(""),
    [teamFilter, setTeamFilter] = useState("");
  const deptMap: Record<string, string[]> = {
    "UI-UX DESIGN": ["Design"],
    "Graphic Design": ["Design"],
    DEVELOPMENT: ["Engineering"],
    "TESTING TEAM": ["Engineering"],
    "SEO TEAM": ["Marketing"],
    "SOCIAL MEDIA": ["Marketing"],
  };
  const active = useMemo(
    () =>
      people.filter(
        (p) =>
          (p.status === "Present" || p.status === "On Break") &&
          (!teamFilter ||
            (deptMap[teamFilter] || [teamFilter]).includes(p.department)),
      ),
    [people, teamFilter],
  );
  const timeRows = [
    "18-Sep-2026, Friday",
    "17-Sep-2026, Thursday",
    "16-Sep-2026, Wednesday",
    "15-Sep-2026, Tuesday",
  ].map((d, i) => [
    d,
    "06:00 PM",
    i === 0 ? "03:00 AM" : "03:00 AM",
    "55 Mins",
    "09:00 Hr.",
  ]);
  return (
    <div className="space-y-4">
      <Panel className="p-3">
        <div className="mb-3 flex items-center justify-between text-xs">
          <b className="font-semibold">Workforce Status</b>
          <span className="flex items-center gap-2 text-slate-500">
            <CalendarDays size={14} /> 16 - 09 - 2026
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Metric
            icon={UsersRound}
            label={
              <>
                TODAY'S
                <br />
                ATTENDANCE
              </>
            }
            value="50"
            percent={83}
            tone="green"
          />
          <Metric
            icon={UsersRound}
            label={
              <>
                TODAY'S
                <br />
                ABSENT
              </>
            }
            value="10"
            percent={17}
            tone="red"
          />
          <Metric
            icon={Coffee}
            label={
              <>
                ON
                <br />
                BREAK
              </>
            }
            value="30"
            percent={50}
          />
          <Metric
            icon={Timer}
            label={
              <>
                LATE
                <br />
                MARK
              </>
            }
            value="04"
            percent={7}
            tone="orange"
          />
          <Metric
            icon={Timer}
            label={
              <>
                OVER
                <br />
                TIME
              </>
            }
            value="04"
            percent={7}
            tone="blue"
          />
        </div>
      </Panel>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2.15fr)_minmax(280px,.95fr)]">
        <div className="space-y-4">
          <Panel className="min-h-[250px]">
            <div className="relative mb-3 flex items-center justify-between border-b pb-3 text-xs">
              <b>My time Card</b>
              <button
                onClick={() => setTimeOpen((v) => !v)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-600"
              >
                Filter <ChevronDown size={13} />
              </button>
              {timeOpen && (
                <div className="absolute right-0 top-7 z-30 w-36 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
                  {timeFilters.map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setTimeFilter(f);
                        setTimeOpen(false);
                      }}
                      className={`block w-full border-b border-slate-100 px-2 py-2 text-left text-[11px] last:border-0 hover:bg-amber-50 ${timeFilter === f ? "text-amber-700" : ""}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <DataTable
              headers={[
                "Date- Day",
                "Clock In",
                "Clock Out",
                "Total Break",
                "Total Duration",
              ]}
              rows={timeRows}
            />
            <p className="pt-3 text-center text-[10px] text-slate-400">
              {timeFilter ? `Showing: ${timeFilter}` : "Leave 14-Sep-2026"}
            </p>
          </Panel>
          <Panel>
            <div className="relative mb-3 flex items-center justify-between border-b pb-3 text-xs">
              <div>
                <b>Active Work Force</b>
                <span className="ml-4 text-slate-400">
                  <CalendarDays className="mr-1 inline" size={14} />
                  16 - 09 - 2026
                </span>
              </div>
              <button
                aria-label="Filter workforce"
                onClick={() => setTeamOpen((v) => !v)}
                className="text-slate-500 hover:text-amber-600"
              >
                <Filter size={15} />
              </button>
              {teamOpen && (
                <div className="absolute right-0 top-7 z-30 w-36 rounded-lg border border-slate-200 bg-white p-2 shadow-xl">
                  {departments.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        setTeamFilter(teamFilter === d ? "" : d);
                        setTeamOpen(false);
                      }}
                      className={`block w-full border-b border-slate-100 px-2 py-2 text-left text-[10px] last:border-0 hover:bg-amber-50 ${teamFilter === d ? "text-amber-700" : ""}`}
                    >
                      {d}
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      setTeamFilter("");
                      setTeamOpen(false);
                    }}
                    className="mt-1 w-full px-2 py-1 text-left text-[10px] text-blue-600"
                  >
                    Clear filter
                  </button>
                </div>
              )}
            </div>
            <DataTable
              headers={[
                "Name",
                "Clock In / Duration",
                "Status",
                "Total Break",
                "Action",
              ]}
              rows={active.map((p) => [
                p.name,
                `${p.clockIn} / 09:00 Hr.`,
                <Status value={p.status} />,
                p.break,
                <button
                  onClick={() => onNavigate("Employee's")}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </button>,
              ])}
            />
            {teamFilter && (
              <p className="pt-2 text-[10px] text-slate-400">
                Department filter: {teamFilter}
              </p>
            )}
          </Panel>
        </div>
        <div className="space-y-4">
          <Panel>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-200 font-semibold text-slate-700">
                SP
              </div>
              <div>
                <b className="block text-xs">Shubham Patil</b>
                <small className="text-slate-400">Team Lead</small>
              </div>
              <button
                className="ml-auto text-xs text-blue-500"
                onClick={() => onNavigate("Setting")}
              >
                Edit ✎
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Metric
                icon={Coffee}
                label="Total Break Time"
                value="30"
                percent={50}
              />
              <Metric
                icon={Timer}
                label="Total Duration"
                value="05:00"
                percent={7}
              />
            </div>
            <div className="my-3 grid grid-cols-2 gap-2">
              <button
                className="rounded bg-black px-3 py-2 text-xs text-amber-300 hover:bg-neutral-800"
                onClick={() => alert("Break started. (Demo action)")}
              >
                Start Break
              </button>
              <button
                className="rounded border border-amber-300 bg-amber-100 px-3 py-2 text-xs hover:bg-amber-200"
                onClick={() => alert("Clock out recorded. (Demo action)")}
              >
                Clock Out
              </button>
            </div>
            <div className="grid grid-cols-3 border-t pt-3 text-center text-[9px] text-slate-400">
              <span>
                <b className="block text-sm text-slate-700">02</b>Leave Balance
              </span>
              <span>
                <b className="block text-sm text-slate-700">02</b>Leaves In Sep
              </span>
              <span>
                <b className="block text-sm text-slate-700">02</b>Late-Mark In
                Sep
              </span>
            </div>
          </Panel>
          <Panel>
            <h3 className="mb-3 border-b pb-3 text-sm font-semibold">
              Quick Links
            </h3>
            {[
              ["Add Employee", "employee"],
              ["Send Notification", "notification"],
              ["Call For Meeting", "meeting"],
            ].map(([label, key]) => (
              <button
                key={key}
                onClick={() =>
                  onAction(key as "employee" | "notification" | "meeting")
                }
                className="my-1 flex h-10 w-full items-center justify-between rounded-full border border-slate-100 px-3 text-xs hover:border-amber-300 hover:bg-amber-50"
              >
                {label}
                <ChevronRight size={17} />
              </button>
            ))}
            <button
              onClick={() => onNavigate("Time sheet")}
              className="my-1 flex h-10 w-full items-center justify-between rounded-full border border-slate-100 px-3 text-xs hover:border-amber-300 hover:bg-amber-50"
            >
              Export All Employee Reports
              <ChevronRight size={17} />
            </button>
          </Panel>
        </div>
      </div>
    </div>
  );
}
