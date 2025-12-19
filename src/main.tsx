
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { DashboardProvider } from "./hooks/useDashboardStore";
import { ApiKeyGuard } from "./components/dashboard/ApiKeyGuard";
import "./styles/index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <DashboardProvider>
      <ApiKeyGuard>
        <RouterProvider router={router} />
      </ApiKeyGuard>
    </DashboardProvider>
  </React.StrictMode>
);
