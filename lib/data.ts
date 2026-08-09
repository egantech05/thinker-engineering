export const stats = [
    { value: "10+", label: "Years" },
    { value: "500", label: "Consultation" },
    { value: "80+", label: "Projects" },
];


export const pillars = [
    {
        title: "Uptime Assurance",
        body: "Continuous operations and equip businesses with future-ready data centers that evolve with their needs. We ensure every data center becomes a cornerstone of growth and innovation.",
    },
    {
        title: "Proactive Experts",
        body: "Swift and decisive response to tackle the most complex data center challenges. It's our mission to empower our customers to fully understand the intricacies of data centers that support long-term growth and resilience.",
    },
    {
        title: "Operational Excellence",
        body: "We instill our customers with confidence in maintaining critical business operations and navigating the ever-evolving technological landscape. We bring you a more sustainable data center solution.",
    },
];

export const lifecycle = ["Design", "Audit", "Execution", "Maintenance"];


export const services = [
    {
        key: "power",
        title: "Power Management",
        icon: "Zap",
        image: "/images/solutions/ups.png",
        description: "Reliable, redundant power infrastructure for critical facilities.",
        bullets: [
            "UPS Sales & Installation",
            "Preventive Maintenance",
            "Load Bank Testing",
            "Battery Replacement",
        ],
    },
    {
        key: "cooling",
        title: "Cooling System",
        icon: "Droplets",
        image: "/images/solutions/cooling.png",
        description: "Precision cooling solutions to keep critical loads within spec.",
        bullets: [
            "CRAC / CRAH Units",
            "Cooling Design & Sizing",
            "Airflow Optimization",
            "Maintenance Contracts",
        ],
    },
    {
        key: "security",
        title: "Security System",
        icon: "Camera",
        image: "/images/solutions/security.png",
        description: "Layered physical security for restricted data center zones.",
        bullets: [
            "Access Control Systems",
            "CCTV Surveillance",
            "Biometric Verification",
            "Perimeter Security",
        ],
    },
    {
        key: "complete",
        title: "Complete Solutions",
        headline: "End-to-End Solutions & Support",
        icon: "Share2",
        image: "/images/solutions/complete-solution.png",
        description: "End-to-end solution for data center infrastructure",
        bullets: [
            "Data Center Risk Assessment (DCRA)",
            "Threat Vulnerability Risk Assessment (TVRA)",
            "Consultation",
            "New design or Retrofitting",
        ],
    },
    {
        key: "monitoring",
        title: "Monitoring System",
        icon: "Monitor",
        image: "/images/solutions/monitor.png",
        description: "Real-time visibility into every critical system, 24/7.",
        bullets: [
            "DCIM Integration",
            "Environmental Sensors",
            "Remote Monitoring",
            "Alerting & Reporting",
        ],
    },
    {
        key: "fire",
        title: "Fire Safety System",
        icon: "FlameKindling",
        image: "/images/solutions/fire.png",
        description: "Early detection and suppression built for critical environments.",
        bullets: [
            "VESDA Detection",
            "Clean Agent Suppression",
            "Fire Alarm Systems",
            "Compliance & Testing",
        ],
    },
    {
        key: "cabling",
        title: "Racks & Cabling",
        icon: "Server",
        image: "/images/solutions/cable.png",
        description: "Structured cabling built for performance and scalability.",
        bullets: [
            "Fiber & Copper Cabling",
            "Rack & Cabinet Installation",
            "Cable Management",
            "Testing & Certification",
        ],
    },
];


