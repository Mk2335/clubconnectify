import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Members Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all cooperative members in one place.
        </p>
      </div>
      <Button className="btn-primary" size="lg">
        <Plus className="mr-2 h-4 w-4" />
        Add Member
      </Button>
    </div>
  );
};