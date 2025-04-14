import type { Metadata } from "next";

const siteConfig = {
  name: "NXTRS",
  description: "Personal website of NXTRS",
  url: "https://nxt.rs", // Replace with your actual domain
};

export const baseMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [
    {
      name: "NXTRS",
    },
  ],
  creator: "NXTRS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(siteConfig.name)}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`/api/og?title=${encodeURIComponent(siteConfig.name)}`],
    creator: "@nxtrs", // Replace with your Twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
