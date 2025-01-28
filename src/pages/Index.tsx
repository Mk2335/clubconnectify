import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MemberList } from "@/components/MemberList";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Index = () => {
  const form = useForm({
    defaultValues: {
      search: "",
      filter: "all",
    },
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <Form {...form}>
              <SidebarTrigger className="mb-4" />
              <MemberList />
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;