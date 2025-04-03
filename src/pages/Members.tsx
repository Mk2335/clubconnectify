
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberList } from "@/components/MemberList";

const Members = () => {
  return (
    <AppLayout title="Member Management">
      <MemberList />
    </AppLayout>
  );
};

export default Members;
