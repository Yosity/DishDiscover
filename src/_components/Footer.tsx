"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Footer = () => {
  useGSAP(() => {
    // Create a new timeline
    const tl = gsap.timeline({ repeat: -1 }); // `repeat: -1` to loop the entire sequence

    tl.to("#emoji1", {
      duration: 3,
      x: "20vw",
      rotation: 360,
      ease: "power1.in",
      delay: 1,
    })
      .to("#emoji1", {
        duration: 1,
        x: "0vw",
        rotation: 0,
        ease: "bounce.out",
      })
      .to("#emoji1", {
        duration: 3,
        x: "-20vw",
        rotation: -360,
        ease: "power1.in",
        delay: 1,
      })
      .to("#emoji1", {
        duration: 1,
        x: "0vw",
        rotation: 360,
        ease: "bounce.out",
      });

    // Start at the same time as the previous tween
  });
  return (
    <footer className="py-20 max-w-[1500px] w-full bg-text flex justify-center items-center text-3xl overflow-hidden">
      <div id="emoji1">&#127813;</div>
    </footer>
  );
};

export default Footer;
