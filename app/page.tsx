import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Shield, Zap, Database, BarChart3, FileText, Layers, Globe } from "lucide-react";
import HeroSection from "@/components/home/hero-section";
import FeatureSection from "@/components/home/feature-section";
import TestimonialSection from "@/components/home/testimonial-section";
import PricingSection from "@/components/home/pricing-section";
import CtaSection from "@/components/home/cta-section";

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-chart-1" />,
      title: "Real-Time Verification",
      description: "Validate emails, phone numbers, and addresses instantly with industry-leading accuracy rates."
    },
    {
      icon: <Database className="h-8 w-8 text-chart-2" />,
      title: "Data Enrichment",
      description: "Automatically enhance leads with company data, social profiles, and detailed contact information."
    },
    {
      icon: <Zap className="h-8 w-8 text-chart-3" />,
      title: "Instant Results",
      description: "Get verified and enriched data in milliseconds, not days or hours like traditional services."
    },
    {
      icon: <FileText className="h-8 w-8 text-chart-4" />,
      title: "Exportable Data",
      description: "Download your cleaned and enriched lead data in multiple formats compatible with any CRM."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-chart-5" />,
      title: "Powerful Analytics",
      description: "Track your data quality metrics and conversion rates with detailed performance dashboards."
    },
    {
      icon: <Globe className="h-8 w-8 text-chart-1" />,
      title: "Global Coverage",
      description: "Verify and enrich contact data from virtually any country or region worldwide."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Why Leading Companies Choose Refine
            </h2>
            <p className="text-xl text-muted-foreground">
              Transform your lead generation process with our comprehensive verification and enrichment platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FeatureSection />
      <TestimonialSection />
      <PricingSection />
      <CtaSection />
    </div>
  );
}