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
  },
  themeColor: "auto",
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
        <link rel="icon" type="image/x-icon" href="/assets/favicons/ICO/favicon-light.ico" />
        <link rel="icon" type="image/x-icon" href="/assets/favicons/ICO/favicon-dark.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/PNG/favicon-light_16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/PNG/favicon-light_32.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicons/PNG/favicon-light_512.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/PNG/favicon-dark_16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/PNG/favicon-dark_32.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/assets/favicons/PNG/favicon-dark_512.png" />
        
        {/* Android Icon */}
        <link rel="icon" sizes="192x192" href="/assets/favicons/PNG/favicon-light_android.png" />
        <link rel="icon" sizes="192x192" href="/assets/favicons/PNG/favicon-dark_android.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/PNG/favicon-light_apple.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/PNG/favicon-dark_apple.png" />
        
        {/* SVG favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" href="/assets/favicons/SVG/favicon-light.svg" />
        <link rel="icon" type="image/svg+xml" href="/assets/favicons/SVG/favicon-dark.svg" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
