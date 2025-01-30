import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

export const DashboardHeader = () => {
  const { toast } = useToast();

  const handleAddMember = useCallback(() => {
    toast({
      title: "Coming Soon",
      description: "The add member functionality will be available soon.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Members Overview</h1>
        <p className="text-muted-foreground mt-2">
          Manage and view all cooperative members in one place.
        </p>
      </div>
      <Button 
        className="btn-primary" 
        size="lg"
        onClick={handleAddMember}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Member
      </Button>
    </div>
  );
};