
import { useNavigate } from "react-router-dom";
import { UserMenu } from "@/components/auth/UserMenu";
import { CooperativeSelector } from "@/components/company/CooperativeSelector";
import { useTranslation } from "@/utils/translations";

export function AppHeader() {
  const navigate = useNavigate();
  const t = useTranslation('de');

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate("/")}
            className="text-xl font-semibold tracking-tight cursor-pointer"
          >
            clubconnectify
          </button>
          <CooperativeSelector />
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
