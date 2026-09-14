// Minimal inline SVG icon set (stroke-based, matches deck's line-icon style)
// Using a light-weight subset so we ship zero icon-font/JS dependency.
//
// Note: Hono JSX gives the `svg` tag special namespace-context handling
// internally, which means putting `dangerouslySetInnerHTML` directly on an
// <svg> node collides with its (empty) children array. We route the raw
// path markup through an inner <g> instead, which renders identically.

type IconProps = { class?: string; style?: string }

const wrap = (paths: string) => (props: IconProps) => (
  <svg
    class={props.class}
    style={props.style}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <g dangerouslySetInnerHTML={{ __html: paths }}></g>
  </svg>
)

export const IconWallet = wrap('<path d="M21 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16v-6"/><path d="M3 7V6a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"/><circle cx="17" cy="14" r="1.3"/>')
export const IconBurner = wrap('<path d="M9 3h6l1 4H8l1-4Z"/><path d="M8 7h8l1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L8 7Z"/><path d="M9.5 11.5c1 1.5-1 2 0 3.5"/><path d="M13.5 11.5c1 1.5-1 2 0 3.5"/>')
export const IconLayers = wrap('<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M2 12l10 5 10-5"/><path d="M2 17l10 5 10-5"/>')
export const IconClock = wrap('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>')
export const IconDoc = wrap('<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>')
export const IconGavel = wrap('<path d="m14 7 3 3-8 8-3-3 8-8Z"/><path d="m11 4 3 3"/><path d="m17 10 3 3"/><path d="M2 21h9"/>')
export const IconHandCoin = wrap('<circle cx="9" cy="9" r="4"/><path d="M9 7v4M7 9h4"/><path d="M13 15c2 0 3.5 1 5 1s2-1 2-1-1 3-4 3-6-1.5-7-3-4-1-4-1"/>')
export const IconSearch = wrap('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>')
export const IconNetwork = wrap('<circle cx="5" cy="6" r="2.2"/><circle cx="19" cy="6" r="2.2"/><circle cx="12" cy="18" r="2.2"/><path d="M6.8 7.4 10.2 16.6M17.2 7.4 13.8 16.6M7.2 6h9.6"/>')
export const IconSwap = wrap('<path d="M4 8h13l-3-3M20 16H7l3 3"/>')
export const IconBell = wrap('<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8Z"/><path d="M10.5 21a1.5 1.5 0 0 0 3 0"/>')
export const IconPeople = wrap('<circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6"/><circle cx="17" cy="8" r="2.4"/><path d="M17.5 14c2.5 0.3 4.5 2.3 4.5 6"/>')
export const IconScale = wrap('<path d="M12 3v18M8 21h8"/><path d="m5 8 3-4 3 4M5 8a3 3 0 0 0 6 0M13 8l3-4 3 4M13 8a3 3 0 0 0 6 0"/>')
export const IconPlug = wrap('<path d="M9 2v6M15 2v6"/><path d="M7 8h10l-1 6a4 4 0 0 1-8 0L7 8Z"/><path d="M12 18v4"/>')
export const IconDatabase = wrap('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>')
export const IconGear = wrap('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.3.5.8 1 1.6 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z"/>')
export const IconBrain = wrap('<path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5v.6A3 3 0 0 0 4 10c0 1 .5 1.9 1.3 2.4A3 3 0 0 0 4 15a3 3 0 0 0 3 3 3.5 3.5 0 0 0 3.5 3.5"/><path d="M14.5 3A3.5 3.5 0 0 1 18 6.5v.6A3 3 0 0 1 20 10c0 1-.5 1.9-1.3 2.4A3 3 0 0 1 20 15a3 3 0 0 1-3 3 3.5 3.5 0 0 1-3.5 3.5"/><path d="M9.5 3v18.5M14.5 3v18.5"/>')
export const IconChart = wrap('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>')
export const IconServer = wrap('<rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>')
export const IconGlobe = wrap('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>')
export const IconLock = wrap('<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>')
export const IconCheck = wrap('<path d="M20 6 9 17l-5-5"/>')
export const IconWarning = wrap('<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>')
export const IconLink = wrap('<path d="M9 15 15 9"/><path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1"/><path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1"/>')
export const IconServerStack = wrap('<rect x="3" y="3" width="18" height="5" rx="1.5"/><rect x="3" y="10" width="18" height="5" rx="1.5"/><rect x="3" y="17" width="18" height="4" rx="1.5"/>')
export const IconFlow = wrap('<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M7 5h10M5 7v10M19 7v10M7 19h10"/>')
export const IconRocket = wrap('<path d="M5 15c-1 2-1 5-1 5s3 0 5-1c1.4-.6 3-2 3-2"/><path d="M13.5 4.5c3 0 6 3 6 6-2 3-4 5-8 6.5L8 13.5C9.5 9.5 11.5 6.5 13.5 4.5Z"/><circle cx="14.5" cy="9.5" r="1.4"/><path d="m6 14-2 4 4-2"/>')
export const IconMobile = wrap('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>')
export const IconMail = wrap('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>')
export const IconTarget = wrap('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.5" fill="currentColor"/>')
export const IconArrowRight = wrap('<path d="M5 12h14M13 6l6 6-6 6"/>')
export const IconDownload = wrap('<path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/>')
export const IconShield = wrap('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/>')
export const IconExternal = wrap('<path d="M14 4h6v6"/><path d="M10 14 20 4"/><path d="M20 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5"/>')
