import { BROWSER_TYPES } from "api/constants";
import { METRICS_PRESETS } from "./constants";

export type MetricType = (typeof METRICS_PRESETS)[number]["accessor"] | "";
export type BrowserType = keyof typeof BROWSER_TYPES;
export type PageType = string;
