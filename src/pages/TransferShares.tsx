import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface TransferFormData {
  firstName: string;
  lastName: string;
  street: string;
  additionalAddress: string;
  zipCode: string;
  city: string;
  email: string;
  emailConfirm: string;
  taxId: string;
  memberId: string;
  transferType: "partial" | "full";
  sharesAmount?: number;
  recipientFirstName: string;
  recipientLastName: string;
  recipientMemberId: string;
  recipientEmail: string;
  recipientEmailConfirm: string;
}

const TransferShares = () => {
  const { toast } = useToast();
  const { register, handleSubmit, watch } = useForm<TransferFormData>({
    defaultValues: {
      transferType: "partial",
    },
  });

  const onSubmit = (data: TransferFormData) => {
    console.log(data);
    toast({
      title: "Share Transfer Request Submitted",
      description: "Your request has been submitted and is pending approval.",
    });
  };

  const transferType = watch("transferType");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Transfer of Shares</h1>
                <h2 className="text-lg font-semibold mt-6 mb-4">Personal Information</h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" {...register("firstName")} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" {...register("lastName")} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="street">Street and House Number</Label>
                  <Input id="street" {...register("street")} />
                </div>

                <div>
                  <Label htmlFor="additionalAddress">Additional Address Information</Label>
                  <Input id="additionalAddress" {...register("additionalAddress")} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" {...register("zipCode")} />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register("city")} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} />
                </div>

                <div>
                  <Label htmlFor="emailConfirm">Confirm Email Address</Label>
                  <Input id="emailConfirm" type="email" {...register("emailConfirm")} />
                </div>

                <div>
                  <Label htmlFor="taxId">Tax ID (if available)</Label>
                  <Input id="taxId" {...register("taxId")} />
                </div>

                <div>
                  <Label htmlFor="memberId">Member Number</Label>
                  <Input id="memberId" {...register("memberId")} />
                </div>

                <div className="space-y-4">
                  <Label>Transfer Type</Label>
                  <RadioGroup defaultValue="partial">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="partial" 
                        id="partial" 
                        {...register("transferType")}
                      />
                      <Label htmlFor="partial">
                        I want to transfer a specific number of shares
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value="full" 
                        id="full" 
                        {...register("transferType")}
                      />
                      <Label htmlFor="full">
                        I want to transfer all my shares and terminate my membership
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {transferType === "partial" && (
                  <div>
                    <Label htmlFor="sharesAmount">Number of Shares to Transfer</Label>
                    <Input 
                      id="sharesAmount" 
                      type="number" 
                      min="1" 
                      className="w-32"
                      {...register("sharesAmount", { valueAsNumber: true })}
                    />
                  </div>
                )}

                <h2 className="text-lg font-semibold mt-8">Recipient Information</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="recipientFirstName">First Name</Label>
                    <Input id="recipientFirstName" {...register("recipientFirstName")} />
                  </div>
                  <div>
                    <Label htmlFor="recipientLastName">Last Name</Label>
                    <Input id="recipientLastName" {...register("recipientLastName")} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="recipientMemberId">Member Number</Label>
                  <Input id="recipientMemberId" {...register("recipientMemberId")} />
                </div>

                <div>
                  <Label htmlFor="recipientEmail">Email Address</Label>
                  <Input 
                    id="recipientEmail" 
                    type="email" 
                    {...register("recipientEmail")} 
                  />
                </div>

                <div>
                  <Label htmlFor="recipientEmailConfirm">Confirm Email Address</Label>
                  <Input 
                    id="recipientEmailConfirm" 
                    type="email" 
                    {...register("recipientEmailConfirm")} 
                  />
                </div>

                <div className="text-sm text-muted-foreground mt-4">
                  The transfer will only be completed after confirmation by the recipient 
                  and approval by the cooperative.
                </div>

                <Button type="submit" className="w-full">
                  Submit Transfer Request
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default TransferShares;