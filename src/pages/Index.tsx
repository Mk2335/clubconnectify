
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberList } from "@/components/MemberList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, ListCheck, Calendar } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import StatsCard from "@/components/dashboard/StatsCard";
import FinancialChart from "@/components/dashboard/FinancialChart";
import EventsList from "@/components/dashboard/EventsList";
import { useTranslation } from "@/utils/translations";

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslation('de');

  const translatedEvents = events.map(event => ({
    ...event,
    title: t(event.title.toLowerCase().replace(/\s+/g, '')),
    type: t(event.type.toLowerCase())
  }));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <DashboardHeader />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title={t("totalMembers")}
            value="45"
            subtitle={`+2 ${t("fromLastMonth")}`}
            icon={Users}
          />
          <StatsCard
            title={t("activeTasks")}
            value="12"
            subtitle={`4 ${t("dueThisWeek")}`}
            icon={ListCheck}
          />
          <StatsCard
            title={t("monthlyIncome")}
            value="€3,423"
            subtitle="+12.5% ${t('fromLastMonth')}"
            icon={TrendingUp}
            iconColor="text-green-500"
          />
          <StatsCard
            title={t("upcomingEvents")}
            value="3"
            subtitle={t("thisWeek")}
            icon={Calendar}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FinancialChart 
            data={financialData}
            incomeLabel={t("income")}
            expensesLabel={t("expenses")}
          />
          <EventsList events={translatedEvents} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t("memberDirectory")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardSearch onSearch={handleSearch} placeholder={t("searchMembers")} />
            <MemberList searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;
