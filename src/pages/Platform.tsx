import React from 'react';
import { motion } from 'motion/react';
import { Upload, Cpu, GitMerge, MessageSquare, LineChart, Rocket, Globe, Shield, Zap, Target } from 'lucide-react';

export default function Platform() {
  const steps = [
    { 
      icon: <Upload className="w-8 h-8 text-aurora-lime" />,
      title: "1. Upload Your Vision", 
      desc: "Start by securely uploading your pitch deck, business plan, or executive summary. Our system accepts various formats and instantly begins processing your materials.", 
      align: "left",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    { 
      icon: <Cpu className="w-8 h-8 text-aurora-cyan" />,
      title: "2. Deep AI Analysis", 
      desc: "Our advanced MCP server analyzes your documents against a massive knowledge base of successful startups, market trends, and Aurora Tech Award criteria.", 
      align: "right",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
    },
    { 
      icon: <GitMerge className="w-8 h-8 text-white" />,
      title: "3. Choose Your Path", 
      desc: "Select your training mode. Need a harsh reality check? Choose 'Roast'. Want constructive help to refine your story? Choose 'Polish'.", 
      align: "center" 
    },
    { 
      icon: <MessageSquare className="w-8 h-8 text-aurora-lime" />,
      title: "4. Immersive Simulation", 
      desc: "Engage in a realistic, high-stakes Q&A session. The AI acts as a seasoned investor, asking probing questions tailored specifically to your startup's weak points.", 
      align: "left",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
    },
    { 
      icon: <LineChart className="w-8 h-8 text-aurora-cyan" />,
      title: "5. Actionable Insights", 
      desc: "Receive a comprehensive readiness dashboard and a detailed PDF report highlighting your strengths, areas for improvement, and specific metrics to focus on.", 
      align: "right",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    },
  ];

  const features = [
    { icon: <Globe />, title: "Global Impact", desc: "Designed specifically for founders in emerging markets, understanding local nuances and global ambitions." },
    { icon: <Shield />, title: "Safe Space to Fail", desc: "Practice high-stakes conversations in a zero-risk environment before facing real investors." },
    { icon: <Zap />, title: "Instant Feedback", desc: "No more waiting for mentor availability. Get actionable, data-driven feedback in seconds." },
    { icon: <Target />, title: "Data-Driven Precision", desc: "Evaluations based on real venture capital frameworks and past Aurora Tech Award winners." },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full pb-20 pt-24 md:pt-32"
    >
      <div className="px-4 md:px-8 max-w-6xl mx-auto w-full">
        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(204,255,0,0.15)] border border-white/10 mb-20 group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-aurora-dark via-transparent to-transparent z-10 pointer-events-none opacity-80" />
          <img 
            src="/hero-bg.png" 
            alt="Aurora Tech Awards" 
            className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Features Section (Empowering Women Description) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-aurora-lime/20 text-aurora-lime mb-8 shadow-[0_0_30px_rgba(204,255,0,0.3)]">
            <Rocket className="w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
            Empowering Women to <br/>
            <span className="text-aurora-lime italic drop-shadow-lg">Conquer New Heights</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            In today's fast-paced world, women are breaking barriers and reshaping industries. 
            Yet, the funding gap remains a significant hurdle. Aurora Voice is more than a tool; 
            it's a movement. We equip female entrepreneurs with the confidence, strategy, and 
            readiness to bring their visionary ideas to life and secure the capital they deserve.
          </p>
        </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mt-16 mb-40">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 border border-white/20 p-8 rounded-3xl hover:bg-white/10 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-aurora-cyan/20 text-aurora-cyan flex items-center justify-center mb-6">
              {React.cloneElement(f.icon as React.ReactElement, { className: "w-7 h-7" })}
            </div>
            <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
            <p className="text-white/70 text-lg leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* How it Works Section */}
      <div className="text-center mb-24 pt-20 border-t border-white/10">
        <h2 className="text-5xl md:text-6xl font-display font-bold mb-6">How It Works</h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">A seamless journey from your initial draft to a winning, investor-ready pitch.</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block transform -translate-x-1/2" />

        <div className="space-y-24 md:space-y-40">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center ${
                step.align === 'left' ? 'md:justify-between' : 
                step.align === 'right' ? 'md:justify-between md:flex-row-reverse' : 
                'md:justify-center'
              } relative`}
            >
              {/* Dot on the line */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-aurora-blue border-2 border-aurora-lime z-10" />
              
              {/* Text Card */}
              <div className={`w-full md:w-5/12 bg-white/5 border border-white/20 p-10 rounded-[2rem] backdrop-blur-md hover:bg-white/10 transition-colors ${
                step.align === 'center' ? 'md:w-8/12 text-center flex flex-col items-center' : ''
              }`}>
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-4">{step.title}</h3>
                <p className="text-white/70 text-lg leading-relaxed">{step.desc}</p>
              </div>

              {/* Image Card (only for left/right aligned) */}
              {step.align !== 'center' && step.image && (
                <div className="flex w-full md:w-5/12 justify-center items-center mt-8 md:mt-0">
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(204,255,0,0.05)] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-aurora-dark/80 via-transparent to-transparent z-10 pointer-events-none" />
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </motion.div>
  );
}
