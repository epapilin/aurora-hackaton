import React from 'react';
import { motion } from 'motion/react';
import { Mail, PenTool, MessageCircle } from 'lucide-react';

export default function AuroraCommunicationAssistant() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="py-20 px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-aurora-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-10 h-10 text-aurora-lime" />
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Aurora Communication Assistant</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Craft perfect follow-ups, updates, and negotiation emails.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-cyan flex items-center gap-3">
              <PenTool className="w-6 h-6" /> Smart Templates
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Access a library of proven email structures for every stage of the fundraising funnel: from the initial cold outreach to the post-meeting follow-up and the final term sheet negotiation.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-lime flex items-center gap-3">
              <MessageCircle className="w-6 h-6" /> Tone Adjustment
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Ensure your communications strike the perfect balance. The AI analyzes your drafts to make sure you sound professional, confident, engaging, and never overly apologetic.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-aurora-cyan/20 to-aurora-lime/20 blur-3xl rounded-full" />
          <div className="relative bg-aurora-dark border border-white/20 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-6">Why it matters for Aurora Founders</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              The pitch gets you in the door, but the follow-up closes the deal. Fundraising is an exercise in momentum and relationship building.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              This assistant helps you maintain that momentum, projecting unwavering competence and clarity in every written interaction with potential backers.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
