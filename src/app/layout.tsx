import type { Metadata, Viewport } from "next";
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
  manifest: "/site.webmanifest",
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
  themeColor: "#333",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* SVG favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" sizes="any" href="/assets/favicons/SVG/favicon.svg" />

        {/* Standard Fsrc/app/favicon.icoavicons */}
        <link rel="icon-light" type="image/png" sizes="16x16" href="/assets/favicons/PNG/favicon-light_16.png" />
        <link rel="icon-light" type="image/png" sizes="32x32" href="/assets/favicons/PNG/favicon-light_32.png" />
        <link rel="icon-light" type="image/png" sizes="512x512" href="/assets/favicons/PNG/favicon-light_512.png" />
        <link rel="icon-dark" type="image/png" sizes="16x16" href="/assets/favicons/PNG/favicon-dark_16.png" />
        <link rel="icon-dark" type="image/png" sizes="32x32" href="/assets/favicons/PNG/favicon-dark_32.png" />
        <link rel="icon-dark" type="image/png" sizes="512x512" href="/assets/favicons/PNG/favicon-dark_512.png" />
        
        {/* Android Icon */}
        <link rel="icon-light" sizes="192x192" href="/assets/favicons/PNG/favicon-light_android.png" />
        <link rel="icon-dark" sizes="192x192" href="/assets/favicons/PNG/favicon-dark_android.png" />

        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon-light" sizes="180x180" href="/assets/favicons/PNG/favicon-light_apple.png" />
        <link rel="apple-touch-icon-dark" sizes="180x180" href="/assets/favicons/PNG/favicon-dark_apple.png" />

        {/* For Legacy Systems */}
        <link rel="shortcut icon" href="./favicon.ico" />

      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