export const projects = [
    {
        year: "2026", partner: "PETRONAS", logo: "/images/partner/pet.png", color: "#00A19B", background: "/images/projects/project1.jpg",
        description: "Full UPS and power redundancy upgrade for a Tier III facility, ensuring uninterrupted uptime."
    },
    {
        year: "2026", partner: "PLUS", logo: "/images/partner/pls.png", color: "#0061AA", background: "/images/projects/project2.jpg",
        description: "Precision cooling retrofit to eliminate hot-spot risk and stabilize temperatures across the hall."
    },
    {
        year: "2025", partner: "FKP", logo: "/images/partner/fkp.png", color: "#FF8824", background: "/images/projects/project3.jpg",
        description: "End-to-end DCRA and TVRA risk assessment carried out ahead of a colocation expansion."
    },
    {
        year: "2023", partner: "JAYKR", logo: "/images/partner/jaykr.png", color: "#FED416", background: "/images/projects/project4.jpg",
        description: "Structured fiber and copper cabling with full rack build-out for a new server hall."
    },
    {
        year: "2022", partner: "PETRONAS", logo: "/images/partner/pet.png", color: "#00A19B", background: "/images/projects/project5.jpg",
        description: "Integrated fire suppression and early-detection system deployed across the entire facility hall."
    },
    {
        year: "2020", partner: "PLUS", logo: "/images/partner/pls.png", color: "#0061AA", background: "/images/projects/project6.jpg",
        description: "24/7 DCIM monitoring rollout covering power, cooling, and security systems in real time."
    },
];
export const locations = [
    {
        label: "Headquarter",
        color: "blue",
        // approximate % position over the map graphic
        x: 27,
        y: 62,
        address: "F-G-3A, Block F, Jalan Perdana CBD, Perdana 3, Cyber 12,\nCyberjaya, 63000, Selangor, Malaysia",
    },
    {
        label: "East Coast Branch",
        color: "gold",
        x: 36,
        y: 34,
        address: "KCP 31, Tingkat 1, Kemaman Business Centre,\nJalan Lebai Saras, 24000, Kemaman, Terengganu, Malaysia.",
    },
];

export const contact = {
    email: "sales@thinker.digital",
    phones: ["+603 8800 8832", "+6019 227 0709", "+6018 378 1169"],
};

export const insights = [
    {
        slug: "data-center-cooling-trends-2026",
        category: "Industry Trends",
        date: "2026-06-15",
        title: "Precision Cooling Trends Shaping Malaysia's Data Centers in 2026",
        excerpt: "Liquid cooling adoption is accelerating as rack densities climb. Here's what operators in Malaysia need to plan for.",
        image: "/images/solutions/cooling.png",
        link: "#",
    },
    {
        slug: "tvra-compliance-guide",
        category: "Guides",
        date: "2026-05-02",
        title: "A Practical Guide to TVRA Compliance for Colocation Facilities",
        excerpt: "What a Threat Vulnerability Risk Assessment actually covers, and how to prepare your facility for one.",
        image: "/images/projects/project3.jpg",
        link: "#",
    },
    {
        slug: "ups-maintenance-checklist",
        category: "Best Practices",
        date: "2026-03-20",
        title: "UPS Maintenance Checklist Every Facility Manager Should Follow",
        excerpt: "Preventive maintenance schedules that keep your power redundancy from becoming a single point of failure.",
        image: "/images/solutions/ups.png",
        link: "#",
    },
    {
        slug: "fire-suppression-standards",
        category: "Compliance",
        date: "2026-02-11",
        title: "Clean Agent Fire Suppression: What's Changing in Regional Standards",
        excerpt: "A look at how fire safety codes for critical facilities are evolving across Southeast Asia.",
        image: "/images/solutions/fire.png",
        link: "#",
    },
    {
        slug: "dcim-monitoring-roi",
        category: "Technology",
        date: "2026-01-28",
        title: "Measuring the ROI of Real-Time DCIM Monitoring",
        excerpt: "Facilities that moved to 24/7 environmental monitoring report fewer unplanned outages. Here's the data.",
        image: "/images/solutions/monitor.png",
        link: "#",
    },
    {
        slug: "structured-cabling-best-practices",
        category: "Best Practices",
        date: "2025-12-09",
        title: "Structured Cabling Best Practices for High-Density Racks",
        excerpt: "Fiber and copper layout decisions made early save hours of troubleshooting later.",
        image: "/images/solutions/cable.png",
        link: "#",
    },
    {
        slug: "security-access-control-2026",
        category: "Security",
        date: "2025-11-14",
        title: "Biometric Access Control: Raising the Bar for Facility Security",
        excerpt: "Layered physical security is no longer optional for Tier III and above facilities.",
        image: "/images/solutions/security.png",
        link: "#",
    },
    {
        slug: "colocation-expansion-checklist",
        category: "Guides",
        date: "2025-10-30",
        title: "A Facility Manager's Checklist Before a Colocation Expansion",
        excerpt: "The risk assessment steps most teams skip — and end up paying for later.",
        image: "/images/projects/project5.jpg",
        link: "#",
    },
    {
        slug: "sustainable-data-center-design",
        category: "Industry Trends",
        date: "2025-09-18",
        title: "Designing for Sustainability Without Compromising Uptime",
        excerpt: "Energy-efficient cooling and power design choices that don't trade off reliability.",
        image: "/images/projects/project1.jpg",
        link: "#",
    },
];