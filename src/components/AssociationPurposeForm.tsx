import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

const ASSOCIATION_PURPOSES = [
  "The promotion the fight against poverty (e.g. in youth and elderly care)",
  "The promotion of education in relation to sexuality, diseases, addiction, violence or abuse, which is significantly based on evaluated, generally recognized scientific findings",
  "The promotion of equality, tolerance and aid against discrimination and development cooperation",
  "The promotion of crime prevention and care for prisoners and former prisoners",
  "The promotion of fire, labour, disaster and civil protection as well as accident prevention and rescue from life-threatening situations",
  "The promotion of aid to those politically, racially or religiously persecuted, refugees, displaced persons, emigrants, victims of war, survivors of war, war victims and prisoners of war, civilians and the disabled, and assistance to victims of crime",
  "The promotion of nature conservation, environmental protection, coastal protection and flood protection, as well as animal welfare",
  "The prevention and control of communicable diseases, diseases or other generally scientifically recognized threats to public health",
  "The promotion of care for mentally or physically ill people"
];

const AssociationPurposeForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Purpose of the Association
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-muted-foreground">
          <p>Below are all the association purposes supported.</p>
          <p className="mt-2">Please select all the purposes of the association which correspond to your association purpose according to the statutes.</p>
          <p className="mt-2">There should be an exact match of your association's purpose according to the statutes and exemption notice with the association's purposes we support.</p>
        </div>

        <div className="space-y-4">
          {ASSOCIATION_PURPOSES.map((purpose, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Checkbox id={`purpose-${index}`} />
              <label
                htmlFor={`purpose-${index}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {purpose}
              </label>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="exact-purpose" className="text-sm font-medium">
            Please enter here the exact wording of your association's purpose from your association statutes
          </label>
          <Textarea
            id="exact-purpose"
            placeholder="Enter the exact wording of your association's purpose..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssociationPurposeForm;