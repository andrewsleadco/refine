// app/people/page.tsx
import { supabase } from "@/lib/supabaseClient";
import type { Company, Person } from "@/types";

interface PersonWithCompany extends Person {
  company: Company | null;
}

export default async function PeoplePage() {
  // 1) Query people + join company (left join via .select with foreign table)
  const { data, error } = await supabase
    .from<PersonWithCompany>("people")
    .select(`
      id,
      first_name,
      last_name,
      title,
      email,
      phone,
      linkedin_url,
      verification_score,
      source,
      company:companies (
        id,
        name,
        website,
        industry,
        location,
        size
      )
    `)
    .order("last_name", { ascending: true });

  if (error) {
    console.error("Error fetching people:", error.message);
    return (
      <div className="p-8 text-red-600">
        Failed to load leads. Please check your Supabase credentials.
      </div>
    );
  }

  // 2) Render a simple table of people, showing company columns if available
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">All Leads (People)</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Title</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Phone</th>
            <th className="border px-2 py-1 text-left">Company</th>
            <th className="border px-2 py-1 text-left">Industry</th>
            <th className="border px-2 py-1 text-left">Location</th>
            <th className="border px-2 py-1 text-left">Verif. Score</th>
          </tr>
        </thead>
        <tbody>
          {data!.map((person) => (
            <tr key={person.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">
                {person.first_name} {person.last_name}
              </td>
              <td className="border px-2 py-1">{person.title || "—"}</td>
              <td className="border px-2 py-1">{person.email}</td>
              <td className="border px-2 py-1">{person.phone || "—"}</td>
              <td className="border px-2 py-1">
                {/* If person.company is null, show “Unlinked” */}
                {person.company ? (
                  <a
                    href={`https://${person.company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {person.company.name}
                  </a>
                ) : (
                  <span className="italic text-gray-500">Unlinked</span>
                )}
              </td>
              <td className="border px-2 py-1">
                {person.company?.industry || "—"}
              </td>
              <td className="border px-2 py-1">
                {person.company?.location || "—"}
              </td>
              <td className="border px-2 py-1 text-center">
                {person.verification_score}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
