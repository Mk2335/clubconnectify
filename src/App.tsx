import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Protocols from "./pages/Protocols";
import AddressBook from "./pages/AddressBook";
import Courses from "./pages/Courses";
import Company from "./pages/Company";
import BusinessPlan from "./pages/BusinessPlan";
import Crowdfunding from "./pages/Crowdfunding";
import Connect from "./pages/Connect";
import DataStorage from "./pages/DataStorage";
import Account from "./pages/Account";
import Audit from "./pages/Audit";
import Incorporation from "./pages/Incorporation";
import Financing from "./pages/Financing";
import KnowledgeCommunity from "./pages/KnowledgeCommunity";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Appointments from "./pages/Appointments";
import GeneralAssembly from "./pages/GeneralAssembly";
import Integrations from "./pages/Integrations";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/address-book" element={<AddressBook />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/company" element={<Company />} />
          <Route path="/business-plan" element={<BusinessPlan />} />
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/data-storage" element={<DataStorage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/incorporation" element={<Incorporation />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/knowledge-community" element={<KnowledgeCommunity />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/general-assembly" element={<GeneralAssembly />} />
           <Route path="/integrations" element={<Integrations />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
