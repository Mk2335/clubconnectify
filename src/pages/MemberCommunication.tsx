
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberCommunicationTabs } from "@/components/communication/MemberCommunicationTabs";
import { useState } from "react";
import { Member } from "@/types/member";

const MemberCommunication = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([
    // You can add mock members here or fetch from an actual source
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joinDate: "2024-01-15",
      type: "Individual"
    }
  ]);

  return (
    <AppLayout title="Member Communication">
      <MemberCommunicationTabs 
        members={members} 
        selectedMembers={selectedMembers} 
      />
    </AppLayout>
  );
};

export default MemberCommunication;
