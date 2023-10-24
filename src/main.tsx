import { AppRoot } from "@dynatrace/strato-components-preview";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "@dynatrace/strato-components-preview/notifications";

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
