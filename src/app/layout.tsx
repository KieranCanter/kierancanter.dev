import type { Metadata } from "next";
import "./globals.scss";
import "./variables.scss";

export const metadata: Metadata = {
  title: "kierancanter.dev",
  description: "If you're reading this, drink more milk",
  applicationName: "kierancanter.dev",
  authors: [{ name: "Kieran Canter" }],
  keywords: ["development", "portfolio"],
  creator: "Kieran Canter",
  publisher: "Kieran Canter",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* Standard favicons */}
        <link rel="icon" type="image/x-icon" href="/assets/favicons/ICO/logo-light.ico" />
        <link rel="icon" type="image/x-icon" href="/assets/favicons/ICO/logo-dark.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/PNG/logo-light_16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/PNG/logo-light_32.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicons/PNG/logo-light_512.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/PNG/logo-dark_16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/PNG/logo-dark_32.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicons/PNG/logo-dark_512.png" />
        
        {/* Android Icon */}
        <link rel="icon" sizes="192x192" href="/assets/favicons/PNG/logo-light_android.png" />
        <link rel="icon" sizes="192x192" href="/assets/favicons/PNG/logo-dark_android.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/PNG/logo-light_apple.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/PNG/logo-dark_apple.png" />
        
        {/* SVG favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" href="/assets/favicons/SVG/logo-light.svg" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicons/SVG/logo-dark.svg" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content="#000000" id="theme-color-meta" />

      </head>
      <body className="antialiased">
        <nav style={{
          backgroundColor: '#000000',
          color: '#ffffff',
          // Uncomment and adjust these as needed:
          // padding: '1rem',
          // position: 'fixed',
          // top: 0,
          // left: 0,
          // right: 0,
          // zIndex: 1000,
        }}>
          {/* Add your navigation items here */}
        </nav>
        {children}
      </body>
    </html>
  );
}
