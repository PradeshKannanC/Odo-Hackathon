import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import { ProtectedRoute, RoleRoute, Loader } from "../components/common";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Vehicles = lazy(() => import("../pages/Vehicles/Vehicles"));
const Drivers = lazy(() => import("../pages/Drivers/Drivers"));
const Trips = lazy(() => import("../pages/Trips/Trips"));
const Maintenance = lazy(() => import("../pages/Maintenance/Maintenance"));
const Fuel = lazy(() => import("../pages/Fuel/Fuel"));
const Reports = lazy(() => import("../pages/Reports/Reports"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));
const Forbidden = lazy(() => import("../pages/Forbidden"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/forbidden" element={<Forbidden />} />

            <Route
              element={
                <RoleRoute
                  allowedRoles={["fleet_manager", "dispatcher"]}
                />
              }
            >
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/trips" element={<Trips />} />
            </Route>

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "fleet_manager",
                    "dispatcher",
                    "safety_officer",
                  ]}
                />
              }
            >
              <Route path="/drivers" element={<Drivers />} />
            </Route>

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "fleet_manager",
                    "safety_officer",
                  ]}
                />
              }
            >
              <Route
                path="/maintenance"
                element={<Maintenance />}
              />
            </Route>

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "fleet_manager",
                    "financial_analyst",
                  ]}
                />
              }
            >
              <Route path="/fuel" element={<Fuel />} />
            </Route>

            <Route
              element={
                <RoleRoute
                  allowedRoles={[
                    "fleet_manager",
                    "safety_officer",
                    "financial_analyst",
                  ]}
                />
              }
            >
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;