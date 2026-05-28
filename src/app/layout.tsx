import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/layout/LenisProvider";
import Nav from "@/components/layout/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "AI Developer and Web Builder based in Singapore. I build AI tools, web apps, and automation systems — and ship them solo.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aunglintet.com"),
  title: {
    default: "Aung Lin Htet — AI Developer & Web Builder",
    template: "%s | Aung Lin Htet",
  },
  description: DESCRIPTION,
  keywords: ["AI developer", "web developer", "solopreneur", "Singapore", "Next.js", "portfolio", "Aung Lin Htet"],
  authors: [{ name: "Aung Lin Htet", url: "https://aunglintet.com" }],
  creator: "Aung Lin Htet",
  openGraph: {
    title: "Aung Lin Htet — AI Developer & Web Builder",
    description: DESCRIPTION,
    url: "https://aunglintet.com",
    siteName: "Aung Lin Htet",
    type: "website",
    images: [{ url: "/images/profile.png", width: 400, height: 400, alt: "Aung Lin Htet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Lin Htet — AI Developer & Web Builder",
    description: DESCRIPTION,
    images: ["/images/profile.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://aunglintet.com" },
  verification: { google: "boDspD9i72a-FmwgnF_M1-I4zrLIiiQ1fjzLU4wFKEg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply saved theme before first paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <LenisProvider>
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
