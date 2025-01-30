import { AppLayout } from "@/components/layout/AppLayout";
import { KnowledgeTabs } from "@/components/knowledge/KnowledgeTabs";
import { CourseCard } from "@/components/knowledge/CourseCard";
import { ResourceCard } from "@/components/knowledge/ResourceCard";
import { Book, Headphones } from "lucide-react";

const courses = [
  {
    title: "MASTERCLASS - Genossenschaft",
    progress: 88,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - 150 Millionen Gründe",
    progress: 100,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - Steuerberatung",
    progress: 80,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - Asset Protection",
    progress: 62,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  },
  {
    title: "MASTERCLASS - LEXIKON der Grundlagen",
    progress: 9,
    image: "/lovable-uploads/71fc05aa-a6f1-421a-ab3b-9743019c51ea.png",
    path: "/knowledge-community/knowledge/masterclass"
  }
];

const Knowledge = () => {
  return (
    <AppLayout title="Knowledge">
      <KnowledgeTabs />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ResourceCard
          title="eBooks"
          description="Access our comprehensive collection of eBooks about cooperatives and asset protection."
          icon={Book}
          path="/knowledge-community/knowledge/ebooks"
        />
        <ResourceCard
          title="Podcasts"
          description="Listen to our expert interviews and discussions about cooperative business models."
          icon={Headphones}
          path="/knowledge-community/knowledge/podcasts"
        />
      </div>

      <div className="grid gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Knowledge;