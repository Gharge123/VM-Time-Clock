export type EmployeeStatus =
  | "Present"
  | "Absent"
  | "On Break"
  | "Late"
  | "Overtime";
export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: EmployeeStatus;
  clockIn: string;
  break: string;
  phone?: string;
  joiningDate?: string;
  shift?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  manager?: string;
  designation?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  workPhone?: string;
  cellPhone?: string;
  homePhone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  personalEmail?: string;
  birthDate?: string;
}
export type PageName = "Dashboard" | "Time sheet" | "Employee's" | "Setting";
export type ModalKind =
  | "employee"
  | "notification"
  | "meeting"
  | "timesheet-filter"
  | null;
