import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup } from "@testing-library/react";

import { usePagesFromSelectedApp } from "./usePagesFromSelectedApp";
import { useFiltersStore } from "@common/store";

import tenants from "./__fixtures__/tenants.json";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

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
  useFiltersStore.setState((prev) => ({
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
    const { result, unmount } = renderHook(() => usePagesFromSelectedApp(), {
      wrapper: ({ children }) => <Wrapper>{children}</Wrapper>,
    });

    waitFor(() => {
      expect(result.current).toEqual(["page3", "page4"]);
    });

    unmount();
  });
});
