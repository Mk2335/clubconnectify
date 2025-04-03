
import { AppLayout } from "@/components/layout/AppLayout";
import { TaskCard } from "@/components/tasks/TaskCard";

const Tasks = () => {
  const openTasks = [
    {
      name: "Preparation of an annual report",
      responsible: "Maximilian Kuhn",
      dueDate: "13.02.2025",
      group: true,
      description: true,
    },
  ];

  const inProgressTasks = [
    {
      name: "Invitations to the General Meeting",
      responsible: "Maximilian Kuhn",
      dueDate: "14.02.2025",
      group: true,
      description: true,
    },
  ];

  const completedTasks = [
    {
      name: "Financial analysis",
      responsible: "Maximilian Kuhn",
      dueDate: "09.02.2025",
      group: true,
      description: true,
    },
  ];

  return (
    <AppLayout title="Tasks">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Open Tasks */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-muted-foreground">☰</span> Open tasks
          </h2>
          <div className="space-y-4">
            {openTasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </div>
        </div>

        {/* Tasks in Progress */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-warning">☀</span> Tasks in progress
          </h2>
          <div className="space-y-4">
            {inProgressTasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-success">✓</span> Already completed tasks
          </h2>
          <div className="space-y-4">
            {completedTasks.map((task, index) => (
              <TaskCard key={index} {...task} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Tasks;
