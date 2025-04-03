
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ListCheck, Plus, Check, Pencil, X, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("dashboardTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      status: "Pending",
      dueDate: dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default: 1 week from now
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask("");
    setDueDate("");
    
    toast({
      title: "Task added",
      description: "Your new task has been added successfully.",
    });
  };

  const handleUpdateStatus = (id: string, status: "Pending" | "In Progress" | "Completed") => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status } : task
    ));
    
    toast({
      title: "Task updated",
      description: `Task status changed to ${status}.`,
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: "The task has been deleted.",
      variant: "destructive",
    });
  };

  const handleEditTask = (id: string, newTitle: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, title: newTitle } : task
    ));
    setEditingId(null);
    
    toast({
      title: "Task updated",
      description: "Task details have been updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListCheck className="h-5 w-5" />
          Task Manager
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Add a new task..." 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Input 
            type="date" 
            className="w-40"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button onClick={handleAddTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {tasks.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No tasks yet. Add your first task!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="rounded-md border p-3 hover:bg-accent">
                {editingId === task.id ? (
                  <div className="flex gap-2">
                    <Input 
                      defaultValue={task.title}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleEditTask(task.id, (e.target as HTMLInputElement).value);
                        } else if (e.key === 'Escape') {
                          setEditingId(null);
                        }
                      }}
                    />
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className={`${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        <span
                          className={`px-2 py-1 rounded-full ${
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
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(task.id)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateStatus(task.id, 
                          task.status === "Pending" ? "In Progress" : 
                          task.status === "In Progress" ? "Completed" : "Pending"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskManager;
