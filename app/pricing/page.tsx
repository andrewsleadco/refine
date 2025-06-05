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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
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
      limits: [
        "Limited firmographic data",
        "No API access",
        "No custom integrations"
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
      limits: [
        "Limited API access",
        "Basic integrations only"
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
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations with complex needs",
      custom: true,
      features: [
        "Unlimited verifications",
        "Custom verification & enrichment pipeline",
        "Advanced security & compliance features",
        "Custom API development",
        "Dedicated customer success team",
        "SLA guarantees",
        "24/7 priority support"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-16 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that works best for your team. All plans include a 14-day free trial.
            </p>
            
            <div className="flex items-center justify-center">
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
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:px-6">
        <Tabs defaultValue="all" className="w-full mb-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All Plans</TabsTrigger>
              <TabsTrigger value="teams">For Teams</TabsTrigger>
              <TabsTrigger value="enterprise">For Enterprise</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {plans.map((plan, i) => (
                <div
                  key={i}
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
                    <p className="mt-2 text-muted-foreground min-h-[60px]">{plan.description}</p>
                    {!plan.custom ? (
                      <div className="mt-4 flex items-baseline text-foreground">
                        <span className="text-4xl font-bold tracking-tight">
                          ${billingAnnually ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="ml-1 text-sm font-medium text-muted-foreground">
                          /month
                        </span>
                      </div>
                    ) : (
                      <div className="mt-4 flex items-baseline text-foreground">
                        <span className="text-4xl font-bold tracking-tight">Custom</span>
                      </div>
                    )}
                    {billingAnnually && !plan.custom && (
                      <p className="mt-1 text-xs text-chart-1">
                        Billed annually (${(billingAnnually ? plan.annualPrice : plan.monthlyPrice) * 12}/year)
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
                      
                      {plan.limits && (
                        <>
                          <li className="pt-2 pb-1">
                            <span className="text-sm font-medium">Limitations:</span>
                          </li>
                          {plan.limits.map((limit, k) => (
                            <li key={k} className="flex text-muted-foreground">
                              <span className="mr-2">•</span>
                              <span>{limit}</span>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                    
                    <Button
                      className="mt-8"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="teams" className="mt-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.slice(0, 3).map((plan, i) => (
                <div
                  key={i}
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
                    <p className="mt-2 text-muted-foreground min-h-[60px]">{plan.description}</p>
                    {!plan.custom ? (
                      <div className="mt-4 flex items-baseline text-foreground">
                        <span className="text-4xl font-bold tracking-tight">
                          ${billingAnnually ? plan.annualPrice : plan.monthlyPrice}
                        </span>
                        <span className="ml-1 text-sm font-medium text-muted-foreground">
                          /month
                        </span>
                      </div>
                    ) : (
                      <div className="mt-4 flex items-baseline text-foreground">
                        <span className="text-4xl font-bold tracking-tight">Custom</span>
                      </div>
                    )}
                    {billingAnnually && !plan.custom && (
                      <p className="mt-1 text-xs text-chart-1">
                        Billed annually (${(billingAnnually ? plan.annualPrice : plan.monthlyPrice) * 12}/year)
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
                      
                      {plan.limits && (
                        <>
                          <li className="pt-2 pb-1">
                            <span className="text-sm font-medium">Limitations:</span>
                          </li>
                          {plan.limits.map((limit, k) => (
                            <li key={k} className="flex text-muted-foreground">
                              <span className="mr-2">•</span>
                              <span>{limit}</span>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                    
                    <Button
                      className="mt-8"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="enterprise" className="mt-8">
            <div className="max-w-4xl mx-auto bg-background rounded-xl border shadow-sm p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <Badge className="mb-4">Enterprise</Badge>
                  <h3 className="text-3xl font-bold mb-4">Custom Enterprise Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    Get a tailored plan that perfectly fits your organization's specific needs,
                    with unlimited verifications and dedicated support.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>Unlimited verifications and enrichment</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>Custom API development and integration</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>Dedicated customer success team</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>Advanced security and compliance features</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>24/7 priority support with SLA guarantees</span>
                    </li>
                    <li className="flex">
                      <CheckCircle2 className="h-5 w-5 text-chart-1 shrink-0 mr-2" />
                      <span>On-demand training and support resources</span>
                    </li>
                  </ul>
                  
                  <Button size="lg">Contact Enterprise Sales</Button>
                </div>
                
                <div className="md:w-1/2">
                  <div className="bg-muted rounded-xl p-6 space-y-4">
                    <h4 className="font-medium">What our Enterprise clients receive:</h4>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Custom verification pipeline</span>
                        <CheckCircle2 className="h-5 w-5 text-chart-1" />
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Dedicated account team</span>
                        <CheckCircle2 className="h-5 w-5 text-chart-1" />
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Custom integrations</span>
                        <CheckCircle2 className="h-5 w-5 text-chart-1" />
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Volume discounts</span>
                        <CheckCircle2 className="h-5 w-5 text-chart-1" />
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>SSO & advanced security</span>
                        <CheckCircle2 className="h-5 w-5 text-chart-1" />
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Custom contracts & billing</span>
                        <CheckCircle2 className="h-5 w-5 text-chart-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How accurate is your verification?",
                a: "Our verification system achieves 99.8% accuracy for emails, 98.5% for phone numbers, and 99.9% for addresses through our multi-step verification process and data partnerships."
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Yes, you can change your plan at any time. When upgrading, we'll prorate the difference. When downgrading, changes take effect at the start of your next billing cycle."
              },
              {
                q: "Do you offer a free trial?",
                a: "Yes, all our plans include a 14-day free trial with full access to all features. No credit card is required to start your trial."
              },
              {
                q: "What happens when I reach my verification limit?",
                a: "You'll be notified when you reach 80% of your limit. If you exceed your limit, you can purchase additional verifications or upgrade to a higher plan."
              },
              {
                q: "Do you support international data?",
                a: "Yes, our platform supports verification and enrichment for contacts across more than 190 countries worldwide."
              },
              {
                q: "How is the data security handled?",
                a: "We employ bank-level encryption, regular security audits, and strict access controls. We're compliant with GDPR, CCPA, and other international data regulations."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-background rounded-lg border p-6">
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need more information or have a specific question?
            </p>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </div>
      </div>
    </div>
  );
}