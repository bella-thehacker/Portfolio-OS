
import {
  ProjectItem,
  SecurityArtifact,
  SecurityTimelineEvent,
  FileItem,
} from '../types';

export const USER_INFO = {
  name: "Ivy Mburu",

  title: "Computer Science Student & Full-Stack / Front-End Developer",

  summary:
    "Detail-oriented Computer Science student and Full-Stack Developer with practical experience building and maintaining web applications using Python, Flask, JavaScript, TypeScript, React, Node.js, and SQL. Experienced in troubleshooting software issues, debugging application logic, managing databases, and developing secure user-focused systems. Passionate about transitioning into the cybersecurity domain, with a proven focus on secure platform development, role-based access control (RBAC), and patient data privacy. Eager to leverage strong problem-solving skills, logical reasoning, and software engineering to excel in the Cyber Shujaa Women in Cybersecurity Bootcamp and earn the Cisco SOC Analyst certification.",

  location: "Nairobi, Kenya",

  university: "Catholic University of Eastern Africa (CUEA)",

  degree:
    "Bachelor of Mathematics and Computer Science (January 2024 – November 2027)",

  foundation:
    "Flatiron School / Moringa School — Full Stack Software Development (Python with Flask & JavaScript)",

  highSchool:
    "Alliance Girls' High School — KCSE (January 2020 – November 2023)",

  email: "ivymburu00@gmail.com",

  phone: "+254 712 063 152",

  phoneRaw: "+254712063152",

  github: "https://github.com/bella-thehacker",

  linkedin: "https://www.linkedin.com/in/ivy-mburu/",

  roles: [
    "Software Developer",
    "Computer Science Student",
    "Cybersecurity Journey",
  ],

  companyBrand: "CTRL Code Solutions",

  statusLine:
    "Software Developer & CS Student &bull; Full-Stack &bull; Cybersecurity &bull; Cisco SOC Analyst Path",
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "pawned",

    title: "Pawned",

    name: "Pawned",

    fileName: "PAWNED.EXE",

    category: "Games",

    type: "Retro Chess Application",

    status: "ACTIVE",

    description:
      "A retro chess application and tactical chess platform built with turn-based board mechanics, piece capture tracking, algebraic move logs, and vintage computer visual aesthetic.",

    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Game Engine Loop",
    ],

    whatIBuilt:
      "Engineered the 8x8 matrix board state engine, legal move calculation for pawns, knights, bishops, rooks, queens, and kings, piece capture counters, algebraic notation, and retro computer styling.",

    challenges:
      "Handling check conditions, board coordinates, and real-time turn-based state without heavy third-party chess wrappers.",

    lessons:
      "Board evaluation algorithms, immutable state updates in rapid user interactions, and nostalgic UI design.",

    previewImage: "/pawned.gif",

    liveUrl: "https://pawned-retro-chess-app-lgh5.vercel.app/",

    buttonLabel: "OPEN PAWNED",

    githubUrl: "https://github.com/bella-thehacker",
  },

  {
    id: "weather-ghost",

    title: "Weather Ghost",

    name: "Weather Ghost",

    fileName: "WEATHER_GHOST.EXE",

    category: "Web Application",

    type: "Emotional Meteorology Application",

    status: "ACTIVE",

    description:
      "An evocative weather application that interprets atmospheric metrics (temperature, barometric pressure, precipitation, cloud cover) into human emotional landscapes.",

    technologies: [
      "React",
      "TypeScript",
      "Weather API Integration",
      "Dynamic Theme Engine",
    ],

    whatIBuilt:
      "Synthesized weather data parsing into distinct emotional profiles: Melancholic (cool drizzle), Euphoric (warm clear skies), Somber (overcast stillness), Tempestuous (thunderstorms), and Introspective (foggy mornings).",

    challenges:
      "Mapping non-linear numerical weather patterns into nuanced emotional copywriting and responsive visual themes.",

    lessons:
      "User psychological connection to data visualization, qualitative data translation, and responsive interface design.",

    previewImage: "/weatherghost.gif.gif",

    liveUrl: "https://weather-ghost-3sne.vercel.app/",

    buttonLabel: "OPEN WEATHER GHOST",

    githubUrl: "https://github.com/bella-thehacker",
  },

  {
    id: "ctrl-code-solutions",

    title: "CTRL Code Solutions",

    name: "CTRL Code Solutions",

    fileName: "CTRL_CODE.EXE",

    category: "Website",

    type: "Software Studio Digital Platform",

    status: "ACTIVE",

    description:
      "The primary digital platform for CTRL Code Solutions, Ivy's software development studio delivering bespoke web applications, digital artifacts, and software solutions.",

    technologies: ["React", "Vite", "Tailwind CSS", "TypeScript"],

    whatIBuilt:
      "Digital artifacts showcase, typography-focused retro brutalist aesthetic, interactive showcase items, client service offerings, and project contact channels.",

    challenges:
      "Balancing high-contrast brutalist retro aesthetics with effortless navigation and lightning-fast load times.",

    lessons:
      "Creative web design, studio identity positioning, and frontend craftsmanship.",

    previewImage: "/ctrl.gif",

    liveUrl: "https://ctrl-blue.vercel.app/",

    buttonLabel: "OPEN CTRL CODE SOLUTIONS",

    githubUrl: "https://github.com/bella-thehacker",
  },

  {
    id: "pawned-chess-puzzles",

    title: "Pawned Chess Puzzles",

    name: "Pawned Chess Puzzles",

    fileName: "PAWNED_PUZZLES.EXE",

    category: "Games",

    type: "Tactical Chess Problem Solver",

    status: "ACTIVE",

    description:
      "A focused tactical chess puzzle application where players analyze board archives to discover decisive winning moves, back-rank blasts, and checkmates.",

    technologies: ["React", "TypeScript", "Chess Problem Parser"],

    whatIBuilt:
      "Curated tactical puzzle sets, move validation logic that confirms correct solutions, back-rank mate solvers, hint systems, and progress tracking.",

    challenges:
      "Validating non-standard moves and evaluating user move attempts accurately against puzzle target positions.",

    lessons:
      "Algorithmic move validation, interactive problem-solving feedback loops, and touch-friendly chess navigation.",

    previewImage: "/retro-puzzles.gif",

    liveUrl: "https://pawned-chess-puzzles.vercel.app/",

    buttonLabel: "OPEN CHESS PUZZLES",

    githubUrl: "https://github.com/bella-thehacker",
  },

  {
    id: "static-xo",

    title: "Static XO",

    name: "Static XO",

    fileName: "STATIC_XO.EXE",

    category: "Games",

    type: "Retro Pixel Tic-Tac-Toe",

    status: "ACTIVE",

    description:
      "An arcade cyber-grid recreation of classic Tic-Tac-Toe featuring cyber neon styling, synthetic signal syncing, audio feedback, and score tracking.",

    technologies: [
      "TypeScript",
      "React",
      "Cyber Grid UI",
      "Web Audio API",
    ],

    whatIBuilt:
      "Signal synchronization engine, interactive cyber-grid board with glowing CRT visuals, move detection, audio cues, and win-state celebrations.",

    challenges:
      "Crafting a responsive, neon cyber aesthetic that operates smoothly across both mobile and desktop screens.",

    lessons:
      "State machine structuring, micro-sound choreography, and retro arcade UI design.",

    previewImage: "/static.gif",

    liveUrl: "https://static-xo.vercel.app/",

    buttonLabel: "OPEN STATIC XO",

    githubUrl: "https://github.com/bella-thehacker",
  },

  {
    id: "lifeline-hospital",

    title: "Lifeline Hospital Management System",

    name: "Lifeline Hospital Management System",

    fileName: "LIFELINE.SYS",

    category: "Management System",

    type: "Healthcare Platform & RBAC Security",

    status: "ACTIVE",

    description:
      "A secure healthcare management platform engineered with strict patient data privacy, role-based access control (RBAC), and separated operational environments for Administrators, Doctors, and Staff.",

    technologies: [
      "React",
      "Flask",
      "SQL",
      "Node.js",
      "RBAC",
      "REST APIs",
    ],

    whatIBuilt:
      "Architected platform with strict focus on protecting sensitive patient data. Implemented role-based boundaries creating independent operational environments for Admin, Staff, and Doctor tiers to prevent unauthorized privilege escalation. Engineered separate dashboard logic and workflows for secure data isolation and integrity.",

    challenges:
      "Preventing privilege escalation, ensuring multi-tiered access control rules, and debugging user permission workflows across relational database operations.",

    lessons:
      "Data confidentiality in healthcare systems, granular role authorization, and defensive application architecture.",

    previewImage: "/lifeline.gif",

    liveUrl:
      "https://life-line-hospital-mangement-system.vercel.app/",

    buttonLabel: "OPEN LIFELINE",

    githubUrl: "https://github.com/bella-thehacker",
  },

  

  {
    id: "drive-noble",

    title: "Drive Noble",

    name: "Drive Noble",

    fileName: "DRIVE_NOBLE.EXE",

    category: "Website",

    type: "Automotive Dealership Platform",

    status: "ACTIVE",

    description:
      "A commercial digital showroom and vehicle inventory management platform for Drive Noble car dealership, engineered for responsive performance and high lead conversion.",

    technologies: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Responsive UI",
    ],

    whatIBuilt:
      "Vehicle catalog with dynamic filters, best seller showcases, specification sheets, test-drive booking workflows, and responsive video header integration.",

    challenges:
      "Optimizing vehicle imagery and complex automotive specifications across varying device viewports.",

    lessons:
      "Real-world client stakeholder communication, brand fidelity, and conversion-focused automotive design.",

    previewImage: "/drivenoble.gif",

    liveUrl: "https://drive-noble.vercel.app/",

    buttonLabel: "OPEN DRIVE NOBLE",

    githubUrl: "https://github.com/bella-thehacker",
  },
];

