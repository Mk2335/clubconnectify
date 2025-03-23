
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KnowledgeCommunity = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <AppLayout title="Knowledge & Community">
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
    </AppLayout>
  );
};

export default KnowledgeCommunity;
