import {
  DashboardIcon,
  TruckIcon,
  UsersIcon,
  RouteIcon,
  WrenchIcon,
  FuelIcon,
  ChartIcon,
  GearIcon,
} from "../components/layout/icons";

// Sidebar navigation config - single source of truth for the main app menu
export const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: DashboardIcon },
  { path: "/vehicles", label: "Vehicles", icon: TruckIcon },
  { path: "/drivers", label: "Drivers", icon: UsersIcon },
  { path: "/trips", label: "Trips", icon: RouteIcon },
  { path: "/maintenance", label: "Maintenance", icon: WrenchIcon },
  { path: "/fuel", label: "Fuel", icon: FuelIcon },
  { path: "/reports", label: "Reports", icon: ChartIcon },
  { path: "/settings", label: "Settings", icon: GearIcon },
];
