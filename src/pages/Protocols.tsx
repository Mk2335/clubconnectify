
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Protocols = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <AppLayout title="Protocols">
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
    </AppLayout>
  );
};

export default Protocols;
