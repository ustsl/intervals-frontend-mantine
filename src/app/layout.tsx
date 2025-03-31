import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "INTERVALS. Простая визуализация данных с GPT-интеграцией",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MantineProvider>

          {children}

          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
