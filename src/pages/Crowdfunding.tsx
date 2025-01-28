import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CampaignTabs } from "@/components/crowdfunding/CampaignTabs";
import { FeaturedCampaigns } from "@/components/crowdfunding/FeaturedCampaigns";
import { CampaignCategories } from "@/components/crowdfunding/CampaignCategories";
import { FinancingPartners } from "@/components/crowdfunding/FinancingPartners";
import { TabsContent } from "@/components/ui/tabs";

const sampleCampaigns = [
  {
    title: "Sustainable Energy Co-op",
    progress: 75,
    goal: "€100,000",
    backers: 150,
    daysLeft: 15
  },
  {
    title: "Community Banking Initiative",
    progress: 45,
    goal: "€50,000",
    backers: 89,
    daysLeft: 30
  },
  {
    title: "Digital Platform Cooperative",
    progress: 60,
    goal: "€75,000",
    backers: 120,
    daysLeft: 20
  }
];

const Crowdfunding = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold">Crowdfunding Platform</h1>
            <CampaignTabs>
              <TabsContent value="landing">
                <FeaturedCampaigns campaigns={sampleCampaigns} />
              </TabsContent>
              <TabsContent value="campaign">
                <CampaignCategories />
              </TabsContent>
              <TabsContent value="partners">
                <FinancingPartners />
              </TabsContent>
            </CampaignTabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Crowdfunding;