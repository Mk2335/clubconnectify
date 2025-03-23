
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import FinancialChart from "@/components/dashboard/FinancialChart";
import EventsList from "@/components/dashboard/EventsList";
import TasksList from "@/components/dashboard/TasksList";
import QuickNotes from "@/components/dashboard/QuickNotes";
import {
  Users,
  ListCheck,
  ArrowUpRight,
  ArrowDownRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const financialData = [
  { month: "Jan", income: 4000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 1398 },
  { month: "Mar", income: 2000, expenses: 9800 },
  { month: "Apr", income: 2780, expenses: 3908 },
  { month: "May", income: 1890, expenses: 4800 },
  { month: "Jun", income: 2390, expenses: 3800 },
];

const events = [
  {
    date: "2024-03-25",
    title: "General Assembly",
    type: "Meeting",
  },
  {
    date: "2024-03-28",
    title: "Project Review",
    type: "Meeting",
  },
  {
    date: "2024-04-01",
    title: "New Member Orientation",
    type: "Event",
  },
];

const tasks = [
  {
    title: "Update member directory",
    status: "In Progress" as const,
    dueDate: "2024-03-30",
  },
  {
    title: "Prepare financial report",
    status: "Pending" as const,
    dueDate: "2024-04-05",
  },
  {
    title: "Review new applications",
    status: "Completed" as const,
    dueDate: "2024-03-20",
  },
];

const Dashboard = () => {
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <SidebarTrigger className="mb-4" />
                <h1 className="text-3xl font-bold">Dashboard</h1>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Total Members"
                value={45}
                subtitle="+2 from last month"
                icon={Users}
              />
              <StatsCard
                title="Active Tasks"
                value={12}
                subtitle="4 due this week"
                icon={ListCheck}
              />
              <StatsCard
                title="Monthly Income"
                value="€3,423"
                subtitle="+12.5% from last month"
                icon={ArrowUpRight}
                iconColor="text-green-500"
              />
              <StatsCard
                title="Monthly Expenses"
                value="€2,108"
                subtitle="-4% from last month"
                icon={ArrowDownRight}
                iconColor="text-red-500"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FinancialChart data={financialData} />
              <EventsList events={events} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <TasksList tasks={tasks} />
              <QuickNotes />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