export const SECURITY_ARTIFACTS: SecurityArtifact[] = [
  {
    id: "cyber-shujaa",

    title: "Cyber Shujaa — Cloud & Network Security Program",

    environment: "Dedicated Security Academy",

    type: "Specialized Training & Practical Labs",

    status: "ACTIVE",

    description:
      "Rigorous cybersecurity training program focusing on hands-on defensive and offensive concepts across modern enterprise networks and cloud architectures.",

    findings: [
      "In-depth TCP/IP packet dissection and network protocol anomalies.",
      "Linux server hardening, user access controls (RBAC/sudo), and audit logs.",
      "Cloud perimeter security, firewall rule configuration, and zero-trust concepts.",
      "Hands-on vulnerability scanning and remediation methodologies.",
    ],

    toolsUsed: [
      "Wireshark",
      "Cisco Packet Tracer",
      "Ubuntu Linux",
      "Kali Linux",
      "Bash Scripting",
      "Nmap",
      "OpenSSL",
    ],
  },

  {
    id: "wireshark-lab",

    title: "Wireshark Packet Analysis Artifact",

    environment: "Ubuntu Desktop / Linux Host",

    type: "Packet Analysis & Traffic Inspection",

    status: "COMPLETED",

    description:
      "Capturing and analyzing live network frames to understand transport-layer conversations, TCP 3-way handshakes, DNS resolution queries, and unencrypted HTTP transactions.",

    findings: [
      "Observed TCP SYN -> SYN-ACK -> ACK handshake sequences and sequence number tracking.",
      "Identified cleartext transmission hazards in HTTP GET/POST headers.",
      "Filtered network traffic using BPF (Berkeley Packet Filter) syntax (e.g., ip.addr == X and tcp.port == 80).",
      "Reconstructed TCP streams to audit data payloads and protocol headers.",
    ],

    toolsUsed: [
      "Wireshark 4.x",
      "Ubuntu Terminal",
      "tcpdump",
      "Network Interfaces (eth0/wlan0)",
    ],

    rawLogPreview: `Frame 1: 74 bytes on wire (592 bits), 74 bytes captured
Ethernet II, Src: 00:1a:2b:3c:4d:5e, Dst: 00:11:22:33:44:55
Internet Protocol Version 4, Src: 192.168.1.42, Dst: 104.21.32.18
Transmission Control Protocol, Src Port: 52418, Dst Port: 443, Seq: 0, Len: 0
Flags: 0x002 (SYN)

[Conversation Completeness: Complete 3-Way Handshake (15)]`,
  },

  {
    id: "packet-tracer-lab",

    title: "Cisco Packet Tracer — OSI & TCP/IP Models in Action",

    environment: "Cisco Packet Tracer 8.x",

    type: "Network Architecture & Routing Simulation",

    status: "COMPLETED",

    description:
      "Configured multi-segment local area networks (LANs) across Cisco 2960 switches and 1941 routers, establishing subnet allocations, default gateways, and ICMP connectivity.",

    findings: [
      "Mapped data encapsulation across all 7 layers of the OSI model during packet traversal.",
      "Configured Cisco IOS CLI commands (enable, configure terminal, ip address, no shutdown).",
      "Verified ARP (Address Resolution Protocol) table generation and MAC address learning.",
      "Implemented inter-VLAN routing and tested ICMP ping latency across subnets.",
    ],

    toolsUsed: [
      "Cisco Packet Tracer",
      "Cisco IOS CLI",
      "Router 1941",
      "Catalyst 2960 Switch",
      "ICMP Ping / Traceroute",
    ],
  },

  {
    id: "linux-env",

    title: "Linux Systems & Security Environment",

    environment: "Ubuntu & Kali Linux (Dual Boot / VirtualBox)",

    type: "Operating System & Shell Automation",

    status: "ACTIVE",

    description:
      "Primary development and security exploration environment. Utilizing Linux kernel utilities, shell scripting, permission hierarchies, and package management.",

    findings: [
      "Proficient command-line navigation: bash scripting, grep, awk, sed, chmod, chown.",
      "Process monitoring (ps, top, htop) and systemd service management.",
      "SSH key-pair authentication setup and firewall configuration with UFW.",
      "Network diagnosis using ip, ifconfig, netstat, ss, and traceroute.",
    ],

    toolsUsed: [
      "Ubuntu 24.04 LTS",
      "Kali Linux Rolling",
      "VirtualBox",
      "Bash",
      "UFW Firewall",
      "OpenSSH",
    ],
  },

  {
    id: "thm-htb",

    title: "Active Learning: TryHackMe & Hack The Box",

    environment: "Online Cyber Range Platforms",

    type: "Continuous Practical Skill Labs",

    status: "ACTIVE",

    description:
      "Engaging in structured modular security paths focusing on networking fundamentals, web vulnerabilities, Linux privilege principles, and defensive detection.",

    findings: [
      "Completing Network Fundamentals, Linux Fundamentals, and Intro to Cyber modules.",
      "Practicing target discovery and port scanning with Nmap.",
      "Analyzing common web application risks (SQLi, IDOR, sensitive data exposure basics).",
      "Reinforcing theoretical computer science knowledge through hands-on lab environments.",
    ],

    toolsUsed: [
      "TryHackMe",
      "Hack The Box",
      "Nmap",
      "Burp Suite Community",
      "Browser DevTools",
    ],
  },
];

