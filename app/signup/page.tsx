"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Database, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    companyName: "",
    jobTitle: "",
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Signing up with:", formData);
      setIsLoading(false);
      // Redirect or show success
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-background rounded-lg shadow-sm border p-8">
          <div className="flex flex-col items-center mb-6">
            <Link href="/" className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Refine</span>
            </Link>
            
            {step < 3 && (
              <>
                <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground mt-1">
                  Start your 14-day free trial. No credit card required.
                </p>
                
                <div className="flex items-center w-full mt-6">
                  <div className={`h-1 flex-1 ${step >= 1 ? "bg-primary" : "bg-muted"}`}></div>
                  <div className={`h-1 flex-1 ml-1 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
                </div>
              </>
            )}
          </div>
          
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="John Smith"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
                <p className="text-xs text-muted-foreground">
                  Must be at least 8 characters
                </p>
              </div>
              
              <Button type="submit" className="w-full">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          )}
          
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company name</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  placeholder="Your company"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job title</Label>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Your role"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="agreeToTerms" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                  }
                  required
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !formData.agreeToTerms}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
            </form>
          )}
          
          {step === 3 && (
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Account created!</h2>
              <p className="text-muted-foreground mb-6">
                Your 14-day trial has started. You can now start using Refine.
              </p>
              <Button asChild className="w-full">
                <Link href="/dashboard">Go to dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link href="/search">Start searching</Link>
              </Button>
            </div>
          )}
          
          {step < 3 && (
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}