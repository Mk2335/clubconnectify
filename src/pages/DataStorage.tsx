import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Upload, File } from "lucide-react";

const DataStorage = () => {
  const storedFiles = [
    { name: "[110] - Satzung - Musterfirma eG", type: "PDF", size: "1.2 MB", date: "2022-06-15" },
    { name: "[120] - Gewerbeanmeldung - Musterfirma eG", type: "PDF", size: "0.8 MB", date: "2022-06-15" },
    { name: "[130] - Registerauszug - Musterfirma eG", type: "PDF", size: "1.5 MB", date: "2022-06-15" },
    { name: "[210] - Jahresabschluss 2020 - Musterfirma eG", type: "PDF", size: "2.4 MB", date: "2021-03-30" },
    { name: "[210] - Jahresabschluss 2021 - Musterfirma eG", type: "PDF", size: "2.6 MB", date: "2022-03-30" },
    { name: "[220] - SuSA 2020 - Musterfirma eG", type: "PDF", size: "1.8 MB", date: "2021-04-15" },
    { name: "[220] - SuSA 2021 - Musterfirma eG", type: "PDF", size: "1.9 MB", date: "2022-04-15" },
    { name: "[230] - Sachkonten 2020 - Musterfirma eG", type: "XLS", size: "3.2 MB", date: "2021-01-15" },
    { name: "[230] - Sachkonten 2021 - Musterfirma eG", type: "XLS", size: "3.4 MB", date: "2022-01-15" },
    { name: "[240] - Steuerbescheid 2020 - Musterfirma eG", type: "PDF", size: "1.1 MB", date: "2021-05-20" },
    { name: "[240] - Steuerbescheid 2021 - Musterfirma eG", type: "PDF", size: "1.2 MB", date: "2022-05-20" },
    { name: "[250] - Offenlegung der Jahresabschlüsse - Musterfirma eG", type: "PDF", size: "4.5 MB", date: "2022-06-30" },
    { name: "[260] - BWA 06.2022 - Musterfirma", type: "XLS", size: "2.1 MB", date: "2022-07-15" },
    { name: "[310] - Aktuelle Mitgliederliste 06.2022 - Musterfirma", type: "XLS", size: "1.7 MB", date: "2022-06-30" },
    { name: "[320] - Mitgliederliste 12.2020 - Musterfirma eG", type: "XLS", size: "1.5 MB", date: "2020-12-31" },
    { name: "[320] - Mitgliederliste 12.2021 - Musterfirma eG", type: "XLS", size: "1.6 MB", date: "2021-12-31" },
    { name: "[410] - AGO - Musterfirma eG", type: "PDF", size: "0.9 MB", date: "2022-01-01" },
    { name: "[411] - GO Vorstand - Musterfirma eG", type: "PDF", size: "0.7 MB", date: "2022-01-01" },
    { name: "[412] - GO Aufsichtsrat - Musterfirma eG", type: "PDF", size: "0.8 MB", date: "2022-01-01" },
    { name: "[420] - Protokolle Vorstandssitzungen - Musterfirma eG", type: "PDF", size: "2.8 MB", date: "2022-08-01" },
    { name: "[421] - Protokolle Aufsichtsratssitzungen - Musterfirma eG", type: "PDF", size: "2.5 MB", date: "2022-08-01" },
    { name: "[422] - Protokolle Vorstand & Aufsichtsrat - Musterfirma eG", type: "PDF", size: "3.1 MB", date: "2022-08-01" },
    { name: "[430] - Protokoll 4.GV 13.03.2021 mit Anlagen - Musterfirma eG", type: "PDF", size: "4.2 MB", date: "2021-03-13" },
    { name: "[430] - Protokoll 5.GV 28.10.2021 mit Anlagen - Musterfirma eG", type: "PDF", size: "4.4 MB", date: "2021-10-28" },
    { name: "[430] - Protokoll 6.GV 07.08.2022 mit Anlagen - Musterfirma eG", type: "PDF", size: "4.6 MB", date: "2022-08-07" }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Data Storage</h1>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Input type="file" className="flex-1" />
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stored Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Uploaded</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {storedFiles.map((file, index) => (
                        <TableRow key={index}>
                          <TableCell className="flex items-center gap-2">
                            {file.type === "PDF" ? <FileText className="w-4 h-4" /> : <File className="w-4 h-4" />}
                            {file.name}
                          </TableCell>
                          <TableCell>{file.type}</TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Download</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DataStorage;