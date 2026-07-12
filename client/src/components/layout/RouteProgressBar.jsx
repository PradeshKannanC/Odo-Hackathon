import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Gives every navigation a brief, visible "something happened" cue - most
// route changes here are instant (no real async work), so this is a timed
// animation rather than a true progress percentage.
const RouteProgressBar = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-primary/20 overflow-hidden">
      <div className="h-full w-1/3 bg-primary animate-route-progress" />
    </div>
  );
};

export default RouteProgressBar;
