import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberList } from "@/components/MemberList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <DashboardHeader />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Member Directory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardSearch onSearch={handleSearch} />
            <MemberList searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Index;