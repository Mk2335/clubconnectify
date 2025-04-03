
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Download, 
  Printer, 
  Share2, 
  FileText,
  Filter
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { downloadCSV } from "@/utils/exportUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const MemberAnalytics = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  
  const analyticsData = {
    memberGrowthData,
    memberTypeData,
    memberStatusData,
    memberEngagementData
  };

  const handleExport = (format: string) => {
    let data;
    let filename;
    
    switch (activeTab) {
      case "overview":
        // For overview, let's export member growth data
        data = memberGrowthData.map(item => ({
          month: item.month,
          members: item.members,
        }));
        filename = `member-growth-${new Date().toISOString().split('T')[0]}.${format}`;
        break;
      case "engagement":
        data = memberEngagementData.map(item => ({
          month: item.month,
          meetings: item.meetings,
          votes: item.votes,
          events: item.events,
        }));
        filename = `member-engagement-${new Date().toISOString().split('T')[0]}.${format}`;
        break;
      case "demographics":
        // Combine type and status data for demographics
        data = [...memberTypeData.map(item => ({
          category: 'type',
          name: item.name,
          value: item.value,
        })), ...memberStatusData.map(item => ({
          category: 'status',
          name: item.name,
          value: item.value,
        }))];
        filename = `member-demographics-${new Date().toISOString().split('T')[0]}.${format}`;
        break;
      default:
        data = [];
        filename = `member-analytics-${new Date().toISOString().split('T')[0]}.${format}`;
    }
    
    if (format === 'csv') {
      downloadCSV(data, filename);
    } else {
      // For other formats (which would be implemented in a real app)
      toast({
        title: `${format.toUpperCase()} Export`,
        description: `${format.toUpperCase()} export will be available soon.`,
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Member Analytics',
        text: 'Check out our member analytics',
        url: window.location.href,
      }).catch(error => {
        console.error('Share error:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "Analytics page URL copied to clipboard",
        });
      });
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Custom report generation will be available soon.",
    });
  };

  return (
    <AppLayout title="Member Analytics">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Analytics</h1>
        
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className={isMobile ? "sr-only" : ""}>Export</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('xlsx')}>
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Print</span>
          </Button>
          
          <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Share</span>
          </Button>
          
          <Button variant="outline" onClick={handleGenerateReport} className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className={isMobile ? "sr-only" : ""}>Report</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className={`mb-6 ${isMobile ? "w-full" : ""}`}>
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
