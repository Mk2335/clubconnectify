
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberList } from "@/components/MemberList";

const AddressBook = () => {
  return (
    <AppLayout title="Address Book">
      <MemberList />
    </AppLayout>
  );
};

export default AddressBook;
