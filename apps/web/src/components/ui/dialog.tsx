"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const DialogRoot = Dialog.Root;
export const DialogTrigger = Dialog.Trigger;
export const DialogClose = Dialog.Close;

export function DialogContent({
  className,
  children,
  title,
  description,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-[var(--tos-surface-overlay)] data-[state=open]:animate-in" />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-[var(--tos-radius-lg)] border border-tos-border bg-tos-surface p-6",
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <Dialog.Title className="text-lg font-medium text-tos-text-strong">{title}</Dialog.Title>
            {description ? (
              <Dialog.Description className="mt-1 text-sm text-tos-text-muted">
                {description}
              </Dialog.Description>
            ) : null}
          </div>
          <Dialog.Close
            className="rounded-[var(--tos-radius-sm)] p-1 text-tos-text-muted hover:bg-tos-bg-muted hover:text-tos-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Dialog.Close>
        </div>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
