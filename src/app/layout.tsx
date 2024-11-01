import type { Metadata, Viewport } from "next";
import "@/styles/globals.scss";
import "@/styles/variables.scss";
import { ThemeProvider } from '@/context/themeContext';
import ParticleField from "@/components/particleField";
import Header from "@/components/header";
import ThemeSwitcher from "@/components/themeSwitcher";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "kierancanter.dev",
  description: "If you're reading this, drink more milk",
  applicationName: "kierancanter.dev",
  authors: [{ name: "Kieran Canter" }],
  keywords: ["development", "portfolio"],
  creator: "Kieran Canter",
  publisher: "Kieran Canter",
  manifest: "/manifest.json",
  formatDetection: {
    telephone: false,
    date: true,
    address: false,
    email: true,
    url: true
  },
  metadataBase: new URL("https://kierancanter.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "kierancanter.dev",
    description: "If you're reading this, drink more milk",
    url: "https://kierancanter.dev",
    siteName: "kierancanter.dev",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>

        {/* Theme Color */}
        <meta name="theme-color" content="#FFFFFF" />

        {/* SVG favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" sizes="any" href="/images/favicons/SVG/favicon.svg" />

        {/* Standard Favicons */}
        <link rel="icon-light" type="image/png" sizes="16x16" href="/images/favicons/PNG/favicon-light_16.png" />
        <link rel="icon-light" type="image/png" sizes="32x32" href="/images/favicons/PNG/favicon-light_32.png" />
        <link rel="icon-light" type="image/png" sizes="512x512" href="/images/favicons/PNG/favicon-light_512.png" />
        <link rel="icon-dark" type="image/png" sizes="16x16" href="/images/favicons/PNG/favicon-dark_16.png" />
        <link rel="icon-dark" type="image/png" sizes="32x32" href="/images/favicons/PNG/favicon-dark_32.png" />
        <link rel="icon-dark" type="image/png" sizes="512x512" href="/images/favicons/PNG/favicon-dark_512.png" />
        
        {/* Android Icon */}
        <link rel="icon-light" sizes="192x192" href="/images/favicons/PNG/favicon-light_android.png" />
        <link rel="icon-dark" sizes="192x192" href="/images/favicons/PNG/favicon-dark_android.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon-light" sizes="180x180" href="/images/favicons/PNG/favicon-light_apple.png" />
        <link rel="apple-touch-icon-dark" sizes="180x180" href="/images/favicons/PNG/favicon-dark_apple.png" />

        {/* For Legacy Systems */}
        <link rel="shortcut icon" href="/favicon.ico" />

      </head>
      <body className="antialiased bg-bg text-fgSoft selection:text-bg selection:bg-fgSoft">
        <ThemeProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>
          
          <div className="relative h-[100dvh] md:h-[100vh] bg-bg text-fgSoft p-4 lg:p-8 transition-colors duration-[250ms] overflow-clip">
            <div className="relative flex flex-col h-full justify-between border border-fgHard min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-4rem)] transition-colors duration-[250ms]">
              
              <ParticleField color="rgb(110, 110, 110)" />
              <header className="flex relative w-full md:w-[calc(100%-2rem)] lg:w-[calc(100%-4rem)] h-fit my-4 lg:mt-8 lg:mb-16 mx-auto justify-between pointer-events-none">
                <div className="relative flex mx-auto md:max-lg:ml-0 lg:justify-center">
                  <Header />
                </div>
                <div className="max-md:hidden relative flex justify-end lg:absolute lg:top-0 lg:right-0 lg:m-0 pointer-events-auto  ">
                  <ThemeSwitcher />
                </div>
              </header>
              
              {children}

              <div className="md:hidden relative flex justify-end m-4 pointer-events-auto">
                <ThemeSwitcher />
              </div>
            </div>
            
            <footer className="relative w-fit h-fit m-auto ml-0 flex">
              <Footer />
            </footer>
          </div>

        </ThemeProvider>
      </body>
    </html>
  );
}
