import {
  Navigation2,
  Satellite,
  Package,
  ChartBarBig,
  ShieldCheck,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

interface FeaturesType {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const featuresData: FeaturesType[] = [
  {
    title: "Smart Routing",
    description:
      "Automatically assigns optimal delivery routes to reduce transit time, minimize fuel usage, and improve overall logistics efficiency.",
    icon: Navigation2,
  },
  {
    title: "Real-Time Tracking",
    description:
      "Monitor shipments live with instant location updates, ensuring transparency and timely delivery for every client.",
    icon: Satellite,
  },
  {
    title: "Inventory Control",
    description:
      "Track stock levels, movements, and reorder points to maintain accuracy and prevent storage shortages or overflows.",
    icon: Package,
  },
  {
    title: "Shipment Analytics",
    description:
      "Access detailed reports on delivery performance, costs, and operational patterns to improve decision-making.",
    icon: ChartBarBig,
  },
  {
    title: "Secure Storage",
    description:
      "Protect goods with monitored, temperature-controlled, and access-restricted storage environments.",
    icon: ShieldCheck,
  },
  {
    title: "Client Dashboard",
    description:
      "Give clients a clean interface to view shipment status, invoices, analytics, and documents instantly.",
    icon: LayoutDashboard,
  },
];
