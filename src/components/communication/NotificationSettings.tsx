
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Bell, CalendarClock, CreditCard, Save, RefreshCcw } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const notificationSchema = z.object({
  membershipRenewals: z.boolean().default(true),
  upcomingPayments: z.boolean().default(true),
  events: z.boolean().default(true),
  newsletters: z.boolean().default(false),
  renewalAdvanceNotice: z.string().default("30"),
  paymentReminder: z.string().default("7"),
  eventReminder: z.string().default("3"),
});

type NotificationFormValues = z.infer<typeof notificationSchema>;

export function NotificationSettings() {
  const [isEditing, setIsEditing] = useState(false);
  
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      membershipRenewals: true,
      upcomingPayments: true,
      events: true,
      newsletters: false,
      renewalAdvanceNotice: "30",
      paymentReminder: "7",
      eventReminder: "3",
    },
  });
  
  function onSubmit(data: NotificationFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your automated notification settings have been saved.",
    });
    console.log("Notification settings:", data);
    setIsEditing(false);
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Automated Notifications</h2>
        </div>
        
        <Button 
          variant={isEditing ? "default" : "outline"} 
          size="sm" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Settings"}
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Notification Types</CardTitle>
              <CardDescription>
                Configure which types of automated notifications will be sent to members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="membershipRenewals"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center gap-2">
                        <RefreshCcw className="h-4 w-4" />
                        Membership Renewals
                      </FormLabel>
                      <FormDescription>
                        Notify members when their membership is due for renewal
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="upcomingPayments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment Reminders
                      </FormLabel>
                      <FormDescription>
                        Send reminders about upcoming or overdue payments
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="events"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base flex items-center gap-2">
                        <CalendarClock className="h-4 w-4" />
                        Event Notifications
                      </FormLabel>
                      <FormDescription>
                        Inform members about upcoming events and activities
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newsletters"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Newsletters</FormLabel>
                      <FormDescription>
                        Send regular newsletters and updates
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Timing</CardTitle>
              <CardDescription>
                Configure when notifications should be sent to members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="renewalAdvanceNotice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Renewal Notice</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!isEditing || !form.getValues("membershipRenewals")}
                      >
                        <FormControl>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Days" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                          <SelectItem value="60">60</SelectItem>
                          <SelectItem value="90">90</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>days before expiration</span>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="paymentReminder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Reminder</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!isEditing || !form.getValues("upcomingPayments")}
                      >
                        <FormControl>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Days" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                          <SelectItem value="30">30</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>days before due date</span>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eventReminder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Reminder</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={!isEditing || !form.getValues("events")}
                      >
                        <FormControl>
                          <SelectTrigger className="w-24">
                            <SelectValue placeholder="Days" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="14">14</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>days before event</span>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="justify-end">
              {isEditing && (
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
