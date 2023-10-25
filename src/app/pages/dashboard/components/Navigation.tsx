import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { Flex } from "@dynatrace/strato-components-preview";
import { GridIcon, AnalyticsIcon } from "@dynatrace/strato-icons";
import { Link } from "@dynatrace/strato-components-preview/typography";

import { ROUTES } from "src/app/App";

const activeLinkStyle = {
  fontWeight: "bold",
};

export const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Flex flexDirection='column'>
      <Flex>
        <GridIcon />
        <Link
          as={RouterLink}
          style={
            currentPath.includes(ROUTES.IMPACT_SCORES)
              ? activeLinkStyle
              : undefined
          }
          to={`./${ROUTES.IMPACT_SCORES}`}
        >
          Impact Scores
        </Link>
      </Flex>
      <Flex>
        <AnalyticsIcon />
        <Link
          as={RouterLink}
          style={
            currentPath.includes(ROUTES.SIMULATION_RESULTS)
              ? activeLinkStyle
              : undefined
          }
          to={`./${ROUTES.SIMULATION_RESULTS}`}
        >
          Simulation Results
        </Link>
      </Flex>
    </Flex>
  );
};
