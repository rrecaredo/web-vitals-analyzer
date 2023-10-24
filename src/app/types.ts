import { BROWSER_TYPES, METRICS_PRESETS, PAGES } from "./pages/constants";

export type MetricType = (typeof METRICS_PRESETS)[number]["accessor"] | "";
export type BrowserType = keyof typeof BROWSER_TYPES;
export type PageType = (typeof PAGES)[number];
