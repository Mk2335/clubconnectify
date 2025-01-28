import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, MessageCircle, Bot, Phone, Calendar, Check, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const Community = () => {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const handleSupportEmail = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request sent",
      description: "We'll get back to you shortly at " + email,
    });
    setEmail("");
  };

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      toast({
        title: "Question submitted",
        description: "Your question has been submitted for the live call.",
      });
      setQuestion("");
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">Community</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Support Email Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Support Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSupportEmail} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Request Support
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Live Call Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Live Call
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Submit your question for the live call</Label>
                    <Textarea
                      id="question"
                      placeholder="Type your question here..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <Button 
                      onClick={handleQuestionSubmit}
                      className="w-full"
                      disabled={!question.trim()}
                    >
                      Submit Question
                    </Button>
                  </div>
                  <Separator />
                  <Button className="w-full">
                    Join Live Call
                  </Button>
                </CardContent>
              </Card>

              {/* Live Call Recording Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Live Call Recording
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Access previous call recordings</p>
                    <Button variant="outline" className="w-full">
                      View Recordings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Chat Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Community Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Open Chat
                  </Button>
                </CardContent>
              </Card>

              {/* ChatBot Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    ChatBot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Start ChatBot
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Events Section */}
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-6">Events</h2>
              <div className="space-y-6">
                {/* GenoKongress 2025 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/lovable-uploads/75fe5408-5d26-48c2-b90f-12b0fbec5ea6.png"
                          alt="GenoKongress 2025"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold mb-2">GenoKongress 2025</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Rund um die Genossenschaft
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Eintritt zum Kongress</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Zugang zu den Vorträgen</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Zugang zur Pressewand</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Exklusive Goody Bag</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>VIP-Catering und Getränke beim Event</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Meet & Greet mit den Speakern</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>19. & 20. September</span>
                          </div>
                          <Button>
                            WEITER ZUR KASSE - 297,00€
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Asset Protection Conference 2025 */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src="/lovable-uploads/d918a55e-e252-4db6-80f8-ff93ea80af64.png"
                          alt="Asset Protection Conference 2025"
                          className="w-full rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="text-lg font-semibold mb-2">Asset Protection Conference 2025</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Expertenwissen zu Stiftungen und Genossenschaften
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Eintritt zum Event</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Zugang zu den Vorträgen</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>ASSET PROTECTION Workbook</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Teilnahme bei der Q&A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Erstklassige Verpflegung</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>Möglichkeit zur Terminbuchung eines persönlichen Strategiegespräches auf dem Event für 60 Minuten</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            <span>9. & 10. September</span>
                          </div>
                          <Button>
                            FÜR 0,00 ERHALTEN
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Community;