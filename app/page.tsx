
"use client";

import { useState } from "react";
import { themes } from "@/lib/catalog";
import Image from "next/image";
const themeStyles = [
  {
    border: "border-cyan-400/40",
    glow: "from-cyan-500/20",
    icon: "bg-cyan-400/10 text-cyan-300",
    selected: "border-cyan-400 bg-cyan-400/[0.08]",
    accent: "text-cyan-300",
  },
  {
    border: "border-violet-400/40",
    glow: "from-violet-500/20",
    icon: "bg-violet-400/10 text-violet-300",
    selected: "border-violet-400 bg-violet-400/[0.08]",
    accent: "text-violet-300",
  },
  {
    border: "border-emerald-400/40",
    glow: "from-emerald-500/20",
    icon: "bg-emerald-400/10 text-emerald-300",
    selected: "border-emerald-400 bg-emerald-400/[0.08]",
    accent: "text-emerald-300",
  },
  {
    border: "border-amber-400/40",
    glow: "from-amber-500/20",
    icon: "bg-amber-400/10 text-amber-300",
    selected: "border-amber-400 bg-amber-400/[0.08]",
    accent: "text-amber-300",
  },
  {
    border: "border-pink-400/40",
    glow: "from-pink-500/20",
    icon: "bg-pink-400/10 text-pink-300",
    selected: "border-pink-400 bg-pink-400/[0.08]",
    accent: "text-pink-300",
  },
];

