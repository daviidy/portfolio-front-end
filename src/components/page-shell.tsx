"use client";

import { usePathname } from "next/navigation";

// The homepage, Resources and Workshop pages are full-bleed (brand sections). Every other page keeps the
// original narrow reading column.
export function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname?.startsWith("/resources") || pathname?.startsWith("/workshop")) return <>{children}</>;
  return (
    <div className="max-w-2xl mx-auto py-12 sm:py-24 px-6">{children}</div>
  );
}
