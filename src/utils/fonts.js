import { Charm, Bubblegum_Sans, Open_Sans } from "next/font/google";

export const charm = Charm({
  subsets: ["latin"],
  weight: ["400"],
});
export const bubblegum = Bubblegum_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // Regular & Bold
});
