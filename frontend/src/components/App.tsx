import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Browse from "./Browse";
import ErrorRoute from "./ErrorRoute";

interface LayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: LayoutProps) => (
  <Box>
    <Navbar />
    {children}
  </Box>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} errorElement={<ErrorRoute />} />
          <Route path="/upload" element={<Dashboard />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
