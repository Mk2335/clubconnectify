import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ComplianceQuestionsProps {
  form: UseFormReturn<any>;
}

export const ComplianceQuestions = ({ form }: ComplianceQuestionsProps) => {
  return (
    <div className="space-y-6">
      {/* Insurance Questions */}
      <div className="space-y-4">
        <h4 className="font-medium">Insurance Coverage</h4>
        <FormField
          control={form.control}
          name="operationsLiabilityInsurance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Besteht eine Betriebshaftlichtversicherung?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="operationsLiabilityInsurance-yes" />
                    <label htmlFor="operationsLiabilityInsurance-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="operationsLiabilityInsurance-no" />
                    <label htmlFor="operationsLiabilityInsurance-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dAndOInsurance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Besteht eine D&O-Versicherung abgeschlossen?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="dAndOInsurance-yes" />
                    <label htmlFor="dAndOInsurance-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="dAndOInsurance-no" />
                    <label htmlFor="dAndOInsurance-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="propertyDamageInsurance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Besteht eine Vermögensschadenhaftlichtversicherung?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="propertyDamageInsurance-yes" />
                    <label htmlFor="propertyDamageInsurance-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="propertyDamageInsurance-no" />
                    <label htmlFor="propertyDamageInsurance-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditDefaultInsurance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Besteht eine Forderungsausfallversicherung?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="creditDefaultInsurance-yes" />
                    <label htmlFor="creditDefaultInsurance-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="creditDefaultInsurance-no" />
                    <label htmlFor="creditDefaultInsurance-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildingInsuranceCoverage"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Im Falle von Immobilien: Sind alle Gebäude ausreichend versichert?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="buildingInsuranceCoverage-yes" />
                    <label htmlFor="buildingInsuranceCoverage-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="buildingInsuranceCoverage-no" />
                    <label htmlFor="buildingInsuranceCoverage-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buildingElementaryInsurance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Im Falle von Immobilien: Sind alle Gebäude elementar versichert?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="buildingElementaryInsurance-yes" />
                    <label htmlFor="buildingElementaryInsurance-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="buildingElementaryInsurance-no" />
                    <label htmlFor="buildingElementaryInsurance-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* IT & DSGVO Questions */}
      <div className="space-y-4">
        <h4 className="font-medium">IT & Data Protection</h4>
        <FormField
          control={form.control}
          name="electronicDataProcessing"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Es wird eine elektronische Datenverarbeitung durchgeführt</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="electronicDataProcessing-yes" />
                    <label htmlFor="electronicDataProcessing-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="electronicDataProcessing-no" />
                    <label htmlFor="electronicDataProcessing-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itHardwareMonitoring"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Die IT-Hardware wird durch einen Dienstleister überwacht</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="itHardwareMonitoring-yes" />
                    <label htmlFor="itHardwareMonitoring-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="itHardwareMonitoring-no" />
                    <label htmlFor="itHardwareMonitoring-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cloudBasedSoftware"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Die IT-Software ist Cloudbasiert (Inhouse = Nein)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cloudBasedSoftware-yes" />
                    <label htmlFor="cloudBasedSoftware-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cloudBasedSoftware-no" />
                    <label htmlFor="cloudBasedSoftware-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dailyDataBackup"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Es erfolgt eine tägliche Datensicherung</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="dailyDataBackup-yes" />
                    <label htmlFor="dailyDataBackup-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="dailyDataBackup-no" />
                    <label htmlFor="dailyDataBackup-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataProtectionGuideline"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Die Genossenschaft hat eine Datenschutzrichtlinie</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="dataProtectionGuideline-yes" />
                    <label htmlFor="dataProtectionGuideline-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="dataProtectionGuideline-no" />
                    <label htmlFor="dataProtectionGuideline-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gdprCompliance"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Die DSGVO ist in allen Punkten bzgl. der Genossenschaft eingehalten</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="gdprCompliance-yes" />
                    <label htmlFor="gdprCompliance-yes">Ja</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="gdprCompliance-no" />
                    <label htmlFor="gdprCompliance-no">Nein</label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};