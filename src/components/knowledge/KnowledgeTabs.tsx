import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const KnowledgeTabs = () => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList>
        <TabsTrigger 
          value="overview" 
          onClick={() => navigate("/knowledge-community/knowledge")}
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="courses" 
          onClick={() => navigate("/knowledge-community/knowledge/courses")}
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Courses
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};