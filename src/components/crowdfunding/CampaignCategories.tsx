import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  "Cooperative Banks",
  "Digital Platforms",
  "Sustainable Projects",
  "Social Initiatives",
  "Technology",
  "Infrastructure",
];

export const CampaignCategories = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};