import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Users, Activity } from 'lucide-react';

export default function ConversationSimulator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="py-20 px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-aurora-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-10 h-10 text-aurora-lime" />
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Conversation Simulator</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Practice your pitch with lifelike AI investor personas in real-time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-cyan flex items-center gap-3">
              <Users className="w-6 h-6" /> Dynamic Personas
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Choose your audience. Practice with the Skeptical VC, the Supportive Angel, the Deep-Tech Expert, or the Impact Investor. Each persona has unique priorities and questioning styles.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-lime flex items-center gap-3">
              <Activity className="w-6 h-6" /> Real-time Feedback
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Get instant, actionable analysis on your tone, pacing, clarity, and the substantive depth of your answers immediately after the simulation ends.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-aurora-cyan/20 to-aurora-lime/20 blur-3xl rounded-full" />
          <div className="relative bg-aurora-dark border border-white/20 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-6">Why it matters for Aurora Founders</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Pitching is a high-stakes performance. You don't want your first time answering a brutal question to be in front of a tier-1 venture capitalist.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              The Aurora Conversation Simulator provides a safe, private space to practice, stumble, and improve. It builds the critical muscle memory needed to project absolute confidence when it matters most.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
