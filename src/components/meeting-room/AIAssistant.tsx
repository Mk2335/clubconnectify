import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mic, Wand2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateTranscript, generateAgendaSuggestions } from "@/utils/aiMeetingUtils";

export const AIAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        setAudioChunks(current => [...current, event.data]);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const transcript = await generateTranscript(audioBlob);
        toast({
          title: "Transcript Generated",
          description: "Your meeting transcript is ready for review.",
        });
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Your meeting is being recorded for transcript generation.",
      });
    } catch (error) {
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setAudioChunks([]);
    }
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleAgendaGuidance = async () => {
    toast({
      title: "Generating Agenda",
      description: "AI is analyzing your meeting context...",
    });
    
    try {
      const suggestions = await generateAgendaSuggestions("Meeting context");
      toast({
        title: "Agenda Suggestions Ready",
        description: "Check the AI Assistant panel for suggestions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not generate agenda suggestions.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Meeting Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleRecordingToggle}
            variant={isRecording ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            <Mic className="h-4 w-4" />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button 
            onClick={handleAgendaGuidance}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Wand2 className="h-4 w-4" />
            Generate Agenda
          </Button>
        </div>
        {isRecording && (
          <Alert>
            <AlertDescription>
              Recording in progress. The AI will automatically generate a transcript when you stop recording.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};