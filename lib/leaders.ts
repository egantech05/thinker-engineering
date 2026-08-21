export type Leader = {
    key: string;
    name: string;
    title: string;
    image: string;
    quote: string;
};

export const leaders: Leader[] = [
    {
        key: "hazim",
        name: "Hazim Halimi",
        title: "CEO / Co-Founder",
        image: "/images/leaders/hazim.png",
        quote: "Strong organizations are built when leaders commit to people first, and processes follow with excellence.",
    },
    {
        key: "mukri",
        name: "Mukri Ramli",
        title: "CTO / Co-Founder",
        image: "/images/leaders/mukri.png",
        quote: "The best infrastructure is the kind no one notices, because it simply never lets them down.",
    },
];