export const SECURITY_TIMELINE: SecurityTimelineEvent[] = [
  {
    step: "01",
    title: "NETWORKING FOUNDATION",
    description:
      "Mastering OSI 7-layer model, TCP/IP stack, IP addressing, subnetting, CIDR notation, and network hardware roles.",
    status: "COMPLETED",
    tags: ["Networking", "OSI", "TCP/IP"],
  },

  {
    step: "02",
    title: "LINUX & SYSTEMS ADMINISTRATION",
    description:
      "Adopting Ubuntu and Linux CLI as primary workstation; shell scripting, permissions, filesystem hierarchy, system services.",
    status: "COMPLETED",
    tags: ["Linux", "Ubuntu", "Bash"],
  },

  {
    step: "03",
    title: "WIRESHARK PACKET ANALYSIS",
    description:
      "Hands-on packet capture and deep traffic inspection; dissecting 3-way handshakes, DNS records, and protocol behaviors.",
    status: "COMPLETED",
    tags: ["Wireshark", "Packets", "Traffic Analysis"],
  },

  {
    step: "04",
    title: "CISCO PACKET TRACER SIMULATIONS",
    description:
      "Designing switch/router topologies, configuring Cisco IOS switches, testing ARP learning, and debugging connectivity.",
    status: "COMPLETED",
    tags: ["Cisco", "Routing", "VLANs"],
  },

  {
    step: "05",
    title: "CYBER SHUJAA ADMISSION",
    description:
      "Enrolled in the prestigious Cloud & Network Security program to bridge software engineering with enterprise defensive security.",
    status: "ACTIVE",
    tags: ["Cyber Shujaa", "Cloud Security", "Defense"],
  },

  {
    step: "06",
    title: "PRACTICAL SECURITY LABS",
    description:
      "Configuring Kali Linux VM security testbeds, local firewalls (UFW), network vulnerability discovery, and log auditing.",
    status: "ACTIVE",
    tags: ["Kali Linux", "Firewalls", "Security Labs"],
  },

  {
    step: "07",
    title: "TRYHACKME & HACK THE BOX",
    description:
      "Active continuous training on offensive/defensive cyber range scenarios to sharpen diagnostic intuition.",
    status: "ACTIVE",
    tags: ["TryHackMe", "Hack The Box", "Labs"],
  },

  {
    step: "08",
    title: "CONTINUING EXPANSION...",
    description:
      "Pursuing integrated secure software development lifecycle (DevSecOps) and network defense certifications.",
    status: "CONTINUING",
    tags: ["DevSecOps", "Continuous Learning"],
  },
];

