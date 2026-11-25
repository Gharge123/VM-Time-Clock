import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Brand from "../components/Brand";
import loginBg from "../assets/login-circuit-bg.jpg";
import { GoldButton } from "../components/Ui";
export default function LoginPage({
  onLogin,
}: {
  onLogin: (name: string) => void;
}) {
  const [name, setName] = useState(""),
    [password, setPassword] = useState(""),
    [show, setShow] = useState(false),
    [forgot, setForgot] = useState(false),
    [notice, setNotice] = useState("");
  return (
    <main className="relative flex min-h-screen items-center justify-end overflow-hidden bg-[#120c02] px-6 py-8 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(10,5,0,.12),rgba(10,5,0,.34)),url('${loginBg}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/50" />
      <section className="relative z-10 mx-auto flex min-h-[clamp(340px,92vh,780px)] w-full max-w-[515px] sm:w-[clamp(250px,28vw,515px)] flex-col items-center rounded-2xl border border-yellow-500/80 bg-[#211603]/90 px-8 py-12 shadow-2xl backdrop-blur-sm sm:mr-[12%] sm:px-14">
        <Brand />
        <h1 className="mb-7 mt-6 text-xl sm:mb-10 sm:mt-9 sm:text-3xl font-bold">
          {forgot ? "Reset Password" : "Welcome Back"}
        </h1>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (forgot) {
              setNotice(
                "If this email is registered, password reset instructions will be sent.",
              );
              return;
            }
            onLogin(name.trim());
          }}
        >
          <label className="mb-2 block text-sm">Name</label>
          <input
            required
            className="h-11 w-full sm:h-14 w-full rounded-xl border border-yellow-700/80 bg-[#100d06] px-5 text-sm outline-none placeholder:text-slate-500 focus:border-yellow-400"
            placeholder="e.g. Shubham Patil"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="mb-2 mt-7 flex justify-between text-sm">
            <label>{forgot ? "Email" : "Password"}</label>
            {!forgot && (
              <button
                type="button"
                className="text-xs text-amber-300 hover:underline"
                onClick={() => setForgot(true)}
              >
                Forgot Password ?
              </button>
            )}
          </div>
          <div className="relative">
            <input
              required
              type={forgot ? "email" : show ? "text" : "password"}
              className="h-11 w-full sm:h-14 w-full rounded-xl border border-yellow-700/80 bg-[#100d06] px-5 pr-12 text-sm outline-none placeholder:text-slate-500 focus:border-yellow-400"
              placeholder={forgot ? "Enter your email" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!forgot && (
              <button
                type="button"
                className="absolute right-4 top-4 text-slate-400"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            )}
          </div>
          <GoldButton className="mt-10 h-12 w-full sm:mt-16 sm:h-16 text-base">
            {forgot ? "Send Reset Link" : "Log In"}
          </GoldButton>
          {forgot && (
            <button
              type="button"
              className="mt-4 w-full text-sm text-amber-300"
              onClick={() => {
                setForgot(false);
                setNotice("");
              }}
            >
              Back to login
            </button>
          )}
          {notice && (
            <p className="mt-4 text-center text-xs text-amber-200">{notice}</p>
          )}
        </form>
        <small className="mt-auto pt-10 text-center text-[11px] text-slate-300">
          2026 VM Clock-Time&nbsp; All Right Reserved&nbsp; Version 1.1.1
        </small>
      </section>
    </main>
  );
}
