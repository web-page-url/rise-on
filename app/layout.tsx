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
  keywords: ["motivational songs", "inspiration", "music", "productivity", "success", "motivation"],
  authors: [{ name: "Anubhav" }],
  creator: "Anubhav",
  publisher: "Rise On",

  // Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
  openGraph: {
    title: "Rise On - Motivational Songs",
    description: "Fuel your focus. Feed your fire. Discover motivational songs to keep you inspired and moving forward.",
    url: "https://rise-on.vercel.app",
    siteName: "Rise On",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://rise-on.vercel.app/rise-on.jpg",
        width: 1200,
        height: 630,
        alt: "Rise On - Motivational Music App",
        type: "image/png",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Rise On - Motivational Songs",
    description: "Fuel your focus. Feed your fire. Discover motivational songs to keep you inspired and moving forward.",
    images: ["https://rise-on.vercel.app/rise-on.jpg"],
    creator: "@rise_on_app",
    site: "@rise_on_app",
  },

  // Additional meta tags for better SEO and social sharing
  metadataBase: new URL("https://rise-on.vercel.app"),
  alternates: {
    canonical: "https://rise-on.vercel.app",
  },

  // WhatsApp and other platforms
  other: {
    "og:image:secure_url": "https://rise-on.vercel.app/rise-on.jpg",
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:alt": "Rise On - Motivational Music App",
    "twitter:image:src": "https://rise-on.vercel.app/rise-on.jpg",
    "twitter:image:width": "1200",
    "twitter:image:height": "630",
    "twitter:image:alt": "Rise On - Motivational Music App",
  },

  // App-specific metadata
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (you can add your verification codes later)
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Primary Open Graph Image - Facebook, WhatsApp, LinkedIn */}
        <meta property="og:image" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta property="og:image:secure_url" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Rise On - Motivational Music App" />

        {/* Fallback Open Graph Image */}
        <meta property="og:image" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="315" />
        <meta property="og:image:type" content="image/png" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:alt" content="Rise On - Motivational Music App" />

        {/* Instagram and Pinterest specific */}
        <meta name="image" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta property="og:image" content="https://rise-on.vercel.app/rise-on.jpg" />

        {/* Microsoft Teams and Skype */}
        <meta name="msapplication-TileImage" content="https://rise-on.vercel.app/rise-on.jpg" />

        {/* Additional fallback for various platforms */}
        <meta property="og:image:url" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta property="og:image:secure_url" content="https://rise-on.vercel.app/rise-on.jpg" />

        {/* WhatsApp specific (sometimes needs explicit declaration) */}
        <meta property="og:image" content="https://rise-on.vercel.app/rise-on.jpg" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Favicon and app icons - Force browser to use our custom favicon */}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/manifest.json" />

        {/* Override any Vercel defaults */}
        <meta name="next-head-count" content="overridden" />

        {/* Additional favicon declarations for better browser support */}
        <meta name="msapplication-TileImage" content="/favicon-32x32.png?v=2" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
      </head>
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
