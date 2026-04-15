/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'motion/react';
import { 
  Scale, 
  Shield, 
  Gavel, 
  Briefcase, 
  Users, 
  Award, 
  MessageCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  ChevronRight,
  CheckCircle2,
  Loader2,
  Download,
  Sparkles
} from 'lucide-react';

// --- Components ---

const DisclaimerModal = ({ onAccept }: { onAccept: () => void }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-none shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        <h2 className="text-3xl font-serif mb-6 border-b border-white/10 pb-4">Disclaimer</h2>
        <div className="space-y-4 text-sm text-gray-400 leading-relaxed mb-8">
          <p>As per the rules of the Bar Council of India, advocates are prohibited from soliciting work or advertising in any form or manner.</p>
          <p>By accessing this website, you acknowledge and confirm that:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You are seeking information relating to Vitarka Law Partners voluntarily and of your own accord;</li>
            <li>There has been no form of solicitation, advertisement, personal communication, invitation, or inducement by the firm or its members through this website;</li>
            <li>The information made available herein is solely for informational purposes and should not be construed as legal advice or opinion;</li>
            <li>Accessing this website or its contents does not create any advocate-client relationship.</li>
          </ul>
          <p>Vitarka Law Partners shall not be liable for any action taken by any person relying upon the material/information contained on this website. All content and materials on this website are the intellectual property of Vitarka Law Partners.</p>
        </div>
        <button 
          onClick={onAccept}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors"
        >
          I Accept & Enter
        </button>
      </motion.div>
    </div>
  );
};

const ConsultationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Corporate Law',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', service: 'Corporate Law', message: '' });
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-none shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-serif mb-4">Request a Consultation</h2>
              <p className="text-gray-400">Our legal experts will contact you within 24 hours.</p>
            </div>

            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-serif mb-2">Request Received</h3>
                <p className="text-gray-400">We will be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white transition-colors text-white" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                    <input 
                      required
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white transition-colors text-white" 
                      placeholder="+91..." 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white transition-colors text-white" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Practice Area</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 focus:outline-none focus:border-white transition-colors text-white appearance-none"
                  >
                    <option className="bg-black">Corporate Law</option>
                    <option className="bg-black">Dispute Resolution</option>
                    <option className="bg-black">Real Estate</option>
                  </select>
                </div>
                <button 
                  disabled={status === 'loading'}
                  type="submit" 
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Submit Request'}
                </button>
                {status === 'error' && <p className="text-red-500 text-center text-sm">Something went wrong. Please try again.</p>}
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onOpenConsultation }: { onOpenConsultation: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'FIRM PROFILE', href: '#' },
    { name: 'PRACTICE AREAS', href: '#services' },
    { name: 'ATTORNEYS', href: '#about' },
    { name: 'INSIGHTS', href: '#blog' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-110 rounded-full overflow-hidden border border-legal-gold/20">
            <img 
              src="https://res.cloudinary.com/dyiwep5ls/image/upload/f_auto,q_auto/IMG_8067_nwdr1e" 
              alt="Vitarka Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-[0.2em] leading-none group-hover:text-legal-gold transition-colors">VITARKA</span>
            <span className="text-[8px] tracking-[0.4em] text-gray-400 mt-1">LAW PARTNERS</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-bold tracking-[0.15em] hover:text-gray-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-8 flex flex-col gap-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold tracking-[0.2em]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenConsultation }: { onOpenConsultation: () => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden hero-gradient">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative w-48 h-48 mb-12 rounded-full overflow-hidden border-2 border-legal-gold/30 shadow-[0_0_50px_rgba(196,160,82,0.2)]">
            <img 
              src="https://res.cloudinary.com/dyiwep5ls/image/upload/f_auto,q_auto/IMG_8067_nwdr1e" 
              alt="Vitarka Law Partners Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-legal-gold/5 mix-blend-overlay" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-serif tracking-[0.1em] mb-4">VITARKA</h1>
          <div className="text-2xl md:text-4xl font-serif tracking-[0.4em] text-legal-gold mb-6">LAW PARTNERS</div>
          <div className="text-sm md:text-lg tracking-[0.3em] text-gray-400 mb-16">Bangalore, India</div>

          <p className="text-2xl md:text-4xl font-serif mb-6 max-w-3xl mx-auto leading-relaxed">
            Strategic Counsel. Uncompromising Integrity.
          </p>
          <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto tracking-wide">
            Expertise in Corporate Law, Dispute Resolution, <br /> and Real Estate in Bangalore.
          </p>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenConsultation}
            className="btn-primary"
          >
            [REQUEST A CONSULTATION]
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Sparkle */}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 right-12 text-legal-gold/40"
      >
        <Sparkles size={48} />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="space-y-4 pt-12">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400" 
              alt="Law Office" 
              className="rounded-none w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="bg-legal-gold p-8 rounded-none text-black">
              <Scale size={40} className="mb-4" />
              <h3 className="text-2xl font-serif mb-2">Who We Are</h3>
              <p className="text-sm font-medium opacity-80">Clarity. Analytical Rigour. Effective Advocacy.</p>
            </div>
          </div>
          <div className="space-y-4">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400" 
              alt="Legal Document" 
              className="rounded-none w-full h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 text-legal-gold mb-6">
            <div className="w-8 h-[1px] bg-legal-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Who We Are</span>
          </div>
          <h2 className="text-5xl font-serif mb-8 leading-tight">
            Vitarka Law Partners
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Vitarka Law Partners is a dispute resolution firm built on the principles of clarity, analytical rigour, and effective advocacy. 
            The name “Vitarka” signifies reasoned argument and disciplined analysis—principles that define our approach to every dispute we handle.
          </p>
          
          <div className="flex items-center gap-3 text-legal-gold mb-6 mt-12">
            <div className="w-8 h-[1px] bg-legal-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest">The Vitarka Identity</span>
          </div>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Inspired by the concept of the Vitarka Mudra, symbolising dialogue, reasoning, and the exchange of ideas, the firm reflects a philosophy rooted in strategic thought and considered advocacy. 
            Founded on the collective strength of three partners, unified by a shared commitment to precision, collaboration, and excellence in legal representation.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const Approach = () => {
  const steps = [
    {
      title: 'Identification',
      desc: 'Identifying the key legal and factual issues at the core of the dispute.',
      icon: Shield
    },
    {
      title: 'Strategy',
      desc: 'Formulating a focused litigation strategy tailored to specific objectives.',
      icon: Briefcase
    },
    {
      title: 'Execution',
      desc: 'Executing with precision in drafting and advocacy at every stage.',
      icon: Gavel
    },
    {
      title: 'Consistency',
      desc: 'Maintaining consistency from initiation to final resolution.',
      icon: CheckCircle2
    }
  ];

  return (
    <section id="approach" className="py-32 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 text-legal-gold mb-4">
            <div className="w-8 h-[1px] bg-legal-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Our Approach</span>
            <div className="w-8 h-[1px] bg-legal-gold" />
          </div>
          <h2 className="text-5xl font-serif mb-8">Foresight, Structure, and Purpose</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We believe litigation must be approached with a disciplined process to ensure effective advocacy.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 border border-white/5 hover:border-legal-gold/30 transition-all group"
            >
              <div className="text-legal-gold mb-6 group-hover:scale-110 transition-transform inline-block">
                <step.icon size={32} />
              </div>
              <h3 className="text-xl font-serif mb-4">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              <div className="absolute top-4 right-4 text-4xl font-serif text-white/5 font-bold group-hover:text-legal-gold/10 transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, desc, icon: Icon, index }: { title: string; desc: string; icon: any; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full rounded-none bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-10 group overflow-hidden"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative z-10"
      >
        <div className="w-16 h-16 bg-legal-gold/10 flex items-center justify-center mb-8 group-hover:bg-legal-gold transition-all duration-500">
          <Icon className="text-legal-gold group-hover:text-black transition-colors duration-500" size={32} />
        </div>
        <h3 className="text-2xl font-serif mb-4 tracking-wider group-hover:text-legal-gold transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors">{desc}</p>
        
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-legal-gold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          DISCOVER EXPERTISE <ArrowRight size={14} />
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-legal-gold/0 via-legal-gold/0 to-legal-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border Reveal */}
      <motion.div 
        className="absolute inset-0 border-2 border-legal-gold/0 group-hover:border-legal-gold/20 transition-colors duration-500"
        style={{ transform: "translateZ(20px)" }}
      />
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'High Court Litigation',
      desc: 'Expert representation in High Court matters, handling complex legal challenges with precision.',
      icon: Gavel,
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: 'Commercial & Civil',
      desc: 'Navigating commercial and civil disputes across various courts and jurisdictions.',
      icon: Briefcase,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: 'Criminal Proceedings',
      desc: 'Dedicated defense and representation in criminal matters, ensuring due process and justice.',
      icon: Shield,
      className: "md:col-span-1 md:row-span-2"
    },
    {
      title: 'Arbitration & ADR',
      desc: 'Strategic alternative dispute resolution and arbitration services for efficient conflict management.',
      icon: Scale,
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: 'Tribunals & Regulatory',
      desc: 'Representation before various tribunals and regulatory forums on complex compliance issues.',
      icon: Award,
      className: "md:col-span-2 md:row-span-1"
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-legal-gold mb-4">
              <div className="w-8 h-[1px] bg-legal-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Our Practice</span>
            </div>
            <h2 className="text-6xl font-serif leading-tight">Expertise Across <br /> Jurisdictions.</h2>
          </div>
          <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
            We represent clients across a diverse range of legal forums, providing focused and strategic advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={service.title} className={service.className}>
              <ServiceCard {...service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PartnerModal = ({ partner, isOpen, onClose }: { partner: any; isOpen: boolean; onClose: () => void }) => {
  if (!partner) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 p-8 md:p-16 overflow-y-auto max-h-[90vh] selection:bg-legal-gold selection:text-black"
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-gray-500 hover:text-legal-gold transition-colors"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <div className="w-full aspect-square bg-legal-gold/10 overflow-hidden mb-8 border border-white/10">
                  {partner.image ? (
                    <img 
                      src={partner.image} 
                      alt={partner.name} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="text-legal-gold" size={64} />
                    </div>
                  )}
                </div>
                <h2 className="text-4xl font-serif mb-2">{partner.name}</h2>
                <p className="text-legal-gold text-xs font-bold uppercase tracking-[0.4em] mb-8">{partner.role}</p>
                
                <div className="space-y-4 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail size={16} className="text-legal-gold" />
                    <span>contact@vitarkalaw.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Phone size={16} className="text-legal-gold" />
                    <span>{partner.phone}</span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="prose prose-invert max-w-none">
                  <div className="flex items-center gap-3 text-legal-gold mb-6">
                    <div className="w-8 h-[1px] bg-legal-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Professional Profile</span>
                  </div>
                  <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                    {partner.bio.split('\n\n').map((para: string, i: number) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
                
                <div className="mt-12 pt-12 border-t border-white/5">
                  <button onClick={onClose} className="btn-primary">
                    [CLOSE PROFILE]
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Team = () => {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const partners = [
    { 
      name: 'Anushree Girish', 
      role: 'Partner',
      phone: '8660252014',
      image: 'https://res.cloudinary.com/dyiwep5ls/image/upload/f_auto,q_auto/WhatsApp_Image_2026-04-13_at_3.47.15_PM_bmv0fi',
      bio: `Anushree Girish is a litigation and arbitration practitioner whose work is defined by structure, clarity in legal reasoning, and principled advocacy. Her practice combines independent courtroom experience with sustained academic engagement.

In active legal practice since December 2020, she brings over five years of litigation and advisory experience across civil, commercial, criminal, and arbitral matters.

Anushree previously worked with Uday Shankar Associates, where she handled matters independently across a wide spectrum of forums and subject areas. Her work there included civil and commercial disputes, arbitration proceedings, RERA and consumer matters, DRT proceedings, MSME claims, special economic offences, white-collar crimes, company law offences, SARFAESI actions, land disputes, cheque bounce cases, petty and serious criminal offences, High Court writ proceedings, Civil Miscellaneous Petitions (CMPs), and Regular First Appeals (RFAs).She is known for her research-driven pleadings, precise drafting, and well-prepared courtroom assistance, with the ability to manage matters from inception to final hearing with confidence and clarity.

Alongside her practice, Anushree serves as a Visiting Professor at a private law university in Bengaluru, where she teaches Professional Ethics, Arbitration, and Law of Contract. Her engagement with teaching sharpens her analytical approach and lends academic depth to her litigation work.

At Vitarka Law Partners, Anushree strengthens the firm’s disputes and arbitration practice with her blend of independent litigation experience, academic rigour, and meticulous preparation.`
    },
    { 
      name: 'Prajwal Bandaggade Harish', 
      role: 'Partner',
      phone: '9538289283',
      image: '', // No photo provided for Prajwal
      bio: `Prajwal Bandagadde Harish is a courtroom-focused disputes lawyer known for his command over criminal, commercial and civil litigation, and for managing matters from strategy to final hearing with consistency and control.

In active legal practice since January 2021, he brings over five years of litigation experience across the High Court of Karnataka, commercial courts, civil courts, magistrate courts, consumer fora, and statutory authorities.

Prajwal’s practice is rooted in end-to-end litigation management—right from pre-litigation assessment and pleadings to interim relief, evidence stages, and final arguments. His drafting portfolio spans writ petitions, miscellaneous first appeals, arbitration petitions under Sections 9 and 34 of the Arbitration and Conciliation Act, criminal petitions, anticipatory and regular bail petitions, revenue appeals, RERA proceedings, negotiable instruments prosecutions, and negotiated settlements.

His professional experience includes key roles at Poovayya & Co., Advocates & Solicitors and JSM Law Partners, where he handled complex litigation involving white-collar offences, commercial and contractual disputes, criminal investigations, property and revenue matters, and regulatory proceedings.

He is particularly recognised for his meticulous pleadings, sharp procedural understanding, and strong courtroom assistance in interim and final hearings. Prajwal also has considerable experience in mediation, compromise structuring, and settlement documentation in contentious matters. At Vitarka Law Partners, Prajwal anchors the firm’s litigation practice with his practical approach, procedural strength, and consistent presence across forums.`
    },
    { 
      name: 'Arvind Ghirmay', 
      role: 'Partner',
      phone: '+91 86183 45502',
      image: 'https://res.cloudinary.com/dyiwep5ls/image/upload/f_auto,q_auto/WhatsApp_Image_2026-04-13_at_3.47.18_PM_tifszb',
      bio: `Arvind Ghirmay’s practice is defined by precision in drafting, clarity in thought, and confident handling of civil and commercial disputes across forums. A graduate of the National Law School of India University, he combines strong conceptual grounding with practical litigation experience and document craftsmanship.

In active practice since December 2021, he brings over four years of experience appearing before civil courts, commercial courts, tribunals, consumer fora, RERA authorities, arbitral tribunals, and the High Court of Karnataka.

Arvind has independently argued key interlocutory matters, including injunctions and stay applications, and has played a central role in preparing and advancing final arguments in complex disputes. His work is distinguished by thorough research, structured pleadings, and the ability to convert legal theory into effective courtroom strategy.

His professional journey includes associations with JSM Law Partners and MD&T Partners, where he worked extensively not only in dispute resolution but also in drafting a wide range of legal and commercial instruments—MoUs, wills, lease deeds, trust deeds, gift deeds, employment agreements, NDAs, and corporate documentation. He is particularly valued for his drafting finesse, research depth, and ability to manage matters with independence and efficiency. Arvind has also mentored junior associates and contributed to building systematic workflows for case preparation and briefing.

His role at Vitarka Law Partners reflects a blend of litigation capability and drafting excellence, making him a key resource for both disputes and document-driven advisory work and efficiency in case preparation. His practice reflects a balanced blend of courtroom advocacy, strategic advisory, and high-quality legal drafting across civil and commercial matters.`
    }
  ];

  return (
    <section id="team" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 text-legal-gold mb-4">
            <div className="w-8 h-[1px] bg-legal-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Our Team</span>
            <div className="w-8 h-[1px] bg-legal-gold" />
          </div>
          <h2 className="text-5xl font-serif mb-8">Led by Excellence</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Vitarka Law Partners is led by a cohesive, practice-driven, and litigation-focused team of partners.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden bg-black border border-white/5 p-12 text-center hover:border-legal-gold/50 transition-all"
            >
              <div className="w-32 h-32 bg-legal-gold/10 overflow-hidden mx-auto mb-8 border border-white/5 group-hover:border-legal-gold transition-colors">
                {partner.image ? (
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center group-hover:bg-legal-gold transition-colors">
                    <Users className="text-legal-gold group-hover:text-black transition-colors" size={40} />
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-serif mb-2 tracking-wider">{partner.name}</h3>
              <p className="text-legal-gold text-[10px] font-bold uppercase tracking-[0.3em]">{partner.role}</p>
              
              <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setSelectedPartner(partner)}
                  className="text-[10px] font-bold tracking-widest hover:text-legal-gold transition-colors"
                >
                  VIEW PROFILE →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <PartnerModal 
        partner={selectedPartner} 
        isOpen={!!selectedPartner} 
        onClose={() => setSelectedPartner(null)} 
      />
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: "Smart reads. Smarter decisions.",
      date: "May 10, 2025",
      author: "Stephanie Sharkey",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Legal clarity, one post at a time.",
      date: "May 13, 2025",
      author: "Patricia Sanders",
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Knowledge is your best defense.",
      date: "May 18, 2025",
      author: "Autumn Phillips",
      image: "https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <section id="blog" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <div className="flex items-center gap-3 text-legal-gold mb-4">
              <div className="w-8 h-[1px] bg-legal-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Our Blog & News</span>
            </div>
            <h2 className="text-5xl font-serif">What You Need To <br /> Know In Law</h2>
          </div>
          <p className="text-gray-500 max-w-xs hidden md:block text-sm">
            Law can be complex — but our blog makes it simple. Discover practical tips and real-world examples.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.div 
              key={post.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col md:flex-row gap-8 p-8 bg-[#0a0a0a] border border-white/5 hover:border-legal-gold/30 transition-all cursor-pointer"
            >
              <div className="w-full md:w-64 h-48 overflow-hidden shrink-0">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col justify-center flex-grow">
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest mb-4 text-gray-500">
                  <span>{post.date}</span>
                  <div className="w-1 h-1 bg-legal-gold rounded-full" />
                  <span>{post.author}</span>
                </div>
                <h3 className="text-3xl font-serif mb-6 group-hover:text-legal-gold transition-colors">{post.title}</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest group-hover:translate-x-2 transition-transform">
                  READ ARTICLE <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-serif mb-8 leading-tight">Connect With Our <br /> Legal Partners.</h2>
          <p className="text-gray-500">We are available across our offices in Bangalore and Mysore to assist you with your legal needs.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          <div className="bg-white/5 p-10 border border-white/10 text-center group hover:border-legal-gold/30 transition-all">
            <Phone size={32} className="text-legal-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <div className="text-[10px] font-bold tracking-widest text-gray-500 mb-4 uppercase">Direct Line</div>
            <div className="text-xl font-serif">+91 80 1234 5678</div>
          </div>
          
          <div className="bg-white/5 p-10 border border-white/10 text-center group hover:border-legal-gold/30 transition-all">
            <Mail size={32} className="text-legal-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <div className="text-[10px] font-bold tracking-widest text-gray-500 mb-4 uppercase">Email Inquiry</div>
            <div className="text-xl font-serif">contact@vitarkalaw.com</div>
          </div>
          
          <div className="bg-white/5 p-10 border border-white/10 text-center group hover:border-legal-gold/30 transition-all">
            <MapPin size={32} className="text-legal-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <div className="text-[10px] font-bold tracking-widest text-gray-500 mb-4 uppercase">Office Locations</div>
            <div className="space-y-6 text-left">
              <div>
                <div className="text-legal-gold text-[8px] font-bold mb-1 uppercase tracking-widest">Bangalore Office</div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  No.353, 10th Main Road, Poornapragna Layout, Uttarahalli, Bengaluru-560061
                </div>
              </div>
              <div>
                <div className="text-legal-gold text-[8px] font-bold mb-1 uppercase tracking-widest">Mysore Office</div>
                <div className="text-sm text-gray-400 leading-relaxed">
                  No.9, B6, J-Block, Ranagaroa Colony, Ramakrishna Nagar, Mysore-570022
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = () => {
  const leadMessage = encodeURIComponent("Hello Vitarka Law Partners, I would like to inquire about your legal services.");
  return (
    <motion.a 
      href={`https://wa.me/918660252014?text=${leadMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
    >
      <MessageCircle size={32} fill="currentColor" />
      <span className="absolute -top-2 -right-2 bg-legal-gold text-black text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
        LIVE
      </span>
    </motion.a>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
              <img 
                src="https://res.cloudinary.com/dyiwep5ls/image/upload/f_auto,q_auto/IMG_8067_nwdr1e" 
                alt="Vitarka Logo" 
                className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-[0.2em]">VITARKA</span>
              <span className="text-[6px] tracking-[0.4em] text-gray-500">LAW PARTNERS</span>
            </div>
          </div>
          <div className="flex gap-12 text-[10px] font-bold tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-white transition-colors">DISCLAIMER</a>
          </div>
        </div>
        <div className="text-center text-[10px] tracking-[0.3em] text-gray-600">
          © 2026 VITARKA LAW PARTNERS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-[2px] bg-legal-gold origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="min-h-screen selection:bg-legal-gold selection:text-black">
      <ScrollProgress />
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />
      <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
      <About />
      <Approach />
      <Services />
      <Team />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
      
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
      
      <AnimatePresence>
        {showDisclaimer && (
          <DisclaimerModal onAccept={() => setShowDisclaimer(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}