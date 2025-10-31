import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/RootLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Orders from "./pages/Orders";

import CuttingManager from "./pages/CuttingManager";

import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";

import CuttingManagerDialog from "./components/CuttingManagerDialog";

import Employee from "./pages/Employee";

import Stitching from "./pages/Stitching";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "work-assignment",
        element: <CuttingManager />,
      },
      {
        path: "work-load",
        element: <CuttingManagerDialog />,
      },
      {
        path: "order-status",
        element: <Orders />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "stitching",
        element: <Stitching />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
