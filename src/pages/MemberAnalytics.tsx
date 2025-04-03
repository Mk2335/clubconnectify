
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnalyticsOverviewTab } from "@/components/analytics/AnalyticsOverviewTab";
import { AnalyticsPlaceholderTab } from "@/components/analytics/AnalyticsPlaceholderTab";
import { 
  memberGrowthData, 
  memberTypeData, 
  memberStatusData, 
  memberEngagementData,
  COLORS 
} from "@/components/analytics/AnalyticsData";

const MemberAnalytics = () => {
  const analyticsData = {
    memberGrowthData,
    memberTypeData,
    memberStatusData,
    memberEngagementData
  };

  return (
    <AppLayout title="Member Analytics">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <AnalyticsOverviewTab data={analyticsData} colors={COLORS} />
        </TabsContent>
        
        <TabsContent value="engagement">
          <AnalyticsPlaceholderTab 
            title="Detailed Engagement Metrics" 
            description="Expanded analysis of member participation"
          />
        </TabsContent>
        
        <TabsContent value="demographics">
          <AnalyticsPlaceholderTab 
            title="Member Demographics" 
            description="Analysis of member population characteristics"
          />
        </TabsContent>
        
        <TabsContent value="reports">
          <AnalyticsPlaceholderTab 
            title="Custom Reports" 
            description="Generate customized member analytics reports"
          />
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberAnalytics;
