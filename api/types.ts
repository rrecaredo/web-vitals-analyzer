export type BrowserType = "mobile" | "desktop" | "all";

export type InputMetric = {
    tenant_id: string;
    app_id: string;
    dates: string;
    browser_type: string;
    page_name: string;
    analyzed_metric: string;
    impact_score: number;
  };

 export type SimulationResult = {
    tenant_id: string;
    app_id: string;
    dates: string;
    browser_type: string;
    page_name: string;
    analyzed_metric: string;
    median: number;
    predicted_exit: number;
    predicted_exit_max: number;
    predicted_exit_min: number;
    type_prediction: string;
  };

 export type PredictedOutputMetric = {
    predicted: number;
    predictedMax: number;
    predictedMin: number;
    median: number;
  };
