
import { MemberSearchAndFilter } from "./MemberSearchAndFilter";
import { MemberTableContainer } from "./MemberTableContainer";
import { MemberBulkActions } from "@/components/member/MemberBulkActions";
import { Member } from "@/types/member";
import { FilterOptions, SortConfig, SearchOptions } from "@/types/table";
import { Card, CardContent } from "@/components/ui/card";
import { HighlightedText } from "./SearchUtils";

interface MemberListTabProps {
  members: Member[];
  onEdit?: (memberId: string) => void;
  onDelete?: (memberId: string) => void;
  onDeactivate?: (memberId: string) => void;
  sortConfig?: SortConfig | null;
  handleSort?: (key: keyof Member) => void;
  selectedMembers?: string[];
  toggleMemberSelection?: (memberId: string) => void;
  toggleAllMembers?: (selected: boolean) => void;
  handleBulkEmail?: () => void;
  handleBulkDeactivate?: () => void;
  handleBulkDelete?: () => void;
  localSearchQuery?: string;
  setLocalSearchQuery?: (query: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  typeFilter?: string;
  setTypeFilter?: (type: string) => void;
  handleAddMember?: () => void;
  handleFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allSelected?: boolean;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  filterOptions?: FilterOptions;
  onFilterChange?: (filters: FilterOptions) => void;
  onSearchFieldsChange?: (fields: Array<keyof Member>) => void;
  onCaseSensitiveChange?: (caseSensitive: boolean) => void;
  searchFields?: Array<keyof Member>;
  caseSensitive?: boolean;
  searchOptions?: SearchOptions;
}

export const MemberListTab = ({
  members = [],
  onEdit = () => {},
  onDelete = () => {},
  onDeactivate = () => {},
  sortConfig = null,
  handleSort = () => {},
  selectedMembers = [],
  toggleMemberSelection = () => {},
  toggleAllMembers = () => {},
  handleBulkEmail = () => {},
  handleBulkDeactivate = () => {},
  handleBulkDelete = () => {},
  localSearchQuery = "",
  setLocalSearchQuery = () => {},
  statusFilter = "all",
  setStatusFilter = () => {},
  typeFilter = "all",
  setTypeFilter = () => {},
  handleAddMember = () => {},
  handleFileUpload = () => {},
  allSelected = false,
  viewMode = "list",
  onViewModeChange,
  filterOptions = { status: "all", type: "all", role: "all", paymentMethod: "all" },
  onFilterChange = () => {},
  onSearchFieldsChange,
  onCaseSensitiveChange,
  searchFields = ['name', 'email', 'role'],
  caseSensitive = false,
  searchOptions
}: MemberListTabProps) => {
  // Make sure members is always an array
  const membersList = Array.isArray(members) ? members : [];

  const renderMemberGrid = () => {
    if (viewMode !== "grid") return null;
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {membersList.map(member => (
          <Card key={member.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">
                    {localSearchQuery ? (
                      <HighlightedText text={member.name} searchQuery={localSearchQuery} />
                    ) : (
                      member.name
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {localSearchQuery ? (
                      <HighlightedText text={member.email} searchQuery={localSearchQuery} />
                    ) : (
                      member.email
                    )}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      member.status === "Active" ? "bg-green-500" : 
                      member.status === "Pending" ? "bg-amber-500" : "bg-gray-300"
                    }`} />
                    <span className="text-sm">{member.status}</span>
                  </div>
                  
                  {member.role && (
                    <p className="text-sm mt-1">
                      {localSearchQuery ? (
                        <HighlightedText text={member.role} searchQuery={localSearchQuery} />
                      ) : (
                        member.role
                      )}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => onEdit(member.id)}
                    className="text-xs text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onDelete(member.id)}
                    className="text-xs text-destructive hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {selectedMembers && selectedMembers.length > 0 && (
        <MemberBulkActions
          selectedCount={selectedMembers.length}
          allSelected={allSelected}
          onToggleAll={toggleAllMembers}
          onEmail={handleBulkEmail}
          onDeactivate={handleBulkDeactivate}
          onDelete={handleBulkDelete}
        />
      )}
      
      <MemberSearchAndFilter 
        searchQuery={localSearchQuery}
        onSearchChange={setLocalSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onAddMember={handleAddMember}
        onFileUpload={handleFileUpload}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        onSearchFieldsChange={onSearchFieldsChange}
        onCaseSensitiveChange={onCaseSensitiveChange}
        searchFields={searchFields}
        caseSensitive={caseSensitive}
      />

      {viewMode === "grid" ? (
        renderMemberGrid()
      ) : (
        <MemberTableContainer 
          members={membersList}
          handleEdit={onEdit}
          handleDelete={onDelete}
          handleDeactivate={onDeactivate}
          sortConfig={sortConfig}
          handleSort={handleSort}
          selectedMembers={selectedMembers || []}
          toggleMemberSelection={toggleMemberSelection}
          toggleAllMembers={toggleAllMembers}
          searchQuery={localSearchQuery}
        />
      )}
      
      {membersList.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No members match your search criteria</p>
        </div>
      )}
    </div>
  );
};
