"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { X, Building2, Globe, Users, Briefcase, MapPin } from "lucide-react";

const industries = [
  "Software & IT",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Education",
  "Construction",
  "Transportation",
  "Hospitality",
  "Professional Services",
  "Media & Entertainment",
  "Energy & Utilities",
];

const regions = [
  "North America",
  "Europe",
  "Asia Pacific",
  "Latin America",
  "Middle East & Africa",
];

export default function SearchFilters() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState<[number]>([500]);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev =>
      prev.includes(region)
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const handleCompanySizeChange = (value: number[]) => {
    setCompanySize([value[0]]);
  };

  const formatCompanySize = (size: number) => {
    return size >= 1000 ? `${size / 1000}k+` : `${size}+`;
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
    setSelectedRegions([]);
    setCompanySize([500]);
  };

  return (
    <div className="space-y-6">
      {/* Selected filters */}
      {(selectedIndustries.length > 0 || selectedRegions.length > 0) && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Selected Filters</span>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2">
              Clear all
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedIndustries.map((industry) => (
              <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                {industry}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                />
              </Badge>
            ))}
            {selectedRegions.map((region) => (
              <Badge key={region} variant="secondary" className="flex items-center gap-1">
                {region}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleRegion(region)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Accordion type="multiple" defaultValue={["industry", "region", "size"]}>
        <AccordionItem value="industry">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Industry
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={`industry-${industry}`}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={() => toggleIndustry(industry)}
                  />
                  <Label
                    htmlFor={`industry-${industry}`}
                    className="text-sm cursor-pointer"
                  >
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="region">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              Region
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {regions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={`region-${region}`}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={() => toggleRegion(region)}
                  />
                  <Label
                    htmlFor={`region-${region}`}
                    className="text-sm cursor-pointer"
                  >
                    {region}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Company Size
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                defaultValue={[500]}
                max={5000}
                min={10}
                step={10}
                value={[companySize[0]]}
                onValueChange={handleCompanySizeChange}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm">{formatCompanySize(companySize[0])} employees</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger className="text-sm font-medium">
            <span className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Specific Location
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              <Input placeholder="City, state, or country..." />
              <p className="text-xs text-muted-foreground">
                Enter a specific location to narrow results
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-4">Apply Filters</Button>
    </div>
  );
}