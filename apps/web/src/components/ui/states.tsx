import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-[var(--tos-radius-md)] bg-tos-bg-muted", className)}
      aria-hidden
    />
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-[var(--tos-radius-lg)] border border-dashed border-tos-border bg-tos-bg-subtle p-8">
      <h3 className="text-base font-medium text-tos-text-strong">{title}</h3>
      {description ? <p className="max-w-md text-sm text-tos-text-muted">{description}</p> : null}
      {action}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div
      role="alert"
      className="rounded-[var(--tos-radius-lg)] border border-[var(--tos-danger-border)] bg-tos-danger-bg p-6"
    >
      <h3 className="text-base font-medium text-tos-danger">{title}</h3>
      {description ? <p className="mt-1 text-sm text-tos-text">{description}</p> : null}
    </div>
  );
}
