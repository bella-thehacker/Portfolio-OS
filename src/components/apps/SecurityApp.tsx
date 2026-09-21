import React, { useState } from 'react';
import {
  Shield,
  Search,
  Radio,
  Network,
  Cpu,
  Terminal,
  CheckCircle2,
  ArrowLeft,
  Play,
  Layers,
  Cloud
} from 'lucide-react';
import { SECURITY_ARTIFACTS, SECURITY_TIMELINE } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

type SecurityCategory =
  | 'menu'
  | 'linux'
  | 'networking'
  | 'wireshark'
  | 'packet_tracer'
  | 'cloud_security'
  | 'security_labs';

export const SecurityApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<SecurityCategory>('menu');

  // Interactive Packet Tracer Ping Simulator
  const [pingRunning, setPingRunning] = useState(false);
  const [pingLog, setPingLog] = useState<string[]>([
    "Cisco IOS CLI v15.1 Initialized",
    "Switch# show ip interface brief",
    "FastEthernet0/1 ... UP / UP",
    "GigabitEthernet0/0 ... UP / UP (Default Gateway: 192.168.1.1)"
  ]);

  const categories = [
    {
      id: 'linux',
      icon: '🐧',
      title: 'Linux Systems',
      subtitle: 'Environment, Shell & Permissions',
      desc: 'Exploring Linux file hierarchy, user permissions (chmod/chown), bash scripting, systemd service management, and core command line tools.'
    },
    {
      id: 'networking',
      icon: '📡',
      title: 'Networking Fundamentals',
      subtitle: 'TCP/IP, Routing & Protocols',
      desc: 'Practicing OSI 7-layer model mapping, IPv4 subnetting, CIDR notation, ARP resolution, DNS diagnostics, and router routing tables.'
    },
    {
      id: 'wireshark',
      icon: '🔍',
      title: 'Wireshark Packet Analysis',
      subtitle: 'Traffic Inspection & Forensics',
      desc: 'Examining live pcap captures, dissecting TCP 3-way handshakes, analyzing DNS queries/responses, and identifying suspicious unencrypted payloads.'
    },
    {
      id: 'packet_tracer',
      icon: '🌐',
      title: 'Cisco Packet Tracer',
      subtitle: 'Network Topology & Switch Simulation',
      desc: 'Designing virtual enterprise topologies: switch VLANs, trunk links, router-on-a-stick, DHCP pools, and ICMP diagnostic testing.'
    },
    {
      id: 'cloud_security',
      icon: '☁️',
      title: 'Cloud & Network Security',
      subtitle: 'Cyber Shujaa Academy Training',
      desc: 'Active cohort training in cloud defense fundamentals, network segmentation, zero-trust principles, and enterprise security posture.'
    },
    {
      id: 'security_labs',
      icon: '🧪',
      title: 'Security Labs & Milestones',
      subtitle: 'Hands-on Practice & Learning Timeline',
      desc: 'Tracking Ivy’s progressive cybersecurity milestones, university coursework at CUEA, and practical capture-the-flag exercises.'
    }
  ];

  const handleSimulatePing = () => {
    if (pingRunning) return;
    sound.playClick(900);
    setPingRunning(true);
    setPingLog(prev => [...prev, "PC0> ping 192.168.1.1 -c 4"]);

    const steps = [
      { msg: "Sending 4 32-byte ICMP Echo requests to 192.168.1.1...", delay: 400 },
      { msg: "Reply from 192.168.1.1: bytes=32 time=2ms TTL=255", delay: 800 },
      { msg: "Reply from 192.168.1.1: bytes=32 time=1ms TTL=255", delay: 1200 },
      { msg: "Reply from 192.168.1.1: bytes=32 time=1ms TTL=255", delay: 1600 },
      { msg: "Reply from 192.168.1.1: bytes=32 time=1ms TTL=255", delay: 2000 },
      { msg: "Ping summary: 4 packets sent, 4 packets received, 0% packet loss (Round trip = 1ms)", delay: 2300 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        sound.playKeyClick();
        setPingLog(prev => [...prev, step.msg]);
        if (idx === steps.length - 1) {
          sound.playCtrlMotif();
          setPingRunning(false);
        }
      }, step.delay);
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Friendly Top Header */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-[#141C20] border-b border-[#2B3B44]">
        <div className="flex items-center gap-2.5">
          {currentView !== 'menu' && (
            <button
              onClick={() => {
                sound.playClick(600);
                setCurrentView('menu');
              }}
              className="px-2 py-0.5 border border-[#526A78] bg-[#1A242A] hover:border-[#D8A84E] text-[#E8DFC9] text-xs retro-button flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={12} />
              <span>Back</span>
            </button>
          )}
          <Shield size={16} className="text-[#D8A84E]" />
          <div>
            <span className="font-semibold text-xs sm:text-sm text-[#E8DFC9] font-retro-display">
              Security Lab
            </span>
            <span className="hidden sm:inline text-xs text-[#526A78] ml-2">
              [Ivy's Learning Journey in Systems &amp; Defense]
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono-tech">
          <span className="flex items-center gap-1.5 text-[#7FA67A]">
            <span className="w-2 h-2 rounded-full bg-[#7FA67A]" />
            ACTIVE LEARNER
          </span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#0E1417]">
        {/* VIEW 1: Approachable Hub with 6 Categories */}
        {currentView === 'menu' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Approachable Introduction Banner */}
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#D8A84E] font-retro-display">
                  A Hands-On Cybersecurity Journey
                </span>
                <span className="text-[10px] font-mono-tech text-[#526A78]">
                  CUEA &bull; Cyber Shujaa
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#E8DFC9] leading-relaxed">
                Rather than claiming senior security titles, Ivy is purposefully building technical depth from the ground up: mastering the Linux environment, understanding real packet flow in Wireshark, simulating topologies in Packet Tracer, and training through Cyber Shujaa's Cloud &amp; Network Security academy.
              </p>
            </div>

            {/* 6 Clean, Approachable Category Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div
                  key={cat.id}
                  onClick={() => {
                    sound.playClick(750);
                    setCurrentView(cat.id as SecurityCategory);
                  }}
                  className="p-4 bg-[#141C20] border border-[#2B3B44] hover:border-[#D8A84E] hover:bg-[#1A242A] transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-2xl select-none">{cat.icon}</span>
                      <div>
                        <h3 className="font-semibold text-xs sm:text-sm text-[#E8DFC9] group-hover:text-[#D8A84E]">
                          {cat.title}
                        </h3>
                        <p className="text-[10px] font-mono-tech text-[#526A78]">
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-[#B8B09D] mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#2B3B44] flex items-center justify-between text-[11px] font-medium text-[#D8A84E]">
                    <span>Explore Module</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Journey Philosophy Box */}
            <div className="p-4 bg-[#10171B] border border-[#526A78] text-xs space-y-1.5 font-system-ui">
              <span className="text-xs font-bold text-[#D8A84E] block font-retro-display">
                Educational Philosophy: Learn &bull; Practice &bull; Build
              </span>
              <p className="text-xs text-[#B8B09D]">
                &ldquo;True security capability comes from knowing how systems really talk to each other. By pairing software engineering with packet-level networking and Linux fundamentals, every line of application code is built with defense in mind.&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* VIEW 2: Linux Systems */}
        {currentView === 'linux' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <h3 className="text-base font-semibold text-[#E8DFC9] flex items-center gap-2">
                <span>🐧</span> Linux Systems &amp; CLI Proficiency
              </h3>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Hands-on practice in Debian and Ubuntu environments: managing processes, manipulating standard input/output streams, automating routine configurations with bash scripts, and understanding permissions models.
              </p>
            </div>

            <div className="p-4 bg-[#10171B] border border-[#526A78] space-y-2 font-mono-tech text-xs">
              <div className="text-xs text-[#D8A84E] font-bold border-b border-[#2B3B44] pb-1 mb-2">
                CORE PRACTICED COMMANDS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 bg-[#141C20] border border-[#2B3B44]">
                  <code className="text-[#E8DFC9] block font-bold">chmod 700 / chown</code>
                  <span className="text-[#7FA67A] text-[10px]">Permission hardening</span>
                </div>
                <div className="p-2 bg-[#141C20] border border-[#2B3B44]">
                  <code className="text-[#E8DFC9] block font-bold">systemctl status/restart</code>
                  <span className="text-[#7FA67A] text-[10px]">Service daemon control</span>
                </div>
                <div className="p-2 bg-[#141C20] border border-[#2B3B44]">
                  <code className="text-[#E8DFC9] block font-bold">ss -tulpn / netstat</code>
                  <span className="text-[#7FA67A] text-[10px]">Listening socket inspection</span>
                </div>
                <div className="p-2 bg-[#141C20] border border-[#2B3B44]">
                  <code className="text-[#E8DFC9] block font-bold">iptables / ufw</code>
                  <span className="text-[#7FA67A] text-[10px]">Host packet filtering</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Networking Fundamentals */}
        {currentView === 'networking' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <h3 className="text-base font-semibold text-[#E8DFC9] flex items-center gap-2">
                <span>📡</span> Networking Fundamentals &amp; Routing
              </h3>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Bridging theory from Catholic University of Eastern Africa (CUEA) Computer Science coursework into practice: understanding how bytes move across wire and air.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-tech">
              <div className="p-3 bg-[#141C20] border border-[#2B3B44]">
                <span className="text-[10px] text-[#526A78] block">LAYER 4</span>
                <span className="font-bold text-[#E8DFC9] block">TCP / UDP</span>
                <span className="text-[#B8B09D] text-[11px] block mt-1">
                  Reliable stream delivery vs. low-latency datagrams.
                </span>
              </div>
              <div className="p-3 bg-[#141C20] border border-[#2B3B44]">
                <span className="text-[10px] text-[#526A78] block">LAYER 3</span>
                <span className="font-bold text-[#E8DFC9] block">IP &amp; Routing</span>
                <span className="text-[#B8B09D] text-[11px] block mt-1">
                  Subnet masks, default gateways, and ICMP messaging.
                </span>
              </div>
              <div className="p-3 bg-[#141C20] border border-[#2B3B44]">
                <span className="text-[10px] text-[#526A78] block">LAYER 2</span>
                <span className="font-bold text-[#E8DFC9] block">Ethernet &amp; ARP</span>
                <span className="text-[#B8B09D] text-[11px] block mt-1">
                  Frame switching, MAC address tables, and broadcasts.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: Wireshark Packet Analysis */}
        {currentView === 'wireshark' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <h3 className="text-base font-semibold text-[#E8DFC9] flex items-center gap-2">
                <span>🔍</span> Wireshark Packet Inspection &amp; Forensics
              </h3>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Analyzing packet traces to verify transmission integrity, observe 3-way handshakes (SYN &rarr; SYN-ACK &rarr; ACK), inspect DNS lookups, and spot cleartext transmission vulnerabilities.
              </p>
            </div>

            {/* Visual Sample Frame Breakdown */}
            <div className="border border-[#2B3B44] bg-[#10171B] retro-bevel overflow-hidden">
              <div className="px-3 py-2 bg-[#141C20] border-b border-[#2B3B44] flex justify-between items-center text-xs font-mono-tech text-[#526A78]">
                <span>SAMPLE CAPTURE // TCP 3-WAY HANDSHAKE</span>
                <span>PCAP PARSER</span>
              </div>
              <div className="p-3 font-mono-tech text-[11px] space-y-1.5 overflow-x-auto">
                <div className="text-[#7FA67A]">
                  1 &bull; 0.000s &bull; 192.168.1.100 &rarr; 104.21.55.2 &bull; TCP &bull; 66 [SYN] Seq=0 Win=64240
                </div>
                <div className="text-[#D8A84E]">
                  2 &bull; 0.038s &bull; 104.21.55.2 &rarr; 192.168.1.100 &bull; TCP &bull; 66 [SYN, ACK] Seq=0 Ack=1 Win=65535
                </div>
                <div className="text-[#7FA67A]">
                  3 &bull; 0.039s &bull; 192.168.1.100 &rarr; 104.21.55.2 &bull; TCP &bull; 54 [ACK] Seq=1 Ack=1 Win=64240
                </div>
                <div className="text-[#E8DFC9] pt-1">
                  4 &bull; 0.042s &bull; 192.168.1.100 &rarr; 104.21.55.2 &bull; TLSv1.3 &bull; 517 Client Hello
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: Cisco Packet Tracer */}
        {currentView === 'packet_tracer' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <h3 className="text-base font-semibold text-[#E8DFC9] flex items-center gap-2">
                <span>🌐</span> Cisco Packet Tracer Simulation
              </h3>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Building small virtual business networks: configuring access switches, assigning IP addresses to end devices, validating gateway connectivity, and testing ping latency.
              </p>
            </div>

            {/* Interactive Ping Simulator */}
            <div className="p-4 bg-[#10171B] border border-[#526A78] space-y-3 font-mono-tech">
              <div className="flex items-center justify-between border-b border-[#2B3B44] pb-2">
                <span className="font-bold text-xs text-[#D8A84E]">
                  INTERACTIVE LAB // ICMP ECHO DIAGNOSTIC
                </span>
                <button
                  onClick={handleSimulatePing}
                  disabled={pingRunning}
                  className={`px-3 py-1 bg-[#D8A84E] text-[#0A0D0B] font-bold text-xs retro-button flex items-center gap-1.5 cursor-pointer ${
                    pingRunning ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Play size={11} className="fill-[#0A0D0B]" />
                  <span>{pingRunning ? 'Transmitting...' : 'Run Ping Test'}</span>
                </button>
              </div>

              <div className="bg-[#0A0E10] p-3 border border-[#2B3B44] text-xs text-[#7FA67A] space-y-1 min-h-[140px] max-h-52 overflow-y-auto">
                {pingLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 6: Cloud & Network Security (Cyber Shujaa) */}
        {currentView === 'cloud_security' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-2">
              <h3 className="text-base font-semibold text-[#E8DFC9] flex items-center gap-2">
                <span>☁️</span> Cloud &amp; Network Security &bull; Cyber Shujaa
              </h3>
              <p className="text-xs text-[#B8B09D] leading-relaxed">
                Ivy is actively participating in Cyber Shujaa, a prestigious training initiative in Kenya empowering youth in cybersecurity engineering. The curriculum focuses on cloud infrastructure security, network defense, threat modeling, and practical systems operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#141C20] border border-[#2B3B44]">
                <span className="font-mono-tech text-[10px] text-[#526A78] block">TOPIC 1</span>
                <span className="font-semibold text-sm text-[#E8DFC9]">Cloud Architecture Security</span>
                <p className="text-xs text-[#B8B09D] mt-1">
                  Identity and Access Management (IAM), least-privilege role design, and cloud storage access control.
                </p>
              </div>

              <div className="p-3 bg-[#141C20] border border-[#2B3B44]">
                <span className="font-mono-tech text-[10px] text-[#526A78] block">TOPIC 2</span>
                <span className="font-semibold text-sm text-[#E8DFC9]">Defensive Network Operations</span>
                <p className="text-xs text-[#B8B09D] mt-1">
                  Virtual private cloud (VPC) segmentation, firewall rule audits, and security group enforcement.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: Security Timeline */}
        {currentView === 'security_labs' && (
          <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-150">
            <div className="p-4 bg-[#141C20] border border-[#2B3B44] space-y-1">
              <h3 className="text-base font-semibold text-[#E8DFC9] flex items-center gap-2">
                <span>🧪</span> Cybersecurity Learning Milestones
              </h3>
              <p className="text-xs text-[#B8B09D]">
                An authentic chronological progression from software engineering fundamentals to systems security.
              </p>
            </div>

            <div className="space-y-2.5">
              {SECURITY_TIMELINE.map((event, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#141C20] border border-[#2B3B44] space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech text-[#D8A84E] font-bold">
                      {event.step}
                    </span>
                    <span className="text-[10px] font-mono-tech px-1.5 py-0.5 border border-[#526A78] text-[#7FA67A]">
                      {event.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#E8DFC9]">
                    {event.title}
                  </h4>
                  <p className="text-xs text-[#B8B09D]">{event.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 bg-[#10171B] border border-[#2B3B44] text-[#526A78]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
