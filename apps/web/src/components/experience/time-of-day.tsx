"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

const TOD_ORDER: TimeOfDay[] = ["morning", "afternoon", "evening", "night"];

export function resolveTimeOfDay(date = new Date()): TimeOfDay {
  const h = date.getHours();
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

export function greetingFor(tod: TimeOfDay, name?: string): string {
  const first = name?.split(" ")[0];
  const base =
    tod === "morning"
      ? "Good morning"
      : tod === "afternoon"
        ? "Good afternoon"
        : tod === "evening"
          ? "Good evening"
          : "Welcome";
  return first ? `${base}, ${first}` : base;
}

type TodContextValue = {
  tod: TimeOfDay;
  setTod: (tod: TimeOfDay) => void;
  cycleTod: () => void;
  auto: boolean;
  setAuto: (auto: boolean) => void;
};

const TodContext = createContext<TodContextValue | null>(null);

export function TimeOfDayProvider({ children }: { children: ReactNode }) {
  const [auto, setAuto] = useState(true);
  const [tod, setTodState] = useState<TimeOfDay>("afternoon");

  useEffect(() => {
    setTodState(resolveTimeOfDay());
  }, []);

  useEffect(() => {
    if (!auto) return;
    const sync = () => setTodState(resolveTimeOfDay());
    sync();
    const id = window.setInterval(sync, 60_000);
    return () => window.clearInterval(id);
  }, [auto]);

  useEffect(() => {
    document.documentElement.dataset.tod = tod;
  }, [tod]);

  const setTod = useCallback((next: TimeOfDay) => {
    setAuto(false);
    setTodState(next);
  }, []);

  const cycleTod = useCallback(() => {
    setAuto(false);
    setTodState((prev) => {
      const i = TOD_ORDER.indexOf(prev);
      return TOD_ORDER[(i + 1) % TOD_ORDER.length]!;
    });
  }, []);

  const value = useMemo(
    () => ({ tod, setTod, cycleTod, auto, setAuto }),
    [tod, setTod, cycleTod, auto],
  );

  return <TodContext.Provider value={value}>{children}</TodContext.Provider>;
}

export function useTimeOfDay(): TodContextValue {
  const ctx = useContext(TodContext);
  if (!ctx) {
    throw new Error("useTimeOfDay must be used within TimeOfDayProvider");
  }
  return ctx;
}

/** Optional hook when provider may be absent (e.g. isolated tests). */
export function useTimeOfDayOptional(): TodContextValue | null {
  return useContext(TodContext);
}
