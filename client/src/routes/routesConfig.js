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

// Sidebar navigation config - single source of truth for the main app menu.
// `allowedRoles` omitted means every authenticated role can access it
// (Dashboard, Settings). All other items are gated per the RBAC matrix.
export const NAV_ITEMS = [
  { path: "/", label: "Dashboard", icon: DashboardIcon },
  {
    path: "/vehicles",
    label: "Vehicles",
    icon: TruckIcon,
    allowedRoles: ["fleet_manager", "dispatcher"],
  },
  {
    path: "/drivers",
    label: "Drivers",
    icon: UsersIcon,
    allowedRoles: ["fleet_manager", "dispatcher", "safety_officer"],
  },
  {
    path: "/trips",
    label: "Trips",
    icon: RouteIcon,
    allowedRoles: ["fleet_manager", "dispatcher"],
  },
  {
    path: "/maintenance",
    label: "Maintenance",
    icon: WrenchIcon,
    allowedRoles: ["fleet_manager", "safety_officer"],
  },
  {
    path: "/fuel",
    label: "Fuel",
    icon: FuelIcon,
    allowedRoles: ["fleet_manager", "financial_analyst"],
  },
  {
    path: "/reports",
    label: "Reports",
    icon: ChartIcon,
    allowedRoles: ["fleet_manager", "safety_officer", "financial_analyst"],
  },
  { path: "/settings", label: "Settings", icon: GearIcon },
];
