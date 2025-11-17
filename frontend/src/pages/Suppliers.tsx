import { type JSX, useState, useMemo } from "react";
import Banner from "../components/Banner";
import {
  Factory,
  Leaf,
  TrendingUp,
  AlertTriangle,
  Globe,
  BarChart,
  Search,
  ChevronRight,
  X,
  ArrowUpDown,
  Building2,
} from "lucide-react";

// Dummy supplier data
const suppliersData = [
  {
    id: 1,
    name: "EcoPack Industries",
    category: "Packaging",
    esgScore: "A+",
    co2Impact: 420,
    risk: "Low",
    sustainability: 88,
    spend: 120000,
    aiNote: "High sustainability supplier with low risk.",
    region: "Europe",
    website: "www.ecopack.com",
    insights: [
      "This supplier reduces CO₂ impact by 18% compared to industry average.",
      "Excellent governance reporting and transparency.",
      "Top performer in renewable energy adoption.",
    ],
  },
  {
    id: 2,
    name: "GlobalTech Materials",
    category: "Raw Materials",
    esgScore: "B",
    co2Impact: 1850,
    risk: "Medium",
    sustainability: 65,
    spend: 340000,
    aiNote: "Consider exploring greener alternatives for 25% of spend.",
    region: "Asia",
    website: "www.globaltech.com",
    insights: [
      "CO₂ emissions 12% higher than industry standard.",
      "Risk flagged due to limited environmental reporting.",
      "Strong social compliance but needs governance improvement.",
    ],
  },
  {
    id: 3,
    name: "Swift Logistics Co",
    category: "Logistics",
    esgScore: "A",
    co2Impact: 980,
    risk: "Low",
    sustainability: 82,
    spend: 210000,
    aiNote: "Supplier is compliant. Electric fleet transition in progress.",
    region: "North America",
    website: "www.swiftlogistics.com",
    insights: [
      "45% of fleet converted to electric vehicles.",
      "Carbon offset program covers 80% of emissions.",
      "Excellent labor practices and safety records.",
    ],
  },
  {
    id: 4,
    name: "PrimePlast Manufacturing",
    category: "Packaging",
    esgScore: "C",
    co2Impact: 2240,
    risk: "High",
    sustainability: 45,
    spend: 180000,
    aiNote: "High risk. Immediate review recommended.",
    region: "Asia",
    website: "www.primeplast.com",
    insights: [
      "Significantly higher CO₂ emissions than alternatives.",
      "Poor governance reporting and transparency issues.",
      "Consider switching to EcoPack Industries or similar.",
    ],
  },
  {
    id: 5,
    name: "GreenEnergy Solutions",
    category: "Energy",
    esgScore: "A+",
    co2Impact: 150,
    risk: "Low",
    sustainability: 95,
    spend: 280000,
    aiNote: "Exemplary sustainability leader.",
    region: "Europe",
    website: "www.greenenergy.com",
    insights: [
      "100% renewable energy provider with net-zero operations.",
      "Industry leader in environmental innovation.",
      "Strong community engagement and social programs.",
    ],
  },
  {
    id: 6,
    name: "MetalWorks International",
    category: "Raw Materials",
    esgScore: "B",
    co2Impact: 1650,
    risk: "Medium",
    sustainability: 58,
    spend: 420000,
    aiNote: "Explore greener alternative for high-volume orders.",
    region: "North America",
    website: "www.metalworks.com",
    insights: [
      "Moderate emissions with room for improvement.",
      "Currently implementing new recycling programs.",
      "Good labor standards but environmental targets lagging.",
    ],
  },
  {
    id: 7,
    name: "BioFiber Textiles",
    category: "Textiles",
    esgScore: "A",
    co2Impact: 680,
    risk: "Low",
    sustainability: 85,
    spend: 195000,
    aiNote: "Strong sustainable practices with organic materials.",
    region: "South America",
    website: "www.biofiber.com",
    insights: [
      "Uses 90% organic and recycled materials.",
      "Fair trade certified with excellent labor practices.",
      "Carbon neutral operations since 2022.",
    ],
  },
  {
    id: 8,
    name: "TechAssembly Corp",
    category: "Electronics",
    esgScore: "B",
    co2Impact: 1420,
    risk: "Medium",
    sustainability: 62,
    spend: 510000,
    aiNote: "Good performance. Monitor governance improvements.",
    region: "Asia",
    website: "www.techassembly.com",
    insights: [
      "Investing in cleaner manufacturing processes.",
      "Supply chain transparency improving year-over-year.",
      "E-waste recycling program in development.",
    ],
  },
];

