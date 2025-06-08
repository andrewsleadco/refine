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

interface Company {
  id: number;
  name: string;
  website: string;
  industry: string;
  location: string;
  size: string;
  contacts: number;
  verificationScore?: number;
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

  // Mock contacts for the expanded view
  const mockContacts = [
    {
      name: "John Smith",
      title: "CEO",
      email: "john.smith@acmetech.com",
      phone: "+1 (555) 123-4567",
      emailVerified: true,
      phoneVerified: true
    },
    {
      name: "Sarah Johnson",
      title: "CTO",
      email: "sarah.j@acmetech.com",
      phone: "+1 (555) 987-6543",
      emailVerified: true,
      phoneVerified: false
    },
    {
      name: "Michael Chen",
      title: "VP of Sales",
      email: "m.chen@acmetech.com",
      phone: "+1 (555) 456-7890",
      emailVerified: true,
      phoneVerified: true
    }
  ];

  const openCompanyDetails = (company: Company) => {
    setSelectedCompany(company);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead className="hidden md:table-cell">Industry</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden lg:table-cell">Size</TableHead>
            <TableHead className="text-center">Contacts</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((company) => (
            <>
              <TableRow key={company.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium" onClick={() => openCompanyDetails(company)}>
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
                <TableCell className="hidden md:table-cell">{company.industry || "—"}</TableCell>
                <TableCell className="hidden md:table-cell">{company.location || "—"}</TableCell>
                <TableCell className="hidden lg:table-cell">{company.size || "—"}</TableCell>
                <TableCell className="text-center">{company.contacts ?? 0}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center">
                    <div className={`font-medium ${getScoreColor(company.verificationScore ?? 0)}`}>
                      {company.verificationScore !== undefined ? `${company.verificationScore}%` : "—"}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
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
                        {mockContacts.map((contact, i) => (
                          <div
                            key={i}
                            className="bg-background rounded-lg border p-3 flex flex-col gap-2"
                          >
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.title}</div>
                            <div className="text-sm flex items-center gap-1 mt-1">
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
                        ))}
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button size="sm" onClick={() => openCompanyDetails(company)}>
                          View Full Details
                        </Button>
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
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">Company Size</div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          {selectedCompany.size} employees
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="text-sm text-muted-foreground mb-1">Location</div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {selectedCompany.location}
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Verification Score
                      </div>
                      <div className="flex items-center mb-2">
                        <div
                          className={`text-lg font-medium ${getScoreColor(selectedCompany.verificationScore ?? 0)}`}
                        >
                          {selectedCompany.verificationScore !== undefined
                            ? `${selectedCompany.verificationScore}%`
                            : "—"}
                        </div>
                      </div>
                      <Progress
                        value={selectedCompany.verificationScore ?? 0}
                        className="h-2"
                        indicatorClassName={getScoreBg(selectedCompany.verificationScore ?? 0)}
                      />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-3">Company Information</h3>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Founded</dt>
                          <dd>2010</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Revenue</dt>
                          <dd>$25M - $50M</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Tech Stack</dt>
                          <dd>AWS, React, Node.js</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Last Updated</dt>
                          <dd>May 15, 2025</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contacts" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">All Contacts ({selectedCompany.contacts})</h3>
                      <Button size="sm">Export Contacts</Button>
                    </div>
                    <div className="space-y-3">
                      {mockContacts.concat(mockContacts).map((contact, i) => (
                        <div key={i} className="bg-muted rounded-lg p-4">
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
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="verification" className="mt-0">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-3">Verification Details</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Email Verification</div>
                            <div className="text-green-500 text-sm font-medium">98%</div>
                          </div>
                          <Progress value={98} className="h-2" indicatorClassName="bg-green-500" />
                          <div className="text-xs text-muted-foreground mt-1">
                            12 of 12 email addresses verified
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Phone Verification</div>
                            <div className="text-yellow-500 text-sm font-medium">85%</div>
                          </div>
                          <Progress value={85} className="h-2" indicatorClassName="bg-yellow-500" />
                          <div className="text-xs text-muted-foreground mt-1">
                            10 of 12 phone numbers verified
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Address Verification</div>
                            <div className="text-green-500 text-sm font-medium">100%</div>
                          </div>
                          <Progress value={100} className="h-2" indicatorClassName="bg-green-500" />
                          <div className="text-xs text-muted-foreground mt-1">
                            Corporate address fully verified and standardized
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <div className="text-sm font-medium">Data Freshness</div>
                            <div className="text-green-500 text-sm font-medium">95%</div>
                          </div>
                          <Progress value={95} className="h-2" indicatorClassName="bg-green-500" />
                          <div className="text-xs text-muted-foreground mt-1">
                            Last verified on May 15, 2025
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-medium mb-3">Enrichment Sources</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Company Website</span>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">LinkedIn Data</span>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Financial Records</span>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Press Releases</span>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Technology Stack</span>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </li>
                      </ul>
                    </div>
                  </div>
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
