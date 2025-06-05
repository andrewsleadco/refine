// components/search/search-filters.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface SearchFiltersProps {
  industries: string[];
  regions: string[];
  selectedIndustries: string[];
  setSelectedIndustries: (v: string[]) => void;
  selectedRegions: string[];
  setSelectedRegions: (v: string[]) => void;
  companySize: [number, number];
  setCompanySize: (v: [number, number]) => void;
}

export default function SearchFilters({
  industries,
  regions,
  selectedIndustries,
  setSelectedIndustries,
  selectedRegions,
  setSelectedRegions,
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

  function handleRegionChange(region: string, checked: boolean) {
    if (checked) {
      setSelectedRegions([...selectedRegions, region]);
    } else {
      setSelectedRegions(selectedRegions.filter((item: string) => item !== region));
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

      {/* Region filter */}
      <div>
        <div className="font-semibold mb-2">Region</div>
        <div className="space-y-1">
          {regions.map((region) => (
            <label key={region} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedRegions.includes(region)}
                onCheckedChange={(checked: boolean) =>
                  handleRegionChange(region, checked)
                }
              />
              <span>{region}</span>
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
