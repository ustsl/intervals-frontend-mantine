import type { Metadata } from "next";

import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';


import { HeaderWidget } from "@/components/widgets/HeaderWidget";
import { FooterWidget } from "@/components/widgets/FooterWidget";
import { Container } from "@mantine/core";



export const metadata: Metadata = {
  title: "Аккаунт | INTERVALS",
};

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container size={1200}>
      <HeaderWidget />
      {children}
      <FooterWidget />
    </Container>

  );
}
