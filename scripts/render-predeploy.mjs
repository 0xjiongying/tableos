#!/usr/bin/env node
/**
 * Fail-fast Render pre-deploy: apply schema + seed demo data.
 * Adds connect_timeout so Postgres cannot hang the deploy forever.
 * Does not print secret values.
 */

import { spawn } from "node:child_process";

function present(name) {
  const v = process.env[name];
  return Boolean(v && String(v).trim());
}

function withDbTimeouts(url) {
  try {
    const u = new URL(url);
    if (!u.searchParams.has("connect_timeout")) {
      u.searchParams.set("connect_timeout", "10");
    }
    // Render Postgres expects TLS; keep existing sslmode if set.
    if (!u.searchParams.has("sslmode")) {
      u.searchParams.set("sslmode", "require");
    }
    return u.toString();
  } catch {
    return url;
  }
}

function run(cmd, args, env, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      env,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error(`${cmd} ${args.join(" ")} timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("exit", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function main() {
  console.log("[render-predeploy] env check:", {
    DATABASE_URL: present("DATABASE_URL") ? "present" : "missing",
    NODE_ENV: process.env.NODE_ENV ?? "unset",
    NEXT_PUBLIC_APP_URL: present("NEXT_PUBLIC_APP_URL") ? "present" : "missing",
  });

  if (!present("DATABASE_URL")) {
    throw new Error("DATABASE_URL is missing");
  }

  const env = {
    ...process.env,
    DATABASE_URL: withDbTimeouts(process.env.DATABASE_URL),
  };

  // Push schema, then seed demo restaurant data for staff/guest flows.
  await run("npm", ["run", "db:push", "-w", "@flowarc/web"], env, 90_000);
  await run("npm", ["run", "db:seed", "-w", "@flowarc/web"], env, 90_000);
  console.log("[render-predeploy] complete");
}

main().catch((err) => {
  console.error("[render-predeploy] failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