export const FILE_SYSTEM: FileItem = {
  id: "root",

  name: "C:",

  path: "C:\\",

  type: "folder",

  date: "2026.09.20",

  children: [
    {
      id: "ivy-folder",

      name: "IVY",

      path: "C:\\IVY",

      type: "folder",

      date: "2026.09.20",

      children: [
        {
          id: "projects-folder",

          name: "PROJECTS",

          path: "C:\\IVY\\PROJECTS",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "ctrl-code-file",
              name: "CTRL_CODE.EXE",
              path: "C:\\IVY\\PROJECTS\\CTRL_CODE.EXE",
              type: "file",
              extension: "EXE",
              size: "1,840 KB",
              date: "2026.09.01",
              projectId: "ctrl-code-solutions",
              appId: "dev_studio",
            },

            {
              id: "weather-file",
              name: "WEATHER_GHOST.EXE",
              path: "C:\\IVY\\PROJECTS\\WEATHER_GHOST.EXE",
              type: "file",
              extension: "EXE",
              size: "980 KB",
              date: "2026.07.02",
              projectId: "weather-ghost",
              appId: "dev_studio",
            },

            {
              id: "pawned-file",
              name: "PAWNED.EXE",
              path: "C:\\IVY\\PROJECTS\\PAWNED.EXE",
              type: "file",
              extension: "EXE",
              size: "1,420 KB",
              date: "2026.08.15",
              projectId: "pawned",
              appId: "arcade",
            },

            {
              id: "pawned-puzzles-file",
              name: "PAWNED_PUZZLES.EXE",
              path: "C:\\IVY\\PROJECTS\\PAWNED_PUZZLES.EXE",
              type: "file",
              extension: "EXE",
              size: "820 KB",
              date: "2026.08.20",
              projectId: "pawned-chess-puzzles",
              appId: "arcade",
            },

            {
              id: "static-xo-file",
              name: "STATIC_XO.EXE",
              path: "C:\\IVY\\PROJECTS\\STATIC_XO.EXE",
              type: "file",
              extension: "EXE",
              size: "420 KB",
              date: "2026.06.12",
              projectId: "static-xo",
              appId: "arcade",
            },

            {
              id: "lifeline-file",
              name: "LIFELINE.SYS",
              path: "C:\\IVY\\PROJECTS\\LIFELINE.SYS",
              type: "file",
              extension: "SYS",
              size: "3,110 KB",
              date: "2026.03.02",
              projectId: "lifeline-hospital",
              appId: "dev_studio",
            },

            {
              id: "drive-noble-file",
              name: "DRIVE_NOBLE.EXE",
              path: "C:\\IVY\\PROJECTS\\DRIVE_NOBLE.EXE",
              type: "file",
              extension: "EXE",
              size: "2,240 KB",
              date: "2026.05.20",
              projectId: "drive-noble",
              appId: "dev_studio",
            },

            {
              id: "vista-hotels-file",
              name: "VISTA_HOTELS.EXE",
              path: "C:\\IVY\\PROJECTS\\VISTA_HOTELS.EXE",
              type: "file",
              extension: "EXE",
              size: "1,980 KB",
              date: "2026.04.10",
              projectId: "vista-hotels",
              appId: "dev_studio",
            },
          ],
        },

        {
          id: "clients-folder",

          name: "CLIENT WORK",

          path: "C:\\IVY\\CLIENT WORK",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "cw-vista-hotels-file",
              name: "VISTA_HOTELS.EXE",
              path: "C:\\IVY\\CLIENT WORK\\VISTA_HOTELS.EXE",
              type: "file",
              extension: "EXE",
              size: "1,980 KB",
              date: "2026.04.10",
              projectId: "vista-hotels",
              appId: "dev_studio",
            },

            {
              id: "cw-lifeline-file",
              name: "LIFELINE.SYS",
              path: "C:\\IVY\\CLIENT WORK\\LIFELINE.SYS",
              type: "file",
              extension: "SYS",
              size: "3,110 KB",
              date: "2026.03.02",
              projectId: "lifeline-hospital",
              appId: "dev_studio",
            },

            {
              id: "cw-drive-noble-file",
              name: "DRIVE_NOBLE.EXE",
              path: "C:\\IVY\\CLIENT WORK\\DRIVE_NOBLE.EXE",
              type: "file",
              extension: "EXE",
              size: "2,240 KB",
              date: "2026.05.20",
              projectId: "drive-noble",
              appId: "dev_studio",
            },

            {
              id: "cw-ctrl-code-file",
              name: "CTRL_CODE.EXE",
              path: "C:\\IVY\\CLIENT WORK\\CTRL_CODE.EXE",
              type: "file",
              extension: "EXE",
              size: "1,840 KB",
              date: "2026.09.01",
              projectId: "ctrl-code-solutions",
              appId: "dev_studio",
            },
          ],
        },

        {
          id: "games-folder",

          name: "GAMES",

          path: "C:\\IVY\\GAMES",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "g-pawned",
              name: "PAWNED.EXE",
              path: "C:\\IVY\\GAMES\\PAWNED.EXE",
              type: "file",
              extension: "EXE",
              size: "1,420 KB",
              date: "2026.08.15",
              projectId: "pawned",
              appId: "arcade",
            },

            {
              id: "g-puzzles",
              name: "PAWNED_PUZZLES.EXE",
              path: "C:\\IVY\\GAMES\\PAWNED_PUZZLES.EXE",
              type: "file",
              extension: "EXE",
              size: "820 KB",
              date: "2026.08.20",
              projectId: "pawned-chess-puzzles",
              appId: "arcade",
            },

            {
              id: "g-static-xo",
              name: "STATIC_XO.EXE",
              path: "C:\\IVY\\GAMES\\STATIC_XO.EXE",
              type: "file",
              extension: "EXE",
              size: "420 KB",
              date: "2026.06.12",
              projectId: "static-xo",
              appId: "arcade",
            },
          ],
        },

        {
          id: "experiments-folder",

          name: "EXPERIMENTS",

          path: "C:\\IVY\\EXPERIMENTS",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "exp-weather-file",
              name: "WEATHER_GHOST.EXE",
              path: "C:\\IVY\\EXPERIMENTS\\WEATHER_GHOST.EXE",
              type: "file",
              extension: "EXE",
              size: "980 KB",
              date: "2026.07.02",
              projectId: "weather-ghost",
              appId: "dev_studio",
            },
          ],
        },

        {
          id: "security-folder",

          name: "SECURITY",

          path: "C:\\IVY\\SECURITY",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "shujaa-file",
              name: "CYBER_SHUJAA.SYS",
              path: "C:\\IVY\\SECURITY\\CYBER_SHUJAA.SYS",
              type: "file",
              extension: "SYS",
              size: "640 KB",
              date: "2026.09.18",
              appId: "security",
            },

            {
              id: "wireshark-file",
              name: "WIRESHARK_LAB.LOG",
              path: "C:\\IVY\\SECURITY\\WIRESHARK_LAB.LOG",
              type: "file",
              extension: "LOG",
              size: "180 KB",
              date: "2026.08.10",
              appId: "security",
            },

            {
              id: "packet-tracer-file",
              name: "PACKET_TRACER.LOG",
              path: "C:\\IVY\\SECURITY\\PACKET_TRACER.LOG",
              type: "file",
              extension: "LOG",
              size: "240 KB",
              date: "2026.07.25",
              appId: "security",
            },

            {
              id: "linux-env-file",
              name: "LINUX_ENV.CFG",
              path: "C:\\IVY\\SECURITY\\LINUX_ENV.CFG",
              type: "file",
              extension: "CFG",
              size: "45 KB",
              date: "2026.09.05",
              appId: "security",
            },
          ],
        },

        {
          id: "education-folder",

          name: "EDUCATION",

          path: "C:\\IVY\\EDUCATION",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "cuea-file",
              name: "CUEA_DEGREE.TXT",
              path: "C:\\IVY\\EDUCATION\\CUEA_DEGREE.TXT",
              type: "file",
              extension: "TXT",
              size: "14 KB",
              date: "2026.09.01",

              content: `INSTITUTION: Catholic University of Eastern Africa (CUEA)

PROGRAM: Bachelor of Mathematics and Computer Science

TIMELINE: January 2024 – November 2027

LOCATION: Nairobi, Kenya

RELEVANT COURSEWORK:

- Database Systems
- Data Structures and Algorithms
- Structured Programming
- Discrete Mathematics`,

              appId: "system",
            },

            {
              id: "moringa-file",
              name: "MORINGA_FLATIRON.TXT",
              path: "C:\\IVY\\EDUCATION\\MORINGA_FLATIRON.TXT",
              type: "file",
              extension: "TXT",
              size: "12 KB",
              date: "2024.11.15",

              content: `INSTITUTION: Flatiron School / Moringa School

PROGRAM: Full Stack Software Development (Python with Flask & JavaScript)

TIMELINE: April 2024 – November 2024

LOCATION: Nairobi, Kenya

PROGRAM OVERVIEW:

Intensive software engineering program focused on building secure, database-driven web applications from scratch, databases, APIs, and modern software engineering practices.`,

              appId: "system",
            },

            {
              id: "alliance-file",
              name: "ALLIANCE_GIRLS.TXT",
              path: "C:\\IVY\\EDUCATION\\ALLIANCE_GIRLS.TXT",
              type: "file",
              extension: "TXT",
              size: "8 KB",
              date: "2023.11.30",

              content: `INSTITUTION: Alliance Girls' High School

CERTIFICATE: Kenya Certificate of Secondary Education (KCSE)

TIMELINE: January 2020 – November 2023

LOCATION: Nairobi, Kenya`,

              appId: "system",
            },
          ],
        },

        {
          id: "archive-folder",

          name: "ARCHIVE",

          path: "C:\\IVY\\ARCHIVE",

          type: "folder",

          date: "2026.09.20",

          children: [
            {
              id: "ivy-log-file",
              name: "IVY.LOG",
              path: "C:\\IVY\\ARCHIVE\\IVY.LOG",
              type: "file",
              extension: "LOG",
              size: "28 KB",
              date: "2026.09.20",

              content: `IVY.LOG — SYSTEM JOURNEY LOG

------------------------------------------------

[18] SOFTWARE ENGINEERING BEGINS AT MORINGA SCHOOL

[--] FIRST FREELANCE CLIENT INQUIRY

[--] CLIENT WEB APPLICATIONS DEPLOYED

[--] RETRO GAME ENGINE EXPERIMENTS (STATIC XO)

[--] PAWNED CHESS PLATFORM ENGINE CREATED

[--] WEATHER GHOST ATMOSPHERIC EMOTION ENGINE

[--] CTRL CODE SOLUTIONS SOFTWARE IDENTITY ESTABLISHED

[--] PURSUING COMPUTER SCIENCE AT CUEA (YEAR 3.2)

[--] EXPANDING INTO NETWORKING & SYSTEMS (LINUX, WIRESHARK)

[--] CYBER SHUJAA CLOUD & NETWORK DEFENSE COHORT

[CURRENT] BUILDING CONTINUOUSLY...`,

              appId: "system",
            },

            {
              id: "secret-file",
              name: "DO_NOT_OPEN.TXT",
              path: "C:\\IVY\\ARCHIVE\\DO_NOT_OPEN.TXT",
              type: "file",
              extension: "TXT",
              size: "4 KB",
              date: "2026.09.20",

              content: `[!] ACCESS GRANTED.

Curiosity is not a vulnerability in an aspiring security engineer;

it is the primary instrument of discovery.

"Old machine. Modern engine."

Built with care by Ivy Mburu.`,

              appId: "system",
            },

            {
              id: "dev-note",
              name: "DEV_NOTE.TXT",
              path: "C:\\IVY\\ARCHIVE\\DEV_NOTE.TXT",
              type: "file",
              extension: "TXT",
              size: "6 KB",
              date: "2026.09.20",

              content: `OPERATING SYSTEM PHILOSOPHY:

This is not a portfolio with a skin slapped on it.

This is my workstation.

Welcome to CTRL OS.`,

              appId: "system",
            },
          ],
        },
      ],
    },
  ],
};

