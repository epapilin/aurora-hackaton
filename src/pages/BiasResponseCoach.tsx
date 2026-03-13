import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, TrendingUp, RefreshCw } from 'lucide-react';

export default function BiasResponseCoach() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="py-20 px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-aurora-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-aurora-cyan" />
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Bias Response Coach</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Master the art of the pivot. Turn defensive questions into offensive opportunities.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-cyan flex items-center gap-3">
              <ShieldAlert className="w-6 h-6" /> Pattern Recognition
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              The AI is trained to identify subtle and overt gender biases in investor questioning, alerting you when a question is framed from a "prevention" (risk-averse) mindset.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-lime flex items-center gap-3">
              <RefreshCw className="w-6 h-6" /> The Pivot Technique
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Trains you to answer the underlying concern briefly, and then immediately shift the focus back to your startup's massive upside, growth potential, and vision.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-aurora-cyan/20 to-aurora-lime/20 blur-3xl rounded-full" />
          <div className="relative bg-aurora-dark border border-white/20 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-6">Why it matters for Aurora Founders</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              Unconscious bias is a documented reality in venture capital. Founders who answer prevention questions with prevention answers raise significantly less capital.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              The Aurora Tech Award champions women who break barriers. This coach equips you with the rhetorical tools to dismantle bias in real-time, ensuring you are judged on your ambition and potential.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
