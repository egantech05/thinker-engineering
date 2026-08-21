export type CaseStudyStat = {
    value: string;
    label: string;
};

export type ExperienceCaseStudy = {
    key: string;
    sector: string;
    title: string;
    projectType: string;
    client: string;
    image: string;
    requirement: string[];
    scope: string[];
    challenge: string[];
    approach: string[];
    outcomeStats?: CaseStudyStat[];
    outcomes: string[];
    confidentiality: string;
};

export const caseStudies: ExperienceCaseStudy[] = [
    {
        key: "hyperscale-dc",
        sector: "Hyperscale Data Center / Co-location Providers",
        title: "Sourcing specialised equipment worldwide for a hyperscale operator in Malaysia",
        projectType: "Data Center Procurement Specialist (DCPS)",
        client: "A top ten global data center company with operations in Malaysia",
        image: "/images/projects/project1.jpg",
        requirement: [
            "The client needed specialised tools and high-value equipment procured from suppliers around the world. Delivery into Malaysia depended on well-managed logistics and a supply chain capable of moving those goods safely to site.",
        ],
        scope: [
            "Sourcing and procurement of tools and high-value equipment",
            "Freight and logistics coordination",
            "Testing, inspection and quality assurance",
            "Single point of contact for warranty and default liability arrangements",
        ],
        challenge: [
            "Working across a worldwide supply chain required detailed coordination on many fronts at once, among them currency exchange, technical specifications, logistics routing and customs clearance.",
        ],
        approach: [
            "Thinker Engineering planned the work in controlled stages. Partnerships with global companies gave the client access to worldwide supplier connections and reliable inventory availability.",
            "Communication with the client was maintained throughout, so that any change in the operation was raised early and resolved before it could affect delivery.",
        ],
        outcomeStats: [
            { value: "95%", label: "On-time delivery within the agreed period" },
            { value: "100%", label: "Specification compatibility" },
        ],
        outcomes: [
            "Minimal unplanned disruption to the client's operations",
        ],
        confidentiality:
            "Client identity, exact location and selected technical details are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "it-infrastructure",
        sector: "IT Infrastructure, Networks & Cybersecurity",
        title: "Rebuilding a legacy server room as a modern TIA-942 compliant facility",
        projectType: "IT Infrastructure, Networks & Cybersecurity (INC)",
        client: "A top ten data center company in Asia",
        image: "/images/projects/project2.jpg",
        requirement: [
            "The client required an engineering assessment together with project execution works to retrofit an ageing server room and rebuild it as a modern facility.",
        ],
        scope: [
            "Pre-work assessment and planning",
            "Project management for site execution",
            "Testing and commissioning of the new server room",
            "Complete project report and handover documentation",
        ],
        challenge: [
            "The work involved managing several vendors at once against a tight schedule. The starting condition of the server room added further difficulty, since it carried a legacy setup and drawings that had not been kept up to date.",
        ],
        approach: [
            "Thinker Engineering drew on a network of local partners, each bringing its own area of specialisation. That combination kept delivery smooth and held the project within budget.",
        ],
        outcomeStats: [
            { value: "TIA-942", label: "Standard met by the rebuilt server room" },
            { value: "4", label: "Vendors coordinated across multiple stakeholders" },
        ],
        outcomes: [
            "A complete revamp turning a legacy setup into a modern facility",
            "Avoidable rework reduced through constant on-site inspection and careful planning",
            "Successful testing and commissioning leading to client acceptance",
        ],
        confidentiality:
            "Client identity, exact location and selected technical details are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "bfsi",
        sector: "Banking, Financial Services & Insurance",
        title: "RMiT aligned risk assessments for banks and financial institutions in Malaysia",
        projectType: "Data Center Engineering & Consultancy (DCEC)",
        client:
            "Six of the top twenty banks in Malaysia, alongside international banks and financial institutions based in the country",
        image: "/images/projects/project4.jpg",
        requirement: [
            "The clients required a Data Center Risk Assessment carried out against Bank Negara Malaysia's Risk Management in Technology framework, covering both server rooms and data center infrastructure.",
            "Threat and Vulnerability Risk Assessment and Network Resilience Assessment were required alongside it.",
        ],
        scope: [
            "Pre-work assessment and planning",
            "Technical coordination with site representatives",
            "Drawing review and site assessment works",
            "Network Risk Assessment (NRA)",
            "Threat & Vulnerability Risk Assessment (TVRA)",
            "Complete DCRA report and handover documentation",
            "DCRA report presentation",
        ],
        challenge: [
            "The work demanded disciplined execution in environments where access, downtime, safety and sequencing all had to be carefully controlled.",
            "Each client also presented a different set of conditions, so every assessment had to be tailored to its own requirements.",
        ],
        approach: [
            "Thinker Engineering applied in-house specialists familiar with the specific demands of RMiT. A comprehensive reporting template gave each client a clear and detailed understanding of their assessment findings.",
        ],
        outcomeStats: [
            { value: "100%", label: "Report compliance with the latest RMiT standards" },
            { value: "100%", label: "Compliance with TIA-942 data center best practice" },
        ],
        outcomes: [
            "A clear DCRA report suitable for presentation to senior management and C-suite stakeholders",
        ],
        confidentiality:
            "Client identity, exact location and selected technical details are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "glc",
        sector: "Government-Linked Companies",
        title: "Centralised procurement and supply chain management for data centre operations",
        projectType: "Data Centre Procurement and Supply Chain Management",
        client: "Malaysian telecommunications and oil and gas companies",
        image: "/images/projects/project5.jpg",
        requirement: [
            "The client required a dependable procurement specialist able to source, coordinate and deliver data centre equipment, tools, consumables and supporting infrastructure in line with operational and project requirements.",
        ],
        scope: [
            "Worldwide sourcing of desired equipment and tools",
            "Procurement planning and supplier coordination",
            "End-to-end logistics management",
            "Supply chain coordination",
            "Delivery tracking and status reporting",
            "Sourcing of electrical and mechanical goods",
            "Sourcing of power, fibre and copper cables",
            "Sourcing of data centre tools and test equipment",
            "PPE and safety gear procurement",
            "Racks, accessories, fasteners and consumables",
            "Equipment and material coordination for daily operations",
        ],
        challenge: [
            "Sourcing covered many categories of equipment and operational material drawn from different suppliers in different locations. Availability, compatibility, delivery timing and logistics coordination all had to be managed carefully to avoid delaying the client's operations.",
        ],
        approach: [
            "Thinker Engineering managed the process from requirement identification through supplier sourcing, purchasing, logistics coordination and delivery.",
            "The team focused on matching required specifications to suitable products, while maintaining clear communication and visibility of delivery status throughout.",
        ],
        outcomes: [
            "Centralised procurement support for data centre operational requirements",
            "Improved coordination between the client, suppliers and logistics providers",
            "More efficient sourcing of specialised equipment and tools",
            "Better visibility of procurement and delivery status",
            "Reduced procurement complexity for the client's operational team",
            "End-to-end supply chain support from sourcing through to delivery",
        ],
        confidentiality:
            "Selected supplier names, pricing, equipment specifications, delivery locations and commercial terms are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "oil-gas",
        sector: "Oil & Gas",
        title: "SLA-based managed services for critical infrastructure in an oil and gas environment",
        projectType: "SLA-based Data Centre & IT Managed Services",
        client: "An exploration and production oil and gas company in Malaysia",
        image: "/images/projects/project6.jpg",
        requirement: [
            "The client required dependable IT and data centre support to maintain the availability, reliability and operational performance of its critical technology infrastructure.",
        ],
        scope: [
            "SLA-based data centre and IT support",
            "IT operation support",
            "Server room support",
            "Remote monitoring and technical support",
            "Troubleshooting and incident response",
            "Monthly reporting",
            "Software renewal and support coordination",
        ],
        challenge: [
            "Critical infrastructure in an oil and gas operating environment calls for disciplined and dependable support. Technical issues had to be identified and addressed promptly, while maintenance activities had to be planned carefully so that operational disruption stayed minimal.",
        ],
        approach: [
            "Thinker Engineering provided structured managed services built around agreed service level requirements. The team supported the client through preventive maintenance, operational monitoring, technical coordination and timely response to reported issues.",
            "The focus throughout was on maintaining system availability, reducing avoidable failures and keeping communication clear with the client's operational team.",
        ],
        outcomes: [
            "Continuous technical support based on agreed SLA requirements",
            "Improved visibility of data centre and IT infrastructure conditions",
            "More structured preventive maintenance activities",
            "Faster coordination for technical issues and service requests",
            "Better operational readiness through regular monitoring and reporting",
            "Improved support for the client's critical business operations",
        ],
        confidentiality:
            "Client identity, exact location, infrastructure configuration and selected operational details are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "government",
        sector: "Government",
        title: "Structured IT support and preventive maintenance for a public sector office",
        projectType: "SLA-based IT and Data Centre Managed Services",
        client: "A state health department in Malaysia",
        image: "/images/projects/project4.jpg",
        requirement: [
            "The client required reliable IT infrastructure for its offices, together with support that would maintain the availability and operational performance of its technology infrastructure and supporting facilities.",
        ],
        scope: [
            "SLA-based IT support",
            "IT operation support",
            "Preventive maintenance",
            "Server room support",
            "Remote monitoring and technical support",
            "Incident response and troubleshooting",
            "Routine inspection and reporting",
            "Technical documentation and service review",
        ],
        challenge: [
            "Consistent technical support was needed within a public sector environment where service continuity, accountability, proper documentation and coordination with authorised personnel were all essential.",
        ],
        approach: [
            "Thinker Engineering implemented a structured support and maintenance programme built around the client's agreed requirements.",
            "The team coordinated with the relevant representatives to monitor infrastructure conditions, carry out preventive maintenance and respond to technical issues in a controlled and well documented manner.",
        ],
        outcomes: [
            "Reliable IT support based on agreed service requirements",
            "Improved maintenance planning and infrastructure monitoring",
            "Better visibility of technical issues and the corrective actions required",
            "More organised reporting and service documentation",
            "Reduced risk of avoidable operational disruption through preventive maintenance",
        ],
        confidentiality:
            "Client identity, exact location, infrastructure configuration and selected operational details are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "telco",
        sector: "Telecommunication",
        title: "Assessing infrastructure resiliency and readiness for a national telecommunications operator",
        projectType: "Data Centre Engineering & Consultancy",
        client: "One of the top five telecommunications companies in Malaysia",
        image: "/images/projects/project1.jpg",
        requirement: [
            "The client required data centre engineering and consultancy support to assess infrastructure resiliency, identify potential risks and improve the overall readiness of its data centre environment.",
        ],
        scope: [
            "Pre-work assessment and planning",
            "Technical coordination with site representatives",
            "Data Centre Risk Assessment (DCRA)",
            "Network Risk Assessment (NRA)",
            "Drawing review and site assessment works",
            "Data centre resiliency and risk review",
            "Gap analysis against relevant standards and requirements",
            "Capacity planning and infrastructure review",
            "Complete assessment report and handover documentation",
            "Assessment report presentation to management",
        ],
        challenge: [
            "The assessment covered critical data centre and network infrastructure inside a live telecommunications environment. Resiliency, availability, capacity, operational risk and the client's own technical requirements all had to be weighed together.",
        ],
        approach: [
            "Thinker Engineering applied an in-house specialist approach supported by a structured assessment methodology and a comprehensive reporting template. The assessment was tailored to the client's infrastructure, operating environment and business requirements.",
            "Findings were presented clearly, so that management could act on them when planning future improvements.",
        ],
        outcomes: [
            "Clear visibility of data centre and network infrastructure risks",
            "Identification of gaps, improvement areas and operational priorities",
            "Structured recommendations for resiliency and capacity improvement",
            "A comprehensive assessment report for both technical and management review",
            "Clear presentation of findings to support future planning and investment decisions",
            "Improved understanding of infrastructure readiness and risk exposure",
        ],
        confidentiality:
            "Client identity, exact location, network architecture and selected technical details are withheld for reasons of commercial confidentiality.",
    },
    {
        key: "coop",
        sector: "Cooperative (Co-op) Organisations",
        title: "Digital and AI solutions bringing operational visibility to a cooperative organisation",
        projectType: "Cloud & Digital Solutions Implementation",
        client: "A top twenty cooperative organisation in Malaysia",
        image: "/images/projects/project3.jpg",
        requirement: [
            "The client required digital AI solutions to improve the management, monitoring and operational visibility of its technology environment, with particular attention to its member group.",
        ],
        scope: [
            "AI system and performance monitoring",
            "Custom dashboards",
            "Lightweight in-house digital tools",
            "Technical coordination and implementation support",
            "Documentation, knowledge transfer and handover",
        ],
        challenge: [
            "The work called for practical digital AI solutions that would support the client's operations and serve the needs of its group members without introducing unnecessary complexity.",
            "The result also had to improve visibility of business performance and simplify management reporting.",
        ],
        approach: [
            "Thinker Engineering began by assessing the client's existing environment, operational requirements and future needs. A practical digital AI solution was then designed around visibility, scalability, ease of use and long-term maintainability.",
            "Where appropriate, monitoring tools and customised dashboards presented important information in a clearer and more useful format.",
        ],
        outcomes: [
            "Improved visibility of system performance",
            "More organised monitoring and operational reporting",
            "Better support for future digital expansion",
            "Simplified access to important operational information",
            "Improved decision making through clearer dashboards and reporting",
            "Practical digital solutions aligned with the client's operational requirements",
        ],
        confidentiality:
            "Client identity, exact location, cloud architecture, system configuration and selected technical details are withheld for reasons of commercial confidentiality.",
    },
];

export function getCaseStudy(key: string): ExperienceCaseStudy | undefined {
    return caseStudies.find((study) => study.key === key);
}

export function hasCaseStudy(key: string): boolean {
    return caseStudies.some((study) => study.key === key);
}
