import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AppRoot } from "@dynatrace/strato-components-preview";
import { ToastContainer } from "@dynatrace/strato-components-preview/notifications";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { App } from "./app/App";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
    <AppRoot>
      <ToastContainer />
      <BrowserRouter basename='ui'>
        <App />
      </BrowserRouter>
    </AppRoot>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
