import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/RootLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Orders from "./pages/Orders";

import CuttingManager from "./pages/CuttingManager";

import Dashboard from "./pages/Dashboard";

import LoginPage from "./pages/LoginPage";

import CuttingManagerDialog from "./components/CuttingManagerDialog";

import Employee from "./pages/Employee";
import OrderDetails from "./pages/OrderDetails";

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
        path: "order-details",
        element: (
          <OrderDetails
            garmentData={{
              orderId: "ORD12345",
              metarial: "Cotton",
              garmentType: "Kurti",
              basePrice: 300,
              fabricSource: "Customer",
              materialRate: 30,
              quantity: 1,
              additionalPrice: 4,
              remarks: "hhh",
              total: 334,
            }}
          />
        ),
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
