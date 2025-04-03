
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Notebook, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickNotes = () => {
  const [note, setNote] = useState("");
  const [isSaving, setSaving] = useState(false);
  const { toast } = useToast();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNote = localStorage.getItem("quickNote");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const handleSaveNote = () => {
    setSaving(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      localStorage.setItem("quickNote", note);
      setSaving(false);
      toast({
        title: "Note saved",
        description: "Your note has been saved successfully.",
      });
    }, 300);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Notebook className="h-5 w-5" />
          Quick Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Write your notes here..."
          className="min-h-[150px]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button 
          className="w-full" 
          onClick={handleSaveNote}
          disabled={isSaving || !note.trim()}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Note
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickNotes;
