import { type JSX } from "react";
import Banner from "../components/Banner";

function Reports(): JSX.Element {
  return (
    <>
      <title>Reports</title>
      <div className="relative bg-surface min-h-screen w-full overflow-hidden">
        <Banner
          title="Reports"
          breadcrumbs={[
            { label: "Home", href: "/reports" },
            { label: "Reports" },
          ]}
          backgroundImage="/aerial-view.webp"
          height="h-96"
        />
      </div>
    </>
  );
}

export default Reports;
