
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";

export const DashboardHeader = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleAddMember = useCallback(() => {
    navigate("/members");
  }, [navigate]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("memberDirectory")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("browseDirectory")}
        </p>
      </div>
      <Button 
        className="btn-primary" 
        size="lg"
        onClick={handleAddMember}
      >
        <Plus className="mr-2 h-4 w-4" />
        {t("add")} {t("members")}
      </Button>
    </div>
  );
};
