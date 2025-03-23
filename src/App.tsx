
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
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/protocols" element={<ProtectedRoute><Protocols /></ProtectedRoute>} />
            <Route path="/address-book" element={<ProtectedRoute><AddressBook /></ProtectedRoute>} />
            <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
            <Route path="/company" element={<ProtectedRoute><Company /></ProtectedRoute>} />
            <Route path="/business-plan" element={<ProtectedRoute><BusinessPlan /></ProtectedRoute>} />
            <Route path="/crowdfunding" element={<ProtectedRoute><Crowdfunding /></ProtectedRoute>} />
            <Route path="/connect" element={<ProtectedRoute><Connect /></ProtectedRoute>} />
            <Route path="/data-storage" element={<ProtectedRoute><DataStorage /></ProtectedRoute>} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/audit" element={<ProtectedRoute><Audit /></ProtectedRoute>} />
            <Route path="/incorporation" element={<ProtectedRoute><Incorporation /></ProtectedRoute>} />
            <Route path="/financing" element={<ProtectedRoute><Financing /></ProtectedRoute>} />
            <Route path="/knowledge-community" element={<ProtectedRoute><KnowledgeCommunity /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
            <Route path="/general-assembly" element={<ProtectedRoute><GeneralAssembly /></ProtectedRoute>} />
            <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
