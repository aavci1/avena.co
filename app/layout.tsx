import type { Metadata } from "next";
import "./styles/original-base.css";
import "./styles/original-landing.css";
import "./styles/original-contact.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://avena.co"),
  title: "Avena | Custom Software Development",
  description: "AVENA delivers custom software services to grow your business with transparency, expertise, and high-quality support.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Avena | Custom Software Development",
    description: "Custom software built for digital transformation.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AVENA — Custom Software. Built for Transformation." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avena | Custom Software Development",
    description: "Custom software built for digital transformation.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
