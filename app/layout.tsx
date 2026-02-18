import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SoundProvider } from "@/contexts/SoundContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sangam Mehta | Backend Developer Portfolio",
  description:
    "Backend developer specializing in Node.js, Express.js, and database optimization. Building scalable APIs and microservices. 250+ DSA problems solved.",
  keywords: [
    "backend developer",
    "Node.js developer",
    "Express.js",
    "API development",
    "PostgreSQL",
    "Sangam Mehta",
  ],
  authors: [{ name: "Sangam Mehta" }],
  openGraph: {
    title: "Sangam Mehta | Backend Developer",
    description:
      "Explore the portfolio of Sangam Mehta — a backend developer specializing in Node.js, Express.js, and scalable API development.",
    type: "website",
    url: "https://sangammehta.dev",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sangam Mehta Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sangam Mehta | Backend Developer",
    description:
      "Explore the portfolio of Sangam Mehta — a backend developer specializing in scalable APIs.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased noise-overlay">
        <SoundProvider>
          {children}
          <Toaster position="bottom-right" />
        </SoundProvider>
      </body>
    </html>
  );
}