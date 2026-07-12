const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const TruckIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
    <path d="M13 9h4l4 4v3h-2" />
    <path d="M3 16h10" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

export const CheckCircleIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 5-5" />
  </svg>
);

export const WrenchIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14.5 6.5a4 4 0 0 0-5.6 4.9L3 17.3V21h3.7l5.9-5.9a4 4 0 0 0 4.9-5.6l-3 3-2-2Z" />
  </svg>
);

export const GaugeIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 13a8 8 0 1 1 16 0" />
    <path d="M12 13 15 9" />
    <path d="M4 20h16" />
  </svg>
);

export const RouteIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="6" cy="19" r="2" />
    <circle cx="18" cy="5" r="2" />
    <path d="M8 19h5a4 4 0 0 0 4-4v-1a4 4 0 0 0-4-4h-2a4 4 0 0 1-4-4V5" />
  </svg>
);

export const ClockIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
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

export const FuelIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 21V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v15" />
    <path d="M3 21h10" />
    <path d="M12 10h2.5L17 12.5V18a1.5 1.5 0 0 1-3 0v-2" />
    <path d="M6 6v4h6V6" />
  </svg>
);

export const RefreshIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12a8 8 0 0 1 14-5.3L20 8" />
    <path d="M20 4v4h-4" />
    <path d="M20 12a8 8 0 0 1-14 5.3L4 16" />
    <path d="M4 20v-4h4" />
  </svg>
);

export const ActivityIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 12h4l2-7 4 14 2-7h6" />
  </svg>
);
