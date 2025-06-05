"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Submitted email:", email);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background to-muted/20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-chart-1/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-chart-1 mr-2"></span>
              Verified B2B Leads, Real-Time Results
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Transform Your</span>
              <span className="block text-primary">Lead Quality</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[85%]">
              Never waste time on dead leads again. Refine delivers fully verified and
              enriched contacts in real-time, giving you the cleanest B2B data possible.
            </p>
            
            <ul className="grid gap-2 mt-2">
              {[
                "Email & phone verification in milliseconds",
                "100% accurate address validation",
                "Complete firmographic data enrichment",
                "Exportable to any CRM or sales platform"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-chart-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <form onSubmit={handleSubmit} className="flex-1 flex max-w-sm gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="max-w-xs"
                />
                <Button type="submit">Get Started</Button>
              </form>
              <Button variant="outline" asChild>
                <a href="#pricing">View Pricing</a>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Free trial available. No credit card required.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative rounded-xl border bg-background p-2 shadow-lg">
              <div className="rounded-lg overflow-hidden border">
                <img
                  src="https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Refine platform interface"
                  className="aspect-[16/10] object-cover w-full"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                100% Verified Data
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}