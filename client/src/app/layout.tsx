import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import { Header } from "@/ui/patient/Header";

const poppins = Poppins({
  style: 'normal',
  weight: ['400', '500', '600'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Policonsultorio",
  description: "Pagina para un policonsultorio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
