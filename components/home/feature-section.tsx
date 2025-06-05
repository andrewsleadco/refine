"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Database, Zap, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function FeatureSection() {
  const [activeTab, setActiveTab] = useState("verification");
  
  const features = [
    {
      id: "verification",
      icon: <Shield className="h-6 w-6" />,
      title: "Verification",
      description: "Our advanced verification engine validates email addresses, phone numbers, and physical addresses in real-time with 99.8% accuracy.",
      image: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bullets: [
        "Email verification with syntax check, MX record validation, and mailbox confirmation",
        "Phone number validation with carrier detection and line type identification",
        "Address validation with standardization and geocoding",
        "Fraud detection and risk scoring"
      ]
    },
    {
      id: "enrichment",
      icon: <Database className="h-6 w-6" />,
      title: "Enrichment",
      description: "Automatically enhance your leads with comprehensive firmographic data, social profiles, and detailed contact information.",
      image: "https://images.pexels.com/photos/7567555/pexels-photo-7567555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bullets: [
        "Company size, industry, location, and revenue data",
        "Executive leadership information and direct contact details",
        "LinkedIn, Twitter, and other social profile data",
        "Technology stack and buying signals"
      ]
    },
    {
      id: "search",
      icon: <Zap className="h-6 w-6" />,
      title: "Search",
      description: "Powerful search capabilities to filter and find exactly the leads you need by industry, geography, company size, and more.",
      image: "https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bullets: [
        "Advanced filtering by multiple parameters simultaneously",
        "Saved search templates for recurring lead generation",
        "Real-time results with instant verification",
        "Company and contact-level search capabilities"
      ]
    },
    {
      id: "export",
      icon: <FileText className="h-6 w-6" />,
      title: "Export",
      description: "Export your verified and enriched leads in multiple formats compatible with any CRM or sales platform.",
      image: "https://images.pexels.com/photos/5483073/pexels-photo-5483073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bullets: [
        "CSV, Excel, and JSON export options",
        "Direct integration with major CRMs",
        "Scheduled exports and automated workflows",
        "Custom field mapping for seamless data transfer"
      ]
    }
  ];

  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Powerful Features for Lead Excellence
          </h2>
          <p className="text-xl text-muted-foreground">
            Every aspect of our platform is designed to deliver the highest quality B2B leads possible.
          </p>
        </div>
        
        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((feature) => (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex items-center gap-2 px-4 py-3"
                >
                  {feature.icon}
                  <span className="hidden md:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {features.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <ul className="space-y-2 mt-4">
                    {feature.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <div className="h-5 w-5 shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative rounded-xl border bg-background p-2 shadow-lg"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={feature.image}
                      alt={`${feature.title} feature`}
                      className="aspect-[16/9] object-cover w-full"
                    />
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}