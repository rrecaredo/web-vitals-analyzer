import React, { useEffect, useRef } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

import { Page } from "@dynatrace/strato-components-preview/layouts";

import { useFilters } from "@common/store";
import { Filters, Navigation } from "./components";
import { Flex } from "@dynatrace/strato-components-preview";
import { LogoArea } from "./Dashboard.styled";
import { ROUTES } from "@common/constants";

export const Dashboard = () => {
  const outlet = useOutlet();
  const { tenant, application, dateRange } = useFilters();
  const navigate = useNavigate();
  const firstNavigation = useRef(true);

  const isContentUnblocked =
    tenant && application && dateRange?.startDate && dateRange?.endDate;

  useEffect(() => {
    if (isContentUnblocked && !firstNavigation.current) {
      firstNavigation.current = false;
      navigate(ROUTES.IMPACT_SCORES);
    }
  }, [isContentUnblocked, navigate]);

  return (
    <Page>
      <Page.Header>
        <Flex alignItems='center'>
          <LogoArea>
            <img
              src='./assets/logo.png'
              alt='logo'
              width='100px'
              height='25px'
            />
          </LogoArea>
          <Filters />
        </Flex>
      </Page.Header>
      {isContentUnblocked && (
        <>
          <Page.Sidebar preferredWidth='60px' resizable={false}>
            <Navigation />
          </Page.Sidebar>
        </>
      )}
      <Page.Main style={{ display: "flex", flexDirection: "column" }}>
        {isContentUnblocked ? outlet : null}
      </Page.Main>
    </Page>
  );
};
