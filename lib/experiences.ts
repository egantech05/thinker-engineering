import type { InsightBlock } from "./insights";

export type ExperienceBlock = InsightBlock;

export type Experience = {
    key: string;
    sector: string;
    title: string;
    project_type: string;
    client: string;
    image: string;
    date: string;
    body: ExperienceBlock[];
    status: "draft" | "published";
};