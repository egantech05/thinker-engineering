import InsightPreviewClient from "@/components/insights/InsightPreviewClient";
import { getNavItems } from "@/lib/nav";

export default async function InsightPreviewPage() {
    const navItems = await getNavItems();
    return <InsightPreviewClient navItems={navItems} />;
}