import type { Metadata } from "next";
import "./globals.scss";
import "./variables.scss";

export const metadata: Metadata = {
  title: "kierancanter.dev",
  description: "If you're reading this, drink milk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="auto" />
        <meta name="apple-mobile-web-app-status-bar-style" content="auto" />
        
        {/* Standard favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Optional: SVG favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Optional: Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
