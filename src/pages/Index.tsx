import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MemberList } from "@/components/MemberList";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const Index = () => {
  const form = useForm({
    defaultValues: {
      // Add any form fields you need here
    },
  });

  return (
    <Form {...form}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <SidebarTrigger className="mb-4" />
              <MemberList />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </Form>
  );
};

export default Index;