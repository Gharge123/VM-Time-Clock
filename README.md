# VM Time-Clock — React + TypeScript + Tailwind client

Responsive frontend rebuilt from the supplied `vm-timeclock-client.zip` and the two screenshots in the request. The supplied project was React + JavaScript + custom CSS; this version migrates it to TypeScript (`.tsx`/`.ts`) and Tailwind CSS with separated page/component folders.

## Included pages and interactions

- **Login:** responsive gold/black screen with show/hide password and a forgot-password UI. Demo mode accepts any non-empty name/password; it is not production authentication.
- **Dashboard:** workforce metric cards, My Time Card filter menu (Late Mark, Over Time, Leave, Break Over Time), Active Work Force department filter, profile summary, and quick links.
- **Quick links:** Add Employee opens the multi-section Employee Profile form; Add From Excel opens a two-step upload/preview/import flow; Send Notification opens the department/employee/subject/message form; Call For Meeting opens the department/employee form; Export All Employee Reports opens Timesheet.
- **Timesheet:** screenshot-style employee clock summary, employee/date/status filters, searchable time sheet table with employee no., shift, designation, clock-in/out columns, and CSV export.
- **Employees:** search, department filter, add/edit/delete, Excel/CSV import and CSV export.
- **Settings:** editable profile demo fields and working preference toggles.
- Responsive sidebar and layouts for mobile, tablet and desktop.

## Run locally

1. Install Node.js 20 LTS (Node 18+ should also work).
2. Extract this ZIP and open a terminal in `vm-timeclock-ts`.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start Vite:
   ```bash
   npm run dev
   ```
5. Open the local URL printed in the terminal (usually `http://localhost:5173`).
6. Check production compilation:
   ```bash
   npm run build
   ```

## MongoDB / backend note

This deliverable is intentionally **client-only**, as requested. It does not connect to MongoDB, store users securely, send email/notifications, or create real meeting invites. Employee changes currently live in React state and reset after a page refresh. Do not put MongoDB credentials or secrets in this frontend.

For the later backend, create a separate Node.js/Express + TypeScript server, connect it to MongoDB using Mongoose, and expose authenticated API routes. Suggested collections: `users`, `employees`, `attendance`, `notifications`, `meetings`, and `leaveRequests`. Login must be validated by the server using hashed passwords and secure sessions/JWT; the current demo login is only a UI preview.

## Important Figma reference limitation

The Figma prototype URL provided in the request could not be fetched in this environment (restricted URL). The two screenshots and the existing ZIP were available and used as the visual/functional source. Some modal field details therefore follow sensible time-clock form conventions and are not claimed to be pixel-exact Figma fields. For exact field-by-field matching, export the relevant Figma frames/screenshots or enable a viewable public prototype link.

## Project structure

```text
src/
  assets/login-circuit-bg.jpg
  components/Brand.tsx
  components/Modal.tsx
  components/Ui.tsx
  data/mockData.ts
  pages/LoginPage.tsx
  pages/DashboardPage.tsx
  pages/TimesheetPage.tsx
  pages/EmployeesPage.tsx
  pages/SettingsPage.tsx
  App.tsx
  main.tsx
  index.css
  types.ts
public/
  sample-employee-upload.xlsx
  sample-employee-upload.csv
```

## MongoDB beginner note (for the server phase)

MongoDB is a document database, so it does not import SQL `.sql` files as tables. In the later server project you can either:

- define collections and schemas in TypeScript with Mongoose (recommended for this app), or
- import JSON/CSV data with MongoDB Compass / `mongoimport`.

No database setup is needed to run this frontend. When the backend is added, create a MongoDB Atlas cluster (or local MongoDB), copy its connection string into the **server-only** `.env` file as `MONGODB_URI=...`, and never put that value in `src/` or any `VITE_` variable.

## Password
Name - vmtimeclock
Password - admin@vmtimeclock.com
