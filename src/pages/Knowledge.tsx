import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Book, Headphones, GraduationCap } from "lucide-react";
import { KnowledgeTabs } from "@/components/knowledge/KnowledgeTabs";

const courses = [
  {
    title: "MASTERCLASS - Genossenschaft",
    progress: 88,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - 150 Millionen Gründe",
    progress: 100,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - Steuerberatung",
    progress: 80,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - Asset Protection",
    progress: 62,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - LEXIKON der Grundlagen",
    progress: 9,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  }
];

const Knowledge = () => {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">Knowledge</h1>
            
            <KnowledgeTabs />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-6 w-6" />
                    eBooks
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-600">Access our comprehensive collection of eBooks about cooperatives and asset protection.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/knowledge-community/knowledge/ebooks")}>
                    View eBooks
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-6 w-6" />
                    Podcasts
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-gray-600">Listen to our expert interviews and discussions about cooperative business models.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate("/knowledge-community/knowledge/podcasts")}>
                    View Podcasts
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-6">
              {courses.map((course, index) => (
                <Card key={index} className="flex">
                  <div className="w-48 h-48 bg-gray-200 flex-shrink-0">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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
                      <Button onClick={() => navigate(course.path)}>
                        Kurs starten
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

export default Knowledge;
