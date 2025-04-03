
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Send, Users, Copy, FileText, Paperclip } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const emailFormSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Email content is required"),
  template: z.string().optional(),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export function EmailIntegration({ selectedMembers = [] }: { selectedMembers?: string[] }) {
  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipient: selectedMembers.length > 0 ? "selected" : "all",
      subject: "",
      content: "",
      template: "none",
    },
  });

  const onSubmit = (data: EmailFormValues) => {
    toast({
      title: "Email Sent",
      description: `Email would be sent to ${data.recipient === "selected" ? selectedMembers.length : "all"} members.`,
    });
    
    console.log("Email data:", data);
    console.log("Attachments:", attachments);
    
    // Reset form
    form.reset();
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Mail className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Email Members</h2>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipients</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="active">Active Members Only</SelectItem>
                    <SelectItem value="inactive">Inactive Members Only</SelectItem>
                    <SelectItem value="selected" disabled={selectedMembers.length === 0}>
                      Selected Members ({selectedMembers.length})
                    </SelectItem>
                  </SelectContent>
                </Select>
                {field.value === "selected" && (
                  <FormDescription className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> 
                    {selectedMembers.length} members selected
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select email template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">No Template</SelectItem>
                    <SelectItem value="welcome">Welcome Email</SelectItem>
                    <SelectItem value="renewal">Membership Renewal</SelectItem>
                    <SelectItem value="event">Upcoming Event</SelectItem>
                    <SelectItem value="payment">Payment Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input placeholder="Email subject..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Type your email content here..." 
                    className="min-h-[200px]" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <FormLabel>Attachments</FormLabel>
            <div className="flex gap-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent">
                  <Paperclip className="h-4 w-4" />
                  <span>Add Attachment</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.setValue("subject", "");
                  form.setValue("content", "");
                  setAttachments([]);
                }}
              >
                Clear
              </Button>
            </div>
            
            {attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm flex-1 truncate">{file.name}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeAttachment(index)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Remove</span>
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Send Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
