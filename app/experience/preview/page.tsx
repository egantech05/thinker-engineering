import ExperiencePreviewClient from "@/components/experience/ExperiencePreviewClient";
import { getNavItems } from "@/lib/nav";

export default async function ExperiencePreviewPage() {
    const navItems = await getNavItems();
    return <ExperiencePreviewClient navItems={navItems} />;
}