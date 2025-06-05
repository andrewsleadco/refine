import { supabase } from "@/lib/supabaseClient";
import type { PersonWithCompany } from "@/types/db";

export default async function PeoplePage() {
  const { data, error } = await supabase
    .from<PersonWithCompany, PersonWithCompany>("people")
    .select(`
      id, first_name, last_name, /* ... */, 
      company:companies (
        id, name, /* ... */
      )
    `);

  if (error) throw new Error(error.message);

  return (
    <div>
      {data?.map((p) => (
        <div key={p.id}>{p.first_name} {p.last_name}</div>
      ))}
    </div>
  );
}
