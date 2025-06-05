"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

export default function PricingSection() {
  const [billingAnnually, setBillingAnnually] = useState(true);
  
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams just getting started with lead verification",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "5,000 verifications per month",
        "Basic email & phone verification",
        "Simple address validation",
        "CSV exports",
        "Email support"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Growth",
      description: "Ideal for growing teams with advanced verification needs",
      monthlyPrice: 149,
      annualPrice: 119,
      popular: true,
      features: [
        "25,000 verifications per month",
        "Advanced email & phone verification",
        "Complete address validation & standardization",
        "Basic firmographic enrichment",
        "All export formats",
        "Priority email support"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Pro",
      description: "For professional teams requiring comprehensive verification & enrichment",
      monthlyPrice: 349,
      annualPrice: 279,
      features: [
        "100,000 verifications per month",
        "Premium verification suite",
        "Full firmographic enrichment",
        "Social profile data",
        "API access",
        "Dedicated account manager",
        "Phone & email support"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works best for your team. All plans include a 14-day free trial.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-2 ${!billingAnnually ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch
              checked={billingAnnually}
              onCheckedChange={setBillingAnnually}
              aria-label="Toggle annual billing"
            />
            <span className={`ml-2 ${billingAnnually ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annually <span className="text-xs text-chart-1">(20% off)</span>
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-xl bg-background border ${
                plan.popular ? "border-primary shadow-lg" : "shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground text-center">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-muted-foreground h-12">{plan.description}</p>
                <div className="mt-4 flex items-baseline text-foreground">
                  <span className="text-4xl font-bold tracking-tight">
                    ${billingAnnually ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="ml-1 text-sm font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
                {billingAnnually && (
                  <p className="mt-1 text-xs text-chart-1">
                    Billed annually (${plan.annualPrice * 12}/year)
                  </p>
                )}
              </div>
              
              <div className="flex flex-col p-6 pt-0 flex-1">
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="mt-8"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Enterprise Solutions</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Need a custom solution for your enterprise? We offer tailored packages with unlimited verifications, 
            dedicated support, and custom integrations.
          </p>
          <Button size="lg" variant="outline">
            Contact Enterprise Sales
          </Button>
        </div>
      </div>
    </section>
  );
}