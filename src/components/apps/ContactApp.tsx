import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, MessageSquare, Linkedin, Github, Copy, ExternalLink } from 'lucide-react';
import { USER_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const ContactApp: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    sound.playClick(900);
    navigator.clipboard?.writeText(USER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    sound.playClick(900);
    navigator.clipboard?.writeText(USER_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !senderEmail) return;

    sound.playClick(950);
    setStatus('transmitting');

    setTimeout(() => {
      sound.playClick(800);
      setTimeout(() => {
        sound.playCtrlMotif();
        setStatus('sent');
      }, 700);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#0E1417] text-[#E8DFC9] font-system-ui text-xs select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141C20] border-b border-[#2B3B44]">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-[#D8A84E]" />
          <span className="font-semibold text-xs sm:text-sm text-[#E8DFC9] font-retro-display">
            Contact Me &bull; Communications Hub
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[#7FA67A]">
          ONLINE
        </span>
      </div>

      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 max-w-xl mx-auto w-full">
        {/* The Exact Clean Retro Contact Card */}
        <div className="p-6 bg-[#141C20] border-2 border-[#526A78] shadow-md space-y-6 text-center retro-window-border">
          {/* Header */}
          <div className="border-b border-[#2B3B44] pb-4">
            <h2 className="text-xl sm:text-2xl font-retro-display text-[#E8DFC9] tracking-widest uppercase phosphor-glow">
              LET'S CONNECT
            </h2>
          </div>

          {/* Name & Roles */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-[#D8A84E] font-retro-display">
              {USER_INFO.name}
            </h3>
            <div className="space-y-1 text-xs text-[#B8B09D] font-medium">
              <div>Software Developer</div>
              <div>Computer Science Student</div>
              <div>Cybersecurity Journey</div>
            </div>
          </div>

          {/* Direct Communication Details */}
          <div className="pt-2 pb-2 space-y-3 max-w-xs mx-auto">
            {/* Email with mailto link */}
            <div className="flex items-center justify-between p-2.5 bg-[#10171B] border border-[#2B3B44] text-xs">
              <a
                href={`mailto:${USER_INFO.email}`}
                onClick={() => sound.playClick(900)}
                className="flex items-center gap-2 text-[#E8DFC9] hover:text-[#D8A84E] transition-colors truncate"
                title="Send Email"
              >
                <Mail size={15} className="text-[#D8A84E] shrink-0" />
                <span className="font-mono-tech truncate">{USER_INFO.email}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="ml-2 text-[#7FA67A] hover:text-[#E8DFC9] p-1 cursor-pointer shrink-0"
                title="Copy Email"
              >
                {copiedEmail ? <span className="text-[10px] text-[#3FB950]">Copied!</span> : <Copy size={13} />}
              </button>
            </div>

            {/* Phone with tel link */}
            <div className="flex items-center justify-between p-2.5 bg-[#10171B] border border-[#2B3B44] text-xs">
              <a
                href={`tel:${USER_INFO.phone}`}
                onClick={() => sound.playClick(900)}
                className="flex items-center gap-2 text-[#E8DFC9] hover:text-[#D8A84E] transition-colors"
                title="Call Phone Number"
              >
                <Phone size={15} className="text-[#7FA67A] shrink-0" />
                <span className="font-mono-tech">{USER_INFO.phone}</span>
              </a>
              <button
                type="button"
                onClick={handleCopyPhone}
                className="ml-2 text-[#7FA67A] hover:text-[#E8DFC9] p-1 cursor-pointer shrink-0"
                title="Copy Phone"
              >
                {copiedPhone ? <span className="text-[10px] text-[#3FB950]">Copied!</span> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Action Buttons: [ LINKEDIN ] [ GITHUB ] [ SEND EMAIL ] */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <a
              href={USER_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(950)}
              className="py-2.5 px-3 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:text-[#0A0D0B] hover:bg-[#D8A84E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all retro-button cursor-pointer"
            >
              <Linkedin size={14} />
              <span>LINKEDIN</span>
            </a>

            <a
              href={USER_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(950)}
              className="py-2.5 px-3 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:text-[#0A0D0B] hover:bg-[#D8A84E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all retro-button cursor-pointer"
            >
              <Github size={14} />
              <span>GITHUB</span>
            </a>

            <a
              href={`mailto:${USER_INFO.email}`}
              onClick={() => sound.playClick(950)}
              className="py-2.5 px-3 bg-[#D8A84E] text-[#0A0D0B] hover:bg-[#E8DFC9] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all retro-button cursor-pointer shadow-sm"
            >
              <Mail size={14} />
              <span>SEND EMAIL</span>
            </a>
          </div>
        </div>

        {/* Auxiliary Transmission Terminal inside OS */}
        <div className="p-4 bg-[#141C20] border border-[#2B3B44]">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-[#D8A84E] font-retro-display">
            <MessageSquare size={13} />
            <span>Direct Terminal Message</span>
          </div>

          {status === 'sent' ? (
            <div className="p-4 bg-[#10171B] border border-[#526A78] text-center space-y-2">
              <CheckCircle2 size={24} className="text-[#3FB950] mx-auto" />
              <div className="font-semibold text-xs text-[#E8DFC9]">
                Message Transmitted Successfully
              </div>
              <p className="text-[11px] text-[#B8B09D]">
                Thank you! Ivy will review your message promptly.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setMessage('');
                  setSenderName('');
                  setSenderEmail('');
                }}
                className="mt-2 px-3 py-1 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] text-xs retro-button"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono-tech text-[#526A78] block mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full px-2.5 py-1.5 bg-[#0A0D0B] border border-[#2B3B44] text-[#E8DFC9] placeholder-[#526A78] text-xs focus:outline-none focus:border-[#D8A84E]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono-tech text-[#526A78] block mb-1">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={e => setSenderEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    className="w-full px-2.5 py-1.5 bg-[#0A0D0B] border border-[#2B3B44] text-[#E8DFC9] placeholder-[#526A78] text-xs focus:outline-none focus:border-[#D8A84E]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech text-[#526A78] block mb-1">
                  MESSAGE
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Inquiry or collaboration details..."
                  className="w-full px-2.5 py-1.5 bg-[#0A0D0B] border border-[#2B3B44] text-[#E8DFC9] placeholder-[#526A78] text-xs focus:outline-none focus:border-[#D8A84E] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'transmitting'}
                className="w-full py-2 bg-[#1A242A] border border-[#526A78] text-[#E8DFC9] hover:border-[#D8A84E] hover:text-[#D8A84E] font-bold text-xs flex items-center justify-center gap-1.5 retro-button transition-colors cursor-pointer"
              >
                {status === 'transmitting' ? (
                  <span>TRANSMITTING PACKET...</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>TRANSMIT MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
