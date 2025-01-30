import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  title: string;
  progress: number;
  image: string;
  path: string;
}

export const CourseCard = ({ title, progress, image, path }: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="flex">
      <div className="w-48 h-48 bg-gray-200 flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-4">
            <Progress value={progress} className="flex-1" />
            <span className="text-sm text-gray-500">{progress}% abgeschlossen</span>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={() => navigate(path)}>
            Kurs starten
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};