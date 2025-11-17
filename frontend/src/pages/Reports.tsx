import { type JSX, useState, useMemo } from "react";
import Banner from "../components/Banner";
import {
  FileText,
  BarChart3,
  Leaf,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Plus,
  Search,
  FileDown,
  FileSpreadsheet,
  X,
  Sparkles,
  Zap,
  Target,
  Shield,
  DollarSign,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Report {
  id: string;
  title: string;
  type:
    | "CO₂ Impact"
    | "Spend Analysis"
    | "Supplier ESG"
    | "Scorecard"
    | "Monthly Summary";
  date: string;
  summary: string;
  tags: string[];
  icon: JSX.Element;
  gradient: string;
  status: "completed" | "processing" | "draft";
}

function Reports(): JSX.Element {
  const [dateFilter, setDateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState(false);

  const reports: Report[] = [
    {
      id: "1",
      title: "Q4 2024 Carbon Emissions Analysis",
      type: "CO₂ Impact",
      date: "2024-11-15",
      summary:
        "Comprehensive analysis showing 24% reduction in carbon footprint across all procurement operations. Key improvements in logistics and raw materials sourcing.",
      tags: ["Sustainability", "Q4", "Carbon"],
      icon: <Leaf className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-600",
      status: "completed",
    },
    {
      id: "2",
      title: "Procurement Spend Breakdown - November",
      type: "Spend Analysis",
      date: "2024-11-12",
      summary:
        "Total spend of $845K analyzed. Identified $45K in potential savings through supplier consolidation and green alternatives.",
      tags: ["Finance", "Spend", "November"],
      icon: <DollarSign className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600",
      status: "completed",
    },
    {
      id: "3",
      title: "Supplier Sustainability Assessment 2024",
      type: "Supplier ESG",
      date: "2024-11-10",
      summary:
        "ESG evaluation of 24 active suppliers. 18 meet sustainability criteria. 3 high-risk suppliers identified with improvement recommendations.",
      tags: ["ESG", "Suppliers", "Risk"],
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
      status: "completed",
    },
    {
      id: "4",
      title: "Sustainable Procurement Performance Card",
      type: "Scorecard",
      date: "2024-11-08",
      summary:
        "Overall sustainability score: 8.4/10. Exceeds industry benchmark by 15%. Strong performance in supplier diversity and carbon reduction.",
      tags: ["Performance", "Benchmark", "Scorecard"],
      icon: <Target className="w-6 h-6" />,
      gradient: "from-amber-500 to-orange-600",
      status: "completed",
    },
    {
      id: "5",
      title: "October Procurement Summary",
      type: "Monthly Summary",
      date: "2024-11-01",
      summary:
        "127 AI insights generated. Key improvements: 12% cost reduction, 8 new sustainable suppliers onboarded, zero compliance violations.",
      tags: ["Monthly", "Summary", "AI Insights"],
      icon: <BarChart3 className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-600",
      status: "completed",
    },
    {
      id: "6",
      title: "Supply Chain Risk Assessment",
      type: "Supplier ESG",
      date: "2024-10-28",
      summary:
        "Deep dive into supply chain vulnerabilities. 8 active risk alerts. Mitigation strategies provided for high-risk categories.",
      tags: ["Risk", "Supply Chain", "ESG"],
      icon: <Shield className="w-6 h-6" />,
      gradient: "from-red-500 to-rose-600",
      status: "completed",
    },
    {
      id: "7",
      title: "Green Alternatives Recommendation Report",
      type: "CO₂ Impact",
      date: "2024-10-25",
      summary:
        "34 eco-friendly alternatives identified. Potential to reduce carbon emissions by additional 18% with minimal cost impact.",
      tags: ["Green", "Alternatives", "Recommendations"],
      icon: <Leaf className="w-6 h-6" />,
      gradient: "from-teal-500 to-green-600",
      status: "completed",
    },
    {
      id: "8",
      title: "Real-time Sustainability Dashboard",
      type: "Monthly Summary",
      date: "2024-11-17",
      summary:
        "Processing current month's data. AI analysis in progress for latest procurement activities and sustainability metrics.",
      tags: ["Current", "Processing", "Dashboard"],
      icon: <Sparkles className="w-6 h-6" />,
      gradient: "from-indigo-500 to-purple-600",
      status: "processing",
    },
  ];

  // eslint-disable-next-line react-hooks/purity
  const now = useMemo(() => Date.now(), []);

  const filteredReports = reports.filter((report) => {
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "7d" &&
        new Date(report.date) >= new Date(now - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === "30d" &&
        new Date(report.date) >= new Date(now - 30 * 24 * 60 * 60 * 1000));

    const matchesType = typeFilter === "all" || report.type === typeFilter;

    const matchesSearch =
      searchQuery === "" ||
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesDate && matchesType && matchesSearch;
  });

  const handlePreview = (report: Report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
            <Clock className="w-3 h-3 animate-spin" />
            Processing
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/30">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <title>Reports</title>
      <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black min-h-screen w-full">
        <Banner
          title="Reports"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reports" }]}
          backgroundImage="/aerial-view.webp"
          height="h-96"
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
              <Zap className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-green-400">
                AI-Powered Reports
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Reports & Insights
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl">
              Download, review, and share AI-generated sustainability reports
            </p>
          </div>

          {/* Filters and Actions Bar */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl flex-1 lg:flex-initial lg:min-w-[300px]">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none flex-1"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:bg-gray-700/50 rounded p-1 transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Time</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="CO₂ Impact">CO₂ Impact</option>
                  <option value="Spend Analysis">Spend Analysis</option>
                  <option value="Supplier ESG">Supplier ESG</option>
                  <option value="Scorecard">Scorecard</option>
                  <option value="Monthly Summary">Monthly Summary</option>
                </select>
              </div>
            </div>

            {/* Generate Report Button */}
            <button className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30">
              <Plus className="w-5 h-5" />
              Generate New Report
            </button>
          </div>

          {/* Reports Count */}
          <div className="mb-6">
            <p className="text-gray-400 text-sm">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredReports.length}
              </span>{" "}
              of{" "}
              <span className="text-white font-semibold">{reports.length}</span>{" "}
              reports
            </p>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="group relative bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${report.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Header */}
                <div className="relative flex items-start justify-between mb-4">
                  <div
                    className={`p-3 bg-linear-to-br ${report.gradient} rounded-2xl shadow-lg`}
                  >
                    {report.icon}
                  </div>
                  <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <div className="relative mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusBadge(report.status)}
                    <span className="text-xs text-gray-500">{report.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-3 mb-3">
                    {report.summary}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(report.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="relative flex flex-wrap gap-2 mb-4">
                  {report.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs font-medium bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="relative flex items-center gap-2 pt-4 border-t border-gray-700/50">
                  <button
                    onClick={() => handlePreview(report)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button className="p-2.5 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-all duration-300 group/btn">
                    <FileDown className="w-4 h-4 text-gray-300 group-hover/btn:text-green-400 transition-colors" />
                  </button>
                  <button className="p-2.5 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-all duration-300 group/btn">
                    <FileSpreadsheet className="w-4 h-4 text-gray-300 group-hover/btn:text-blue-400 transition-colors" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800/50 rounded-full mb-4">
                <FileText className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No reports found
              </h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your filters or generate a new report
              </p>
              <button className="px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                Generate New Report
              </button>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {showModal && selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative bg-linear-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 bg-linear-to-br ${selectedReport.gradient} rounded-2xl shadow-lg`}
                  >
                    {selectedReport.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {selectedReport.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(selectedReport.status)}
                      <span className="text-sm text-gray-400">
                        {selectedReport.type}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {/* AI Summary Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    AI Summary
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedReport.summary}
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-gray-400">
                          Performance
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-white">+24%</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-gray-400">
                          Accuracy
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-white">98.5%</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-gray-400">
                          Insights
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-white">127</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedReport.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium bg-gray-700/50 text-gray-300 rounded-xl border border-gray-600/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Report Preview Placeholder */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Report Preview
                  </h3>
                  <div className="aspect-video bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-700/50 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">PDF Preview Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-700/50 bg-gray-800/50">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  Generated on{" "}
                  {new Date(selectedReport.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-all duration-300">
                    <FileSpreadsheet className="w-4 h-4" />
                    Export CSV
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                    <Download className="w-4 h-4" />
                    Download PDF
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

export default Reports;
