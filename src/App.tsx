import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Company from "./pages/Company";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Dates from "./pages/Dates";
import Voting from "./pages/Voting";
import GeneralAssembly from "./pages/GeneralAssembly";
import Minutes from "./pages/Minutes";
import Newsletter from "./pages/Newsletter";
import Financing from "./pages/Financing";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/company" element={<Company />} />
          <Route path="/members" element={<Members />} />
          <Route path="/dates" element={<Dates />} />
          <Route path="/general-assembly" element={<GeneralAssembly />} />
          <Route path="/general-assembly/voting" element={<Voting />} />
          <Route path="/general-assembly/minutes" element={<Minutes />} />
          <Route path="/general-assembly/newsletter" element={<Newsletter />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/integrations" element={<Integrations />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;