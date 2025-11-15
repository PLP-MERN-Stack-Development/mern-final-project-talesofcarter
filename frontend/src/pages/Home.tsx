import { type JSX } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import FAQs from "../components/FAQs";

function Home(): JSX.Element {
  return (
    <section>
      <Hero />
      <About />
      <Features />
      <Pricing />
      <FAQs />
    </section>
  );
}

export default Home;
