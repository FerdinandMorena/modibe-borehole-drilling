import type { IconName } from "@/lib/site";

type UtilityIcon =
  | "whatsapp"
  | "phone"
  | "mail"
  | "pin"
  | "arrow-right"
  | "check"
  | "chevron-down"
  | "menu"
  | "close";

export type AnyIcon = IconName | UtilityIcon;

const PATHS: Record<AnyIcon, React.ReactNode> = {
  droplet: <path d="M12 2C12 2 5 11 5 16a7 7 0 0014 0c0-5-7-14-7-14z" />,
  gauge: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </>
  ),
  casing: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h6M9 15h6" />
    </>
  ),
  bolt: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  pressure: <path d="M4 14h5l2-9 3 18 2-9h4" />,
  tank: (
    <>
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M9 21v-7h6v7" />
    </>
  ),
  pipes: <path d="M4 6h9a4 4 0 010 8H8a3 3 0 000 6h12" />,
  whatsapp: (
    <>
      <path d="M3 21l1.7-5A8.5 8.5 0 1112 20.5a8.4 8.4 0 01-4.3-1.2L3 21z" />
      <path d="M8.6 9.2c.2 1 .8 2.1 1.7 3s2 1.5 3 1.7l.9-1.2 1.9.9v1.3c-1.7.5-3.9-.4-5.6-2.1S8 9.1 8.5 7.4h1.3l.9 1.9-1 .9" />
    </>
  ),
  phone: (
    <path d="M5 3h4l2 5-2.5 1.5a12 12 0 006 6L16 13l5 2v4a2 2 0 01-2.2 2A17 17 0 013 5.2 2 2 0 015 3z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  "arrow-right": <path d="M4 12h15m-6-6l6 6-6 6" />,
  check: <path d="M4 12.5l5 5L20 6.5" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
};

type IconProps = {
  name: AnyIcon;
  className?: string;
  strokeWidth?: number;
};

export default function Icon({
  name,
  className = "h-6 w-6",
  strokeWidth = 2,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}
