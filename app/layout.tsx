import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "@/contexts/PlayerContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Player from "@/components/Player";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Rise On - Motivational Songs",
  description: "Fuel your focus. Feed your fire. Discover motivational songs to keep you inspired and moving forward.",
  keywords: ["motivational songs", "inspiration", "music", "productivity"],
  authors: [{ name: "Rise On Team" }],
  openGraph: {
    title: "Rise On - Motivational Songs",
    description: "Fuel your focus. Feed your fire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white`}
      >
        <PlayerProvider>
          <div className="relative min-h-screen">
            <Header />
            <main className="pt-20 pb-24">
              {children}
            </main>
            <Footer />
            <Player />
          </div>
        </PlayerProvider>
      </body>
    </html>
  );
}
