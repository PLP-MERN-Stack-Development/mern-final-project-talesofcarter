import { type JSX } from "react";
import Banner from "../components/Banner";

function BotEngine(): JSX.Element {
  return (
    <>
      <title>AI Advisor</title>
      <div className="relative bg-surface min-h-screen w-full overflow-hidden">
        <Banner
          title="AI Advisor"
          breadcrumbs={[
            { label: "Home", href: "/ai" },
            { label: "AI Advisor" },
          ]}
          backgroundImage="/aerial-view.webp"
          height="h-96"
        />
      </div>
    </>
  );
}

export default BotEngine;
