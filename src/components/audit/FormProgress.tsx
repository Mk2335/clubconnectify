import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  progress: number;
  isSubmitted?: boolean;
}

const FormProgress = ({ progress, isSubmitted = false }: FormProgressProps) => {
  const finalProgress = isSubmitted ? 100 : progress;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">
          {isSubmitted ? "Questionnaire Submitted" : "Completion Progress"}
        </p>
        <span className="text-sm font-medium">{finalProgress}%</span>
      </div>
      <Progress value={finalProgress} className="h-2" />
    </div>
  );
};

export default FormProgress;