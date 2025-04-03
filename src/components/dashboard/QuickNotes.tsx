
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, Save, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: string;
  content: string;
  timestamp: string;
}

const QuickNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("dashboardNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (err) {
        console.error("Error parsing notes:", err);
      }
    }
  }, []);

  // Save notes to localStorage when they change
  useEffect(() => {
    localStorage.setItem("dashboardNotes", JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!currentNote.trim()) return;

    if (editingId) {
      // Update existing note
      const updatedNotes = notes.map(note =>
        note.id === editingId
          ? { ...note, content: currentNote, timestamp: new Date().toISOString() }
          : note
      );
      setNotes(updatedNotes);
      setEditingId(null);
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    } else {
      // Add new note
      const newNote: Note = {
        id: crypto.randomUUID(),
        content: currentNote,
        timestamp: new Date().toISOString(),
      };
      setNotes(prev => [newNote, ...prev]);
      toast({
        title: "Note added",
        description: "Your new note has been saved.",
      });
    }
    
    setCurrentNote("");
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note.content);
    setEditingId(note.id);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    
    if (editingId === id) {
      setEditingId(null);
      setCurrentNote("");
    }
    
    toast({
      title: "Note deleted",
      description: "The note has been removed.",
      variant: "destructive",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenLine className="h-5 w-5" />
          Quick Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          <Textarea
            placeholder="Write a note..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveNote} 
              className="flex items-center gap-1"
            >
              {editingId ? (
                <>
                  <Save className="h-4 w-4" />
                  Update Note
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add Note
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
          {notes.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No notes yet. Add your first note!</p>
          ) : (
            notes.map(note => (
              <div key={note.id} className="rounded-md border p-3 hover:bg-accent">
                <div className="space-y-2">
                  <p className="whitespace-pre-wrap">{note.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatTimestamp(note.timestamp)}</span>
                    <div className="space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditNote(note)}
                        className="h-7 w-7 p-0"
                      >
                        <PenLine className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteNote(note.id)}
                        className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickNotes;
