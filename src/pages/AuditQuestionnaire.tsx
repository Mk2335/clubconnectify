import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";

const AuditQuestionnaire = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <div className="flex items-center gap-4 mb-8">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Audit Questionnaire</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Complete the mandatory audit questionnaire according to §§ 53 ff GenG
            </p>
            <div className="space-y-8">
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="management">Management Declaration</Label>
                    <Textarea
                      id="management"
                      placeholder="Enter management declaration..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="completeness">Declaration of Completeness</Label>
                    <Textarea
                      id="completeness"
                      placeholder="Enter declaration of completeness..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date of Declaration</Label>
                    <Input
                      type="date"
                      id="date"
                      className="mt-2"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AuditQuestionnaire;