export const SYSTEM_SPECS = {
  osName: "CTRL OS",

  version: "v1.0.26",

  build: "BUILD 2026.09",

  kernel: "CTRL-KERNEL-X86_64",

  arch: "64-BIT RETRO VIRTUAL SUBSYSTEM",

  user: "IVY MBURU",

  identity: "CTRL CODE SOLUTIONS",

  languages: [
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "HTML",
    "CSS",
    "Bash",
  ],

  frameworks: [
    "React 19",
    "Flask",
    "Node.js",
    "Tailwind CSS",
    "Vite",
    "Express",
  ],

  tools: [
    "Git & GitHub",
    "VS Code",
    "VirtualBox",
    "Wireshark",
    "Cisco Packet Tracer",
    "Linux CLI",
    "Postman",
  ],

  systemsAndSecurity: [
    "Role-Based Access Control (RBAC)",
    "Patient Data Protection",
    "JSON Web Tokens (JWT)",
    "LocalStorage Encryption",
    "Ubuntu Linux & Kali Linux",
    "TCP/IP & OSI Networking",
    "Wireshark Packet Analysis",
    "Cisco Packet Tracer & IOS",
    "TryHackMe & Hack The Box",
    "Cyber Shujaa (Cisco SOC Analyst Path)",
  ],
};

