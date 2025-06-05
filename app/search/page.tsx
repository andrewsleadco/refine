"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Download, 
  SlidersHorizontal, 
  Filter, 
  ArrowUpDown, 
  Check,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SearchFilters from "@/components/search/search-filters";
import SearchResults from "@/components/search/search-results";
import { supabase } from "@/lib/supabaseClient";

// List these at the top so you can easily pass them to SearchFilters
const ALL_INDUSTRIES = [
  "Software & IT",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Transportation",
  "Retail",
  "Education",
  "Construction",
  "Hospitality",
  "Professional Services",
  "Media & Entertainment",
  "Energy & Utilities",
];

const ALL_REGIONS = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState<[number, number]>([10, 1000]);
  const [activeTab, setActiveTab] = useState("results");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Main effect to pull results from Supabase
  useEffect(() => {
    async function fetchResults() {
      setLoading(true);

      let query = supabase
        .from("companies")
        .select(
          `id, name, website, industry, location, size, verification_score, people!companies_id_fkey(count)`
        );

      // Filters!
      if (searchTerm.trim()) {
        query = query.ilike("name", `%${searchTerm.trim()}%`);
      }
      if (selectedIndustries.length > 0) {
        query = query.in("industry", selectedIndustries);
      }
      if (selectedRegions.length > 0) {
        query = query.in("region", selectedRegions);
      }
      if (companySize) {
        // Assume size is a string like "50-100" unless you store as number min/max
        // Adjust as needed
      }

      const { data, error } = await query;
      setLoading(false);
      if (error) {
        setResults([]);
        return;
      }
      setResults(data ?? []);
    }
    fetchResults();
  }, [searchTerm, selectedIndustries, selectedRegions, companySize]);

  // For region/industry filters, make sure to pass state/setters down to SearchFilters.
  // You might need to update your SearchFilters to accept and use these.
  // (If SearchFilters is still self-contained, move all state up here and pass as props!)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Triggers useEffect via searchTerm state update
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-8 md:px-6">
          <h1 className="text-3xl font-bold mb-2">Search & Verify</h1>
          <p className="text-muted-foreground mb-6">
            Find, verify, and enrich B2B leads that match your exact criteria
          </p>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by company name, domain, industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - hidden on mobile */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-background rounded-lg border p-4">
              <h2 className="font-semibold mb-4 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </h2>
              
              <SearchFilters
                industries={ALL_INDUSTRIES}
                regions={ALL_REGIONS}
                selectedIndustries={selectedIndustries}
                setSelectedIndustries={setSelectedIndustries}
                selectedRegions={selectedRegions}
                setSelectedRegions={setSelectedRegions}
                companySize={companySize}
                setCompanySize={setCompanySize}
              />
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {/* Mobile filters */}
            <div className="md:hidden mb-4 flex gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Search Filters</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <SearchFilters
                      industries={ALL_INDUSTRIES}
                      regions={ALL_REGIONS}
                      selectedIndustries={selectedIndustries}
                      setSelectedIndustries={setSelectedIndustries}
                      selectedRegions={selectedRegions}
                      setSelectedRegions={setSelectedRegions}
                      companySize={companySize}
                      setCompanySize={setCompanySize}
                    />
                  </div>
                  <DrawerFooter>
                    <Button onClick={() => {}}>Apply Filters</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by: Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="company-asc">Company (A-Z)</SelectItem>
                  <SelectItem value="company-desc">Company (Z-A)</SelectItem>
                  <SelectItem value="verification">Verification Score</SelectItem>
                  <SelectItem value="size">Company Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Results & Tools bar */}
            <div className="bg-background rounded-lg border mb-4">
              <div className="p-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{results.length}</span> results
                </div>
                
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="hidden md:flex">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sort by: Relevance
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-48">
                      <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="justify-start w-full">
                          <Check className="mr-2 h-4 w-4" />
                          Relevance
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start w-full">
                          Company (A-Z)
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start w-full">
                          Company (Z-A)
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start w-full">
                          Verification Score
                        </Button>
                        <Button variant="ghost" size="sm" className="justify-start w-full">
                          Company Size
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Results tabs and content */}
            <div className="bg-background rounded-lg border overflow-hidden">
              <Tabs defaultValue="results" value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b">
                  <TabsList className="p-0 h-auto bg-transparent">
                    <TabsTrigger 
                      value="results" 
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                    >
                      Results
                    </TabsTrigger>
                    <TabsTrigger 
                      value="saved" 
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3"
                    >
                      Saved Lists
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="results" className="p-0 m-0">
                  {loading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading...</div>
                  ) : (
                    <SearchResults results={results} />
                  )}
                </TabsContent>
                
                <TabsContent value="saved" className="p-0 m-0">
                  <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                      <Filter className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No saved lists yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Save your search results to create custom lead lists
                    </p>
                    <Button variant="outline">Learn how to save lists</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
