export type ServiceCapability = {
    title: string;
    description: string;
    items?: string[];
};

export type ServiceOutcome = {
    label: string;
    description: string;
};

export type ServiceDetail = {
    key: string;
    acronym: string;
    title: string;
    tagline: string;
    overview: string[];
    image: string;
    capabilities: ServiceCapability[];
    outcomes: ServiceOutcome[];
};

export const serviceDetails: ServiceDetail[] = [
    {
        key: "dcec",
        acronym: "DCEC",
        title: "Data Center Engineering & Consultancy",
        tagline:
            "Independent engineering and advisory across the full facility lifecycle.",
        image: "/images/projects/project3.jpg",
        overview: [
            "Mission-critical facilities fail at the seams — the untested transfer, the undocumented dependency, the capacity assumption nobody revisited. Our engineering and consultancy practice exists to find those seams before they find you.",
            "We work across the full lifecycle: assessing existing facilities, closing the gaps we find, and guiding new builds from concept design through commissioning and into steady-state operation.",
        ],
        capabilities: [
            {
                title: "Resiliency & Risk Assessment (DCRA) & Network (NRA)",
                description:
                    "We trace every power, cooling and connectivity path through your facility to identify single points of failure, then quantify the operational risk each one carries. Assessments can be aligned to regulatory frameworks such as Bank Negara Malaysia's RMiT where your sector requires it.",
            },
            {
                title: "Auditing & Certification (TIA & Uptime)",
                description:
                    "We prepare facilities for third-party certification against TIA-942 and Uptime Institute standards — conducting the pre-audit review, organising evidence and drawings, and closing gaps so the formal audit holds no surprises.",
            },
            {
                title: "Gap Analysis & Capacity Planning",
                description:
                    "We measure installed capacity against real consumption and projected demand, so you know exactly how much power, cooling and floor space you have left before the next expansion forces the question.",
            },
            {
                title: "Design, Build & Operate",
                description:
                    "End-to-end delivery for new builds and retrofits: concept and detailed design, tender support, construction oversight, and commissioning through to operational handover.",
            },
            {
                title: "White-space Optimization",
                description:
                    "Rack layout, airflow containment and power density planning that reclaim usable capacity from the floor you already have, often deferring capital spend on new space.",
            },
        ],
        outcomes: [
            {
                label: "Fewer single points of failure",
                description:
                    "Resilience gaps identified, documented and closed before they become downtime.",
            },
            {
                label: "Audit-ready documentation",
                description:
                    "Evidence, drawings and procedures organised to the standard your certifier or regulator expects.",
            },
            {
                label: "Capacity you can plan against",
                description:
                    "A defensible view of remaining headroom in power, cooling and white space.",
            },
        ],
    },
    {
        key: "inc",
        acronym: "INC",
        title: "IT Infrastructure, Networks & Cybersecurity",
        tagline:
            "Enterprise infrastructure, networking and security, designed and delivered as one system.",
        image: "/images/solutions/cable.png",
        overview: [
            "Infrastructure procured in isolation tends to integrate badly. We plan, source and deploy the compute, network, facility and security layers together, so the result behaves as one system rather than a collection of purchases.",
            "That covers everything from the structured cabling in the floor to the firewall rules at the edge — specified, installed, migrated and handed over by a single accountable team.",
        ],
        capabilities: [
            {
                title: "Procurement, Leasing, Integration & Migration",
                description:
                    "Specification, sourcing and commercial structuring for enterprise hardware, followed by integration and migration from existing environments with minimal service interruption.",
                items: [
                    "Server, storage and network hardware",
                    "Laptops, workstations, printers and peripherals",
                ],
            },
            {
                title: "Structured Cabling",
                description:
                    "Standards-compliant copper and fiber cabling systems, properly labelled and documented, engineered for the density and future expansion your facility actually needs.",
            },
            {
                title: "Power & Cooling Solutions",
                description:
                    "UPS, distribution and precision cooling sized to real load profiles, with the redundancy topology matched to the availability your operations require.",
            },
            {
                title: "Fire Suppression Systems",
                description:
                    "Detection and suppression appropriate to occupied technical spaces, integrated with facility monitoring and specified to meet local regulatory requirements.",
            },
            {
                title: "Enterprise Networking",
                description:
                    "Campus, data center and branch network architecture — routing, switching and segmentation designed for resilience and clean operational troubleshooting.",
            },
            {
                title: "Cybersecurity Solutions",
                description:
                    "Layered technical controls deployed and tuned to your environment, with policy and segmentation built to contain incidents rather than merely detect them.",
                items: [
                    "Next-generation firewalls",
                    "Network Access Control (NAC)",
                    "Intrusion detection and prevention (IDS/IPS)",
                ],
            },
            {
                title: "Access Point (AP) & Wi-Fi Deployment",
                description:
                    "Site-surveyed wireless design and deployment delivering predictable coverage and capacity across offices, warehouses and technical floors.",
            },
        ],
        outcomes: [
            {
                label: "One accountable partner",
                description:
                    "Facility, network and security scope handled together instead of split across vendors.",
            },
            {
                label: "Migrations without surprises",
                description:
                    "Cutovers planned, rehearsed and executed inside agreed maintenance windows.",
            },
            {
                label: "Security built in",
                description:
                    "Controls designed into the architecture rather than bolted on after handover.",
            },
        ],
    },
    {
        key: "msp",
        acronym: "MSP",
        title: "Managed Service Provider",
        tagline:
            "SLA-backed operations that keep critical systems running, day and night.",
        image: "/images/solutions/monitor.png",
        overview: [
            "Most infrastructure problems are visible well before they cause an outage — if somebody is watching, and if somebody is accountable for acting. Our managed services provide both, under service levels you can hold us to.",
            "Engagements range from scheduled preventive maintenance through to a full 24/7 monitored operation, structured as monthly retainers so the cost is predictable and the coverage is continuous.",
        ],
        capabilities: [
            {
                title: "SLA-based Data Center & IT Support",
                description:
                    "Defined response and resolution targets covering both facility and IT layers, with escalation paths agreed in advance rather than improvised during an incident.",
                items: [
                    "Data Center Operation (DCO)",
                    "IT Operation (ITO)",
                ],
            },
            {
                title: "Preventive Maintenance",
                description:
                    "Scheduled inspection and servicing on a documented calendar, catching degradation in redundant systems while the redundancy is still there to protect you.",
                items: [
                    "Server room systems",
                    "Utilities and M&E infrastructure",
                ],
            },
            {
                title: "Remote Monitoring (24/7 NOC model)",
                description:
                    "Continuous monitoring of critical infrastructure with alarm triage and first-line response, so overnight events are handled rather than discovered the next morning.",
            },
            {
                title: "Monthly Retainer Arrangements",
                description:
                    "Predictable monthly engagement covering an agreed scope of operational support, sized to your environment instead of billed reactively per incident.",
            },
            {
                title: "Software Renewals",
                description:
                    "Tracking and renewal of licences, subscriptions and support contracts, so nothing critical lapses quietly at the worst possible moment.",
            },
            {
                title: "Co-location Services",
                description:
                    "Facility space with the operational support wrapped around it, for workloads that belong outside your own premises.",
            },
        ],
        outcomes: [
            {
                label: "Issues caught early",
                description:
                    "Continuous monitoring turns would-be outages into scheduled maintenance.",
            },
            {
                label: "Predictable operating cost",
                description:
                    "Retainer-based coverage instead of unbudgeted emergency callouts.",
            },
            {
                label: "Accountability in writing",
                description:
                    "Response and resolution commitments defined in the SLA, not left to goodwill.",
            },
        ],
    },
    {
        key: "cds",
        acronym: "CDS",
        title: "Cloud & Digital Solutions",
        tagline:
            "Cloud migration, automation and operational visibility for infrastructure teams.",
        image: "/images/solutions/complete-solution.png",
        overview: [
            "Cloud adoption rarely replaces the data center outright — it sits alongside it. The practical challenge is running both without doubling the operational effort or losing sight of what is happening where.",
            "We handle migration onto the major platforms, automate the repetitive operational work, and give your team a single view across the hybrid estate.",
        ],
        capabilities: [
            {
                title: "Cloud Migration",
                description:
                    "Workload assessment, migration planning and execution onto the major hyperscale platforms, with the sequencing and rollback plans worked out before anything moves.",
                items: [
                    "Amazon Web Services (AWS)",
                    "Microsoft Azure",
                    "Google Cloud",
                    "Huawei Cloud",
                ],
            },
            {
                title: "Virtualization",
                description:
                    "Consolidation of physical estates onto virtualized platforms, recovering rack space, power and licensing cost while simplifying recovery.",
            },
            {
                title: "Data Center Automation Tools",
                description:
                    "Automation of provisioning, configuration and routine operational tasks, removing the manual steps where human error tends to enter.",
            },
            {
                title: "Monitoring Solutions",
                description:
                    "Unified monitoring across on-premise and cloud resources, with alerting tuned to surface genuine problems rather than background noise.",
            },
            {
                title: "Custom Dashboards & Lightweight In-house Tools",
                description:
                    "Purpose-built dashboards and internal tools for the reporting your team actually needs, built when off-the-shelf products would be excessive.",
            },
        ],
        outcomes: [
            {
                label: "Migration without disruption",
                description:
                    "Workloads move on a planned sequence with tested rollback at every stage.",
            },
            {
                label: "Less manual operational work",
                description:
                    "Repetitive tasks automated, freeing your team for work that needs judgement.",
            },
            {
                label: "One view of the estate",
                description:
                    "On-premise and cloud resources visible together, in the same place.",
            },
        ],
    },
    {
        key: "dcps",
        acronym: "DCPS",
        title: "Data Center Procurement Specialist",
        tagline:
            "Worldwide sourcing and end-to-end supply chain for data center operations.",
        image: "/images/projects/project1.jpg",
        overview: [
            "Data center work stalls on the item nobody could source in time — a discontinued breaker, a specialised fiber tool, a CRAC spare with a twelve-week lead time. We source those items worldwide and get them to site.",
            "The scope runs from identifying the right supplier through to customs, logistics and delivery, covering everyday operational consumables as much as high-value electrical and mechanical goods.",
        ],
        capabilities: [
            {
                title: "Worldwide Equipment & Tool Sourcing",
                description:
                    "Identification and qualification of suppliers globally for equipment and tools that are difficult to source locally, including specialised and long-lead items.",
                items: [
                    "Supplier identification and vendor management",
                    "Logistics management and customs coordination",
                    "End-to-end supply chain visibility through to site delivery",
                ],
            },
            {
                title: "Daily Operations & Tools",
                description:
                    "The consumables and equipment that keep technical teams working — stocked and replenished so work is never held up waiting on a purchase order.",
                items: [
                    "Hand tools (electrical, mechanical and fiber)",
                    "Test and measurement equipment",
                    "PPE and safety gear",
                    "Ladders, rack accessories and fasteners",
                    "Consumables (labels, cable ties, tapes and similar)",
                ],
            },
            {
                title: "Electrical & Mechanical Goods",
                description:
                    "High-value electrical and mechanical components sourced to specification, with the documentation and compliance paperwork your facility requires on delivery.",
                items: [
                    "Cables (power, fiber and copper)",
                    "Busway components",
                    "ATS, distribution panels and breakers",
                    "CRAC/CRAH spares",
                ],
            },
        ],
        outcomes: [
            {
                label: "Access to global supply",
                description:
                    "Hard-to-source and long-lead items located beyond the local market.",
            },
            {
                label: "One point of contact",
                description:
                    "Sourcing, logistics and delivery coordinated by a single team.",
            },
            {
                label: "Site-ready delivery",
                description:
                    "Equipment arriving on schedule, to specification, with paperwork in order.",
            },
        ],
    },
];

export function getServiceDetail(key: string): ServiceDetail | undefined {
    return serviceDetails.find((service) => service.key === key);
}
