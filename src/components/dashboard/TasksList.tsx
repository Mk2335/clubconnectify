import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListCheck } from "lucide-react";

interface Task {
  title: string;
  status: "Completed" | "In Progress" | "Pending";
  dueDate: string;
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListCheck className="h-5 w-5" />
          Recent Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="mb-4 rounded-lg border p-3 hover:bg-accent"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{task.title}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : task.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Due: {task.dueDate}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TasksList;