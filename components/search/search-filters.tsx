// components/search/search-filters.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface SearchFiltersProps {
  industries: string[];
  locations: string[]; // <- renamed
  selectedIndustries: string[];
  setSelectedIndustries: (v: string[]) => void;
  selectedLocations: string[]; // <- renamed
  setSelectedLocations: (v: string[]) => void;
  companySize: [number, number];
  setCompanySize: (v: [number, number]) => void;
}

export default function SearchFilters({
  industries,
  locations,
  selectedIndustries,
  setSelectedIndustries,
  selectedLocations,
  setSelectedLocations,
  companySize,
  setCompanySize,
}: SearchFiltersProps) {
  // Checkbox togglers
  function handleIndustryChange(industry: string, checked: boolean) {
    if (checked) {
      setSelectedIndustries([...selectedIndustries, industry]);
    } else {
      setSelectedIndustries(selectedIndustries.filter((item: string) => item !== industry));
    }
  }

  function handleLocationChange(location: string, checked: boolean) {
    if (checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(selectedLocations.filter((item: string) => item !== location));
    }
  }

  return (
    <div className="space-y-6">
      {/* Industry filter */}
      <div>
        <div className="font-semibold mb-2">Industry</div>
        <div className="space-y-1">
          {industries.map((industry) => (
            <label key={industry} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedIndustries.includes(industry)}
                onCheckedChange={(checked: boolean) =>
                  handleIndustryChange(industry, checked)
                }
              />
              <span>{industry}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location filter */}
      <div>
        <div className="font-semibold mb-2">Location</div>
        <div className="space-y-1">
          {locations.map((location) => (
            <label key={location} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked: boolean) =>
                  handleLocationChange(location, checked)
                }
              />
              <span>{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Company size filter */}
      <div>
        <div className="font-semibold mb-2">Company Size (employees)</div>
        <Slider
          min={10}
          max={1000}
          step={10}
          value={companySize}
          onValueChange={setCompanySize}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{companySize[0]}</span>
          <span>{companySize[1]}</span>
        </div>
      </div>
    </div>
  );
}
