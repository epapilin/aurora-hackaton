import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignIn({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phase, setPhase] = useState<'typing-user' | 'typing-pass' | 'clicking' | 'cosmic' | 'success'>('typing-user');

  useEffect(() => {
    const targetUser = "founder@aurora.tech";
    let uIndex = 0;

    const typeUser = setInterval(() => {
      if (uIndex < targetUser.length) {
        setUsername(targetUser.slice(0, uIndex + 1));
        uIndex++;
      } else {
        clearInterval(typeUser);
        setTimeout(() => setPhase('typing-pass'), 600);
      }
    }, 80);

    return () => clearInterval(typeUser);
  }, []);

  useEffect(() => {
    if (phase === 'typing-pass') {
      const targetPass = "••••••••••••";
      let pIndex = 0;
      const typePass = setInterval(() => {
        if (pIndex < targetPass.length) {
          setPassword(targetPass.slice(0, pIndex + 1));
          pIndex++;
        } else {
          clearInterval(typePass);
          setTimeout(() => setPhase('clicking'), 600);
        }
      }, 80);
      return () => clearInterval(typePass);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'clicking') {
      setTimeout(() => setPhase('cosmic'), 800);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'cosmic') {
      setTimeout(() => setPhase('success'), 2500);
    }
  }, [phase]);

  // Generate random particles for cosmic effect
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1000,
    y: (Math.random() - 0.5) * 1000,
    scale: Math.random() * 2 + 0.5,
    color: Math.random() > 0.5 ? '#D4FF00' : '#5CE1E6'
  }));

  return (
    <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-[80vh] w-full">
      <AnimatePresence mode="wait">
        {(phase === 'typing-user' || phase === 'typing-pass' || phase === 'clicking') && (
          <motion.div 
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white/5 border border-white/20 rounded-[2rem] p-10 backdrop-blur-xl z-10 relative"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-aurora-lime" />
              </div>
              <h2 className="text-3xl font-display font-bold">Sign In</h2>
              <p className="text-white/50 mt-2">Access Aurora Voice</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white flex items-center min-h-[56px]">
                    <span>{username}</span>
                    {phase === 'typing-user' && <span className="w-0.5 h-5 bg-aurora-lime animate-pulse ml-[1px]" />}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white flex items-center min-h-[56px] tracking-widest">
                    <span>{password}</span>
                    {phase === 'typing-pass' && <span className="w-0.5 h-5 bg-aurora-lime animate-pulse ml-[1px]" />}
                  </div>
                </div>
              </div>

              <button 
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  phase === 'clicking' 
                    ? 'bg-aurora-lime text-aurora-blue scale-95 shadow-[0_0_30px_rgba(212,255,0,0.5)]' 
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {phase === 'clicking' ? 'Authenticating...' : 'Login'}
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'cosmic' && (
          <motion.div key="cosmic" className="absolute inset-0 flex items-center justify-center z-0">
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                animate={{ 
                  x: p.x, 
                  y: p.y, 
                  opacity: 0,
                  scale: p.scale
                }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute w-4 h-4 rounded-full"
                style={{ backgroundColor: p.color, boxShadow: `0 0 20px ${p.color}` }}
              />
            ))}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 5, 20], opacity: [0, 1, 0] }}
              transition={{ duration: 2 }}
              className="absolute w-32 h-32 rounded-full bg-white mix-blend-overlay blur-xl"
            />
          </motion.div>
        )}

        {phase === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="text-center z-10"
          >
            <div className="w-24 h-24 bg-aurora-lime/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(212,255,0,0.3)]">
              <CheckCircle2 className="w-12 h-12 text-aurora-lime" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Successfully Authenticated</h2>
            <p className="text-xl text-white/70 mb-10">Welcome to Aurora Voice. Let's get to work.</p>
            <button 
              onClick={onLogin}
              className="px-10 py-4 bg-aurora-lime text-aurora-blue font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto"
            >
              Start Dashboard <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
