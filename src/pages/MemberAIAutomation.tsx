
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, FileText, Users, BrainCircuit, Bell, FileSignature, FileAudio } from "lucide-react";

const automationFeatures = [
  {
    title: "Automated Member Onboarding",
    description: "AI-guided process for new member registration",
    icon: Users,
    status: "Coming soon"
  },
  {
    title: "Smart Categorization",
    description: "Automatically assign members to appropriate groups",
    icon: BrainCircuit,
    status: "Coming soon"
  },
  {
    title: "Predictive Analytics",
    description: "Forecast member churn or engagement based on activity patterns",
    icon: Bot,
    status: "Coming soon"
  },
  {
    title: "Automated Reminders",
    description: "Smart scheduling of communications based on member status",
    icon: Bell,
    status: "Coming soon"
  },
  {
    title: "Document Generation",
    description: "Automated creation of required documents for cooperative administration",
    icon: FileSignature,
    status: "Coming soon"
  },
  {
    title: "Meeting Summaries",
    description: "AI-generated minutes or summaries from recorded meetings",
    icon: FileAudio,
    status: "Coming soon"
  },
  {
    title: "Data Entry Automation",
    description: "Extract member information from submitted forms or documents",
    icon: FileText,
    status: "Coming soon"
  }
];

const MemberAIAutomation = () => {
  return (
    <AppLayout title="AI Automation Opportunities">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {automationFeatures.map((feature, index) => (
          <Card key={index} className="flex flex-col h-full transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-4">{feature.description}</CardDescription>
              <div className="flex items-center justify-end">
                <span className="text-sm text-muted-foreground">{feature.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default MemberAIAutomation;
