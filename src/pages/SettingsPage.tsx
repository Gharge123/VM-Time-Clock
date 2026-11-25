import React, { useState } from "react";
import { Panel, GoldButton, Field, inputClass } from "../components/Ui";
export default function SettingsPage({ user }: { user: string }) {
  const [toggles, setToggles] = useState({
    email: true,
    push: true,
    auto: true,
  });
  const [name, setName] = useState(user),
    [email, setEmail] = useState("creatives@vereigenmedia.com");
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Panel className="p-6">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <p className="mt-1 text-xs text-slate-400">
          Manage your account information
        </p>
        <div className="my-6 flex items-center gap-3 border-b pb-5">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-200 font-bold">
            {name
              .split(" ")
              .map((s) => s[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <b className="block text-sm">{name}</b>
            <small className="text-slate-400">Team Lead · Vereigen Media</small>
          </div>
        </div>
        <div className="space-y-4">
          <Field label="Full Name">
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Email Address">
            <input
              type="email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Role">
            <input
              className={inputClass + " bg-slate-50"}
              value="Team Lead"
              disabled
            />
          </Field>
          <GoldButton
            onClick={() => alert("Profile changes saved in this demo session.")}
          >
            Save Changes
          </GoldButton>
        </div>
      </Panel>
      <Panel className="p-6">
        <h2 className="text-xl font-semibold">Preferences</h2>
        <p className="mt-1 text-xs text-slate-400">
          Configure your time-clock experience
        </p>
        {[
          [
            "email",
            "Email Notifications",
            "Receive attendance and shift updates",
          ],
          [
            "push",
            "Push Notifications",
            "Get important alerts in your browser",
          ],
          [
            "auto",
            "Automatic Break Reminder",
            "Remind employees when a break is due",
          ],
        ].map(([key, title, desc]) => (
          <div
            key={key}
            className="flex items-center justify-between border-b py-5"
          >
            <div>
              <b className="block text-sm">{title}</b>
              <small className="text-xs text-slate-400">{desc}</small>
            </div>
            <button
              aria-label={`Toggle ${title}`}
              onClick={() =>
                setToggles((old) => ({
                  ...old,
                  [key]: !old[key as keyof typeof old],
                }))
              }
              className={`h-6 w-11 rounded-full p-1 transition ${toggles[key as keyof typeof toggles] ? "bg-amber-500" : "bg-slate-300"}`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-white transition ${toggles[key as keyof typeof toggles] ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>
        ))}
      </Panel>
    </div>
  );
}
