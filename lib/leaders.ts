export type Leader = {
    key: string;
    name: string;
    title: string;
    image: string;
    quote: string;
    bio?: string[];
};

export const leaders: Leader[] = [
    {
        key: "hazim",
        name: "Hazim Halimi",
        title: "CEO / Co-Founder",
        image: "/images/leaders/hazim.png",
        quote:
            "What we promise, we deliver. What we can't, we say so. That's how we built this company — one honest project at a time.",
        bio: [
            "Hazim Halimi is the Founder & CEO of Thinker Engineering Sdn Bhd — a Malaysian SME specialising in data center solutions, built on a simple rule: what we promise, we deliver; what we can't, we say so.",
            "With more than 10 years across cloud and co-location providers, oil & gas, financial institutions, GLCs and government clients, he has delivered projects across the full lifecycle — design, engineering, procurement, commissioning, and managed services. He has secured partnerships with multiple principals and distributors to offer end-to-end data center solutions, giving every client total confidence.",
            "He founded Thinker Engineering to give Malaysian businesses — startups and enterprises alike — a partner that plans smarter and runs reliably, without the over-promising the industry is known for. Where other vendors chase the sale, he builds the relationship and delivers, one honest project at a time.",
        ],
    },
    {
        key: "mukri",
        name: "Mukri Ramli",
        title: "CTO / Co-Founder",
        image: "/images/leaders/mukri.png",
        quote:
            "The best infrastructure is the kind no one notices, because it simply never lets them down.",
        bio: [
            "Mukri Ramli is the Co-Founder & Chief Technical Officer of Thinker Engineering Sdn Bhd. An electrical and electronic engineer by training (UNITEN), he built his career where power, infrastructure and technology meet — and co-founded the company to bring that combined expertise to clients under one roof.",
            "With 12 years in data centers, 10 years in renovation and electrical field services, and 8 years in information technology, he has worked as a Consulting Engineer for a local data center company and as a Senior Enterprise Consultant at NTT Data, advising enterprise clients on large-scale IT environments. He is an Uptime Accredited Tier Specialist, Certified TIA Internal Auditor, Certified TIA-942C Design Consultant and Certified Data Center Specialist.",
            "As CTO, he sets the company's technology strategy and keeps it aligned with where the business is heading. He oversees security and compliance, manages vendor relationships, and makes sure every project is delivered efficiently and to standard — moving as comfortably between switchboards and server halls as he does between enterprise systems.",
        ],
    },
];