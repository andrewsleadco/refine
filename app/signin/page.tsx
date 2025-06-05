"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Signing in with:", { email, password });
      setIsLoading(false);
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
            <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-1">Sign in to your account</p>
          </div>
          
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="sso">SSO</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-0">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      href="/forgot-password" 
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="sso" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sso-email">Work email</Label>
                  <Input id="sso-email" type="email" placeholder="name@company.com" />
                </div>
                
                <Button className="w-full">Continue with SSO</Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Single Sign-On (SSO) is available on Growth and Enterprise plans
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}