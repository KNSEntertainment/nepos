"use client";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Footer";
import { useState } from "react";
import Header from "@/components/Header";
// Providers moved to ClientLayout

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => setIsMenuOpen((open) => !open);
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
				{children}
				<Footer />
			</body>
		</html>
	);
}
