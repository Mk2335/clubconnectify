
import React, { useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PlusCircle, CalendarIcon, X, Plus, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AppointmentFormData {
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  type: string;
  notifyByEmail: boolean;
  recipients: string[];
}

interface Appointment {
  id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  location: string | null;
  type: string;
}

const Calendar = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const { toast } = useToast();
  const [newRecipient, setNewRecipient] = useState("");
  
  const form = useForm<AppointmentFormData>({
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date().toISOString().split('T')[0],
      startTime: "09:00",
      endDate: new Date().toISOString().split('T')[0],
      endTime: "10:00",
      location: "",
      type: "Meeting",
      notifyByEmail: true,
      recipients: []
    }
  });

  const recipients = form.watch("recipients") || [];

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addRecipient = () => {
    if (!newRecipient) return;
    
    if (!validateEmail(newRecipient)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    
    if (!recipients.includes(newRecipient)) {
      form.setValue("recipients", [...recipients, newRecipient]);
      setNewRecipient("");
    } else {
      toast({
        title: "Email already added",
        description: "This email is already in the recipients list.",
        variant: "destructive",
      });
    }
  };

  const removeRecipient = (email: string) => {
    form.setValue(
      "recipients",
      recipients.filter((r) => r !== email)
    );
  };

  React.useEffect(() => {
    fetchAppointments();
  }, []);

  React.useEffect(() => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      console.log("Selected date:", formattedDate);
    }
  }, [date]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendEmailNotification = async (appointmentData: any) => {
    setEmailSending(true);
    setEmailError(null);
    try {
      const recipientsList = form.getValues("recipients");
      if (recipientsList.length === 0) {
        throw new Error("Please add at least one email recipient to send notifications");
      }
      
      // Validate all emails before sending
      for (const email of recipientsList) {
        if (!validateEmail(email)) {
          throw new Error(`Invalid email format: ${email}`);
        }
      }
      
      console.log("Sending notification to:", recipientsList);
      
      const response = await supabase.functions.invoke('send-appointment-notification', {
        body: { 
          appointment: appointmentData,
          recipients: recipientsList
        }
      });
      
      console.log("Email notification response:", response);
      
      if (response.error) {
        throw new Error(response.error.message || "Failed to send email notifications");
      }
      
      const data = response.data;
      
      if (!data || !data.success) {
        throw new Error(data?.error || "Failed to send email notifications");
      }
      
      toast({
        title: "Email Sent",
        description: "Notification emails have been sent successfully.",
      });
      
      return true;
    } catch (error: any) {
      console.error('Error sending email notification:', error);
      setEmailError(error.message || "Failed to send email notifications. Please try again later.");
      toast({
        title: "Email Notification Failed",
        description: error.message || "We couldn't send the email notifications.",
        variant: "destructive",
      });
      return false;
    } finally {
      setEmailSending(false);
    }
  };

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const startDateTime = new Date(`${data.startDate}T${data.startTime}`).toISOString();
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`).toISOString();
      
      const { data: appointmentData, error } = await supabase
        .from('appointments')
        .insert([{
          title: data.title,
          description: data.description,
          start_time: startDateTime,
          end_time: endDateTime,
          location: data.location,
          type: data.type
        }])
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Appointment Created",
        description: "Your appointment has been created successfully.",
      });
      
      let emailSent = true;
      if (data.notifyByEmail && appointmentData) {
        if (data.recipients.length === 0) {
          toast({
            title: "Warning",
            description: "No email recipients provided. Notifications were not sent.",
            variant: "destructive",
          });
        } else {
          emailSent = await sendEmailNotification(appointmentData);
        }
      }
      
      if (emailSent || !data.notifyByEmail) {
        setShowDialog(false);
        form.reset();
        fetchAppointments();
      }
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredAppointments = date
    ? appointments.filter(appointment => {
        const appointmentDate = new Date(appointment.start_time);
        return (
          appointmentDate.getDate() === date.getDate() &&
          appointmentDate.getMonth() === date.getMonth() &&
          appointmentDate.getFullYear() === date.getFullYear()
        );
      })
    : [];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRecipient();
    }
  };

  return (
    <AppLayout title="Calendar">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Calendar</CardTitle>
              <Button onClick={() => setShowDialog(true)} size="sm" className="ml-auto">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? `Appointments: ${format(date, 'MMMM d, yyyy')}` : 'Appointments'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-60">
                  <p>Loading appointments...</p>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 text-center">
                  <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No appointments scheduled for this day</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDialog(true)} 
                    className="mt-4"
                  >
                    Add New Appointment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4 hover:bg-muted/50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{appointment.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(appointment.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                            {new Date(appointment.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {appointment.location && (
                            <p className="text-sm mt-1">Location: {appointment.location}</p>
                          )}
                        </div>
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          {appointment.type}
                        </span>
                      </div>
                      {appointment.description && (
                        <p className="text-sm mt-2">{appointment.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Appointment</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basic" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter appointment title" {...field} required />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Meeting, Event, etc." 
                              {...field} 
                              required 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter location" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} required />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter appointment details"
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="notifyByEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Send Email Notifications</FormLabel>
                          <FormDescription className="text-sm text-muted-foreground">
                            Notify participants about this appointment via email
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("notifyByEmail") && (
                    <div className="space-y-4 border rounded-md p-4">
                      <FormLabel>Recipients</FormLabel>
                      
                      {emailError && (
                        <Alert variant="destructive" className="mb-4">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <AlertDescription>
                            {emailError}
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          value={newRecipient}
                          onChange={(e) => setNewRecipient(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <Button 
                          type="button" 
                          onClick={addRecipient}
                          variant="outline"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {recipients.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {recipients.map((email) => (
                            <div 
                              key={email} 
                              className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-sm"
                            >
                              <span>{email}</span>
                              <button
                                type="button"
                                onClick={() => removeRecipient(email)}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No recipients added. Please add at least one recipient to send notifications.
                        </p>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={emailSending}>
                  {emailSending ? "Sending..." : "Save Appointment"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Calendar;
