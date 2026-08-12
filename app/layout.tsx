import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("https://rathanpv1997.github.io/rathan-sushma-wedding"),
  title: "R ♥ S · 27 August 2026",
  description: "A joyful surprise awaits.",
  openGraph: {
    type: "website",
    url: "/",
    title: "R ♥ S · 27 August 2026",
    description: "A joyful surprise awaits.",
    images: [{ url: "/wedding-preview.png", width: 1200, height: 630, alt: "R love S · 27 August 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "R ♥ S · 27 August 2026",
    description: "A joyful surprise awaits.",
    images: ["/wedding-preview.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
