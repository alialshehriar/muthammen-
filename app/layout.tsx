import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "بذرة - منصة التمويل الجماعي الرائدة في السعودية | Bithrah",
  description: "منصة بذرة هي منصة وساطة ذكية مدعومة بالذكاء الاصطناعي، تهدف لحل مشكلة صعوبة الوصول للتمويل التي يواجهها أصحاب الأفكار المبدعة في السعودية",
  keywords: "بذرة, تمويل جماعي, استثمار, مشاريع, السعودية, ذكاء اصطناعي, Bithrah",
  authors: [{ name: "Bithrah" }],
  creator: "Bithrah",
  publisher: "Bithrah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bithrahapp.com'),
  openGraph: {
    title: "بذرة - منصة التمويل الجماعي الرائدة في السعودية",
    description: "منصة وساطة ذكية مدعومة بالذكاء الاصطناعي لربط الأفكار المبدعة بالمستثمرين الأذكياء",
    url: "https://bithrahapp.com",
    siteName: "Bithrah",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "بذرة - منصة التمويل الجماعي الرائدة في السعودية",
    description: "منصة وساطة ذكية مدعومة بالذكاء الاصطناعي",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Cairo:wght@300;400;600;700;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 mt-16">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}

