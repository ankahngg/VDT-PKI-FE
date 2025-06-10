import type { Metadata } from "next";
import NavMenu from "@/views/NavigationMenu/NavMenu";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <NavMenu />
      {children}
    </div>
  );
}
