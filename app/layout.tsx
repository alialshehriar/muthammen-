import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "مُثمّن - تقييم عقاري ذكي بالذكاء الاصطناعي | Muthammen",
  description: "منصة مُثمّن هي منصة تقييم عقاري ذكية مدعومة بالذكاء الاصطناعي، تهدف لتوفير تقييم دقيق وسريع للعقارات في السعودية خلال دقائق",
  keywords: "مُثمّن, تقييم عقاري, عقارات, السعودية, ذكاء اصطناعي, Muthammen, AI valuation, real estate",
  authors: [{ name: "Muthammen" }],
  creator: "Muthammen",
  publisher: "Muthammen",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.muthammen.com'),
  openGraph: {
    title: "مُثمّن - تقييم عقاري ذكي بالذكاء الاصطناعي",
    description: "احصل على تقييم دقيق لعقارك في أقل من دقيقة باستخدام تقنيات الذكاء الاصطناعي المتقدمة",
    url: "https://www.muthammen.com",
    siteName: "Muthammen",
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مُثمّن - تقييم عقاري ذكي بالذكاء الاصطناعي",
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

