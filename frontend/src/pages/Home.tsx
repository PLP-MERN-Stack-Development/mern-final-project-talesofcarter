import { type JSX } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";

function Home(): JSX.Element {
  return (
    <section>
      <Hero />
      <About />
      <Features />
    </section>
  );
}

export default Home;
