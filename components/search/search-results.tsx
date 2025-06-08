"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Users
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle
} from "@/components/ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface Person {
  id: number;
  name: string;
  title: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface Company {
  id: number;
  name: string;
  website: string;
  industry: string;
  location: string;
  size: string;
  contacts: number;
  verificationScore?: number;
  people: Person[];
}

interface SearchResultsProps {
  results: Company[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-600";
    if (score >= 75) return "bg-yellow-600";
    return "bg-red-600";
  };

  const openCompanyDetails = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div>
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[240px]">Company</TableHead>
      <TableHead className="w-[160px] hidden md:table-cell">Industry</TableHead>
      <TableHead className="w-[160px] hidden md:table-cell">Location</TableHead>
      <TableHead className="w-[100px] hidden lg:table-cell">Size</TableHead>
      <TableHead className="w-[110px] text-center">Contacts</TableHead>
      <TableHead className="w-[100px] text-center">Score</TableHead>
      <TableHead className="w-[60px]"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {results.map((company) => (
      <>
        <TableRow key={company.id} className="cursor-pointer hover:bg-muted/50">
          <TableCell className="font-medium w-[240px]" onClick={() => openCompanyDetails(company)}>
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3 bg-primary/10">
                <AvatarFallback className="text-primary">
                  {company.name ? company.name.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div>{company.name || "—"}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  {company.website || "—"}
                  {company.website && (
                    <a
                      href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </TableCell>
          <TableCell className="hidden md:table-cell w-[160px]">{company.industry || "—"}</TableCell>
          <TableCell className="hidden md:table-cell w-[160px]">{company.location || "—"}</TableCell>
          <TableCell className="hidden lg:table-cell w-[100px]">{company.size || "—"}</TableCell>
          <TableCell className="text-center w-[110px]">{company.contacts ?? 0}</TableCell>
          <TableCell className="w-[100px]">
            <div className="flex justify-center items-center">
              <div className={`font-medium`}>
                {/* You can add score logic here if you want */}
                {company.verificationScore !== undefined
                  ? `${company.verificationScore}%`
                  : "—"}
              </div>
            </div>
          </TableCell>
          <TableCell className="w-[60px]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleRow(company.id)}
              className="h-8 w-8 p-0"
              tabIndex={-1}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  expandedRow === company.id ? "rotate-180" : ""
                }`}
              />
            </Button>
          </TableCell>
        </TableRow>
        {expandedRow === company.id && (
        <TableRow key={`${company.id}-expanded`}>
  <TableCell colSpan={7} className="p-0 border-t-0">
    <div className="bg-muted/30 p-4">
      <h3 className="font-medium mb-3">Top Contacts</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {company.people.length === 0 ? (
          <div className="text-muted-foreground col-span-full">No contacts found for this company.</div>
        ) : (
          company.people.map((contact) => (
            <div
              key={contact.id}
              className="bg-background rounded-lg border p-3 flex flex-col gap-2"
            >
              <div className="font-medium">{contact.name}</div>
              <div className="text-sm text-muted-foreground">{contact.title}</div>
              <div className="text-sm flex items-center gap-1 mt-1">
                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                {contact.email}
                {/* Add a check for verified if you want */}
                {/* {contact.emailVerified ? ( ... ) : ( ... )} */}
              </div>
              <div className="text-sm flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                {contact.phone}
              </div>
              {contact.linkedin_url && (
                <a
                  href={contact.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 mt-1"
                >
                  LinkedIn
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </TableCell>
</TableRow>

        )}
      </>
    ))}
  </TableBody>
</Table>



      {/* Company details drawer */}
      <Drawer open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2">
              {selectedCompany?.name}
              <Badge variant="outline" className="ml-2">
                {selectedCompany?.industry}
              </Badge>
            </DrawerTitle>
            <DrawerDescription>
              <a
                href={selectedCompany?.website
                  ? selectedCompany.website.startsWith("http")
                    ? selectedCompany.website
                    : `https://${selectedCompany.website}`
                  : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline"
              >
                {selectedCompany?.website}
                {selectedCompany?.website && <ExternalLink className="ml-1 h-3 w-3" />}
              </a>
            </DrawerDescription>
          </DrawerHeader>

          {selectedCompany && (
            <div className="px-4 pb-8">
              <Tabs defaultValue="overview">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="overview" className="flex-1">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="contacts" className="flex-1">
                    Contacts
                  </TabsTrigger>
                  <TabsTrigger value="verification" className="flex-1">
                    Verification
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                  {/* ...unchanged... */}
                  {/* Keep your overview content as is */}
                </TabsContent>

                <TabsContent value="contacts" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">All Contacts ({selectedCompany.people?.length || 0})</h3>
                      <Button size="sm">Export Contacts</Button>
                    </div>
                    <div className="space-y-3">
                      {selectedCompany.people && selectedCompany.people.length > 0 ? (
                        selectedCompany.people.map((contact) => (
                          <div key={contact.id} className="bg-muted rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <div>
                                <div className="font-medium">{contact.name}</div>
                                <div className="text-sm text-muted-foreground">{contact.title}</div>
                              </div>
                              <Badge
                                variant={
                                  contact.emailVerified && contact.phoneVerified
                                    ? "default"
                                    : "outline"
                                }
                                className={
                                  contact.emailVerified && contact.phoneVerified
                                    ? "bg-green-500"
                                    : ""
                                }
                              >
                                {contact.emailVerified && contact.phoneVerified
                                  ? "Fully Verified"
                                  : "Partially Verified"}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <div className="text-sm flex items-center gap-1">
                                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                {contact.email}
                                {contact.emailVerified ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 ml-1" />
                                ) : (
                                  <AlertCircle className="h-3.5 w-3.5 text-yellow-500 ml-1" />
                                )}
                              </div>
                              <div className="text-sm flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                {contact.phone}
                                {contact.phoneVerified ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 ml-1" />
                                ) : (
                                  <AlertCircle className="h-3.5 w-3.5 text-yellow-500 ml-1" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted-foreground">No contacts found for this company.</div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="mt-0">
                  {/* ...unchanged... */}
                  {/* Keep your verification content as is */}
                </TabsContent>
              </Tabs>
              <div className="flex justify-between mt-8">
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
                <Button>Add to List</Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
