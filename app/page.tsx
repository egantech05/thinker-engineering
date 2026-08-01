import HomeClient from "@/components/HomeClient";
import { getPartnerLogos } from "@/lib/partners";
import { getCertLogos } from "@/lib/certs";

export default function Home() {
  const partners = getPartnerLogos();
  const certifications = getCertLogos();
  return <HomeClient partners={partners} certifications={certifications} />;
}