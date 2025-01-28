import { Card } from "@/components/ui/card";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface BodiesAndRulesSectionProps {
  form: UseFormReturn<any>;
}

export const BodiesAndRulesSection = ({ form }: BodiesAndRulesSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">IV. Bodies, rules of procedure and AGM</h2>
      
      <div className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">1. Bodies of the cooperative</h3>
          
          <FormField
            control={form.control}
            name="noSupervisoryBoard"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>The cooperative has not formed a Supervisory Board.</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="supervisory-yes" />
                      <Label htmlFor="supervisory-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="supervisory-no" />
                      <Label htmlFor="supervisory-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorizedRepresentativeMember"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>If the General Meeting has elected an authorised representative, this representative is a member of the Cooperative.</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="representative-yes" />
                      <Label htmlFor="representative-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="representative-no" />
                      <Label htmlFor="representative-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bodiesUnchanged"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div>
                  <Label>The bodies of the cooperative as listed below have not changed since the last audit or foundation.</Label>
                  <p className="text-sm text-muted-foreground mt-1">Note: In the event of changes, the separate form "Overview of organs" must be completed and attached to this declaration.</p>
                </div>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="bodies-yes" />
                      <Label htmlFor="bodies-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="bodies-no" />
                      <Label htmlFor="bodies-no">No, separate form "Overview of organs"</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-6">
            <div>
              <h4 className="text-base font-medium mb-4">Management Board</h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="managementBoard.chairman"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Chairman</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managementBoard.deputyChairman"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Deputy Chairman</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="managementBoard.member"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Member of the Executive Board</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium mb-4">Authorised representative of the General Meeting <span className="text-sm font-normal text-muted-foreground">(only fill in if the cooperative has appointed a BV of the General Meeting)</span></h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="authorisedRepresentative.representative"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Authorised representative</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authorisedRepresentative.deputy"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Deputy</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div>
              <h4 className="text-base font-medium mb-4">Supervisory Board <span className="text-sm font-normal text-muted-foreground">(only fill in if the cooperative appointed a Supervisory Board)</span></h4>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="supervisoryBoard.chairman"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Chairman</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supervisoryBoard.deputyChairman"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Deputy Chairman</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {[1, 2, 3].map((index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`supervisoryBoard.member${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <Label>Member of the Supervisory Board</Label>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">2. General rules of procedure</h3>
          
          <FormField
            control={form.control}
            name="hasGeneralRules"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>Does the cooperative have general rules of procedure?</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="general-rules-yes" />
                      <Label htmlFor="general-rules-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="general-rules-no" />
                      <Label htmlFor="general-rules-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noGeneralRulesChanges"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>No changes were made to the General Rules of Procedure during the relevant audit period</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="general-rules-changes-yes" />
                      <Label htmlFor="general-rules-changes-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="general-rules-changes-no" />
                      <Label htmlFor="general-rules-changes-no">No, see protocols</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasManagementRules"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>Does the Management Board have rules of procedure?</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="management-rules-yes" />
                      <Label htmlFor="management-rules-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="management-rules-no" />
                      <Label htmlFor="management-rules-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noManagementRulesChanges"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>No changes were made to the rules of procedure for the Executive Board during the relevant audit period</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="management-rules-changes-yes" />
                      <Label htmlFor="management-rules-changes-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="management-rules-changes-no" />
                      <Label htmlFor="management-rules-changes-no">No, see protocols</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasSupervisoryRules"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>Does the Supervisory Board have rules of procedure?</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="supervisory-rules-yes" />
                      <Label htmlFor="supervisory-rules-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="supervisory-rules-no" />
                      <Label htmlFor="supervisory-rules-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noSupervisoryRulesChanges"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>No changes were made to the Supervisory Board's rules of procedure during the relevant audit period</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="supervisory-rules-changes-yes" />
                      <Label htmlFor="supervisory-rules-changes-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="supervisory-rules-changes-no" />
                      <Label htmlFor="supervisory-rules-changes-no">No, see protocols</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium">3. Minutes of meetings of the Executive Board and Supervisory Board</h3>
          
          <FormField
            control={form.control}
            name="noExecutiveBoardMeetings"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>No Executive Board meetings were held during the relevant audit period.</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="no-executive-meetings-yes" />
                      <Label htmlFor="no-executive-meetings-yes">Yes, the cooperative has only one Management Board</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-executive-meetings-no" />
                      <Label htmlFor="no-executive-meetings-no">No, see protocols</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noSupervisoryBoardMeetings"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <Label>No Supervisory Board meetings were held during the relevant audit period.</Label>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="no-supervisory-meetings-yes" />
                      <Label htmlFor="no-supervisory-meetings-yes">Yes, the cooperative has a BV d. GV</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no-supervisory-meetings-no" />
                      <Label htmlFor="no-supervisory-meetings-no">No, see protocols</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              No joint meetings of the Management Board and Supervisory Board were held during the relevant audit period.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Section 4</h3>
          <p className="text-muted-foreground">Ready for questions...</p>
        </div>
      </div>
    </Card>
  );
};
