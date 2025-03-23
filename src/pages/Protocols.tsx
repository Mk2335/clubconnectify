
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Protocols = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Protocols</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Protocols Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is the protocols management page. Here you can view and manage all your organization's protocols.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Protocols;
