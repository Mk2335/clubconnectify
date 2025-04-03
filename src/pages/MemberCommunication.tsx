
import { AppLayout } from "@/components/layout/AppLayout";
import { MemberCommunicationTabs } from "@/components/communication/MemberCommunicationTabs";
import { useState, useEffect } from "react";
import { Member } from "@/types/member";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const MemberCommunication = () => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('members')
          .select(`
            *,
            company_details(*)
          `);

        if (error) {
          throw error;
        }

        // Transform data to match our Member type
        const transformedMembers: Member[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          status: item.status,
          joinDate: item.join_date,
          profilePicture: item.profile_picture || "",
          role: item.role,
          type: item.type,
          companyDetails: item.company_details ? {
            companyName: item.company_details.company_name,
            registrationNumber: item.company_details.registration_number || "",
            contactPerson: item.company_details.contact_person || ""
          } : undefined
        }));

        setMembers(transformedMembers);
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <AppLayout title="Member Communication">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

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
