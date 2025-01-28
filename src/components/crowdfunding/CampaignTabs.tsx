import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CampaignTabsProps {
  children: React.ReactNode;
}

export const CampaignTabs = ({ children }: CampaignTabsProps) => {
  return (
    <Tabs defaultValue="landing" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="landing">Landing</TabsTrigger>
        <TabsTrigger value="campaign">Campaign</TabsTrigger>
        <TabsTrigger value="creation">Creation</TabsTrigger>
        <TabsTrigger value="backer">Backer</TabsTrigger>
        <TabsTrigger value="admin">Admin</TabsTrigger>
        <TabsTrigger value="partners">Partners</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};