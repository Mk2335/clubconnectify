
import React, { createContext, useState, useContext } from 'react';
import { Member } from '@/types/member';

interface MemberFormContextType {
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
}

const MemberFormContext = createContext<MemberFormContextType | undefined>(undefined);

export const MemberFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <MemberFormContext.Provider 
      value={{ 
        selectedMember, 
        setSelectedMember, 
        isFormOpen, 
        setIsFormOpen 
      }}
    >
      {children}
    </MemberFormContext.Provider>
  );
};

export const useMemberForm = () => {
  const context = useContext(MemberFormContext);
  if (context === undefined) {
    throw new Error('useMemberForm must be used within a MemberFormProvider');
  }
  return context;
};
