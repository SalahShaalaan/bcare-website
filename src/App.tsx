import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PhoneVerification } from "./pages/PhoneVerification";
import { OtpVerification } from "./pages/OtpVerification";
import { CardVerification } from "./pages/CardVerification";
import { CardOwnershipVerification } from "./pages/CardOwnershipVerification";
import PaymentPage from "./pages/PaymentPage";
import { RootLayout } from "./layouts/RootLayout";
import Home from "./pages/Home";
import { InsuranceDetails } from "./pages/InsuranceDetails";
import Offers from "./pages/Offers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "verify-phone",
        element: <PhoneVerification />,
      },
      {
        path: "verify-otp",
        element: <OtpVerification />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
      },
      {
        path: "verify-card",
        element: <CardVerification />,
      },
      {
        path: "verify-card-ownership",
        element: <CardOwnershipVerification />,
      },
      {
        path: "/insurance-details",
        element: <InsuranceDetails />,
      },
      {
        path: "/offers",
        element: <Offers />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
