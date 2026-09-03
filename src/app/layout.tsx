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
  "SUTD scholarship student documenting the journey of building toward owning a business by graduation. Consistency over talent, shown in public.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aunglinhtet.com"),
  title: {
    default: "Aung Lin Htet — SUTD Scholar & Content Creator",
    template: "%s | Aung Lin Htet",
  },
  description: DESCRIPTION,
  keywords: ["personal brand", "content creator", "SUTD", "student journey", "building in public", "AI builder", "Singapore", "Next.js", "portfolio", "Aung Lin Htet"],
  authors: [{ name: "Aung Lin Htet", url: "https://aunglinhtet.com" }],
  creator: "Aung Lin Htet",
  openGraph: {
    title: "Aung Lin Htet — SUTD Scholar & Content Creator",
    description: DESCRIPTION,
    url: "https://aunglinhtet.com",
    siteName: "Aung Lin Htet",
    type: "website",
    images: [{ url: "/images/profile.png", width: 400, height: 400, alt: "Aung Lin Htet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aung Lin Htet — SUTD Scholar & Content Creator",
    description: DESCRIPTION,
    images: ["/images/profile.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "https://aunglinhtet.com" },
  verification: { google: ["boDspD9i72a-FmwgnF_M1-I4zrLIiiQ1fjzLU4wFKEg", "RaPXu06VDNQW6OTGUeYJzg8UBycz0992k_4pBc-I3cI"] },
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
