import { type JSX } from "react";

interface StatsDataType {
  value: number;
  label: string;
}

function About(): JSX.Element {
  const statsData: StatsDataType[] = [
    { value: 50, label: "Suppliers Assessed" },
    { value: 120, label: "Carbon Impact Reduced" },
    { value: 95, label: "Data Accuracy" },
  ];

  const layoutStyles =
    "max-w-screen mx-auto px-4 sm:px-6 md:px-12 lg:px-20 w-full";
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <div
        className={`${layoutStyles} flex-column lg:flex justify-between py-5 md:py-8 lg:py-12`}
      >
        <div className="w-1/4">
          <h2 className="text-lg md:text-xl font-bold text-accent">About Us</h2>
        </div>
        <div className="w-full lg:w-3/4">
          <div>
            <p className="text-lg md:text-xl lg:text-3xl leading-12 font-bold">
              Optimize your procurement with AI-powered sustainability
              solutions. We provide real-time insights, greener supplier
              recommendations, and smarter purchasing decisions. Reduce costs,
              lower environmental impact, and make your supply chain responsible
              and efficient!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {statsData.map((entry) => {
                return (
                  <div key={entry.label}>
                    <div className="flex items-center text-2xl md:text-3xl lg:text-5xl font-medium mb-4">
                      <h2>{entry.value}</h2>
                      <span>K+</span>
                    </div>
                    <h3 className="text-gray-700 text-base md:text-lg lg:text-lg">
                      {entry.label}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
