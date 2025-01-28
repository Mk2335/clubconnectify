import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function AssemblyForm() {
  const [notifyAssociation, setNotifyAssociation] = useState(false);
  const [notifyMe, setNotifyMe] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Initial Meeting 2024</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Initial Meeting 2024" />
              </div>

              <div>
                <Label htmlFor="date">Date (Start)</Label>
                <Input id="date" type="date" defaultValue="2024-01-12" />
              </div>

              <div>
                <Label htmlFor="time">Time (Start)</Label>
                <Input id="time" type="time" defaultValue="17:00" />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Association Office" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="moderator">Meeting Moderator</Label>
                <Input id="moderator" defaultValue="Tina Musterffrau" />
              </div>

              <div>
                <Label htmlFor="protocol">Protocol Writer</Label>
                <Input id="protocol" defaultValue="Max Mustermann" />
              </div>

              <div>
                <Label>Calendar</Label>
                <Select defaultValue="board">
                  <SelectTrigger>
                    <SelectValue placeholder="Select calendar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board">Board Meetings</SelectItem>
                    <SelectItem value="general">General Meetings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Meeting Protocol</Label>
              <Card className="mt-2">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label>Agenda Item Parent</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="-- No parent agenda item --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No parent agenda item</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="title">Title of Agenda Item</Label>
                    <Input id="title" />
                  </div>

                  <div>
                    <Label htmlFor="description">Description and Proposer</Label>
                    <Textarea id="description" className="min-h-[100px]" />
                  </div>

                  <Button className="w-full">Add Entry</Button>
                </CardContent>
              </Card>
            </div>

            <div>
              <Label>Draft Resolutions</Label>
              <Card className="mt-2">
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <Label htmlFor="resolution-title">Title of Resolution</Label>
                    <Input id="resolution-title" />
                  </div>

                  <div>
                    <Label htmlFor="resolution-text">Resolution Text</Label>
                    <Textarea 
                      id="resolution-text" 
                      className="min-h-[100px]"
                      placeholder="Enter the full text of the resolution..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="resolution-proposer">Proposer</Label>
                    <Input id="resolution-proposer" />
                  </div>

                  <Button className="w-full">Add Resolution</Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notify-association">
                  Send a notification to the association's email address for new registrations
                </Label>
                <Switch
                  id="notify-association"
                  checked={notifyAssociation}
                  onCheckedChange={setNotifyAssociation}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notify-me">
                  Send me an email notification for new registrations
                </Label>
                <Switch
                  id="notify-me"
                  checked={notifyMe}
                  onCheckedChange={setNotifyMe}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
