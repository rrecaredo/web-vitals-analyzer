import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";

import { Dashboard } from "./pages/dashboard";
import { ImpactScores } from "./pages/impact-scores";
import { SimulationResults } from "./pages/simulation-results";
import { ROUTES } from "@common/constants";

const routes: RouteObject[] = [
  {
    path: ROUTES.ROOT,
    element: <Navigate to={ROUTES.DASHBOARD} replace />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <Dashboard />,
    children: [
      {
        path: ROUTES.IMPACT_SCORES,
        element: <ImpactScores />,
      },
      {
        path: ROUTES.SIMULATION_RESULTS,
        element: <SimulationResults />,
      },
    ],
  },
];

export const App = () => {
  const rendered = useRoutes(routes);
  return <>{rendered}</>;
};
