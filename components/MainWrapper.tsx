"use client";

import { usePathname } from "@/i18n/navigation";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isHome = pathname === "/" || pathname === "/en" || pathname === "/no" || pathname === "/ne";

	return <main className={isHome ? "" : "mt-24"}>{children}</main>;
}
