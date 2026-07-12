const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const DashboardIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13" y="3.5" width="7.5" height="4.5" rx="1.5" />
    <rect x="13" y="10.5" width="7.5" height="10" rx="1.5" />
    <rect x="3.5" y="13.5" width="7.5" height="7" rx="1.5" />
  </svg>
);

export const TruckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
    <path d="M13 9h4l4 4v3h-2" />
    <path d="M3 16h10" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export const UsersIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20v-1a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M19.5 20v-1a4 4 0 0 0-2.5-3.7" />
  </svg>
);

export const RouteIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h5a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4h-2a4 4 0 0 1-4-4V5" />
  </svg>
);

export const WrenchIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3 17.3V21h3.7l5.9-5.9a4 4 0 0 0 4.9-5.6l-3 3-2-2Z" />
  </svg>
);

export const FuelIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" />
    <path d="M3 21h10" />
    <path d="M12 10h2.5L17 12.5V18a1.5 1.5 0 0 1-3 0v-2" />
    <path d="M6 6v4h6V6" />
  </svg>
);

export const ChartIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 20V10" />
    <path d="M11 20V4" />
    <path d="M18 20v-7" />
    <path d="M3 20h18" />
  </svg>
);

export const GearIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 13a7.9 7.9 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.7 7.7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a7.7 7.7 0 0 0-1.7 1l-2.3-.9-2 3.4L6.6 11a7.9 7.9 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9c.5.4 1.1.8 1.7 1l.4 2.5h4l.4-2.5a7.7 7.7 0 0 0 1.7-1l2.3.9 2-3.4-2-1.5Z" />
  </svg>
);

export const ChevronLeftIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const SearchIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const LogOutIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const UserIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20v-.5A5.5 5.5 0 0 1 9.5 14h5a5.5 5.5 0 0 1 5.5 5.5v.5" />
  </svg>
);
