import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";
import { KnowledgeTabs } from "@/components/knowledge/KnowledgeTabs";

const courseModules = [
  {
    title: "Einführung in die \"MASTERMIND - Genossenschaft\"",
    lessons: "15 von 28 Lektionen abgeschlossen",
    duration: "0h 34min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 53
  },
  {
    title: "Modul 1 - Mitglieder & Geschäftsanteile",
    lessons: "31 von 33 Lektionen abgeschlossen",
    duration: "1h 20min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 94
  },
  {
    title: "Modul 2 - Generalversammlung, Satzung & Familiengeno",
    lessons: "35 von 37 Lektionen abgeschlossen",
    duration: "0h 53min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 95
  },
  {
    title: "Modul 3 - Mitgliederförderung, Vorstand & Aufsichtsrat",
    lessons: "29 von 41 Lektionen abgeschlossen",
    duration: "0h 53min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 71
  },
  {
    title: "Modul 3.1 - Mitgliederförderung Beschlussvorlagen",
    lessons: "67 Lektionen",
    duration: "1h 2min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 0
  },
  {
    title: "Modul 4 - Besondere Hacks",
    lessons: "31 von 43 Lektionen abgeschlossen",
    duration: "1h 3min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 72
  },
  {
    title: "Modul 5 - Vertragsvorlagen",
    lessons: "18 Lektionen",
    duration: "0h 29min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 0
  },
  {
    title: "Modul 6 - Immobilien in der Genossenschaft",
    lessons: "8 von 56 Lektionen abgeschlossen",
    duration: "1h 24min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 14
  },
  {
    title: "Modul 7 - Holdingstrukturen",
    lessons: "12 von 24 Lektionen abgeschlossen",
    duration: "0h 31min",
    image: "/lovable-uploads/3392e889-0e06-49dc-98b6-289d2b5165c0.png",
    progress: 50
  }
];

const Courses = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">Courses</h1>
            
            <KnowledgeTabs />
            
            <div className="grid gap-6">
              {courseModules.map((module, index) => (
                <Card key={index} className="flex hover:shadow-lg transition-shadow">
                  <div className="w-48 h-32 flex-shrink-0">
                    <img 
                      src={module.image} 
                      alt={module.title} 
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="space-y-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="mr-4">{module.lessons}</span>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{module.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={module.progress} className="flex-1" />
                          <span className="text-sm text-gray-500 min-w-[4rem]">
                            {module.progress}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
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

export default Courses;