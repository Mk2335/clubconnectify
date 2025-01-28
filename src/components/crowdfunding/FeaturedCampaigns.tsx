import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Campaign {
  title: string;
  progress: number;
  goal: string;
  backers: number;
  daysLeft: number;
}

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
}

export const FeaturedCampaigns = ({ campaigns }: FeaturedCampaignsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {campaigns.map((campaign, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">{campaign.title}</h3>
            <Progress value={campaign.progress} className="mb-4" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Goal</p>
                <p className="font-medium">{campaign.goal}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Progress</p>
                <p className="font-medium">{campaign.progress}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Backers</p>
                <p className="font-medium">{campaign.backers}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Days Left</p>
                <p className="font-medium">{campaign.daysLeft}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};