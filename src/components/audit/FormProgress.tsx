import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  progress: number;
}

const FormProgress = ({ progress }: FormProgressProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">Completion Progress</p>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default FormProgress;