import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const integrations = [
  {
    title: "Dropbox - File Storage",
    description: "Store and synchronize your files in Dropbox cloud storage. Connect your easyVerein account to store files directly in Dropbox.",
    logo: "/lovable-uploads/0992799f-ba8e-48c9-adcf-4b0e003222d2.png",
    isActive: true,
    infoLink: "#",
    registrationLink: "https://dropbox.com/register",
    freeDetails: "With a free Dropbox account, you get 2GB of storage space."
  },
  {
    title: "CleverReach - Newsletter",
    description: "Create and send newsletters easily. When you connect your CleverReach account with easyVerein, it automatically ensures all address and recipient lists in your newsletter tool are always up to date.",
    logo: "/placeholder.svg",
    isActive: true,
    infoLink: "#",
    registrationLink: "https://cleverreach.com/register",
    freeDetails: "With a free account, you can manage up to 250 recipients and 1,000 emails per month."
  },
  {
    title: "Passcreator",
    description: "Create digital membership cards, tickets, and vouchers directly from easyVerein. Your members can load these onto their smartphones and use them digitally, for example, for simplified entry control or as proof of membership.",
    logo: "/placeholder.svg",
    isActive: false,
    infoLink: "#",
    isBeta: true,
    registrationLink: "https://passcreator.com/register",
    freeDetails: "Additional costs apply for using this integration, as a paid Passcreator account is required."
  },
  {
    title: "DATEV - Accounting",
    description: "Connect your accounting directly with DATEV. Export your financial data, receipts, and transactions automatically to your DATEV system for seamless accounting integration.",
    logo: "/placeholder.svg",
    isActive: false,
    infoLink: "#",
    registrationLink: "https://datev.com/register",
    freeDetails: "Requires an active DATEV account. Contact DATEV for pricing details."
  },
  {
    title: "MOCO - Project Management",
    description: "Integrate your project management with MOCO. Synchronize your projects, time tracking, and resource planning directly between easyVerein and MOCO.",
    logo: "/placeholder.svg",
    isActive: false,
    infoLink: "#",
    isBeta: true,
    registrationLink: "https://mocoapp.com/register",
    freeDetails: "A MOCO subscription is required. Free trial available for 30 days."
  }
];

const Integrations = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <SidebarTrigger className="mb-4" />
              <h1 className="text-3xl font-bold">Integrations</h1>
            </div>

            <Card className="border-none shadow-none bg-muted/50">
              <CardContent className="p-6">
                <p>
                  Connect easyVerein to third-party software solutions and create a seamless workflow across multiple applications. 
                  Keep all applications automatically up to date and use the functions of other services in conjunction with your central club administration without manual data transfer.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6">
              {integrations.map((integration) => (
                <Card key={integration.title} className="overflow-hidden">
                  <CardHeader className="border-b bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={integration.logo} 
                          alt={`${integration.title} logo`}
                          className="w-12 h-12 object-contain"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-xl">
                              {integration.title}
                            </CardTitle>
                            {integration.isBeta && (
                              <Badge variant="secondary">BETA</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" asChild>
                            <a href={integration.infoLink}>
                              <Info className="h-4 w-4" />
                              <span className="sr-only">How it works?</span>
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          How it works?
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardDescription className="text-base mb-4">
                      {integration.description}
                    </CardDescription>
                    <div className="text-sm text-muted-foreground">
                      {integration.freeDetails}{" "}
                      <a 
                        href={integration.registrationLink}
                        className="text-primary hover:underline"
                      >
                        Register here »
                      </a>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant={integration.isActive ? "destructive" : "default"}
                      >
                        {integration.isActive ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Integrations;
