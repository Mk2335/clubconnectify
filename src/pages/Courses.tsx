import { AppLayout } from "@/components/layout/AppLayout";
import { KnowledgeTabs } from "@/components/knowledge/KnowledgeTabs";
import { CourseCard } from "@/components/knowledge/CourseCard";

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
  }
];

const Courses = () => {
  return (
    <AppLayout title="Courses">
      <KnowledgeTabs />
      
      <div className="grid gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Courses;