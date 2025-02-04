import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Company from "./pages/Company";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Calendar from "./pages/Dates";
import Tasks from "./pages/Tasks";
import Voting from "./pages/Voting";
import GeneralAssembly from "./pages/GeneralAssembly";
import Minutes from "./pages/Minutes";
import Newsletter from "./pages/Newsletter";
import Financing from "./pages/Financing";
import Settings from "./pages/Settings";
import Integrations from "./pages/Integrations";
import MemberApplications from "./pages/MemberApplications";
import TransferShares from "./pages/TransferShares";
import Incorporation from "./pages/Incorporation";
import BusinessPlan from "./pages/BusinessPlan";
import StatutoryAudit from "./pages/StatutoryAudit";
import DataStorage from "./pages/DataStorage";
import Invoice from "./pages/Invoice";
import Account from "./pages/Account";
import VirtualMeetingRoom from "./pages/VirtualMeetingRoom";
import Appointments from "./pages/Appointments";
import AssociationCalendar from "./pages/AssociationCalendar";
import AppointmentMeetings from "./pages/AppointmentMeetings";
import AddressBook from "./pages/AddressBook";
import Knowledge from "./pages/Knowledge";
import Courses from "./pages/Courses";
import Community from "./pages/Community";
import Podcasts from "./pages/Podcasts";
import Ebooks from "./pages/Ebooks";
import Connect from "./pages/Connect";
import Crowdfunding from "./pages/Crowdfunding";

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
          <Route path="/company/incorporation" element={<Incorporation />} />
          <Route path="/company/audit" element={<StatutoryAudit />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/applications" element={<MemberApplications />} />
          <Route path="/members/transfer" element={<TransferShares />} />
          <Route path="/members/address-book" element={<AddressBook />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/calendar/tasks" element={<Tasks />} />
          <Route path="/calendar/appointments" element={<Appointments />} />
          <Route path="/calendar/appointments/association" element={<AssociationCalendar />} />
          <Route path="/calendar/appointments/meetings" element={<AppointmentMeetings />} />
          <Route path="/general-assembly" element={<GeneralAssembly />} />
          <Route path="/general-assembly/voting" element={<Voting />} />
          <Route path="/general-assembly/minutes" element={<Minutes />} />
          <Route path="/general-assembly/newsletter" element={<Newsletter />} />
          <Route path="/general-assembly/storage" element={<DataStorage />} />
          <Route path="/general-assembly/virtual-meeting" element={<VirtualMeetingRoom />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/financing/account" element={<Account />} />
          <Route path="/financing/business-plan" element={<BusinessPlan />} />
          <Route path="/financing/invoice" element={<Invoice />} />
          <Route path="/financing/crowdfunding" element={<Crowdfunding />} />
          <Route path="/knowledge-community/connect" element={<Connect />} />
          <Route path="/knowledge-community/knowledge" element={<Knowledge />} />
          <Route path="/knowledge-community/knowledge/courses" element={<Courses />} />
          <Route path="/knowledge-community/knowledge/podcasts" element={<Podcasts />} />
          <Route path="/knowledge-community/knowledge/ebooks" element={<Ebooks />} />
          <Route path="/knowledge-community/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/integrations" element={<Integrations />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
