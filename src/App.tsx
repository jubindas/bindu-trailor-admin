import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/RootLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";

import Stitching from "./pages/Stitching";

import StitchingComplete from "./pages/StitchingComplete";

const router = createBrowserRouter([
  {
    path: "login",
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
        path: "stitching",
        element: <Stitching />,
      },
      {
        path: "stitching-complete",
        element: <StitchingComplete />,
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
