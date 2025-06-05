"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuoteIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: "sales",
      quote: "Refine transformed our sales process. We've seen a 43% increase in conversion rates and cut our prospecting time in half. The data is consistently clean and accurate.",
      author: "Sarah Johnson",
      role: "VP of Sales",
      company: "TechCorp Solutions",
      avatar: "SJ"
    },
    {
      id: "marketing",
      quote: "Our marketing campaigns have never performed better. With Refine's enriched data, we're targeting the right companies with personalized messaging that resonates.",
      author: "Michael Chen",
      role: "CMO",
      company: "GrowthWave",
      avatar: "MC"
    },
    {
      id: "operations",
      quote: "Implementation was seamless, and the ROI was immediate. We've eliminated dead leads from our pipeline and our sales team couldn't be happier with the quality.",
      author: "Amelia Rodriguez",
      role: "Operations Director",
      company: "Velocity Partners",
      avatar: "AR"
    }
  ];

  const [activeTab, setActiveTab] = useState(testimonials[0].id);
  const activeTestimonial = testimonials.find(t => t.id === activeTab) || testimonials[0];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground">
            See why companies choose Refine for their critical lead data needs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative p-8 bg-background rounded-xl shadow-sm border mb-8"
            >
              <QuoteIcon className="h-12 w-12 text-primary/20 absolute top-6 left-6" />
              <div className="relative z-10">
                <p className="text-xl md:text-2xl font-medium italic mb-6 pl-8">
                  "{activeTestimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {activeTestimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{activeTestimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {activeTestimonial.role}, {activeTestimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-center">
              <TabsList>
                {testimonials.map((testimonial) => (
                  <TabsTrigger
                    key={testimonial.id}
                    value={testimonial.id}
                  >
                    {testimonial.company}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16 opacity-70">
          {["TechCorp", "GrowthWave", "Velocity", "Innovate", "Elevate", "Synergy"].map((company, i) => (
            <div key={i} className="text-xl md:text-2xl font-bold tracking-tight">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}