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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
