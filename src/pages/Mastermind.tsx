import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    title: "MASTERMIND - Genossenschaft",
    progress: 47,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png"
  },
  {
    title: "MASTERMIND - Live-Calls",
    progress: 20,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    sale: true
  }
];

const Mastermind = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">MASTERMIND</h1>
            <div className="grid gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="flex">
                  <div className="w-48 h-48 bg-gray-200 flex-shrink-0 relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    {course.sale && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500">SALE</Badge>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex items-center gap-4">
                        <Progress value={course.progress} className="flex-1" />
                        <span className="text-sm text-gray-500">{course.progress}% abgeschlossen</span>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button>Kurs starten</Button>
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

export default Mastermind;