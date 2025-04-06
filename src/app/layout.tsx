import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DATA } from '@/data/resume';
import { cn } from '@/lib/utils';
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  icons: {
    icon: '/dave.png',
    shortcut: '/dave.png',
    apple: '/dave.png',
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              // Load Klaviyo script
              (function() {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=Yxt67z';
                s.onload = function() {
                  // Set up event listeners after Klaviyo script is loaded
                  setupKlaviyoFormTriggers();
                };
                var h = document.getElementsByTagName('script')[0];
                h.parentNode.insertBefore(s, h);
              })();

              // Function to set up Klaviyo form triggers
              function setupKlaviyoFormTriggers() {
                document.addEventListener('DOMContentLoaded', function() {
                  // French form trigger
                  var frenchTrigger = document.querySelector('.klaviyo_form_trigger_fr');
                  if (frenchTrigger) {
                    frenchTrigger.addEventListener('click', function(e) {
                      e.preventDefault();
                      window._klOnsite = window._klOnsite || [];
                      window._klOnsite.push(['openForm', 'VdDBGB']);
                    });
                  }
                });

                // Also set up event listeners immediately in case DOM is already loaded
                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                  // French form trigger
                  var frenchTrigger = document.querySelector('.klaviyo_form_trigger_fr');
                  if (frenchTrigger) {
                    frenchTrigger.addEventListener('click', function(e) {
                      e.preventDefault();
                      window._klOnsite = window._klOnsite || [];
                      window._klOnsite.push(['openForm', 'VdDBGB']);
                    });
                  }
                }
              }
            `
          }}
        />
      </body>
    </html>
  );
}
