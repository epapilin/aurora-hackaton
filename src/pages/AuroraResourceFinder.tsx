import React from 'react';
import { motion } from 'motion/react';
import { Search, Globe, Users } from 'lucide-react';

export default function AuroraResourceFinder() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="py-20 px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-aurora-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-aurora-cyan" />
        </div>
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">Aurora Resource Finder</h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          Unlock the power of the inDrive and Aurora Tech Award network.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-cyan flex items-center gap-3">
              <Users className="w-6 h-6" /> Mentor Matching
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Find and connect with past Aurora Tech Award winners, industry experts, and supportive venture capitalists who are actively looking to mentor female founders.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-aurora-lime flex items-center gap-3">
              <Globe className="w-6 h-6" /> Grant & Funding Locator
            </h3>
            <p className="text-white/70 leading-relaxed text-lg">
              Discover non-dilutive funding opportunities, accelerators, and female-focused venture funds tailored to your specific region, industry, and stage of growth.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-aurora-cyan/20 to-aurora-lime/20 blur-3xl rounded-full" />
          <div className="relative bg-aurora-dark border border-white/20 p-10 rounded-[3rem] shadow-2xl">
            <h3 className="text-3xl font-display font-bold mb-6">Why it matters for Aurora Founders</h3>
            <p className="text-lg text-white/80 leading-relaxed mb-6">
              You are not alone in this journey. The Aurora Tech Award is more than just a prize; it is a global sisterhood of innovators and disruptors.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              This tool bridges the gap between isolation and community, connecting you directly to the capital, knowledge, and support network you need to scale your vision globally.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
