
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Vote, BarChart3 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const activeVotes = [
  {
    id: 1,
    title: "Annual Budget Approval",
    description: "Vote on the proposed annual budget for 2025",
    deadline: "April 15, 2025",
    participation: "45/120 members"
  },
  {
    id: 2,
    title: "New Board Member Election",
    description: "Elect a replacement for the retiring board member",
    deadline: "April 20, 2025",
    participation: "38/120 members"
  }
];

const pastVotes = [
  {
    id: 3,
    title: "Bylaw Amendment",
    description: "Amendment to Article 5 of the cooperative bylaws",
    result: "Approved (78%)",
    date: "March 10, 2025"
  },
  {
    id: 4,
    title: "Facility Expansion Project",
    description: "Approval for expanding the cooperative facilities",
    result: "Rejected (42%)",
    date: "February 15, 2025"
  }
];

const MemberVoting = () => {
  return (
    <AppLayout title="Voting & Decisions">
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            <Clock className="mr-2 h-4 w-4" />
            Active Votes
          </TabsTrigger>
          <TabsTrigger value="past">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Past Votes
          </TabsTrigger>
          <TabsTrigger value="create">
            <Vote className="mr-2 h-4 w-4" />
            Create Vote
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid gap-6">
            {activeVotes.map((vote) => (
              <Card key={vote.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{vote.title}</CardTitle>
                    <Button variant="outline" size="sm">Cast Vote</Button>
                  </div>
                  <CardDescription>{vote.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Deadline: {vote.deadline}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Participation: {vote.participation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vote</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pastVotes.map((vote) => (
                <TableRow key={vote.id}>
                  <TableCell className="font-medium">{vote.title}</TableCell>
                  <TableCell>{vote.description}</TableCell>
                  <TableCell>{vote.result}</TableCell>
                  <TableCell>{vote.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Vote</CardTitle>
              <CardDescription>
                Set up a new decision for cooperative members to vote on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Configure voting type, options, duration, and eligibility criteria here.
                This feature will be implemented in the next phase.
              </p>
              <Button disabled>Coming Soon</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default MemberVoting;
