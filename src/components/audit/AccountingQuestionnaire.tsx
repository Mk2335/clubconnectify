import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const AccountingQuestionnaire = () => {
  const form = useForm({
    defaultValues: {},
  });

  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Content will be added here in future updates */}
      </div>
    </Form>
  );
};

export default AccountingQuestionnaire;