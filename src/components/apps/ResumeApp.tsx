import React, { useState } from 'react';
import { FileText, Printer, Download, Check, Mail, MapPin, ExternalLink, ShieldCheck, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
import { USER_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const ResumeApp: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    sound.playClick(900);
    window.print();
  };

  const handleDownloadText = () => {
    sound.playCtrlMotif();
    setDownloaded(true);

    const resumeContent = `IVY MBURU
Nairobi, Kenya | ${USER_INFO.phone} | ${USER_INFO.email}
LinkedIn: ${USER_INFO.linkedin}
GitHub: ${USER_INFO.github}

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Detail-oriented Computer Science student and Full-Stack Developer with hands-on
experience building and maintaining web applications using Python, Flask,
JavaScript, TypeScript, React, Node.js, and SQL. Experienced in troubleshooting
software issues, debugging application logic, managing databases, and developing
secure user-focused systems. Passionate about transitioning into the cybersecurity
domain, with a proven focus on secure platform development, access control (RBAC),
and patient data privacy. Eager to leverage strong problem-solving skills, logical
reasoning, and programming experience in Python, JavaScript, and SQL to excel in
the Cyber Shujaa Women in Cybersecurity Bootcamp and earn the Cisco SOC Analyst
certification.

================================================================================
TECHNICAL SKILLS
================================================================================
• Programming Languages: Python, JavaScript, TypeScript, SQL, HTML, CSS
• Frameworks & Libraries: React, Flask, Node.js, Tailwind CSS
• Databases: SQL, Database Design, Querying, Data Management
• Development Tools: Git, GitHub, VS Code
• Operating Systems: Linux (Ubuntu, Kali), Windows
• Security & Data Tools: Role-Based Access Control (RBAC), Patient Data Protection,
  JSON Web Tokens (JWT), LocalStorage Encryption, Secure Authentication, Data
  Confidentiality, Multi-User System Architecture
• Technical Support & Troubleshooting:
  - Software Debugging and Root Cause Analysis
  - Incident Investigation and Resolution
  - Application Testing and Quality Assurance
  - Technical Documentation
  - Customer Communication and Support
  - API Integration and Testing
  - Secure Authentication and Access Control

================================================================================
TECHNICAL PROJECTS
================================================================================
Lifeline Hospital Management System — Full-Stack Developer
Tech: React, Flask, SQL, Node.js, RBAC
• Data Protection & Privacy: Architected the platform with a strict focus on
  protecting sensitive patient data and ensuring confidentiality across medical
  records.
• Access Control & Segmentation: Implemented role-based boundaries creating
  independent operational environments for the Admin side, Staff side, and Doctor
  side to prevent unauthorized privilege escalation.
• System Independence: Engineered separate dashboard logic and workflows for each
  user tier to ensure secure data isolation and integrity.
• Troubleshooting & Reliability: Implemented authentication and authorization
  workflows to protect sensitive medical records. Investigated and resolved
  issues involving user permissions, application workflows, and database operations.
• Maintained data integrity and confidentiality through secure system architecture.

Vista Hotels — Full-Stack Developer
Tech: React, Python, Flask, SQL, JWT, Tailwind CSS
• Secure Authentication: Integrated JSON Web Tokens (JWT) and secure client-side
  localStorage encryption to protect user authentication states and session data.
• Backend Architecture: Developed a robust Python/Flask backend to securely handle
  membership data, user reviews, and booking transactions.
• Frontend Interface: Designed a responsive multi-page user interface using React.
• System Reliability: Diagnosed and resolved frontend and backend issues to
  improve system reliability. Integrated APIs and database operations to support
  business processes.

Pawned (Interactive Chess Application) — Frontend Developer
Tech: TypeScript, React, Tailwind CSS, Node.js
• Logic & State Management: Engineered a complex, retro-themed interactive web
  application using TypeScript to manage intricate game logic, move calculations,
  and user state.
• Architecture: Built the responsive frontend using Tailwind CSS and connected it
  to a Node.js server for backend operations.
• Troubleshooting & Performance: Troubleshot complex application state management
  and gameplay interaction issues. Improved stability and performance through
  testing, debugging, and iterative development.

Drive Noble — Full-Stack / Front-End Developer
Tech: React, Vite, TypeScript, Tailwind CSS
• Developed commercial automotive digital showroom with dynamic category filters,
  vehicle specification sheets, and responsive test-drive booking workflows.

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================
Upwork — Freelance Front-End Web Developer
Nairobi, Kenya | January 2024 – Present
• Collaborate directly with clients to gather requirements, design, develop, and
  deploy tailored web solutions and optimized personal/professional portfolios
  using React.js.
• Ensure code quality, cross-browser compatibility, and basic security best
  practices for public-facing web interfaces.
• Diagnose and resolve software bugs, usability issues, and performance bottlenecks.
• Apply version control, testing, and software development best practices.
• Provide ongoing technical support, maintenance, and feature enhancements for
  client projects.

================================================================================
EDUCATION
================================================================================
Catholic University of Eastern Africa (CUEA) — Nairobi, Kenya
Bachelor of Mathematics and Computer Science | January 2024 – November 2027
• Relevant Coursework: Database Systems, Data Structures and Algorithms,
  Structured Programming, Discrete Mathematics.

Flatiron School / Moringa School — Nairobi, Kenya
Full Stack Web Development / Software Engineering (Python with Flask & JavaScript)
April 2024 – November 2024
• Intensive software engineering program focused on building secure,
  database-driven web applications from scratch, databases, APIs, and modern
  software engineering practices.

Alliance Girls' High School — Nairobi, Kenya
Kenya Certificate of Secondary Education (KCSE) | January 2020 – November 2023

================================================================================
CYBERSECURITY SPECIALIZATION & CERTIFICATIONS (IN PROGRESS)
================================================================================
Cyber Shujaa — Women in Cybersecurity Bootcamp / Cloud & Network Security
• Pursuing Cisco SOC Analyst certification.
• Defensive network topologies, Linux server administration, firewall configurations,
  and enterprise cloud perimeter security.
• Practical Labs: Wireshark packet inspection (TCP 3-way handshake, DNS, HTTP),
  Cisco Packet Tracer (multi-switch/router topologies, inter-VLAN routing, subnetting),
  Ubuntu/Kali Linux administration, TryHackMe, and Hack The Box.
`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ivy_Mburu_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-text">
      {/* Top Controls Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141C20] border-b border-[#2B3B44] select-none">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#D8A84E]" />
          <span className="font-semibold text-xs sm:text-sm text-[#E8DFC9] font-retro-display">
            Ivy Mburu &bull; Curriculum Vitae
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-[#0A0D0B] border border-[#526A78] text-[#7FA67A] font-mono-tech hidden sm:inline">
            FULL-STACK &bull; CYBERSECURITY &bull; CS
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-2.5 py-1 bg-[#1A242A] border border-[#526A78] hover:border-[#D8A84E] text-[#E8DFC9] text-xs flex items-center gap-1.5 retro-button cursor-pointer"
            title="Print or Save as PDF via Browser"
          >
            <Printer size={12} />
            <span className="hidden sm:inline">Print / Save PDF</span>
          </button>

          <button
            onClick={handleDownloadText}
            className="px-2.5 py-1 bg-[#D8A84E] text-[#0A0D0B] font-bold border border-[#E8DFC9] text-xs flex items-center gap-1.5 retro-button cursor-pointer"
          >
            {downloaded ? <Check size={12} /> : <Download size={12} />}
            <span>{downloaded ? 'Downloaded' : 'Download TXT'}</span>
          </button>
        </div>
      </div>

      {/* Printable Document Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0A0D0B]">
        <article className="max-w-3xl mx-auto bg-[#141C20] border-2 border-[#526A78] p-6 sm:p-8 space-y-6 retro-window-border shadow-xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
          
          {/* Header */}
          <header className="border-b border-[#2B3B44] pb-4 print:border-gray-300">
            <h1 className="text-2xl sm:text-3xl font-retro-display text-[#E8DFC9] phosphor-glow tracking-wide print:text-black">
              {USER_INFO.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#D8A84E] font-medium mt-1 print:text-gray-800 font-mono-tech">
              Computer Science Student &bull; Full-Stack &amp; Front-End Developer &bull; Cybersecurity &amp; Cisco SOC Analyst Path
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-[#7FA67A] font-mono-tech print:text-gray-700">
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-[#D8A84E] print:text-gray-600" />
                {USER_INFO.location}
              </span>
              <a
                href={`mailto:${USER_INFO.email}`}
                className="flex items-center gap-1 hover:text-[#D8A84E] transition-colors"
              >
                <Mail size={11} className="text-[#D8A84E] print:text-gray-600" />
                {USER_INFO.email}
              </a>
              <a
                href={`tel:${USER_INFO.phone}`}
                className="flex items-center gap-1 hover:text-[#D8A84E] transition-colors"
              >
                <span className="text-[#D8A84E] print:text-gray-600 font-bold">TEL:</span>
                {USER_INFO.phone}
              </a>
              <a
                href={USER_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D8A84E] transition-colors flex items-center gap-0.5 print:text-gray-800"
              >
                <span>LinkedIn</span>
                <ExternalLink size={10} />
              </a>
              <a
                href={USER_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#D8A84E] transition-colors flex items-center gap-0.5 print:text-gray-800"
              >
                <span>GitHub</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="space-y-1.5">
            <h2 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase border-b border-[#2B3B44] pb-1 print:text-gray-900 print:border-gray-300">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DFC9] leading-relaxed print:text-gray-800">
              Detail-oriented Computer Science student and Full-Stack Developer with practical experience building and maintaining web applications using Python, Flask, JavaScript, TypeScript, React, Node.js, and SQL. Experienced in troubleshooting software issues, debugging application logic, managing databases, and developing secure user-focused systems. Passionate about transitioning into the cybersecurity domain, with a proven focus on secure platform development, access control (RBAC), and patient data privacy. Eager to leverage strong problem-solving skills, logical reasoning, and programming experience in Python, JavaScript, and SQL to excel in the Cyber Shujaa Women in Cybersecurity Bootcamp and earn the Cisco SOC Analyst certification.
            </p>
          </section>

          {/* Technical Skills */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase border-b border-[#2B3B44] pb-1 print:text-gray-900 print:border-gray-300">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] print:bg-gray-50 print:border-gray-200">
                <span className="font-mono-tech text-[10px] text-[#526A78] block font-bold print:text-gray-700">PROGRAMMING LANGUAGES</span>
                <span className="text-[#E8DFC9] text-xs print:text-black">Python, JavaScript, TypeScript, SQL, HTML, CSS</span>
              </div>
              <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] print:bg-gray-50 print:border-gray-200">
                <span className="font-mono-tech text-[10px] text-[#526A78] block font-bold print:text-gray-700">FRAMEWORKS &amp; LIBRARIES</span>
                <span className="text-[#E8DFC9] text-xs print:text-black">React, Flask, Node.js, Tailwind CSS</span>
              </div>
              <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] print:bg-gray-50 print:border-gray-200">
                <span className="font-mono-tech text-[10px] text-[#526A78] block font-bold print:text-gray-700">DATABASES &amp; TOOLS</span>
                <span className="text-[#E8DFC9] text-xs print:text-black">SQL, Database Design, Querying, Data Management, Git, GitHub, VS Code</span>
              </div>
              <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] print:bg-gray-50 print:border-gray-200">
                <span className="font-mono-tech text-[10px] text-[#526A78] block font-bold print:text-gray-700">OPERATING SYSTEMS &amp; ENVIRONMENTS</span>
                <span className="text-[#E8DFC9] text-xs print:text-black">Linux (Ubuntu, Kali Linux), Windows, VirtualBox</span>
              </div>
              <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] sm:col-span-2 print:bg-gray-50 print:border-gray-200">
                <span className="font-mono-tech text-[10px] text-[#D8A84E] block font-bold print:text-gray-800">SECURITY &amp; ARCHITECTURE TOOLS</span>
                <span className="text-[#E8DFC9] text-xs print:text-black">
                  Role-Based Access Control (RBAC), Patient Data Protection, JSON Web Tokens (JWT), LocalStorage Encryption, Secure Authentication, Data Confidentiality, Multi-User System Architecture
                </span>
              </div>
              <div className="p-2.5 bg-[#0E1417] border border-[#2B3B44] sm:col-span-2 print:bg-gray-50 print:border-gray-200">
                <span className="font-mono-tech text-[10px] text-[#D8A84E] block font-bold print:text-gray-800">TECHNICAL SUPPORT &amp; TROUBLESHOOTING</span>
                <span className="text-[#E8DFC9] text-xs print:text-black">
                  Software Debugging and Root Cause Analysis &bull; Incident Investigation and Resolution &bull; Application Testing and Quality Assurance &bull; Technical Documentation &bull; Customer Communication and Support &bull; API Integration and Testing &bull; Secure Authentication and Access Control
                </span>
              </div>
            </div>
          </section>

          {/* Technical Projects */}
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase border-b border-[#2B3B44] pb-1 print:text-gray-900 print:border-gray-300">
              Technical Projects
            </h2>

            {/* Project 1: Lifeline */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Lifeline Hospital Management System &mdash; Full-Stack Developer
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  React &bull; Flask &bull; SQL &bull; RBAC
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#B8B09D] print:text-gray-800 pl-1">
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Data Protection &amp; Privacy:</strong> Architected the platform with a strict focus on protecting sensitive patient data and ensuring confidentiality across medical records.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Access Control &amp; Segmentation:</strong> Implemented role-based boundaries creating independent operational environments for the Admin side, Staff side, and Doctor side to prevent unauthorized privilege escalation.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">System Independence:</strong> Engineered separate dashboard logic and workflows for each user tier to ensure secure data isolation and integrity.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Troubleshooting &amp; Security:</strong> Implemented authentication and authorization workflows to protect sensitive medical records. Investigated and resolved issues involving user permissions, application workflows, and database operations.
                </li>
                <li>
                  Maintained data integrity and confidentiality through secure system architecture.
                </li>
              </ul>
            </div>

            {/* Project 2: Vista Hotels */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Vista Hotels &mdash; Full-Stack Developer
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  React &bull; Python &bull; Flask &bull; SQL &bull; JWT
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#B8B09D] print:text-gray-800 pl-1">
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Secure Authentication:</strong> Integrated JSON Web Tokens (JWT) and secure client-side localStorage encryption to protect user authentication states and session data.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Backend Architecture:</strong> Developed a robust Python/Flask backend to securely handle membership data, user reviews, and booking transactions.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Frontend Interface:</strong> Designed a responsive multi-page user interface using React and Tailwind CSS.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Reliability &amp; APIs:</strong> Diagnosed and resolved frontend and backend issues to improve system reliability; integrated APIs and database operations to support business processes.
                </li>
              </ul>
            </div>

            {/* Project 3: Pawned */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Pawned (Interactive Chess Application) &mdash; Frontend Developer
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  TypeScript &bull; React &bull; Tailwind CSS &bull; Node.js
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#B8B09D] print:text-gray-800 pl-1">
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Logic &amp; State Management:</strong> Engineered a complex, retro-themed interactive web application using TypeScript to manage intricate game logic, legal move calculations, and user state.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Architecture:</strong> Built the responsive frontend using Tailwind CSS and connected it to a Node.js server for backend operations.
                </li>
                <li>
                  <strong className="text-[#E8DFC9] print:text-black">Troubleshooting &amp; Performance:</strong> Troubleshot complex application state management and gameplay interaction issues; improved stability and performance through testing, debugging, and iterative development.
                </li>
              </ul>
            </div>

            {/* Project 4: Drive Noble */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Drive Noble &mdash; Frontend / Full-Stack Web Developer
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  React &bull; Vite &bull; TypeScript &bull; Tailwind CSS
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#B8B09D] print:text-gray-800 pl-1">
                <li>
                  Developed commercial automotive digital showroom with dynamic category filters, vehicle specification sheets, and responsive test-drive booking workflows.
                </li>
              </ul>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase border-b border-[#2B3B44] pb-1 print:text-gray-900 print:border-gray-300">
              Professional Experience
            </h2>

            <div className="space-y-1.5">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                    Freelance Front-End Web Developer &mdash; Upwork
                  </h3>
                  <span className="text-[11px] font-mono-tech text-[#D8A84E] print:text-gray-700">
                    Nairobi, Kenya
                  </span>
                </div>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  January 2024 &ndash; Present
                </span>
              </div>

              <ul className="list-disc list-inside space-y-1 text-xs text-[#B8B09D] print:text-gray-800 pl-1">
                <li>
                  Collaborate directly with clients to gather requirements, design, develop, and deliver tailored web solutions and optimized personal/professional portfolios using React.js.
                </li>
                <li>
                  Build and maintain responsive websites, ensuring code quality, cross-browser compatibility, and basic security best practices for public-facing web interfaces.
                </li>
                <li>
                  Diagnose and resolve software bugs, usability issues, and performance bottlenecks.
                </li>
                <li>
                  Apply version control, testing, and modern software development best practices.
                </li>
                <li>
                  Provide ongoing technical support, maintenance, and feature enhancements for client projects.
                </li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase border-b border-[#2B3B44] pb-1 print:text-gray-900 print:border-gray-300">
              Education
            </h2>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Catholic University of Eastern Africa (CUEA)
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  January 2024 &ndash; November 2027
                </span>
              </div>
              <p className="text-xs text-[#D8A84E] print:text-gray-800 font-mono-tech">
                Bachelor of Mathematics and Computer Science &bull; Nairobi, Kenya
              </p>
              <p className="text-[11px] text-[#B8B09D] print:text-gray-700">
                <strong>Relevant Coursework:</strong> Database Systems, Data Structures and Algorithms, Structured Programming, Discrete Mathematics.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Flatiron School / Moringa School
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  April 2024 &ndash; November 2024
                </span>
              </div>
              <p className="text-xs text-[#D8A84E] print:text-gray-800 font-mono-tech">
                Full Stack Web Development / Software Development (Python with Flask &amp; JavaScript) &bull; Nairobi, Kenya
              </p>
              <p className="text-[11px] text-[#B8B09D] print:text-gray-700">
                Intensive software engineering program focused on building secure, database-driven web applications from scratch, databases, APIs, and modern software engineering practices.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-xs sm:text-sm text-[#E8DFC9] print:text-black">
                  Alliance Girls' High School
                </h3>
                <span className="text-[11px] font-mono-tech text-[#526A78] print:text-gray-600">
                  January 2020 &ndash; November 2023
                </span>
              </div>
              <p className="text-xs text-[#D8A84E] print:text-gray-800 font-mono-tech">
                Kenya Certificate of Secondary Education (KCSE) &bull; Nairobi, Kenya
              </p>
            </div>
          </section>

          {/* Cybersecurity Specialization */}
          <section className="space-y-2">
            <h2 className="text-xs font-bold text-[#D8A84E] font-mono-tech tracking-wider uppercase border-b border-[#2B3B44] pb-1 print:text-gray-900 print:border-gray-300 flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#D8A84E]" />
              <span>Cybersecurity Training &amp; Certifications (In Progress)</span>
            </h2>

            <div className="p-3 bg-[#0E1417] border border-[#2B3B44] space-y-1.5 print:bg-gray-50 print:border-gray-200">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-xs text-[#E8DFC9] print:text-black">
                  Cyber Shujaa &mdash; Women in Cybersecurity Bootcamp / Cloud &amp; Network Security
                </h3>
                <span className="text-[10px] font-mono-tech text-[#D8A84E] print:text-gray-700">
                  Cisco SOC Analyst Path
                </span>
              </div>
              <p className="text-xs text-[#B8B09D] print:text-gray-700">
                Intensive training in defensive network topologies, Linux server administration, firewall configurations, and enterprise cloud perimeter security.
              </p>
              <div className="text-[11px] text-[#7FA67A] font-mono-tech space-y-0.5 print:text-gray-700">
                <div>&bull; <strong>Wireshark Packet Analysis:</strong> Deep packet inspection of TCP 3-way handshakes, DNS queries, and cleartext risk auditing on Ubuntu Linux.</div>
                <div>&bull; <strong>Cisco Packet Tracer Simulations:</strong> Multi-switch and multi-router LAN topologies, inter-VLAN routing, and IP subnetting.</div>
                <div>&bull; <strong>Continuous Cyber Range Practice:</strong> Active participant on TryHackMe and Hack The Box modules in networking fundamentals, Linux privilege principles, and defensive discovery.</div>
              </div>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
};

