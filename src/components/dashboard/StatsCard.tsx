
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  iconColor?: string;
  interactive?: boolean;
}

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  iconColor,
  interactive = false
}: StatsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={`transition-all duration-200 ${interactive && isHovered ? 'shadow-md translate-y-[-2px]' : ''}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`rounded-full p-2 ${isHovered ? 'bg-primary/10' : ''}`}>
          <Icon className={`h-4 w-4 ${iconColor || "text-muted-foreground"}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
