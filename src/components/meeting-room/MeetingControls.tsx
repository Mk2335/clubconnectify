import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const MeetingControls = ({
  simulcastEnabled,
  setSimulcastEnabled
}: {
  simulcastEnabled: boolean;
  setSimulcastEnabled: (value: boolean) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch 
            id="simulcast" 
            checked={simulcastEnabled}
            onCheckedChange={setSimulcastEnabled}
          />
          <label htmlFor="simulcast" className="text-sm text-muted-foreground">
            Enable simulcast
          </label>
        </div>

        <p className="text-sm text-muted-foreground">
          Enabling simulcast can improve the videoconference for participants with low bandwidth, but greatly reduces video quality.
        </p>

        <div className="flex space-x-4">
          <Button>Enter meeting room</Button>
          <Button variant="outline">Enter meeting room (new window)</Button>
        </div>
      </CardContent>
    </Card>
  );
};