export default function Home() {
  const [themeId, setThemeId] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const theme = themes.find((item) => item.id === themeId);
  const themeIndex = themes.findIndex((item) => item.id === themeId);
  
  function chooseTheme(id: string) {
    setThemeId(id);
    setSelected([]);
    setMessage("");
    setSuccess(false);
  }

  function toggleMaterial(id: string) {
    setMessage("");

    setSelected((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      if (current.length >= 5) return current;

      return [...current, id];
    });
  }

  async function submitRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!theme || selected.length !== 5) {
      setMessage("Veuillez sélectionner exactement 5 matériels.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          themeId,
          materialIds: selected,
          teamName,
          leaderName,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue.");
      }

      setSuccess(true);
      setMessage("Votre demande a été envoyée avec succès !");
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer votre demande."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#080b14] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/[0.12] blur-[130px]" />
        <div className="absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.10] blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.07] blur-[130px]" />
      </div>

      <header className="relative z-10 border-b border-white/[0.07] bg-[#080b14]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#" className="flex items-center gap-3">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/technomaker-logo.png"
                alt="Technomaker Club Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-black tracking-[0.16em]">
                HACK FOR A <span className="text-cyan-300">BETTER TUNISIA</span>
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
                Technomaker Club
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300">
              Material reservation
            </span>
          </div>

          <a
            href="#selection"
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-bold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            Get started <span className="ml-1 text-cyan-300">↗</span>
          </a>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-4 py-2">
            <span className="text-cyan-300">✳</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-100">
              Technomaker · Hackathon 2026
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-black leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Your idea.
            <br />
            Your tools.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Your next build.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
            Choose your challenge, pick the materials your team needs, and
            submit your reservation. Everything starts with the right tools.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#selection"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-7 py-4 text-sm font-extrabold text-[#06101c] shadow-xl shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-cyan-500/20"
            >
              Choose your materials <span className="text-lg">→</span>
            </a>
            <div className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-semibold text-slate-300">
              <span className="text-cyan-300">✓</span> Simple. Fast. Organized.
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-white/[0.08] pt-7">
            <div>
              <p className="text-2xl font-black text-white">05</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Materials per team
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">01</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Selected challenge
              </p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">100%</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Online request
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-violet-500/20 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/[0.12] bg-[#111827]/80 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  Reservation overview
                </p>
                <p className="mt-1 text-lg font-extrabold">Your team workspace</p>
              </div>
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-200">
                LIVE PREVIEW
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-[#080d19] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Material selection
                </span>
                <span className="text-xs font-bold text-cyan-300">0 / 5</span>
              </div>
              <div className="mt-4 flex gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-2 flex-1 rounded-full bg-white/10"
                  />
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {["Choose a challenge", "Select 5 materials", "Confirm your team"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-black text-cyan-200">
                        0{index + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-300">
                        {item}
                      </span>
                      <span className="ml-auto text-slate-600">→</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-2xl">⚡</p>
                <p className="mt-3 text-sm font-bold">Quick selection</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Pick your equipment in a few steps.
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                <p className="text-2xl">✉</p>
                <p className="mt-3 text-sm font-bold">Email confirmation</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your request goes directly to the club.
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Built for teams. Powered by ideas.
            </div>
          </div>
        </div>
      </section>

      <section
        id="selection"
        className="relative z-10 border-y border-white/[0.07] bg-[#0c111e]/80"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-300">
                Start your reservation
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Build your equipment list.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Follow three simple steps to reserve the materials your team
                needs for the hackathon.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Takes only a few minutes
            </div>
          </div>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {[
              ["01", "Choose a theme", "Select your challenge"],
              ["02", "Pick materials", "Choose exactly five"],
              ["03", "Confirm", "Send your team request"],
            ].map(([number, title, description], index) => (
              <div
                key={number}
                className={`flex items-center gap-4 rounded-2xl border p-4 ${
                  index === 0
                    ? "border-cyan-300/30 bg-cyan-300/[0.06]"
                    : "border-white/[0.07] bg-white/[0.025]"
                }`}
              >
                <span className="text-xl font-black text-cyan-300">{number}</span>
                <div>
                  <p className="text-sm font-bold">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/10 text-sm font-black text-cyan-300">
              01
            </span>
            <div>
              <h3 className="font-extrabold">Select your theme</h3>
              <p className="mt-1 text-xs text-slate-500">
                Each theme has its own dedicated material catalogue.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((item, index) => {
              const itemStyle = themeStyles[index % themeStyles.length];
              const active = themeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseTheme(item.id)}
                  aria-pressed={active}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${
                    active
                      ? itemStyle.selected
                      : "border-white/[0.09] bg-[#111827]/70 hover:border-white/20"
                  }`}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${itemStyle.glow} to-transparent opacity-0 transition group-hover:opacity-100 ${
                      active ? "opacity-100" : ""
                    }`}
                  />
                  <div className="relative flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${itemStyle.icon}`}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition ${
                        active
                          ? `${itemStyle.border} ${itemStyle.accent}`
                          : "border-white/10 text-slate-600"
                      }`}
                    >
                      {active ? "✓" : "↗"}
                    </span>
                  </div>
                  <div className="relative mt-6">
                    <h4 className="text-lg font-extrabold">{item.name}</h4>
                    <p className="mt-2 min-h-10 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <div className="relative mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Challenge {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs font-bold ${
                        active ? itemStyle.accent : "text-slate-400"
                      }`}
                    >
                      {active ? "Selected" : "Choose theme"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {theme && (
            <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1fr_340px]">
              <div>
                <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10 text-sm font-black text-violet-300">
                      02
                    </span>
                    <div>
                      <h3 className="font-extrabold">Choose your materials</h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Equipment available for {theme.name}
                      </p>
                    </div>
                  </div>
                  <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-slate-300">
                    <span className="text-cyan-300">{selected.length}</span> / 5
                    selected
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {theme.materials.map((material, index) => {
                    const active = selected.includes(material.id);
                    const limitReached = selected.length >= 5 && !active;

                    return (
                      <div
                        key={material.id}
                        className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 transition duration-200 ${
                          active
                            ? "border-cyan-300/40 bg-cyan-300/[0.07]"
                            : "border-white/[0.08] bg-[#111827]/70 hover:border-white/20"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                              active
                                ? "bg-cyan-300/15 text-cyan-200"
                                : "bg-white/[0.06] text-slate-400"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-100">
                              {material.name}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-500">
                              {active ? "Added to your selection" : "Available for this theme"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleMaterial(material.id)}
                          disabled={limitReached}
                          aria-label={`${active ? "Remove" : "Add"} ${material.name}`}
                          className={`shrink-0 rounded-xl px-3 py-2.5 text-xs font-extrabold transition ${
                            active
                              ? "bg-cyan-300 text-[#07101c] hover:bg-cyan-200"
                              : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/30 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-30"
                          }`}
                        >
                          {active ? "Added ✓" : "Add +"}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {theme.materials.length === 0 && (
                  <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-6 text-sm text-amber-100/80">
                    No materials have been configured for this theme yet.
                  </div>
                )}

                {selected.length === 5 && (
                  <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4 text-sm text-emerald-200">
                    ✓ You have selected all 5 materials. You can now confirm
                    your team request.
                  </div>
                )}
              </div>

              <aside className="rounded-2xl border border-white/[0.09] bg-[#111827]/80 p-5 shadow-xl shadow-black/20 lg:sticky lg:top-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                      Your selection
                    </p>
                    <h3 className="mt-1 text-lg font-extrabold">Reservation list</h3>
                  </div>
                  <span className="rounded-lg bg-cyan-300/10 px-3 py-2 text-sm font-black text-cyan-200">
                    {selected.length}/5
                  </span>
                </div>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                    style={{ width: `${(selected.length / 5) * 100}%` }}
                  />
                </div>

                <div className="mt-5 space-y-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const id = selected[index];
                    const material = theme.materials.find((item) => item.id === id);

                    return (
                      <div
                        key={index}
                        className="flex min-h-12 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2"
                      >
                        <span className="text-xs font-black text-slate-600">
                          0{index + 1}
                        </span>
                        {material ? (
                          <>
                            <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-200">
                              {material.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleMaterial(material.id)}
                              className="text-xs font-bold text-rose-300 transition hover:text-rose-200"
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-slate-600">
                            Waiting for material...
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Select five different materials from the catalogue of your
                  chosen theme.
                </p>

                <a
                  href="#confirmation"
                  className={`mt-5 flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-extrabold transition ${
                    selected.length === 5
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-[#06101c] shadow-lg shadow-blue-500/20 hover:-translate-y-0.5"
                      : "pointer-events-none bg-white/[0.06] text-slate-600"
                  }`}
                >
                  Continue to confirmation →
                </a>
              </aside>
            </div>
          )}

          {theme && selected.length === 5 && (
            <section
              id="confirmation"
              className="mt-12 scroll-mt-8 rounded-3xl border border-white/[0.1] bg-gradient-to-br from-[#151e30] to-[#0e1421] p-6 shadow-2xl shadow-black/20 sm:p-9"
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-sm font-black text-emerald-300">
                  03
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                    Almost there
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold">
                    Confirm your team request
                  </h3>
                </div>
              </div>

              {success ? (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06] p-7 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15 text-3xl text-emerald-300">
                    ✓
                  </div>
                  <h4 className="mt-5 text-2xl font-black">
                    Request submitted!
                  </h4>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
                    Your material request has been sent successfully. The
                    Technomaker team has been notified.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setThemeId("");
                      setSelected([]);
                      setTeamName("");
                      setLeaderName("");
                      setEmail("");
                      setMessage("");
                      setSuccess(false);
                    }}
                    className="mt-6 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Create another request
                  </button>
                </div>
              ) : (
                <form onSubmit={submitRequest} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-300">
                      Team name
                      <input
                        required
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Ex: Team Innovators"
                        maxLength={100}
                        className="premium-input mt-2"
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-300">
                      Team leader
                      <input
                        required
                        value={leaderName}
                        onChange={(e) => setLeaderName(e.target.value)}
                        placeholder="Your full name"
                        maxLength={100}
                        className="premium-input mt-2"
                      />
                    </label>
                  </div>

                  <label className="block text-sm font-semibold text-slate-300">
                    Contact email
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="team@example.com"
                      maxLength={254}
                      className="premium-input mt-2"
                    />
                  </label>

                  {message && (
                    <p
                      role="alert"
                      className={`rounded-xl border p-4 text-sm font-semibold ${
                        success
                          ? "border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300"
                          : "border-rose-400/20 bg-rose-400/[0.06] text-rose-300"
                      }`}
                    >
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || selected.length !== 5}
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-4 text-sm font-black text-[#06101c] shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Sending your request..." : "Confirm reservation"}
                    {!loading && <span className="text-lg">→</span>}
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    By submitting, your team details and selected materials
                    will be sent to the Technomaker club.
                  </p>
                </form>
              )}
            </section>
          )}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/[0.07] bg-[#080b14]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:text-left">
          <div>
            <p className="text-sm font-black tracking-[0.14em]">
              HACK<span className="text-cyan-300">MATERIALS</span>
            </p>
            <p className="mt-1 text-xs text-slate-600">
              A Technomaker Club initiative.
            </p>
          </div>
          <p className="text-xs text-slate-600">
            © 2026 Technomaker Club. Built for innovators.
          </p>
        </div>
      </footer>
    </main>
  );
}
