import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { Flex } from "@dynatrace/strato-components-preview";
import { GridIcon, AnalyticsIcon } from "@dynatrace/strato-icons";

import { ROUTES } from "@common/constants";
import { NavItem, NavLink } from "./Navigation.styled";

export const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Flex flexDirection='column'>
      <NavItem aria-label='Impact Scores'>
        <GridIcon />
        <NavLink
          as={RouterLink}
          isActive={currentPath.includes(ROUTES.IMPACT_SCORES)}
          to={`./${ROUTES.IMPACT_SCORES}`}
        >
          Impact Scores
        </NavLink>
      </NavItem>
      <NavItem>
        <AnalyticsIcon />
        <NavLink
          as={RouterLink}
          isActive={currentPath.includes(ROUTES.SIMULATION_RESULTS)}
          to={`./${ROUTES.SIMULATION_RESULTS}`}
        >
          Simulation Results
        </NavLink>
      </NavItem>
    </Flex>
  );
};
