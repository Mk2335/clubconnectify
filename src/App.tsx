
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Settings from "./pages/Settings";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import AddressBook from "./pages/AddressBook";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Appointments from "./pages/Appointments";
import MemberCommunication from "./pages/MemberCommunication";
import MemberFinances from "./pages/MemberFinances";
import MemberAIAutomation from "./pages/MemberAIAutomation";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/address-book" element={<AddressBook />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/members/communication" element={<MemberCommunication />} />
          <Route path="/members/finances" element={<MemberFinances />} />
          <Route path="/members/ai-automation" element={<MemberAIAutomation />} />
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
