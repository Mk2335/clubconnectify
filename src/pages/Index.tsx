import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MemberList } from "@/components/MemberList";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the form schema
const formSchema = z.object({
  search: z.string(),
  filter: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const Index = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
              <form>
                <SidebarTrigger className="mb-4" />
                <MemberList />
              </form>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;