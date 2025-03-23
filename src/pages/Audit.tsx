
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Audit = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <AppLayout title="Audit">
      <Card>
        <CardHeader>
          <CardTitle>Audit Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is the audit management page. Here you can review and manage all your organization's audit processes.
          </p>
        </CardContent>
      </Card>
    </AppLayout>
  );
};

export default Audit;
