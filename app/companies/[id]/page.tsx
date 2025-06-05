import { supabase } from "@/lib/supabaseClient";
import type { Company, Person } from "@/types/db";
import { notFound } from "next/navigation";

interface CompanyWithPeopleSelect extends Company {
  people: Person[];
}

type Props = { params: { id: string } };

export default async function CompanyPage({ params }: Props) {
  const companyId = Number(params.id);
  if (isNaN(companyId)) return notFound();

  const { data, error } = await supabase
    .from("companies")
    .select("id, name, website, industry, location, size, people(id, first_name, last_name, title, email, phone, linkedin_url, verification_score, source)")
    .eq("id", companyId)
    .single();

  if (error || !data) {
    console.error("Error fetching company:", error?.message);
    return notFound();
  }

  const company = data as CompanyWithPeopleSelect;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{company.name}</h1>
      <p className="mb-4">
        Website:{" "}
        {company.website ? (
          <a
            href={`https://${company.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            {company.website}
          </a>
        ) : (
          "—"
        )}
      </p>
      <p className="mb-4">Industry: {company.industry ?? "—"}</p>
      <p className="mb-4">Location: {company.location ?? "—"}</p>
      <p className="mb-4">Size: {company.size ?? "—"}</p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Contacts at this company</h2>
      {(!company.people || company.people.length === 0) ? (
        <p className="text-gray-500 italic">No contacts linked yet.</p>
      ) : (
        <ul className="space-y-2">
          {company.people.map((p) => (
            <li key={p.id} className="flex items-center gap-4">
              <span>
                {p.first_name} {p.last_name}{" "}
                <span className="text-gray-500">({p.title ?? "—"})</span>
              </span>
              <a
                href={`mailto:${p.email}`}
                className="underline text-blue-600"
              >
                {p.email}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
