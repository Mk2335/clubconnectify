import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

const ebooks = [
  {
    title: "LEXIKON der Grundlagen",
    description: "Comprehensive reference guide for cooperative fundamentals and principles",
    pages: 450,
    format: "PDF & EPUB",
  },
  {
    title: "Genossenschaft Grundlagen",
    description: "A comprehensive guide to understanding cooperative business structures",
    pages: 245,
    format: "PDF & EPUB",
  },
  {
    title: "Asset Protection Strategies",
    description: "Advanced strategies for protecting your assets in the modern economy",
    pages: 180,
    format: "PDF & EPUB",
  },
  {
    title: "Cooperative Management Guide",
    description: "Essential management principles for cooperative organizations",
    pages: 320,
    format: "PDF & EPUB",
  }
];

const Ebooks = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">eBooks</h1>
            <div className="grid gap-6">
              {ebooks.map((ebook, index) => (
                <Card key={index} className="flex">
                  <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                    <Book className="w-24 h-24 text-gray-400" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <CardHeader>
                      <CardTitle>{ebook.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-gray-600">{ebook.description}</p>
                      <div className="mt-4 flex gap-4 text-sm text-gray-500">
                        <span>{ebook.pages} pages</span>
                        <span>•</span>
                        <span>{ebook.format}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button>
                        Read Now
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

export default Ebooks;