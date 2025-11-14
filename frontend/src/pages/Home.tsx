import { type JSX } from "react";
import Hero from "../components/Hero";
import About from "../components/About";

function Home(): JSX.Element {
  return (
    <section>
      <Hero />
      <About />
    </section>
  );
}

export default Home;
