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
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const alluraPath = `${basePath}/fonts/allura.ttf`;

  return <html lang="en">
    <head>
      <link rel="preload" href={alluraPath} as="font" type="font/ttf" crossOrigin="anonymous" />
      <style>{`@font-face{font-family:"Invitation Allura";src:url("${alluraPath}") format("truetype");font-style:normal;font-weight:400;font-display:block;}`}</style>
    </head>
    <body>{children}</body>
  </html>;
}
