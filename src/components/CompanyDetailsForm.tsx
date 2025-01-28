import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Phone, Receipt, CreditCard } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface CompanyDetailsFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
}

const CompanyDetailsForm = ({ form, onSubmit }: CompanyDetailsFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Unternehmensinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firmenname</FormLabel>
                  <FormControl>
                    <Input placeholder="Firmenname eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Straße & Hausnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Straßenadresse eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postleitzahl</FormLabel>
                  <FormControl>
                    <Input placeholder="Postleitzahl eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stadt</FormLabel>
                  <FormControl>
                    <Input placeholder="Stadt eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Kontaktinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefonnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefonnummer eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Mail-Adresse eingeben" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licenseEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail für Lizenzrechnungen</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Mail für Lizenzrechnungen eingeben" type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webseite</FormLabel>
                  <FormControl>
                    <Input placeholder="Webseite-URL eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Steuer- und Registrierungsinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steuernummer/USt-IdNr.</FormLabel>
                  <FormControl>
                    <Input placeholder="Steuernummer eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handelsregisternummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Handelsregisternummer eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steuernummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Steuernummer eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courtRegistry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registergericht</FormLabel>
                  <FormControl>
                    <Input placeholder="Registergericht eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Bankinformationen
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="iban"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IBAN</FormLabel>
                  <FormControl>
                    <Input placeholder="IBAN eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creditorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gläubiger-Identifikationsnummer</FormLabel>
                  <FormControl>
                    <Input placeholder="Gläubiger-ID eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>BIC</FormLabel>
                  <FormControl>
                    <Input placeholder="BIC eingeben" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="w-full md:w-auto">
            Änderungen speichern
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanyDetailsForm;