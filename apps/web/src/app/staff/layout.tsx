import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth/session";
import { StaffNav } from "@/components/layout/nav";

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/staff";
  const isLogin = pathname.includes("/staff/login");

  if (!isLogin) {
    const session = await getSession();
    if (!session) redirect("/staff/login");
  }

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <StaffNav pathname={pathname} />
      <div className="mx-auto max-w-[72rem] px-6 py-8">{children}</div>
    </div>
  );
}
