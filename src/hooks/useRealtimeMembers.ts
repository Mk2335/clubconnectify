
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/member';

export const useRealtimeMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial members
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('members')
          .select(`
            *,
            company_details(*)
          `);

        if (error) throw error;

        // Transform data to match Member type
        const transformedMembers: Member[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          status: item.status,
          joinDate: item.join_date,
          profilePicture: item.profile_picture || "",
          role: item.role,
          type: item.type,
          paymentMethod: item.payment_method,
          companyDetails: item.company_details ? {
            companyName: item.company_details.company_name,
            registrationNumber: item.company_details.registration_number || "",
            contactPerson: item.company_details.contact_person || ""
          } : undefined
        }));

        setMembers(transformedMembers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching members:', error);
        setLoading(false);
      }
    };

    // Real-time subscription
    const channel = supabase
      .channel('public:members')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'members' 
        },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              // Add new member
              setMembers(prev => [...prev, payload.new as Member]);
              break;
            case 'UPDATE':
              // Update existing member
              setMembers(prev => 
                prev.map(member => 
                  member.id === payload.new.id 
                    ? { ...member, ...payload.new } 
                    : member
                )
              );
              break;
            case 'DELETE':
              // Remove deleted member
              setMembers(prev => 
                prev.filter(member => member.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    fetchMembers();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { members, loading };
};
