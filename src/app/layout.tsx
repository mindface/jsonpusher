import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

import AdSenseScript from "../components/AdSenseScript";

import AdSense from "../components/AdSense";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Breadcrumb from "../components/common/Breadcrumb";
import SentEmailInfo from "../components/SentEmailInfo";

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

export const metadata: Metadata = {
	title: "Create Question Text App",
	description: "Generated by create text app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<SessionProvider>
					<Header />
					<Breadcrumb />
					{children}
					<SentEmailInfo />
					<AdSense />
					<Footer />
				</SessionProvider>
				<AdSenseScript />
			</body>
		</html>
	);
}
