import { type JSX } from "react";
import Banner from "../components/Banner";

function Suppliers(): JSX.Element {
  return (
    <>
      <title>Suppliers</title>
      <div className="relative min-h-screen w-full overflow-hidden">
        <Banner
          title="Suppliers"
          breadcrumbs={[
            { label: "Home", href: "/suppliers" },
            { label: "Suppliers" },
          ]}
          backgroundImage="/ship.webp"
          height="h-96"
        />
      </div>
    </>
  );
}

export default Suppliers;
