import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Edit, Trash } from "lucide-react";

interface TaskCardProps {
  name: string;
  responsible: string;
  dueDate: string;
  group?: string;
  description?: string;
}

export const TaskCard = ({
  name,
  responsible,
  dueDate,
  group,
  description,
}: TaskCardProps) => {
  return (
    <Card className="mb-4 p-4">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <span>Responsible: {responsible}</span>
              {group && (
                <Badge variant="outline" className="ml-2">
                  + Gruppe
                </Badge>
              )}
            </div>
          </div>
          <Avatar className="h-8 w-8" />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Due on: {dueDate}</span>
        </div>

        {description && (
          <div className="text-sm">
            <a href="#" className="text-primary hover:underline">
              Expand description
            </a>
          </div>
        )}

        <div className="flex justify-between border-t pt-4">
          <Button variant="outline" size="sm">
            <CheckCircle className="h-4 w-4 mr-1" />
            Complete
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};