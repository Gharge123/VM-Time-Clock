import React, { useMemo, useRef, useState } from "react";
import {
  Edit2,
  Trash2,
  Plus,
  Upload,
  Search,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import * as XLSX from "xlsx";
import type { Employee } from "../types";
import Modal from "../components/Modal";
import {
  Panel,
  DataTable,
  Status,
  GoldButton,
  OutlineButton,
  Field,
  inputClass,
} from "../components/Ui";
const departments = [
  "Engineering",
  "Design",
  "Human Resources",
  "Marketing",
  "Operations",
  "Finance",
  "Sales",
];
const designations = [
  "UI-UX Designer",
  "Graphic Designer",
  "Developer",
  "Testing Team",
  "SEO Team",
  "Social Media",
  "Team Lead",
  "Manager",
];
const cities = ["Pune", "Mumbai", "Bengaluru", "Hyderabad", "Delhi", "Chennai"];
const states = ["Maharashtra", "Karnataka", "Telangana", "Delhi", "Tamil Nadu"];
const blank: Employee = {
  id: "",
  name: "",
  email: "",
  department: "Engineering",
  role: "Employee",
  status: "Absent",
  clockIn: "—",
  break: "—",
  shift: "General",
};
function ExcelWizard({
  onClose,
  onImport,
}: {
  onClose: () => void;
  onImport: (rows: Partial<Employee>[]) => void;
}) {
  const [file, setFile] = useState<File | null>(null),
    [rows, setRows] = useState<Record<string, unknown>[]>([]),
    [step, setStep] = useState(1),
    [review, setReview] = useState(true),
    [error, setError] = useState("");
  const choose = async (f?: File) => {
    if (!f) return;
    setFile(f);
    setError("");
    try {
      const wb = XLSX.read(await f.arrayBuffer(), { type: "array" });
      const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(
        wb.Sheets[wb.SheetNames[0]],
      );
      setRows(data);
      if (!data.length) setError("The selected file has no employee rows.");
    } catch {
      setError(
        "Unable to read this file. Please select an XLSX, XLS or CSV file.",
      );
    }
  };
  return (
    <Modal title="Employee Profile" onClose={onClose} wide>
      <div className="space-y-5">
        <div className="text-sm font-medium">
          {" "}
          {step === 1 ? "Upload Employee File" : "Select Row From This"}
        </div>
        {step === 1 ? (
          <>
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                choose(e.dataTransfer.files?.[0]);
              }}
              className="flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl border border-slate-300 bg-white text-center hover:border-amber-400"
            >
              <FileSpreadsheet size={28} className="mb-3 text-slate-600" />
              <span className="text-sm">
                {file ? file.name : "Drag An File Or Upload File"}
              </span>
              <span className="mt-1 text-[11px] text-slate-500">
                ( XLSX, XLSM, XLSB, XLS, XLAM, CSV )
              </span>
              <input
                type="file"
                accept=".xlsx,.xls,.xlsm,.xlsb,.csv"
                className="hidden"
                onChange={(e) => choose(e.target.files?.[0])}
              />
            </label>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              disabled={!file || !rows.length}
              onClick={() => setStep(2)}
              className="h-10 w-full rounded bg-black text-sm font-semibold text-amber-300 disabled:opacity-40"
            >
              Next
            </button>
          </>
        ) : (
          <>
            <div className="max-h-64 overflow-auto rounded-lg border border-slate-300">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-emerald-600 text-white">
                  <tr>
                    {Object.keys(rows[0] || {})
                      .slice(0, 5)
                      .map((k) => (
                        <th className="p-2" key={k}>
                          {k}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 30).map((r, i) => (
                    <tr key={i} className="border-t">
                      {Object.keys(rows[0] || {})
                        .slice(0, 5)
                        .map((k) => (
                          <td className="p-2" key={k}>
                            {String(r[k] ?? "")}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <label className="flex items-center gap-2 text-xs">
              <input
                type="checkbox"
                checked={review}
                onChange={(e) => setReview(e.target.checked)}
              />{" "}
              Review And Add
            </label>
            <p className="text-xs text-slate-500">
              {rows.length} row(s) detected. Rows with a name and email will be
              imported.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <OutlineButton onClick={() => setStep(1)}>Back</OutlineButton>
              <button
                onClick={() =>
                  onImport(
                    rows
                      .map((r) => ({
                        name: String(
                          r.Name ||
                            r["Full Name"] ||
                            `${r["First Name"] || ""} ${r["Last Name"] || ""}`.trim(),
                        ),
                        email: String(r.Email || r["Work Email Id"] || ""),
                        id: String(r["Employee ID"] || ""),
                        department: String(r.Department || "Engineering"),
                        role: String(r.Role || r.Designation || "Employee"),
                      }))
                      .filter((r) => r.name && r.email),
                  )
                }
                className="h-10 rounded bg-black text-sm font-semibold text-amber-300"
              >
                Add Employee
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
export function EmployeeForm({
  initial,
  onClose,
  onSave,
  onSaveMany,
}: {
  initial?: Employee;
  onClose: () => void;
  onSave: (p: Employee) => void;
  onSaveMany?: (items: Employee[]) => void;
}) {
  const [form, setForm] = useState<Employee>(initial || blank),
    [excel, setExcel] = useState(false);
  const set = (key: keyof Employee, value: string) =>
    setForm((old) => ({ ...old, [key]: value }));
  const field = (
    label: string,
    key: keyof Employee,
    placeholder = label,
    type: React.HTMLInputTypeAttribute = "text",
  ) => (
    <Field label={label}>
      <input
        type={type}
        className={inputClass}
        value={String(form[key] || "")}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  );
  const addImported = (items: Partial<Employee>[]) => {
    const complete = items.map((item, i) => ({
      ...blank,
      ...item,
      id: item.id || `VM${String(Date.now() + i).slice(-5)}`,
      name: item.name || "",
      email: item.email || "",
    }));
    if (onSaveMany) onSaveMany(complete);
    else if (complete[0]) onSave(complete[0]);
    setExcel(false);
  };
  return (
    <Modal title="Employee Profile" onClose={onClose} wide>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave({
            ...form,
            name:
              form.name ||
              `${form.firstName || ""} ${form.lastName || ""}`.trim(),
            role: form.designation || form.role,
          });
        }}
        className="max-h-[78vh] space-y-5 overflow-y-auto pr-1"
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setExcel(true)}
            className="inline-flex items-center gap-2 rounded bg-black px-4 py-2.5 text-xs font-semibold text-amber-300 hover:bg-neutral-800"
          >
            <Plus size={16} /> Add From Excel
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("First Name", "firstName", "e.g. Mahesh")}
          {field("User Name", "userName", "e.g. Mahesh_Mane")}
          {field("Last Name", "lastName", "e.g. Mane")}
          {field("Manager", "manager", "e.g. Mahesh Mane")}
          {field("Work Email Id *", "email", "mahesh@company.com", "email")}
          <Field label="Designation / Position">
            <select
              className={inputClass}
              value={form.designation || form.role}
              onChange={(e) => {
                set("designation", e.target.value);
                set("role", e.target.value);
              }}
            >
              {designations.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </Field>
        </div>
        <hr />
        <h3 className="font-medium">Location</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("Address", "address", "Abc")}
          <Field label="City">
            <select
              className={inputClass}
              value={form.city || ""}
              onChange={(e) => set("city", e.target.value)}
            >
              <option value="">Select Your City</option>
              {cities.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </Field>
          <Field label="State">
            <select
              className={inputClass}
              value={form.state || ""}
              onChange={(e) => set("state", e.target.value)}
            >
              <option value="">Select Your State</option>
              {states.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </Field>
          {field("Zip No.", "zip", "Zip No.")}
        </div>
        <hr />
        <h3 className="font-medium">Phone</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("Work Phone No.", "workPhone", "Work Phone No.", "tel")}
          {field("Cell Phone No.", "cellPhone", "Cell Phone No.", "tel")}
          {field("Home Phone No.", "homePhone", "Home Phone No.", "tel")}
        </div>
        <hr />
        <h3 className="font-medium">Emergency Contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {field(
            "Emergency Contact Name & Relation",
            "emergencyContact",
            "emergency Contact Name & relation",
          )}
          {field(
            "Emergency Phone No.",
            "emergencyPhone",
            "Emergency Phone No.",
            "tel",
          )}
        </div>
        <hr />
        <h3 className="font-medium">Other Information</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {field(
            "Personal Email Id",
            "personalEmail",
            "Personal Email Id",
            "email",
          )}
          {field("Birth Date", "birthDate", "Birth date", "date")}
          <Field label="Department">
            <select
              className={inputClass}
              value={form.department}
              onChange={(e) => set("department", e.target.value)}
            >
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Employee No.">
            <input
              className={inputClass}
              value={form.id}
              onChange={(e) => set("id", e.target.value)}
              placeholder="VM0001"
            />
          </Field>
        </div>
        <button
          type="submit"
          className="h-10 w-full rounded border border-amber-400 bg-black text-sm font-semibold text-amber-300 hover:bg-neutral-800"
        >
          {initial ? "Update Employee" : "Add Employee"}
        </button>
      </form>
      {excel && (
        <ExcelWizard onClose={() => setExcel(false)} onImport={addImported} />
      )}
    </Modal>
  );
}
export default function EmployeesPage({
  people,
  setPeople,
  onAdd,
}: {
  people: Employee[];
  setPeople: React.Dispatch<React.SetStateAction<Employee[]>>;
  onAdd: () => void;
}) {
  const [query, setQuery] = useState(""),
    [dept, setDept] = useState("All Departments"),
    [edit, setEdit] = useState<Employee | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(
    () =>
      people.filter(
        (p) =>
          (p.name + " " + p.email + " " + p.id)
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (dept === "All Departments" || p.department === dept),
      ),
    [people, query, dept],
  );
  const importFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const wb = XLSX.read(await f.arrayBuffer(), { type: "array" });
      const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(
        wb.Sheets[wb.SheetNames[0]],
      );
      const mapped = data
        .map((r, i) => ({
          id: String(
            r["Employee ID"] ||
              `VM${String(people.length + i + 1).padStart(3, "0")}`,
          ),
          name: String(r.Name || ""),
          email: String(r.Email || ""),
          department: String(r.Department || "Engineering"),
          role: String(r.Role || "Employee"),
          status: "Absent" as const,
          clockIn: "—",
          break: "—",
        }))
        .filter((p) => p.name && p.email);
      setPeople((old) => [...old, ...mapped]);
      alert(`Imported ${mapped.length} employee(s).`);
    } catch {
      alert("Could not read file. Please use the supplied sample template.");
    }
    e.target.value = "";
  };
  const exportCsv = () => {
    const csv = [
      ["Name", "Employee ID", "Email", "Department", "Role", "Status"],
      ...filtered.map((p) => [
        p.name,
        p.id,
        p.email,
        p.department,
        p.role,
        p.status,
      ]),
    ]
      .map((r) =>
        r.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
      )
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "employees.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  };
  return (
    <Panel className="min-h-[calc(100vh-130px)] p-5">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold">Employee Management</h2>
          <p className="mt-1 text-xs text-slate-400">
            Manage your team members and employee information
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <input
            ref={fileRef}
            hidden
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={importFile}
          />
          <OutlineButton onClick={() => fileRef.current?.click()}>
            <Upload size={16} /> Import Excel
          </OutlineButton>
          <GoldButton onClick={onAdd}>
            <Plus size={17} /> Add Employee
          </GoldButton>
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 text-slate-400">
          <Search size={17} />
          <input
            className="w-full text-sm outline-none"
            placeholder="Search by name, email or ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className={inputClass + " w-auto min-w-[165px]"}
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        >
          <option>All Departments</option>
          {departments.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <span className="self-center text-xs text-slate-400">
          {filtered.length} employees
        </span>
      </div>
      <DataTable
        headers={[
          "Employee",
          "Employee ID",
          "Department",
          "Role",
          "Clock In",
          "Status",
          "Action",
        ]}
        rows={filtered.map((p) => [
          <div className="flex min-w-[190px] items-center gap-2 text-left">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 font-semibold text-slate-600">
              {p.name
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)}
            </span>
            <span>
              <b className="block text-slate-700">{p.name}</b>
              <small className="text-slate-400">{p.email}</small>
            </span>
          </div>,
          p.id,
          p.department,
          p.role,
          p.clockIn,
          <Status value={p.status} />,
          <span className="inline-flex">
            <button
              title="Edit"
              className="rounded p-2 hover:bg-amber-50"
              onClick={() => setEdit(p)}
            >
              <Edit2 size={15} />
            </button>
            <button
              title="Delete"
              className="rounded p-2 text-red-500 hover:bg-red-50"
              onClick={() => {
                if (confirm(`Delete ${p.name}?`))
                  setPeople((old) => old.filter((x) => x.id !== p.id));
              }}
            >
              <Trash2 size={15} />
            </button>
          </span>,
        ])}
      />
      <div className="mt-4 flex justify-between text-xs text-slate-400">
        Showing {filtered.length} employees{" "}
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-1 text-blue-600"
        >
          <Download size={14} /> Download CSV
        </button>
      </div>
      {edit && (
        <EmployeeForm
          initial={edit}
          onClose={() => setEdit(null)}
          onSave={(p) => {
            setPeople((old) => old.map((x) => (x.id === edit.id ? p : x)));
            setEdit(null);
          }}
        />
      )}
    </Panel>
  );
}
