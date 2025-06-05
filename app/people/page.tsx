import { supabase } from "@/lib/supabaseClient";
import type { PersonWithCompany } from "@/types/db";

export default async function PeoplePage() {
  const { data, error } = await supabase
    .from("people")
    .select("id, first_name, last_name, title, email, phone, linkedin_url, verification_score, source, created_at, updated_at, company:companies(id, name, website, industry, location, size)");

  if (error) throw new Error(error.message);

  // Cast for TS
  const people = data as unknown as PersonWithCompany[] | null;

  return (
    <div>
      {people?.map((p) => (
        <div key={p.id}>
          {p.first_name} {p.last_name}
          {p.company ? <> — <span className="text-gray-500">{p.company.name}</span></> : " — Unlinked"}
        </div>
      ))}
    </div>
  );
}
