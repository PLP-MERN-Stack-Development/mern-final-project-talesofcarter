import { type JSX, useState } from "react";
import Banner from "../components/Banner";
import {
  Leaf,
  Factory,
  AlertTriangle,
  Lightbulb,
  Users,
  DollarSign,
  Calendar,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: JSX.Element;
  gradient: string;
  description: string;
}

interface SupplierData {
  name: string;
  co2: string;
  risk: "High" | "Medium" | "Low";
  category: string;
  score: number;
  lastUpdated: string;
}

function Dashboard(): JSX.Element {
  const [dateFilter, setDateFilter] = useState("30d");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Metrics Cards Data
  const metrics: MetricCard[] = [
    {
      title: "CO₂ Reduction",
      value: "24.5%",
      change: "+12.3%",
      trend: "down",
      icon: <Leaf className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-600",
      description: "vs last quarter",
    },
    {
      title: "Sustainable Suppliers",
      value: "18/24",
      change: "+3",
      trend: "up",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600",
      description: "75% compliance",
    },
    {
      title: "Spend Analyzed",
      value: "$845K",
      change: "+18.2%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />,
      gradient: "from-purple-500 to-pink-600",
      description: "total procurement",
    },
    {
      title: "AI Insights",
      value: "127",
      change: "+45",
      trend: "up",
      icon: <Lightbulb className="w-6 h-6" />,
      gradient: "from-amber-500 to-orange-600",
      description: "recommendations",
    },
    {
      title: "Risk Alerts",
      value: "8",
      change: "-4",
      trend: "down",
      icon: <AlertTriangle className="w-6 h-6" />,
      gradient: "from-red-500 to-rose-600",
      description: "active warnings",
    },
    {
      title: "Green Alternatives",
      value: "34",
      change: "+12",
      trend: "up",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-green-500 to-emerald-600",
      description: "opportunities",
    },
  ];

  // CO₂ Emissions Trend Data
  const co2Data = [
    { month: "Jan", emissions: 2800, target: 2500 },
    { month: "Feb", emissions: 2650, target: 2400 },
    { month: "Mar", emissions: 2550, target: 2300 },
    { month: "Apr", emissions: 2400, target: 2200 },
    { month: "May", emissions: 2300, target: 2100 },
    { month: "Jun", emissions: 2150, target: 2000 },
  ];

  // Spend Distribution Data
  const spendData = [
    { category: "Raw Materials", amount: 285000, color: "#10b981" },
    { category: "Logistics", amount: 195000, color: "#3b82f6" },
    { category: "Office Supplies", amount: 145000, color: "#8b5cf6" },
    { category: "Services", amount: 125000, color: "#f59e0b" },
    { category: "Equipment", amount: 95000, color: "#ef4444" },
  ];

  // Supplier ESG Scores (Radar Chart)
  const esgData = [
    { category: "Environmental", score: 85 },
    { category: "Social", score: 78 },
    { category: "Governance", score: 92 },
    { category: "Ethics", score: 88 },
    { category: "Innovation", score: 75 },
    { category: "Compliance", score: 90 },
  ];

  // Supplier Diversity Data (Pie Chart)
  const diversityData = [
    { name: "Women-owned", value: 30, color: "#ec4899" },
    { name: "Minority-owned", value: 25, color: "#8b5cf6" },
    { name: "Local", value: 35, color: "#10b981" },
    { name: "International", value: 10, color: "#3b82f6" },
  ];

  // Risk Categories Data (Bar Chart)
  const riskData = [
    { category: "Supply Chain", high: 3, medium: 8, low: 15 },
    { category: "Financial", high: 2, medium: 5, low: 18 },
    { category: "Compliance", high: 1, medium: 4, low: 20 },
    { category: "Environmental", high: 2, medium: 6, low: 17 },
  ];

  // Supplier Table Data
  const supplierData: SupplierData[] = [
    {
      name: "EcoMaterials Inc.",
      co2: "450 kg",
      risk: "Low",
      category: "Raw Materials",
      score: 92,
      lastUpdated: "2 days ago",
    },
    {
      name: "GreenLogistics Co.",
      co2: "680 kg",
      risk: "Medium",
      category: "Logistics",
      score: 78,
      lastUpdated: "1 week ago",
    },
    {
      name: "SustainSupply Ltd.",
      co2: "320 kg",
      risk: "Low",
      category: "Office Supplies",
      score: 88,
      lastUpdated: "3 days ago",
    },
    {
      name: "GlobalParts Corp.",
      co2: "890 kg",
      risk: "High",
      category: "Equipment",
      score: 65,
      lastUpdated: "5 days ago",
    },
    {
      name: "LocalServices Pro",
      co2: "210 kg",
      risk: "Low",
      category: "Services",
      score: 95,
      lastUpdated: "1 day ago",
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "text-red-400 bg-red-500/10 border-red-500/30";
      case "Medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "Low":
        return "text-green-400 bg-green-500/10 border-green-500/30";
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30";
    }
  };

  return (
    <>
      <title>Dashboard</title>
      <div className="relative bg-linear-to-br from-gray-900 via-gray-800 to-black min-h-screen w-full">
        <Banner
          title="Dashboard"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
          backgroundImage="/dashboard.webp"
          height="h-96"
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Header with Filters */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-3">
                <Zap className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-green-400">
                  Live Analytics
                </span>
              </div>
              <p className="text-gray-300 text-lg">
                Real-time insights powered by AI
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-400" />
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-transparent text-sm text-white font-medium focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="materials">Raw Materials</option>
                  <option value="logistics">Logistics</option>
                  <option value="services">Services</option>
                </select>
              </div>

              {/* Export Button */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 lg:gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="group relative bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-5 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${metric.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative flex items-start justify-between mb-3">
                  <div
                    className={`p-2.5 bg-linear-to-br ${metric.gradient} rounded-xl shadow-lg`}
                  >
                    {metric.icon}
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-700/50`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-400" />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        metric.trend === "up"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <h3 className="text-xs font-medium text-gray-400 mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-2xl font-bold text-white mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            {/* CO₂ Emissions Trend */}
            <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-400" />
                    CO₂ Emissions Trend
                  </h3>
                  <p className="text-sm text-gray-400">
                    Monthly reduction progress
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={co2Data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Actual Emissions"
                  />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#6366f1"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#6366f1", r: 4 }}
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Spend Distribution */}
            <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                    Spend by Category
                  </h3>
                  <p className="text-sm text-gray-400">Total: $845K</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={spendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="category"
                    stroke="#9ca3af"
                    style={{ fontSize: "11px" }}
                    angle={-15}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                    formatter={(value: number) =>
                      `$${(value / 1000).toFixed(0)}K`
                    }
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {spendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Secondary Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
            {/* Supplier ESG Scores */}
            <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  ESG Performance
                </h3>
                <p className="text-sm text-gray-400">
                  Average supplier ratings
                </p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={esgData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis
                    dataKey="category"
                    stroke="#9ca3af"
                    style={{ fontSize: "11px" }}
                  />
                  <PolarRadiusAxis stroke="#9ca3af" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Supplier Diversity */}
            <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-pink-400" />
                  Supplier Diversity
                </h3>
                <p className="text-sm text-gray-400">Distribution breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={diversityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {diversityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Risk Categories */}
            <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Risk Analysis
                </h3>
                <p className="text-sm text-gray-400">By risk level</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={riskData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    type="number"
                    stroke="#9ca3af"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    dataKey="category"
                    type="category"
                    stroke="#9ca3af"
                    style={{ fontSize: "11px" }}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="high"
                    stackId="a"
                    fill="#ef4444"
                    name="High"
                    radius={[0, 4, 4, 0]}
                  />
                  <Bar
                    dataKey="medium"
                    stackId="a"
                    fill="#f59e0b"
                    name="Medium"
                  />
                  <Bar dataKey="low" stackId="a" fill="#10b981" name="Low" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Supplier Data Table */}
          <div className="bg-linear-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <Factory className="w-5 h-5 text-cyan-400" />
                  Supplier Performance
                </h3>
                <p className="text-sm text-gray-400">
                  Recent activity and metrics
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                      Supplier
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                      CO₂ Impact
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                      Risk Level
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                      Category
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                      Score
                    </th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {supplierData.map((supplier, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className="text-sm font-medium text-white">
                          {supplier.name}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-300">
                          {supplier.co2}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border ${getRiskColor(
                            supplier.risk
                          )}`}
                        >
                          {supplier.risk}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-300">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-700 rounded-full h-2 w-16">
                            <div
                              className="bg-linear-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                              style={{ width: `${supplier.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-white">
                            {supplier.score}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-400">
                          {supplier.lastUpdated}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
