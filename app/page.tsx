import HomeClient from "@/components/home/HomeClient";
import { getLogos } from "@/lib/logos";
import { createClient } from "@/lib/supabase/server";
import type { Insight } from "@/lib/insights";
import type { Experience } from "@/lib/experiences";
import { getNavItems } from "@/lib/nav";

export default async function Home() {
  const navItems = await getNavItems();

  const [trustedByLogos, certLogos, partnershipLogos] = await Promise.all([
    getLogos("trusted_by"),
    getLogos("certification"),
    getLogos("partnership"),
  ]);

  const partners = trustedByLogos.map((l) => ({ name: l.name, src: l.image }));
  const certifications = certLogos.map((l) => ({ name: l.name, src: l.image }));
  const partnership = partnershipLogos.map((l) => ({ name: l.name, src: l.image }));

  const supabase = await createClient();
  const { data } = await supabase
    .from("insights")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false });

  const { data: experienceRows } = await supabase
    .from("experiences")
    .select("*")
    .eq("status", "published")
    .order("date", { ascending: false })
    .limit(10);

  return (
    <HomeClient
      navItems={navItems}
      partners={partners}
      certifications={certifications}
      partnership={partnership}
      insights={(data ?? []) as Insight[]}
      experiences={(experienceRows ?? []) as Experience[]}
    />
  );
}