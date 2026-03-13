import React from 'react';
import { motion } from 'motion/react';
import { Presentation, FileSearch, Target } from 'lucide-react';

export default function PitchDeckAnalyzer() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="py-20 px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-aurora-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Presentation className="w-10 h-10 text-aurora-lime" />
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Pitch Deck Analyzer</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          AI-driven evaluation of your startup's narrative, metrics, and design.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-cyan flex items-center gap-3">
              <FileSearch className="w-6 h-6" /> Narrative Flow Check
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Ensures your problem, solution, and traction tell a compelling, logical story. The AI identifies missing slides, weak transitions, and areas where investors might lose interest.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-lime flex items-center gap-3">
              <Target className="w-6 h-6" /> Aurora Criteria Scoring
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Evaluates your deck specifically against the Aurora Tech Award criteria: profound social impact, deep tech innovation, and massive scalability.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-aurora-cyan/20 to-aurora-lime/20 blur-3xl rounded-full" />
          <div className="relative bg-aurora-dark border border-white/20 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-6">Why it matters for Aurora Founders</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Female founders often face higher scrutiny on financial projections and risk mitigation. A flawless pitch deck is your first line of defense.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              The Pitch Deck Analyzer ensures your presentation is bulletproof, highlighting your unique strengths and addressing perceived weaknesses before you even step into the boardroom.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
