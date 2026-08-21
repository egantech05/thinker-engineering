export type Job = {
    key: string;
    title: string;
    department: string;
    location: string;
    type: string;
    summary: string;
    responsibilities: string[];
    requirements: string[];
};

export const jobs: Job[] = [
    {
        key: "dc-design-engineer",
        title: "Data Center Design Engineer",
        department: "Data Center Engineering & Consultancy",
        location: "Cyberjaya, Selangor",
        type: "Full-time",
        summary:
            "Design mission-critical facility infrastructure — power, cooling and white space — from concept through commissioning for hyperscale and enterprise clients.",
        responsibilities: [
            "Develop electrical and mechanical design packages for data center facilities, from schematic through detailed design.",
            "Produce load calculations, single-line diagrams, and cooling capacity studies aligned to Tier III/IV requirements.",
            "Support site audits, gap assessments and commissioning activities alongside the project delivery team.",
            "Coordinate with vendors, contractors and client stakeholders through the full design review cycle.",
        ],
        requirements: [
            "Degree in Electrical, Mechanical or Building Services Engineering.",
            "3+ years in data center, critical facilities or M&E consultancy work.",
            "Working knowledge of Uptime Institute, TIA-942 or equivalent standards.",
            "CDCP, CDCS or similar certification is an advantage.",
        ],
    },
    {
        key: "network-security-engineer",
        title: "Network & Security Engineer",
        department: "IT Infrastructure, Networks & Cybersecurity",
        location: "Cyberjaya, Selangor",
        type: "Full-time",
        summary:
            "Architect and harden enterprise network infrastructure for clients across banking, government and telco sectors.",
        responsibilities: [
            "Design, deploy and troubleshoot routing, switching and firewall infrastructure for enterprise clients.",
            "Conduct network resilience and vulnerability assessments, and document remediation plans.",
            "Implement security controls aligned to client compliance frameworks including BNM RMiT.",
            "Provide escalation support for complex incidents across the managed services team.",
        ],
        requirements: [
            "Degree in Computer Science, IT, Network Engineering or related field.",
            "3+ years hands-on with enterprise networking and security appliances.",
            "CCNP, PCNSE, Fortinet NSE or equivalent certification preferred.",
            "Familiarity with TVRA and network resilience assessment methodology is a plus.",
        ],
    },
    {
        key: "project-manager",
        title: "Project Manager, Critical Facilities",
        department: "Data Center Engineering & Consultancy",
        location: "Cyberjaya, Selangor",
        type: "Full-time",
        summary:
            "Own delivery of data center build and upgrade projects end to end — scope, schedule, budget and client relationship.",
        responsibilities: [
            "Lead project delivery from kickoff through handover, managing scope, schedule, cost and risk.",
            "Coordinate multi-disciplinary teams of engineers, contractors and equipment suppliers.",
            "Serve as the primary client contact, running progress reviews and reporting on milestones.",
            "Drive site safety compliance and quality assurance throughout the construction phase.",
        ],
        requirements: [
            "Degree in Engineering, Construction Management or related discipline.",
            "5+ years managing infrastructure or data center projects.",
            "Strong command of project scheduling tools and contract administration.",
            "PMP certification is an advantage.",
        ],
    },
    {
        key: "msp-support-engineer",
        title: "Managed Services Support Engineer",
        department: "Managed Service Provider",
        location: "Kemaman, Terengganu",
        type: "Full-time",
        summary:
            "Keep client infrastructure running around the clock through proactive monitoring, maintenance and rapid incident response.",
        responsibilities: [
            "Monitor client infrastructure and respond to incidents within agreed service levels.",
            "Perform preventive maintenance on facility and IT systems at client sites.",
            "Document root cause analysis and maintain accurate asset and configuration records.",
            "Escalate and coordinate with specialist teams on complex technical issues.",
        ],
        requirements: [
            "Diploma or Degree in Engineering, IT or a related technical field.",
            "1–3 years in a technical support, NOC or field service role.",
            "Willingness to work on a shift or on-call rotation.",
            "Based in or willing to relocate to Terengganu.",
        ],
    },
];
