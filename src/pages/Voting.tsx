import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface VotingTopic {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  allowAbstentions: boolean;
  closingText: string;
  sharingOption: string;
  questions: Question[];
}

interface Question {
  id: string;
  text: string;
  allowCustomAnswers: boolean;
  answers: Answer[];
  votes: number;
}

interface Answer {
  id: string;
  text: string;
}

const Voting = () => {
  const { toast } = useToast();
  const [topic] = useState<VotingTopic>({
    id: "1",
    title: "Board elections",
    description: "The members of the Board of Directors are elected in this vote.",
    startDate: "04.02.2025",
    endDate: "08.02.2025",
    startTime: "02:30",
    endTime: "16:30",
    allowAbstentions: true,
    closingText: "Vielen Dank für deine Stimme",
    sharingOption: "Participation for registered members only (members area)",
    questions: [
      {
        id: "q1",
        text: "Elect the first member of the Board of Directors",
        allowCustomAnswers: true,
        votes: 1,
        answers: [
          { id: "a1", text: "Max Mustermann" },
          { id: "a2", text: "Tina Musterfrau" }
        ]
      },
      {
        id: "q2",
        text: "Elect the second member of the Board of Directors",
        allowCustomAnswers: true,
        votes: 1,
        answers: [
          { id: "a3", text: "Tom Mustermann" },
          { id: "a4", text: "Anna Musterfrau" }
        ]
      }
    ]
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Voting
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View result
              </Button>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Name of the vote</label>
                      <Input value={topic.title} readOnly />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Date (start)</label>
                        <Input value={topic.startDate} readOnly />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Time (start)</label>
                        <Input value={topic.startTime} readOnly />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Date (end)</label>
                        <Input value={topic.endDate} readOnly />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Time (end)</label>
                        <Input value={topic.endTime} readOnly />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm text-gray-500 block mb-2">Add description:</label>
                      <div className="min-h-[100px] p-4 border rounded-md">
                        {topic.description}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500 block mb-2">Closing text</label>
                      <Input value={topic.closingText} readOnly />
                    </div>

                    <div className="flex items-center gap-2">
                      <Switch checked={topic.allowAbstentions} />
                      <span>Allow abstentions (skip question)</span>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500 block mb-2">Select sharing option</label>
                      <Input value={topic.sharingOption} readOnly />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold">Questions:</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {topic.questions.map((question) => (
                      <div key={question.id} className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Badge variant="secondary" className="mb-2">Question</Badge>
                            <p>{question.text}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary">Number of votes</Badge>
                            <p className="mt-2">{question.votes}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {question.answers.map((answer) => (
                            <div key={answer.id} className="flex items-center justify-between">
                              <Badge variant="outline">Answer</Badge>
                              <p>{answer.text}</p>
                            </div>
                          ))}
                        </div>

                        <Button variant="outline" className="w-full">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add a new answer
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Voting;