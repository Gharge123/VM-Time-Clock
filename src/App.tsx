import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Menu,
  Clock3,
  UsersRound,
  Send,
  CalendarPlus,
  Filter,
} from "lucide-react";
import type { Employee, PageName, ModalKind } from "./types";
import { employees as seedEmployees } from "./data/mockData";
import Brand from "./components/Brand";
import Modal from "./components/Modal";
import { Field, GoldButton, OutlineButton, inputClass } from "./components/Ui";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TimesheetPage from "./pages/TimesheetPage";
import EmployeesPage, { EmployeeForm } from "./pages/EmployeesPage";
import SettingsPage from "./pages/SettingsPage";
const nav: { label: PageName; icon: React.ElementType }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Time sheet", icon: CalendarDays },
  { label: "Employee's", icon: Users },
  { label: "Setting", icon: SettingsIcon },
];
function ActionModal({
  kind,
  onClose,
  people,
}: {
  kind: "notification" | "meeting";
  onClose: () => void;
  people: Employee[];
}) {
  const [done, setDone] = useState(false);
  const [department, setDepartment] = useState("");
  const [employee, setEmployee] = useState("All Employees");
  return (
    <Modal
      title={kind === "notification" ? "Send Notification" : "Call For Meeting"}
      onClose={onClose}
      wide
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label={kind === "notification" ? "Select Department" : "Department"}
          >
            <select
              required
              className={inputClass}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select Department</option>
              {[
                "Engineering",
                "Design",
                "Human Resources",
                "Marketing",
                "Operations",
                "Finance",
                "Sales",
              ].map((d) => (
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
              {people
                .filter((p) => !department || p.department === department)
                .map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
            </select>
          </Field>
        </div>
        {kind === "notification" ? (
          <>
            <Field label="Subject">
              <input
                required
                className={inputClass}
                placeholder="Type here..."
              />
            </Field>
            <Field label="Type Message">
              <textarea
                required
                rows={5}
                className="w-full rounded-md border border-slate-300 bg-white p-3 text-sm outline-none focus:border-amber-500"
                placeholder="Type here..."
              />
            </Field>
          </>
        ) : (
          <></>
        )}
        {done && (
          <p className="rounded-md bg-emerald-50 p-3 text-xs text-emerald-700">
            {kind === "notification"
              ? "Notification saved"
              : "Meeting request created"}{" "}
            for {employee}. This is a frontend demo; delivery requires a
            connected backend.
          </p>
        )}
        <button className="h-10 w-full rounded-sm border border-amber-400 bg-black text-sm font-semibold text-amber-300 hover:bg-neutral-800">
          {kind === "notification" ? "Send Notification" : "Call For Meeting"}
        </button>
      </form>
    </Modal>
  );
}
export default function App() {
  const [logged, setLogged] = useState(false),
    [user, setUser] = useState("Shubham Patil"),
    [page, setPage] = useState<PageName>("Dashboard"),
    [people, setPeople] = useState<Employee[]>(seedEmployees),
    [modal, setModal] = useState<ModalKind>(null),
    [mobileNav, setMobileNav] = useState(false),
    [clockedIn, setClockedIn] = useState(true);
  const addEmployee = (p: Employee) => {
    const id = p.id || `VM${String(Date.now()).slice(-5)}`;
    setPeople((old) => [
      ...old.filter((x) => x.id !== id),
      {
        ...p,
        id,
        name: p.name || `${p.firstName || ""} ${p.lastName || ""}`.trim(),
        status: p.status || "Absent",
      },
    ]);
    setModal(null);
  };
  if (!logged)
    return (
      <LoginPage
        onLogin={(name) => {
          setUser(name);
          setLogged(true);
        }}
      />
    );
  return (
    <div className="min-h-screen bg-canvas">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[180px] flex-col bg-gradient-to-b from-[#080808] to-[#555] px-4 py-5 text-white transition-transform lg:w-[180px] ${mobileNav ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mb-8 border-b border-white/10 pb-5">
          <Brand />
        </div>
        <nav className="space-y-1">
          {nav.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => {
                setPage(label);
                setMobileNav(false);
              }}
              className={`flex h-11 w-full items-center gap-3 rounded px-3 text-left text-xs transition ${page === label ? "bg-white font-semibold text-black" : "text-slate-200 hover:bg-white/10 hover:text-amber-300"}`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setLogged(false)}
          className="mt-auto flex h-10 items-center gap-3 border-t border-white/50 px-3 text-xs text-white hover:text-amber-300"
        >
          <LogOut size={17} />
          Logout
        </button>
      </aside>
      {mobileNav && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileNav(false)}
        />
      )}
      <main className="min-h-screen md:ml-[180px]">
        <header className="sticky top-0 z-20 flex h-[78px] items-center gap-4 bg-black px-4 text-white sm:px-7">
          <button className="md:hidden" onClick={() => setMobileNav(true)}>
            <Menu />
          </button>
          <div className="min-w-0">
            <b className="block truncate text-sm font-medium text-amber-300 sm:text-base">
              Good Evening, &nbsp;{user} !
            </b>
            <small className="hidden text-[10px] text-slate-300 sm:block">
              Here's What's Happening With You & Your Team......
            </small>
          </div>
          <div className="hidden border-l border-white/20 pl-6 sm:block">
            <small className="block text-[10px] text-slate-300">Status</small>
            <b className="text-xs font-medium text-amber-300">
              {clockedIn ? "Clocked In" : "Clocked Out"}
            </b>
          </div>
          <div className="flex-1" />
          <button
            className="relative grid h-9 w-9 place-items-center rounded-full border border-white/70"
            onClick={() => setModal("notification")}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <i className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
          </button>
          <div className="hidden text-[10px] leading-relaxed text-slate-300 sm:block">
            Wed, 9:26 Pm
            <br />
            16 - 09 - 2026
          </div>
        </header>
        <section className="min-h-[calc(100vh-78px)] rounded-t-[22px] bg-canvas p-3 sm:p-5">
          {page === "Dashboard" && (
            <DashboardPage
              people={people}
              onNavigate={setPage}
              onAction={(k) => setModal(k)}
            />
          )}
          {page === "Time sheet" && <TimesheetPage people={people} />}
          {page === "Employee's" && (
            <EmployeesPage
              people={people}
              setPeople={setPeople}
              onAdd={() => setModal("employee")}
            />
          )}
          {page === "Setting" && <SettingsPage user={user} />}
        </section>
      </main>
      {modal === "employee" && (
        <EmployeeForm
          onClose={() => setModal(null)}
          onSave={addEmployee}
          onSaveMany={(items) => {
            setPeople((old) => [...old, ...items]);
            setModal(null);
          }}
        />
      )}
      {(modal === "notification" || modal === "meeting") && (
        <ActionModal
          kind={modal}
          people={people}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
