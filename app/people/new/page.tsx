// app/people/new/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Company } from "@/types/db";

export default function NewPersonPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [verificationScore, setVerificationScore] = useState<number>(0);
  const [source, setSource] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  // 1) Load all companies for the dropdown
  useState(() => {
    supabase
      .from<Company>("companies")
      .select("id, name")
      .order("name", { ascending: true })
      .then(({ data }) => {
        if (data) setCompanies(data);
      });
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("people").insert({
      first_name: firstName,
      last_name: lastName,
      title: title || null,
      email: email,
      phone: phone || null,
      linkedin_url: linkedinUrl || null,
      company_id: companyId ? Number(companyId) : null,
      verification_score: verificationScore,
      source: source || null,
    });

    if (error) {
      alert("Error creating person: " + error.message);
    } else {
      router.push("/people"); // go back to list
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Person</h1>
      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Company (optional)</label>
          <select
            value={companyId ?? ""}
            onChange={(e) =>
              setCompanyId(e.target.value === "" ? null : e.target.value)
            }
            className="w-full border p-2 rounded"
          >
            <option value="">— Unlinked —</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Verification Score</label>
          <input
            type="number"
            min={0}
            max={100}
            value={verificationScore}
            onChange={(e) => setVerificationScore(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Source</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Person
        </button>
      </form>
    </main>
  );
}
