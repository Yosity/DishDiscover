import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { openSans } from "@/utils/fonts";

export const metadata: Metadata = {
  title: "DishDiscover",
  description: `to DishDiscover, your gateway to exploring delicious meals from
            around the world! Whether you’re craving comfort food, hunting for a
            quick weeknight dinner, or trying something entirely new, we’ve got
            you covered.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="text-[12px] md:text-[14px] lg:text-[16px]">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={` ${openSans.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
