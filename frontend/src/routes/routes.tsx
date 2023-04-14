import { createBrowserRouter } from "react-router-dom";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/upload",
    element: <Dashboard />,
  },
]);

export default router;
