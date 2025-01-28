import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";

const podcasts = [
  {
    title: "Genossenschaft Insights",
    description: "Weekly discussions about cooperative business models and their impact on society",
    duration: "45 min",
    episodes: 12,
  },
  {
    title: "Asset Protection Talks",
    description: "Expert interviews about protecting your assets and managing risk",
    duration: "30 min",
    episodes: 8,
  },
  {
    title: "Cooperative Leadership",
    description: "Leadership strategies and best practices for cooperative organizations",
    duration: "40 min",
    episodes: 15,
  }
];

const Podcasts = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">Podcasts</h1>
            <div className="grid gap-6">
              {podcasts.map((podcast, index) => (
                <Card key={index} className="flex">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <Headphones className="w-24 h-24 text-gray-400" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle>{podcast.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600">{podcast.description}</p>
                      <div className="mt-4 flex gap-4 text-sm text-gray-500">
                        <span>{podcast.duration} per episode</span>
                        <span>•</span>
                        <span>{podcast.episodes} episodes</span>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button>
                        Listen Now
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Podcasts;