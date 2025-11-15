import WOW from "wowjs";
import "animate.css";

export function animateWow(): void {
  const wow = new WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 0,
    mobile: true,
    live: true,
  });

  wow.init();
}