function Suppliers(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [esgFilter, setEsgFilter] = useState("All");
  const [selectedSupplier, setSelectedSupplier] = useState<
    (typeof suppliersData)[0] | null
  >(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(suppliersData.map((s) => s.category))),
  ];
  const risks = ["All", "Low", "Medium", "High"];
  const esgGrades = ["All", "A+", "A", "B", "C"];

  // Filter and sort suppliers
  const filteredSuppliers = useMemo(() => {
    const filtered = suppliersData.filter((supplier) => {
      const matchesSearch = supplier.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || supplier.category === categoryFilter;
      const matchesRisk = riskFilter === "All" || supplier.risk === riskFilter;
      const matchesESG = esgFilter === "All" || supplier.esgScore === esgFilter;

      return matchesSearch && matchesCategory && matchesRisk && matchesESG;
    });

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, categoryFilter, riskFilter, esgFilter, sortConfig]);

  const handleSort = (key: string) => {
    setSortConfig((current) => {
      if (current?.key === key) {
        return current.direction === "asc" ? { key, direction: "desc" } : null;
      }
      return { key, direction: "asc" };
    });
  };

  const getESGColor = (score: string) => {
    switch (score) {
      case "A+":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "A":
        return "bg-green-100 text-green-800 border-green-300";
      case "B":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "C":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <title>Suppliers Intelligence</title>
      <div className="relative min-h-screen w-full bg-slate-50">
        <Banner
          title="Suppliers"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Suppliers" }]}
          backgroundImage="/ship.webp"
          height="h-96"
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 -mt-20 relative z-10">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Suppliers Intelligence
                </h1>
                <p className="text-slate-600 text-lg">
                  Analyze sustainability, performance, and risk across your
                  entire supply network.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent text-slate-900 px-4 py-2 rounded-lg font-semibold">
                  {filteredSuppliers.length} Suppliers
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              {/* Risk Filter */}
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              >
                {risks.map((risk) => (
                  <option key={risk} value={risk}>
                    {risk === "All" ? "All Risks" : risk}
                  </option>
                ))}
              </select>

              {/* ESG Filter */}
              <select
                value={esgFilter}
                onChange={(e) => setEsgFilter(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white"
              >
                {esgGrades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade === "All" ? "All ESG Grades" : grade}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Suppliers Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <button
                        onClick={() => handleSort("name")}
                        className="flex items-center gap-2 hover:text-slate-900"
                      >
                        Supplier <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <button
                        onClick={() => handleSort("esgScore")}
                        className="flex items-center gap-2 hover:text-slate-900"
                      >
                        ESG Score <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <button
                        onClick={() => handleSort("co2Impact")}
                        className="flex items-center gap-2 hover:text-slate-900"
                      >
                        CO₂ Impact <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Risk Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <button
                        onClick={() => handleSort("sustainability")}
                        className="flex items-center gap-2 hover:text-slate-900"
                      >
                        Sustainability <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      <button
                        onClick={() => handleSort("spend")}
                        className="flex items-center gap-2 hover:text-slate-900"
                      >
                        Annual Spend <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      AI Recommendation
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSuppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedSupplier(supplier)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent bg-opacity-20 flex items-center justify-center">
                            <Factory className="w-5 h-5 text-slate-700" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900">
                              {supplier.name}
                            </div>
                            <div className="text-sm text-slate-500">
                              {supplier.region}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-semibold text-sm ${getESGColor(
                            supplier.esgScore
                          )}`}
                        >
                          <Leaf className="w-4 h-4" />
                          {supplier.esgScore}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">
                          {supplier.co2Impact.toLocaleString()} kg
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(
                            supplier.risk
                          )}`}
                        >
                          {supplier.risk === "High" && (
                            <AlertTriangle className="w-4 h-4" />
                          )}
                          {supplier.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${supplier.sustainability}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 min-w-12">
                            {supplier.sustainability}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          ${supplier.spend.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-600 max-w-xs truncate">
                          {supplier.aiNote}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSupplier(supplier);
                          }}
                          className="inline-flex items-center gap-1 text-accent hover:text-green-700 font-medium text-sm"
                        >
                          View <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSuppliers.length === 0 && (
              <div className="text-center py-12">
                <Factory className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">
                  No suppliers found matching your filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Supplier Detail Drawer */}
        {selectedSupplier && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="w-full max-w-2xl bg-white shadow-2xl overflow-y-auto animate-slide-in">
              {/* Drawer Header */}
              <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-start justify-between z-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-accent bg-opacity-20 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-slate-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedSupplier.name}
                    </h2>
                    <p className="text-slate-600 mt-1">
                      {selectedSupplier.category} • {selectedSupplier.region}
                    </p>
                    <a
                      href={`https://${selectedSupplier.website}`}
                      className="text-accent hover:underline text-sm mt-1 inline-block"
                    >
                      {selectedSupplier.website}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSupplier(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="px-8 py-6 space-y-8">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-900">
                        ESG Score
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-emerald-900">
                      {selectedSupplier.esgScore}
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-slate-600" />
                      <span className="text-sm font-medium text-slate-900">
                        CO₂ Impact
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      {selectedSupplier.co2Impact.toLocaleString()}
                      <span className="text-lg"> kg</span>
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Sustainability
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900">
                      {selectedSupplier.sustainability}%
                    </div>
                  </div>

                  <div className="bg-linear-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="w-5 h-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-900">
                        Annual Spend
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-amber-900">
                      ${(selectedSupplier.spend / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Risk Assessment
                    </h3>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getRiskColor(
                        selectedSupplier.risk
                      )}`}
                    >
                      {selectedSupplier.risk} Risk
                    </span>
                  </div>
                  <p className="text-slate-700">{selectedSupplier.aiNote}</p>
                </div>

                {/* AI Insights */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-accent" />
                    AI-Generated Insights
                  </h3>
                  <div className="space-y-3">
                    {selectedSupplier.insights.map((insight, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 p-4 bg-white rounded-lg border border-slate-200"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0" />
                        <p className="text-slate-700">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability Breakdown */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    ESG Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Environmental
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {Math.min(100, selectedSupplier.sustainability + 5)}%
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              selectedSupplier.sustainability + 5
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Social
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {Math.max(0, selectedSupplier.sustainability - 3)}%
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${Math.max(
                              0,
                              selectedSupplier.sustainability - 3
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">
                          Governance
                        </span>
                        <span className="text-sm font-semibold text-slate-900">
                          {selectedSupplier.sustainability}%
                        </span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{
                            width: `${selectedSupplier.sustainability}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-accent text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#88e25b] transition-colors">
                    View Full Report
                  </button>
                  <button className="flex-1 border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                    Find Alternatives
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Suppliers;
