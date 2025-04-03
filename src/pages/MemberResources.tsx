
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Image, File, DownloadCloud, Upload, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const documentResources = [
  {
    id: 1,
    title: "Cooperative Bylaws",
    type: "PDF",
    size: "1.2 MB",
    date: "Jan 15, 2025",
    icon: FileText
  },
  {
    id: 2,
    title: "Member Handbook",
    type: "PDF",
    size: "3.5 MB",
    date: "Feb 23, 2025",
    icon: FileText
  },
  {
    id: 3,
    title: "Annual Report 2024",
    type: "PDF",
    size: "4.8 MB",
    date: "Mar 10, 2025",
    icon: FileText
  }
];

const mediaResources = [
  {
    id: 4,
    title: "Community Garden Opening",
    type: "JPG",
    size: "2.7 MB",
    date: "Mar 05, 2025",
    icon: Image
  },
  {
    id: 5,
    title: "General Assembly Recording",
    type: "MP4",
    size: "75.2 MB",
    date: "Feb 12, 2025",
    icon: File
  }
];

const MemberResources = () => {
  return (
    <AppLayout title="Resource Sharing">
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="media">
            <Image className="mr-2 h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Share Resources
          </TabsTrigger>
        </TabsList>
        
        <div className="flex justify-between mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              placeholder="Search resources..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Download All
            </Button>
          </div>
        </div>
        
        <TabsContent value="documents">
          <div className="grid gap-4">
            {documentResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="flex items-center p-4">
                  <div className="p-2 bg-primary/10 rounded-md text-primary mr-4">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{resource.title}</h3>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <span>{resource.type}</span>
                      <span>{resource.size}</span>
                      <span>Updated: {resource.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <DownloadCloud className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="media">
          <div className="grid gap-4">
            {mediaResources.map((resource) => (
              <Card key={resource.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="flex items-center p-4">
                  <div className="p-2 bg-primary/10 rounded-md text-primary mr-4">
                    <resource.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{resource.title}</h3>
                    <div className="flex gap-3 text-sm text-muted-foreground">
                      <span>{resource.type}</span>
                      <span>{resource.size}</span>
                      <span>Added: {resource.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <DownloadCloud className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Share Resources</CardTitle>
              <CardDescription>
                Upload documents, images, or other resources to share with other cooperative members
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center border-2 border-dashed p-10 rounded-md">
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="mb-2 text-sm text-muted-foreground">Drag & drop files here or click to browse</p>
              <Button className="mt-2">Select Files</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberResources;
