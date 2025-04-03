
import { useState, useEffect } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Send, Users, Copy, FileText, Paperclip, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmailTemplate } from "@/types/communication";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailTemplateManager } from "./EmailTemplateManager";

const emailFormSchema = z.object({
  recipient: z.string().min(1, "Recipient is required"),
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Email content is required"),
  templateId: z.string().optional(),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

export function EmailIntegration({ selectedMembers = [] }: { selectedMembers?: string[] }) {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("compose");

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      recipient: selectedMembers.length > 0 ? "selected" : "all",
      subject: "",
      content: "",
      templateId: "none",
    },
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      const formattedTemplates: EmailTemplate[] = data.map((template: any) => ({
        id: template.id,
        name: template.name,
        subject: template.subject,
        content: template.content,
        createdAt: template.created_at,
        updatedAt: template.updated_at,
      }));

      setTemplates(formattedTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "Failed to load email templates.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: EmailFormValues) => {
    try {
      setIsSending(true);
      
      // Get recipient emails based on selection
      let recipientEmails: string[] = [];
      
      if (data.recipient === "selected" && selectedMembers.length > 0) {
        try {
          const { data: membersData, error } = await supabase
            .from('members')
            .select('email')
            .in('id', selectedMembers);
          
          if (error) throw error;
          
          recipientEmails = membersData.map(member => member.email);
        } catch (error) {
          console.error('Error fetching member emails:', error);
          throw new Error('Failed to fetch member emails');
        }
      } else if (data.recipient === "all") {
        try {
          const { data: membersData, error } = await supabase
            .from('members')
            .select('email')
            .eq('status', 'Active');
          
          if (error) throw error;
          
          recipientEmails = membersData.map(member => member.email);
        } catch (error) {
          console.error('Error fetching all member emails:', error);
          throw new Error('Failed to fetch member emails');
        }
      } else if (data.recipient === "active") {
        try {
          const { data: membersData, error } = await supabase
            .from('members')
            .select('email')
            .eq('status', 'Active');
          
          if (error) throw error;
          
          recipientEmails = membersData.map(member => member.email);
        } catch (error) {
          console.error('Error fetching active member emails:', error);
          throw new Error('Failed to fetch member emails');
        }
      } else if (data.recipient === "inactive") {
        try {
          const { data: membersData, error } = await supabase
            .from('members')
            .select('email')
            .eq('status', 'Inactive');
          
          if (error) throw error;
          
          recipientEmails = membersData.map(member => member.email);
        } catch (error) {
          console.error('Error fetching inactive member emails:', error);
          throw new Error('Failed to fetch member emails');
        }
      }
      
      if (recipientEmails.length === 0) {
        throw new Error('No recipients selected');
      }

      // Prepare email payload
      const emailPayload = {
        recipients: recipientEmails,
        subject: data.subject,
        content: data.content,
        templateId: data.templateId !== "none" ? data.templateId : undefined
      };

      // Call the Supabase edge function to send the email
      const { data: response, error } = await supabase.functions.invoke('send-email', {
        body: emailPayload
      });

      if (error) throw error;
      
      console.log('Email sent:', response);
      
      toast({
        title: "Email Sent",
        description: `Email successfully sent to ${recipientEmails.length} recipients.`,
      });
      
      // Reset form
      form.reset();
      setAttachments([]);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send email.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
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

  const handleTemplateChange = (templateId: string) => {
    if (templateId === "none") {
      form.setValue("subject", "");
      form.setValue("content", "");
      return;
    }

    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      form.setValue("subject", selectedTemplate.subject);
      form.setValue("content", selectedTemplate.content);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compose">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Compose Email</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="templates">
            <div className="flex items-center gap-2">
              <Copy className="h-4 w-4" />
              <span>Templates</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="space-y-6 mt-4">
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
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTemplateChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select email template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No Template</SelectItem>
                        {templates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {templates.length === 0 && (
                      <FormDescription className="flex items-center gap-1 text-amber-600">
                        <AlertCircle className="h-3 w-3" /> 
                        No templates available. Create some in the Templates tab.
                      </FormDescription>
                    )}
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
                    <FormMessage />
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
                    <FormMessage />
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
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => form.reset()}
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="gap-2"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-4">
          <EmailTemplateManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
