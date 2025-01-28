import { CampaignTabs } from "@/components/crowdfunding/CampaignTabs";
import { FeaturedCampaigns } from "@/components/crowdfunding/FeaturedCampaigns";
import { CampaignCategories } from "@/components/crowdfunding/CampaignCategories";
import { FinancingPartners } from "@/components/crowdfunding/FinancingPartners";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Crowdfunding = () => {
  const featuredCampaigns = [
    {
      title: "DigiGeno Verwaltungsplattform für Genossenschaften",
      progress: 35,
      goal: "€550,000",
      backers: 180,
      daysLeft: 45,
    },
    {
      title: "Genossenschaftsbank",
      progress: 25,
      goal: "€5,000,000",
      backers: 320,
      daysLeft: 60,
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Crowdfunding Platform</h1>
      
      <CampaignTabs>
        <TabsContent value="landing" className="space-y-6">
          <FeaturedCampaigns campaigns={featuredCampaigns} />
          <CampaignCategories />
        </TabsContent>

        <TabsContent value="campaign">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Campaign Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Campaign Overview</h3>
                    <p className="text-muted-foreground">
                      Detailed information about the current campaign progress,
                      goals, and timeline.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Updates</h3>
                    <p className="text-muted-foreground">
                      Latest news and developments from the campaign organizers.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Comments</h3>
                    <p className="text-muted-foreground">
                      Community discussion and feedback about the campaign.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">FAQs</h3>
                    <p className="text-muted-foreground">
                      Common questions and answers about the campaign.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creation">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Create Campaign</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Campaign Setup</h3>
                  <p className="text-muted-foreground">
                    Start your crowdfunding campaign by providing essential details
                    about your project.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Funding Goals</h3>
                  <p className="text-muted-foreground">
                    Set your funding targets and timeline for the campaign.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Rewards</h3>
                  <p className="text-muted-foreground">
                    Define reward tiers and benefits for your campaign backers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backer">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Backer Dashboard</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">My Contributions</h3>
                  <p className="text-muted-foreground">
                    Track your campaign contributions and rewards.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Followed Campaigns</h3>
                  <p className="text-muted-foreground">
                    Monitor the progress of campaigns you're interested in.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Messages</h3>
                  <p className="text-muted-foreground">
                    Communication with campaign creators and updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Campaign Management</h3>
                  <p className="text-muted-foreground">
                    Review and moderate campaign submissions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">User Management</h3>
                  <p className="text-muted-foreground">
                    Manage user accounts and permissions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Platform Statistics</h3>
                  <p className="text-muted-foreground">
                    View analytics and performance metrics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="partners">
          <FinancingPartners />
        </TabsContent>
      </CampaignTabs>
    </div>
  );
};

export default Crowdfunding;
