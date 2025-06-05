import { supabase } from "@/lib/supabaseClient";
import type { Company, Person } from "@/types/db";
import { notFound } from "next/navigation";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

interface CompanyWithPeopleSelect extends Company {
  people: Person[];
}

type Props = { params: { id: string } };

export default async function CompanyPage({ params }: Props) {
  const companyId = Number(params.id);
  if (isNaN(companyId)) return notFound();

  // NOTE: Use two type params and single-line select
  const { data, error } = await supabase
    .from<Company, CompanyWithPeopleSelect>("companies")
    .select("id, name, website, industry, location, size, people(id, first_name, last_name, title, email, phone, linkedin_url, verification_score, source)")
    .eq("id", companyId)
    .single();

  if (error || !data) {
    console.error("Error fetching company:", error?.message);
    return notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
      <p className="mb-4">
        Website:{" "}
        {data.website ? (
          <a
            href={`https://${data.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600"
          >
            {data.website}
          </a>
        ) : (
          "—"
        )}
      </p>
      <p className="mb-4">Industry: {data.industry ?? "—"}</p>
      <p className="mb-4">Location: {data.location ?? "—"}</p>
      <p className="mb-4">Size: {data.size ?? "—"}</p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Contacts at this company</h2>
      {(!data.people || data.people.length === 0) ? (
        <p className="text-gray-500 italic">No contacts linked yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.people.map((p: { id: Key | null | undefined; first_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; last_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; title: any; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => (
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
