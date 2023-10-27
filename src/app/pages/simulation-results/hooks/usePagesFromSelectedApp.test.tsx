import React from "react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { renderHook } from "@testing-library/react-hooks";

import tenants from "./__fixtures__/tenants.json";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePagesFromSelectedApp } from "./usePagesFromSelectedApp";
import { useFilters } from "@common/store";
import { cleanup } from "@testing-library/react";

const apiHandlers = [
  http.get("*/api/get-tenants*", () => {
    return HttpResponse.json({
      status: 200,
      data: tenants,
    });
  }),
];

const server = setupServer(...apiHandlers);

beforeAll(() => server.listen());
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper = ({ children }) => {
  useFilters.setState((prev) => ({
    ...prev,
    filters: {
      tenant: "2",
      application: "2",
      dateRange: {
        startDate: "2023-01-01",
        endDate: "2023-01-31",
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePagesFromSelectedApp", () => {
  afterEach(() => {
    cleanup();
    queryClient.clear();
    server.resetHandlers();
  });

  test("should return pages from selected app", async () => {
    const { result, waitForNextUpdate, unmount } = renderHook(
      () => usePagesFromSelectedApp(),
      {
        wrapper: ({ children }) => <Wrapper>{children}</Wrapper>,
      }
    );

    await waitForNextUpdate();

    expect(result.current).toEqual([
      {
        id: "3",
        name: "page3",
      },
      {
        id: "4",
        name: "page4",
      },
    ]);

    unmount();
  });
});
