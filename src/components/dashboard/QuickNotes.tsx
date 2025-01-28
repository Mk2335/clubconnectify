import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Notebook } from "lucide-react";

const QuickNotes = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Notebook className="h-5 w-5" />
          Quick Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Write your notes here..."
          className="min-h-[150px]"
        />
        <Button className="w-full">Save Note</Button>
      </CardContent>
    </Card>
  );
};

export default QuickNotes;