import type { Metadata } from "next";
import "./globals.scss";
import "./variables.scss";

export const metadata: Metadata = {
  title: "kierancanter.dev",
  description: "If you're reading this, drink more milk",
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

      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
