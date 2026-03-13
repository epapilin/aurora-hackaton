import React from 'react';
import { motion } from 'motion/react';
import { Database, Server, BrainCircuit, Network } from 'lucide-react';

export default function Ecosystem() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="py-20 px-8 max-w-6xl mx-auto w-full"
    >
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">The Aurora Ecosystem</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">A powerful synergy of AI and specialized knowledge.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-aurora-dark border border-white/20 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-aurora-cyan/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-aurora-lime/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="w-16 h-16 rounded-2xl bg-aurora-cyan/20 text-aurora-cyan flex items-center justify-center mb-8 relative z-10">
            <Server className="w-8 h-8" />
          </div>
          
          <h3 className="text-4xl font-display font-bold mb-6 relative z-10">Powered by MCP Server</h3>
          <p className="text-xl text-white/80 leading-relaxed mb-6 relative z-10">
            At the heart of Aurora Voice lies a state-of-the-art AI Agent connected to a dedicated 
            <strong> Model Context Protocol (MCP)</strong> server. This isn't just a generic chatbot.
          </p>
          <p className="text-xl text-white/80 leading-relaxed mb-8 relative z-10">
            Our MCP server houses an incredible, meticulously curated knowledge base tailored specifically 
            for the Aurora Tech Award. It contains historical winning pitches, jury evaluation criteria, 
            market analysis frameworks, and deep insights into emerging markets.
          </p>
          
          <div className="flex items-center gap-3 text-aurora-lime font-bold text-lg relative z-10 bg-white/5 w-fit px-6 py-3 rounded-full border border-white/10">
            <Database className="w-5 h-5" /> 
            Unmatched Contextual Awareness
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/20 p-8 rounded-3xl flex items-start gap-6"
          >
            <div className="w-14 h-14 shrink-0 rounded-full bg-aurora-lime/20 text-aurora-lime flex items-center justify-center">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Cognitive AI Agent</h4>
              <p className="text-white/70 text-lg">Adapts its persona to simulate different types of investors, from supportive angels to rigorous institutional VCs.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/20 p-8 rounded-3xl flex items-start gap-6"
          >
            <div className="w-14 h-14 shrink-0 rounded-full bg-aurora-cyan/20 text-aurora-cyan flex items-center justify-center">
              <Network className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-2">Real-time Document Parsing</h4>
              <p className="text-white/70 text-lg">Instantly extracts key metrics, value propositions, and financial projections from your uploaded materials.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
