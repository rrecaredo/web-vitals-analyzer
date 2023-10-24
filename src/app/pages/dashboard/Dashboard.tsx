import React from "react";
import { useOutlet } from "react-router-dom";

import { Page } from "@dynatrace/strato-components-preview/layouts";

import { Navigation } from "src/app/components";
import { Filters } from "src/app/components/Filters";
import { useFiltersStore } from "src/app/store";

export const Dashboard = () => {
  const outlet = useOutlet();
  const { tenant, application, dateRange } = useFiltersStore();

  const isContentUnblocked =
    tenant && application && dateRange?.startDate && dateRange?.endDate;

  return (
    <Page>
      <Page.Header>
        <Filters />
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
