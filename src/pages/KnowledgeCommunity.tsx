
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KnowledgeCommunity = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Knowledge & Community</h1>
            
            <Card>
              <CardHeader>
                <CardTitle>Knowledge & Community Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Welcome to the Knowledge & Community hub. Access resources, connect with other members, and explore educational content.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default KnowledgeCommunity;
