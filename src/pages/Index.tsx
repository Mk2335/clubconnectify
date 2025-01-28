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
      <form>
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className="text-4xl font-bold">Welcome to the Cooperative Platform</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Manage your cooperative efficiently and effectively
          </p>
        </div>
      </form>
    </Form>
  );
};

export default Index;