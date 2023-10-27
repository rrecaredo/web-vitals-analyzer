export enum ROUTES {
  ROOT = "*",
  DASHBOARD = "dashboard",
  IMPACT_SCORES = "impact-scores",
  SIMULATION_RESULTS = "simulation-results",
}

export const METRICS_PRESETS = [
  {
    name: "Request Start",
    accessor: "REQUEST_START",
  },
  {
    name: "First Inout Delay",
    accessor: "FIRST_INPUT_DELAY",
  },
  {
    name: "Response End",
    accessor: "RESPONSE_END",
  },
  {
    name: "DOM Complete",
    accessor: "DOM_COMPLETE_TIME",
  },
  {
    name: "Speed Index",
    accessor: "SPEED_INDEX",
  },
  {
    name: "LCP",
    accessor: "LARGEST_CONTENTFUL_PAINT",
  },
  {
    name: "Visually Complete",
    accessor: "VISUALLY_COMPLETE_TIME",
  },
  {
    name: "CLS",
    accessor: "CUMULATIVE_LAYOUT_SHIFT",
  },
  {
    name: "JavaScript Error",
    accessor: "JAVASCRIPT_ERROR_COUNT",
  },
  {
    name: "Request Error",
    accessor: "REQUEST_ERROR_COUNT",
  },
  {
    name: "Load Event End",
    accessor: "LOAD_EVENT_END",
  },
] as const;
