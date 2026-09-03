import CmsNav from "@/components/cms/CmsNav";
import LogoManager from "@/components/cms/LogoManager";
import { getLogos } from "@/lib/logos";

export default async function CmsLogosPage() {
    const [trustedBy, certifications, partnership] = await Promise.all([
        getLogos("trusted_by"),
        getLogos("certification"),
        getLogos("partnership"),
    ]);

    return (
        <>
            <CmsNav active="logos" />

            <h1 className="mb-8 text-2xl font-medium text-white">Logos</h1>

            <div className="space-y-10">
                <LogoManager category="trusted_by" title="Trusted By" initialLogos={trustedBy} />
                <LogoManager category="certification" title="Certifications" initialLogos={certifications} />
                <LogoManager category="partnership" title="Trusted Partnership" initialLogos={partnership} />
            </div>
        </>
    );
}