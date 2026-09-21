import React, { useState } from 'react';
import { Cpu, GraduationCap, Briefcase, Wrench, Shield, Award, Terminal, User } from 'lucide-react';
import { SYSTEM_SPECS, USER_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const SystemApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'education' | 'skills' | 'experience' | 'specs'>('bio');

  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Top System Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141C20] border-b border-[#2B3B44]">
        <div className="flex items-center gap-2">
          <User size={15} className="text-[#D8A84E]" />
          <span className="font-semibold text-xs sm:text-sm text-[#E8DFC9] font-retro-display">
            About Ivy Mburu &bull; System Profile
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[#526A78]">
          CTRL OS v1.0
        </span>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 py-1.5 bg-[#10171B] border-b border-[#2B3B44] overflow-x-auto">
        {[
          { id: 'bio', label: 'Biography', icon: User },
          { id: 'education', label: 'Education', icon: GraduationCap },
          { id: 'skills', label: 'Technical Stack', icon: Wrench },
          { id: 'experience', label: 'Experience', icon: Briefcase },
          { id: 'specs', label: 'System Specs', icon: Cpu },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id as any);
              }}
              className={`px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors border flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#526A78] border-[#E8DFC9] text-[#E8DFC9] font-semibold'
                  : 'bg-[#141C20] border-transparent text-[#B8B09D] hover:border-[#526A78] hover:text-[#E8DFC9]'
              }`}
            >
              <Icon size={12} className={isActive ? 'text-[#E8DFC9]' : 'text-[#7FA67A]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 max-w-3xl mx-auto w-full">
        {/* Bio Tab */}
        {activeTab === 'bio' && (
          <div className="space-y-4">
            <div className="p-5 bg-[#141C20] border border-[#2B3B44] space-y-3 shadow-xs">
              <div className="border-b border-[#2B3B44] pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-retro-display tracking-wide text-[#E8DFC9] phosphor-glow">
                    {USER_INFO.name}
                  </h2>
                  <span className="text-xs text-[#D8A84E] font-medium block">
                    {USER_INFO.title}
                  </span>
                </div>
                <div className="text-right font-mono-tech text-[11px] text-[#7FA67A]">
                  <span>{USER_INFO.location}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#E8DFC9] leading-relaxed">
                {USER_INFO.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#0E1519] border border-[#2B3B44]">
                  <span className="text-[10px] font-mono-tech text-[#526A78] block uppercase">
                    Degree
                  </span>
                  <span className="font-semibold text-xs text-[#E8DFC9] block mt-0.5">
                    {USER_INFO.degree}
                  </span>
                  <span className="text-[11px] text-[#B8B09D]">
                    {USER_INFO.university}
                  </span>
                </div>

                <div className="p-3 bg-[#0E1519] border border-[#2B3B44]">
                  <span className="text-[10px] font-mono-tech text-[#526A78] block uppercase">
                    Software Studio
                  </span>
                  <span className="font-semibold text-xs text-[#E8DFC9] block mt-0.5">
                    {USER_INFO.companyBrand}
                  </span>
                  <span className="text-[11px] text-[#B8B09D]">
                    Bespoke web applications &amp; systems
                  </span>
                </div>
              </div>

              {/* Direct Channels on Bio */}
              <div className="p-3 bg-[#0E1519] border border-[#2B3B44] mt-3">
                <span className="text-[10px] font-mono-tech text-[#D8A84E] block uppercase mb-1.5">
                  Direct Communication Channels
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-tech">
                  <div>
                    <span className="text-[#7FA67A]">EMAIL: </span>
                    <a href={`mailto:${USER_INFO.email}`} className="text-[#E8DFC9] hover:text-[#D8A84E] underline">
                      {USER_INFO.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#7FA67A]">PHONE: </span>
                    <a href={`tel:${USER_INFO.phone}`} className="text-[#E8DFC9] hover:text-[#D8A84E] underline">
                      {USER_INFO.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#7FA67A]">LINKEDIN: </span>
                    <a href={USER_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#E8DFC9] hover:text-[#D8A84E] underline">
                      ivy-mburu
                    </a>
                  </div>
                  <div>
                    <span className="text-[#7FA67A]">GITHUB: </span>
                    <a href={USER_INFO.github} target="_blank" rel="noreferrer" className="text-[#E8DFC9] hover:text-[#D8A84E] underline">
                      bella-thehacker
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {/* Higher Education */}
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <div className="border-b border-[#2B3B44] pb-2">
                <span className="text-[10px] font-mono-tech text-[#D8A84E] tracking-wider block uppercase">
                  Higher Education &bull; 2024 &ndash; 2027
                </span>
                <h3 className="text-sm font-semibold text-[#E8DFC9]">
                  Catholic University of Eastern Africa (CUEA)
                </h3>
                <span className="text-xs text-[#7FA67A] font-mono-tech">
                  Bachelor of Mathematics and Computer Science &bull; Nairobi, Kenya
                </span>
              </div>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Key coursework: Database Systems, Data Structures and Algorithms, Structured Programming, Discrete Mathematics, Operating Systems Theory, and Computer Networks.
              </p>
            </div>

            {/* Technical Bootcamp */}
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <div className="border-b border-[#2B3B44] pb-2">
                <span className="text-[10px] font-mono-tech text-[#D8A84E] tracking-wider block uppercase">
                  Technical Bootcamp &bull; April 2024 &ndash; November 2024
                </span>
                <h3 className="text-sm font-semibold text-[#E8DFC9]">
                  Flatiron School / Moringa School
                </h3>
                <span className="text-xs text-[#7FA67A] font-mono-tech">
                  Full Stack Software Engineering (Python with Flask &amp; JavaScript) &bull; Nairobi, Kenya
                </span>
              </div>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Completed rigorous hands-on software development program, mastering responsive UI development, RESTful API architecture, relational database schemas, and team-based git workflows.
              </p>
            </div>

            {/* High School Education - Newly Added */}
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <div className="border-b border-[#2B3B44] pb-2">
                <span className="text-[10px] font-mono-tech text-[#D8A84E] tracking-wider block uppercase">
                  Secondary Education &bull; January 2020 &ndash; November 2023
                </span>
                <h3 className="text-sm font-semibold text-[#E8DFC9]">
                  Alliance Girls' High School
                </h3>
                <span className="text-xs text-[#7FA67A] font-mono-tech">
                  Kenya Certificate of Secondary Education (KCSE) &bull; Nairobi, Kenya
                </span>
              </div>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Completed secondary school education with strong foundation in mathematics, science, and analytical reasoning.
              </p>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-4">
            <div className="border-b border-[#2B3B44] pb-2">
              <h3 className="text-sm font-semibold text-[#E8DFC9]">
                Authentic Technical Stack
              </h3>
              <p className="text-xs text-[#B8B09D]">
                Skills verified through shipped projects, client work, and coursework.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono-tech text-[#D8A84E] block uppercase">
                  Frontend &bull; Web
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5 / CSS3', 'Web Audio API'].map(s => (
                    <span key={s} className="px-2 py-0.5 bg-[#0E1519] border border-[#2B3B44] text-[#E8DFC9]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-tech text-[#7FA67A] block uppercase">
                  Backend &bull; APIs
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['Python', 'Flask', 'Node.js', 'Express', 'RESTful APIs', 'SQL / PostgreSQL', 'JWT Authentication'].map(s => (
                    <span key={s} className="px-2 py-0.5 bg-[#0E1519] border border-[#2B3B44] text-[#E8DFC9]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono-tech text-[#D8A84E] block uppercase">
                  Systems &bull; Cybersecurity
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['Linux / Bash', 'Cisco Packet Tracer', 'Wireshark', 'TCP/IP', 'Cloud Security (Cyber Shujaa)'].map(s => (
                    <span key={s} className="px-2 py-0.5 bg-[#0E1519] border border-[#2B3B44] text-[#E8DFC9]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-3">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-1">
              <span className="text-[10px] font-mono-tech text-[#D8A84E] block">
                COMMERCIAL FREELANCE
              </span>
              <h3 className="text-sm font-semibold text-[#E8DFC9]">
                Drive Noble Car Dealership
              </h3>
              <p className="text-xs text-[#B8B09D]">
                Built the responsive digital showroom and vehicle inventory management platform, optimizing mobile loading and lead capture.
              </p>
            </div>

            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-1">
              <span className="text-[10px] font-mono-tech text-[#D8A84E] block">
                COMMUNITY PORTAL
              </span>
              <h3 className="text-sm font-semibold text-[#E8DFC9]">
                Kilimani Sports Club
              </h3>
              <p className="text-xs text-[#B8B09D]">
                Delivered the community facilities portal and booking inquiries hub, consolidating sports program schedules.
              </p>
            </div>

            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-1">
              <span className="text-[10px] font-mono-tech text-[#7FA67A] block">
                HEALTHCARE WORKFLOW
              </span>
              <h3 className="text-sm font-semibold text-[#E8DFC9]">
                Lifeline Hospital Management
              </h3>
              <p className="text-xs text-[#B8B09D]">
                Designed clinic triage intake dashboard, patient record forms, and doctor consultation queue tracking with strict RBAC access control.
              </p>
            </div>
          </div>
        )}

        {/* Specs Tab */}
        {activeTab === 'specs' && (
          <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-3 font-mono-tech text-xs">
            <div className="border-b border-[#2B3B44] pb-2 text-[#D8A84E] font-bold">
              CTRL OS SPECIFICATIONS
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#526A78] block">OS NAME</span>
                <span className="text-[#E8DFC9]">{SYSTEM_SPECS.osName}</span>
              </div>
              <div>
                <span className="text-[#526A78] block">VERSION</span>
                <span className="text-[#E8DFC9]">{SYSTEM_SPECS.version}</span>
              </div>
              <div>
                <span className="text-[#526A78] block">BUILD NUMBER</span>
                <span className="text-[#E8DFC9]">{SYSTEM_SPECS.build}</span>
              </div>
              <div>
                <span className="text-[#526A78] block">ARCHITECTURE</span>
                <span className="text-[#E8DFC9]">{SYSTEM_SPECS.arch}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
