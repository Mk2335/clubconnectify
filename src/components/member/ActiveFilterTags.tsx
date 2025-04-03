
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FilterOptions } from "@/types/table";
import { motion, AnimatePresence } from "framer-motion";

interface ActiveFilterTagsProps {
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const ActiveFilterTags = ({
  filterOptions,
  onFilterChange,
  onResetFilters,
  activeFilterCount
}: ActiveFilterTagsProps) => {
  if (activeFilterCount === 0) return null;
  
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filterOptions, [key]: value });
  };

  const formatFilterValue = (key: string, value: string) => {
    // Capitalize first letter
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 items-center text-sm mb-4"
    >
      <span className="text-muted-foreground">Active filters:</span>
      <AnimatePresence>
        {filterOptions.status !== "all" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key="status"
          >
            <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
              Status: {formatFilterValue('status', filterOptions.status)}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => updateFilter('status', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </motion.div>
        )}
        {filterOptions.type !== "all" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key="type"
          >
            <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
              Type: {formatFilterValue('type', filterOptions.type)}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => updateFilter('type', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </motion.div>
        )}
        {filterOptions.role !== "all" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key="role"
          >
            <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
              Role: {filterOptions.role}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => updateFilter('role', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </motion.div>
        )}
        {filterOptions.paymentMethod !== "all" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            key="payment"
          >
            <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
              Payment: {filterOptions.paymentMethod}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-4 w-4 p-0 ml-1" 
                onClick={() => updateFilter('paymentMethod', 'all')}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>
      {activeFilterCount > 1 && (
        <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-xs h-7">
          Clear all
        </Button>
      )}
    </motion.div>
  );
};
