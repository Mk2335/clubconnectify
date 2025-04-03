
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsPlaceholderTabProps {
  title: string;
  description: string;
}

export const AnalyticsPlaceholderTab = ({ title, description }: AnalyticsPlaceholderTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <div className="text-center text-muted-foreground">Coming soon</div>
      </CardContent>
    </Card>
  );
};
