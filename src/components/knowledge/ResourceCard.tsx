import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const ResourceCard = ({ title, description, icon: Icon, path }: ResourceCardProps) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => window.location.href = path}>
          View {title}
        </Button>
      </CardFooter>
    </Card>
  );
};