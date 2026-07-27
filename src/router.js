import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import WelcomeRoute from "./auth/WelcomeRoute";
import RootLayout from "@components/Pages/RootLayout";
import ErrorPage from "@components/Pages/ErrorsHandling/Error";
import StatusRoot from "@components/Pages/Status/StatusRoot";
import Status from "@components/Pages/Status/Status";
import JobsRoot from "@components/Pages/Jobs/JobsRoot";
import Jobs from "@components/Pages/Jobs/Jobs";
import JobDetail, {
  loader as jobDetailLoader
} from "@components/Pages/Jobs/JobDetail";
import JobCircuit, {
  loader as jobCircuitLoader,
} from "@components/Pages/Jobs/JobCircuit";
import Budgets from "@components/Pages/Budgets/Budgets";
import ResourcesRoot from "@components/Pages/Resources/ResourcesRoot";
import Resources from "@components/Pages/Resources/Resources";
import ResourceDetail from "@components/Pages/Resources/ResourceDetail";
import TokensRootLayout from "@components/Pages/Tokens/TokensRoot";
import Tokens from "@components/Pages/Tokens/Tokens";
import NewToken from "@components/Pages/Tokens/NewToken";
import Feedback from "@components/Pages/Feedback/Feedback";
import FAQ from "@components/Pages/FAQ/FAQ";
import Funding from "@components/Pages/Funding/Funding";
import NotFound from "@components/Pages/ErrorsHandling/NotFound";

// Define all routes with nested layouts, and error boundaries
const router = createBrowserRouter([
  // Public routes
  {
    path: "/welcome",
    element: <WelcomeRoute />,
  },
  {
    // Protected routes under RootLayout requiring authentication
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: "dashboard",
        children: [
          {
            index: true,
            element: <Status />,
          },
          {
            path: "status",
            element: <StatusRoot />,
            errorElement: <ErrorPage />,
            id: "status",
            children: [
              {
                index: true,
                element: <Status />,
              },
            ],
          },
          {
            path: "tokens",
            element: <TokensRootLayout />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Tokens />,
              },
              {
                path: "new",
                element: <NewToken />,
              },
            ],
          },
          {
            // Jobs section with nested detail and circuit visualization routes
            path: "jobs",
            element: <JobsRoot />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Jobs />,
              },
              {
                path: ":jobId",
                id: "job-detail",
                children: [
                  {
                    index: true,
                    element: <JobDetail />,
                    loader: jobDetailLoader,
                  },
                  {
                    path: "circuit",
                    element: <JobCircuit isExecutedCircuit={false} />,
                    loader: jobCircuitLoader,
                  },
                  {
                    path: "executed-circuit",
                    element: <JobCircuit isExecutedCircuit={true} />,
                    loader: jobCircuitLoader,
                  },
                ],
              },
            ],
          },
          {
            path: "budgets",
            element: <Budgets />,
            errorElement: <ErrorPage />,
          },
          {
            // Resources section with list and detail views
            path: "resources",
            element: <ResourcesRoot />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Resources />,
              },
              {
                path: ":resourceId",
                id: "resource-detail",
                children: [
                  {
                    index: true,
                    element: <ResourceDetail />,
                  },
                ],
              },
            ],
          },
          {
            path: "faq",
            element: <FAQ />,
            errorElement: <ErrorPage />,
          },
          {
            path: "feedback",
            element: <Feedback />,
            errorElement: <ErrorPage />,
          },
          {
            path: "funding",
            element: <Funding />,
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
  // Error routes
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default router;