import { Link, useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../routes/routesConfig";

const LABEL_OVERRIDES = {
  forbidden: "Forbidden",
};

const toLabel = (segment) => {
  const navMatch = NAV_ITEMS.find((item) => item.path === `/${segment}`);
  if (navMatch) return navMatch.label;
  if (LABEL_OVERRIDES[segment]) return LABEL_OVERRIDES[segment];
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => ({
    label: toLabel(segment),
    path: `/${segments.slice(0, index + 1).join("/")}`,
  }));

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text/60 mb-4">
      <Link to="/" className="hover:text-text transition-colors">
        Dashboard
      </Link>
      {crumbs.map((crumb, index) => (
        <span key={crumb.path} className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          {index === crumbs.length - 1 ? (
            <span className="text-text">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="hover:text-text transition-colors">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
