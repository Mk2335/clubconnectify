import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface VotingTopic {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed";
  votesFor: number;
  votesAgainst: number;
  abstained: number;
  startDate: string;
  endDate: string;
}

const VotingTopics = () => {
  const { toast } = useToast();
  const [topics] = useState<VotingTopic[]>([
    {
      id: "1",
      title: "Budget Allocation 2024",
      description: "Vote on the proposed budget allocation for the fiscal year 2024",
      status: "open",
      votesFor: 15,
      votesAgainst: 5,
      abstained: 2,
      startDate: "2024-01-01",
      endDate: "2024-01-15"
    },
    {
      id: "2",
      title: "New Board Member Election",
      description: "Election of new board member position",
      status: "closed",
      votesFor: 20,
      votesAgainst: 3,
      abstained: 1,
      startDate: "2023-12-01",
      endDate: "2023-12-15"
    }
  ]);

  const handleGenerateProtocol = (topicId: string) => {
    toast({
      title: "Protocol Generated",
      description: "The voting protocol has been generated and saved.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Voting Topics</h1>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                New Topic
              </Button>
            </div>

            <div className="grid gap-6">
              {topics.map((topic) => (
                <Card key={topic.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                        <p className="text-sm text-gray-500">{topic.description}</p>
                      </div>
                      <Badge variant={topic.status === "open" ? "default" : "secondary"}>
                        {topic.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Voting Period</p>
                        <p>{topic.startDate} - {topic.endDate}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Results</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="font-semibold text-green-600">{topic.votesFor}</p>
                            <p className="text-sm text-gray-500">For</p>
                          </div>
                          <div>
                            <p className="font-semibold text-red-600">{topic.votesAgainst}</p>
                            <p className="text-sm text-gray-500">Against</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-600">{topic.abstained}</p>
                            <p className="text-sm text-gray-500">Abstained</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleGenerateProtocol(topic.id)}
                      >
                        <FileText className="h-4 w-4" />
                        Generate Protocol
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VotingTopics;