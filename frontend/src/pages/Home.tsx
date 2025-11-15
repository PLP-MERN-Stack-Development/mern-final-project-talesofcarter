import { type JSX } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Pricing from "../components/Pricing";

function Home(): JSX.Element {
  return (
    <section>
      <Hero />
      <About />
      <Features />
      <Pricing />
    </section>
  );
}

export default Home;
