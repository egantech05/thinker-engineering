import HomeClient from "@/components/HomeClient";
import { getPartnerLogos } from "@/lib/trustedBy";
import { getCertLogos } from "@/lib/certs";
import { getPartnershipLogos } from "@/lib/partnership";

export default function Home() {
  const partners = getPartnerLogos();
  const certifications = getCertLogos();
  const partnership = getPartnershipLogos();
  return (
    <HomeClient
      partners={partners}
      certifications={certifications}
      partnership={partnership}
    />
  );
}