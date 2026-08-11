import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Rathan & Sushma | Wedding Invitation",
  description: "Join us to celebrate the wedding of Rathan and Sushma on 27 August 2026 in Kadapa.",
  openGraph: { title: "Rathan & Sushma | Wedding Invitation", description: "27 August 2026 · Sai Srinivasa Garden, Kadapa", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
