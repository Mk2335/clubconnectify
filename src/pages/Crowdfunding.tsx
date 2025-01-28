import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { CampaignTabs } from "@/components/crowdfunding/CampaignTabs";
import { FeaturedCampaigns } from "@/components/crowdfunding/FeaturedCampaigns";
import { CampaignCategories } from "@/components/crowdfunding/CampaignCategories";
import { FinancingPartners } from "@/components/crowdfunding/FinancingPartners";

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
              <FeaturedCampaigns />
              <CampaignCategories />
              <FinancingPartners />
            </CampaignTabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Crowdfunding;