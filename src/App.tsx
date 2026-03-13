import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, Upload, FileText, ArrowRight, 
  MessageSquare, Play, CheckCircle2, Mic, 
  Send, Loader2, Award, ChevronLeft, RefreshCw,
  Activity, Target, Clock, TrendingUp, AlertCircle, ChevronDown, Menu, X
} from 'lucide-react';

import Platform from './pages/Platform';
import Ecosystem from './pages/Ecosystem';
import SignIn from './pages/SignIn';
import PitchDeckAnalyzer from './pages/PitchDeckAnalyzer';
import InvestorQuestionPredictor from './pages/InvestorQuestionPredictor';
import ConversationSimulator from './pages/ConversationSimulator';
import BiasResponseCoach from './pages/BiasResponseCoach';
import AuroraCommunicationAssistant from './pages/AuroraCommunicationAssistant';
import AuroraResourceFinder from './pages/AuroraResourceFinder';
import HeroImage from './components/HeroImage';

type Page = 'home' | 'platform' | 'ecosystem' | 'signin' | 'pitch-deck-analyzer' | 'investor-question-predictor' | 'conversation-simulator' | 'bias-response-coach' | 'investor-communication-assistant' | 'aurora-resource-finder' | 'ai-learning-assistant';
type Step = 'onboarding' | 'context' | 'dashboard' | 'mode' | 'simulator' | 'report';
type Mode = 'roast' | 'polish' | null;

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [currentStep, setCurrentStep] = useState<Step>('onboarding');
  const [pitchText, setPitchText] = useState('');
  const [selectedMode, setSelectedMode] = useState<Mode>(null);
  const [isEcosystemOpen, setIsEcosystemOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Simulator state
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // AI responses for the simulator
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!chatRef.current) {
        throw new Error("Chat not initialized");
      }

      const response = await chatRef.current.sendMessage({ message: inputValue });
      
      setQuestionCount(prev => prev + 1);
      
      // End simulation after 3 questions
      if (questionCount >= 2) {
        setCurrentStep('report');
        return;
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: response.text || '' }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', content: "Sorry, I encountered an error processing your response." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const startSimulator = async (mode: Mode) => {
    setSelectedMode(mode);
    setCurrentStep('simulator');
    setIsTyping(true);
    setQuestionCount(0);
    setMessages([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = mode === 'roast' 
        ? `You are a tough, critical startup investor. The user is pitching their startup. Their pitch context is: "${pitchText}". Roast their pitch, ask hard questions about their business model, competitors, and traction. Be direct and critical. Ask one question at a time.`
        : `You are a supportive pitch coach. The user is pitching their startup. Their pitch context is: "${pitchText}". Help them polish their pitch, make it more impactful, and improve their storytelling. Be encouraging but constructive. Ask one question at a time to guide them.`;

      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction,
        }
      });

      const initialPrompt = mode === 'roast'
        ? "Start the roast session. Give a brief initial critique based on the pitch context and ask your first hard question."
        : "Start the polish session. Give a brief encouraging feedback based on the pitch context and ask your first guiding question.";

      const response = await chatRef.current.sendMessage({ message: initialPrompt });
      
      setMessages([{ id: Date.now().toString(), role: 'ai', content: response.text || '' }]);
    } catch (error) {
      console.error("Error starting simulator:", error);
      setMessages([{ id: Date.now().toString(), role: 'ai', content: "Sorry, I couldn't connect to the AI. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // SVG Shapes for Onboarding Background
  const GeometricShapes = () => (
    <div className="absolute bottom-0 left-0 w-full h-48 overflow-hidden pointer-events-none flex items-end justify-between px-4 opacity-90">
      {/* Starburst 1 */}
      <svg width="120" height="120" viewBox="0 0 100 100" className="text-white transform -translate-y-4">
        <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="currentColor" />
        <path d="M15 15 L45 45 L85 15 L55 55 L85 85 L55 55 L15 85 L45 55 Z" stroke="currentColor" strokeWidth="8" />
      </svg>
      {/* Lime Semi-circle */}
      <svg width="140" height="140" viewBox="0 0 100 100" className="text-aurora-lime transform translate-y-10">
        <path d="M0 50 A50 50 0 0 1 100 50 Z" fill="currentColor" transform="rotate(-90 50 50)" />
        <path d="M0 50 A50 50 0 0 1 100 50 Z" fill="currentColor" transform="rotate(90 50 50) translate(10 0)" />
      </svg>
      {/* Starburst 2 */}
      <svg width="150" height="150" viewBox="0 0 100 100" className="text-white transform translate-y-8">
        <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="currentColor" />
        <path d="M15 15 L45 45 L85 15 L55 55 L85 85 L55 55 L15 85 L45 55 Z" stroke="currentColor" strokeWidth="8" />
      </svg>
      {/* Wavy Shape */}
      <svg width="160" height="160" viewBox="0 0 100 100" className="text-white transform translate-y-12">
        <path d="M0 100 Q 25 0 50 100 T 100 100 L 100 100 L 0 100 Z" fill="currentColor" />
      </svg>
      {/* Cyan Semi-circles */}
      <svg width="140" height="140" viewBox="0 0 100 100" className="text-aurora-cyan transform translate-y-4">
        <path d="M0 50 A50 50 0 0 1 100 50 Z" fill="currentColor" />
        <path d="M0 50 A50 50 0 0 0 100 50 Z" fill="currentColor" transform="translate(0 10)" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-aurora-blue text-white font-sans selection:bg-aurora-lime selection:text-aurora-blue flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between relative z-50 bg-aurora-blue/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActivePage('home'); setCurrentStep('onboarding'); }}>
          <Sparkles className="w-6 h-6 text-white" />
          <span className="font-display font-bold text-xl tracking-tight">Aurora Voice</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="text-sm font-medium text-white hidden md:flex gap-8 items-center">
          <button onClick={() => setActivePage('platform')} className={`transition-colors ${activePage === 'platform' ? 'text-aurora-lime' : 'hover:text-aurora-lime'}`}>Platform</button>
          
          <div 
            className="relative group"
            onMouseEnter={() => setIsEcosystemOpen(true)}
            onMouseLeave={() => setIsEcosystemOpen(false)}
          >
            <button 
              onClick={() => setActivePage('ecosystem')} 
              className={`transition-colors flex items-center gap-1 py-4 ${['ecosystem', 'pitch-deck-analyzer', 'investor-question-predictor', 'conversation-simulator', 'bias-response-coach', 'investor-communication-assistant', 'aurora-resource-finder', 'ai-learning-assistant'].includes(activePage) ? 'text-aurora-lime' : 'hover:text-aurora-lime'}`}
            >
              Aurora Ecosystem <ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {isEcosystemOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-0 w-72 bg-aurora-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 z-50"
                >
                  <button onClick={() => { setActivePage('pitch-deck-analyzer'); setIsEcosystemOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-aurora-lime">Pitch Deck Analyzer</button>
                  <button onClick={() => { setActivePage('investor-question-predictor'); setIsEcosystemOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-aurora-lime">Investor Question Predictor</button>
                  <button onClick={() => { setActivePage('conversation-simulator'); setIsEcosystemOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-aurora-lime">Conversation Simulator</button>
                  <button onClick={() => { setActivePage('bias-response-coach'); setIsEcosystemOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-aurora-lime">Bias Response Coach</button>
                  <button onClick={() => { setActivePage('investor-communication-assistant'); setIsEcosystemOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-aurora-lime">Aurora Communication Assistant</button>
                  <button onClick={() => { setActivePage('aurora-resource-finder'); setIsEcosystemOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-white/5 transition-colors text-white/80 hover:text-aurora-lime">Aurora Resource Finder</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => setActivePage('signin')} className={`px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors ${activePage === 'signin' ? 'bg-white/10' : ''}`}>Sign In</button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 right-0 bg-aurora-dark/95 backdrop-blur-xl border-b border-white/10 overflow-hidden md:hidden shadow-2xl"
            >
              <div className="flex flex-col p-6 space-y-6">
                <button onClick={() => { setActivePage('platform'); setIsMobileMenuOpen(false); }} className={`text-left text-xl font-medium ${activePage === 'platform' ? 'text-aurora-lime' : 'text-white'}`}>Platform</button>
                
                <div className="flex flex-col space-y-4">
                  <button onClick={() => { setActivePage('ecosystem'); setIsMobileMenuOpen(false); }} className={`text-left text-xl font-medium ${['ecosystem', 'pitch-deck-analyzer', 'investor-question-predictor', 'conversation-simulator', 'bias-response-coach', 'investor-communication-assistant', 'aurora-resource-finder', 'ai-learning-assistant'].includes(activePage) ? 'text-aurora-lime' : 'text-white'}`}>Aurora Ecosystem</button>
                  <div className="pl-4 flex flex-col space-y-4 border-l border-white/10 py-2">
                    <button onClick={() => { setActivePage('pitch-deck-analyzer'); setIsMobileMenuOpen(false); }} className="text-left text-white/70 hover:text-aurora-lime">Pitch Deck Analyzer</button>
                    <button onClick={() => { setActivePage('investor-question-predictor'); setIsMobileMenuOpen(false); }} className="text-left text-white/70 hover:text-aurora-lime">Investor Question Predictor</button>
                    <button onClick={() => { setActivePage('conversation-simulator'); setIsMobileMenuOpen(false); }} className="text-left text-white/70 hover:text-aurora-lime">Conversation Simulator</button>
                    <button onClick={() => { setActivePage('bias-response-coach'); setIsMobileMenuOpen(false); }} className="text-left text-white/70 hover:text-aurora-lime">Bias Response Coach</button>
                    <button onClick={() => { setActivePage('investor-communication-assistant'); setIsMobileMenuOpen(false); }} className="text-left text-white/70 hover:text-aurora-lime">Aurora Communication Assistant</button>
                    <button onClick={() => { setActivePage('aurora-resource-finder'); setIsMobileMenuOpen(false); }} className="text-left text-white/70 hover:text-aurora-lime">Aurora Resource Finder</button>
                  </div>
                </div>

                <button onClick={() => { setActivePage('signin'); setIsMobileMenuOpen(false); }} className={`text-left text-xl font-medium ${activePage === 'signin' ? 'text-aurora-lime' : 'text-white'}`}>Sign In</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {activePage === 'platform' && <Platform key="platform" />}
          {activePage === 'ecosystem' && <Ecosystem key="ecosystem" />}
          {activePage === 'pitch-deck-analyzer' && <PitchDeckAnalyzer key="pitch-deck-analyzer" />}
          {activePage === 'investor-question-predictor' && <InvestorQuestionPredictor key="investor-question-predictor" />}
          {activePage === 'conversation-simulator' && <ConversationSimulator key="conversation-simulator" />}
          {activePage === 'bias-response-coach' && <BiasResponseCoach key="bias-response-coach" />}
          {activePage === 'investor-communication-assistant' && <AuroraCommunicationAssistant key="investor-communication-assistant" />}
          {activePage === 'aurora-resource-finder' && <AuroraResourceFinder key="aurora-resource-finder" />}
          {activePage === 'signin' && <SignIn key="signin" onLogin={() => { setActivePage('home'); setCurrentStep('context'); }} />}

          {activePage === 'home' && (
            <motion.div key="home" className="flex-1 flex flex-col relative w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AnimatePresence mode="wait">
                {/* STEP 0: ONBOARDING */}
                {currentStep === 'onboarding' && (
            <motion.div 
              key="onboarding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col justify-center px-8 w-full z-10 relative"
            >
              <div className="max-w-6xl mx-auto w-full relative z-10 pb-32 pt-20">
                <h1 className="text-5xl md:text-7xl lg:text-[80px] font-display font-medium mb-4 leading-[1.1]">
                  AI Copilot for <span className="text-aurora-lime italic font-bold">High-Stakes Conversations</span>
                </h1>
                <h3 className="text-2xl md:text-3xl text-white/80 font-medium mb-10">
                  Built for <span className="text-aurora-lime italic font-bold">boldest</span> female founders.
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-12">
                  <button 
                    onClick={() => setCurrentStep('context')}
                    className="group relative px-8 py-4 bg-aurora-lime text-aurora-blue font-bold rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
                  >
                    Try Demo
                    <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setActivePage('signin')}
                    className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full text-lg transition-all hover:bg-white/20 flex items-center gap-2"
                  >
                    Login
                  </button>
                </div>
              </div>
              <GeometricShapes />
            </motion.div>
          )}

          {/* STEP 1: CONTEXT GATHERING */}
          {currentStep === 'context' && (
            <motion.div 
              key="context"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full z-10 pt-12"
            >
              <button onClick={() => setCurrentStep('onboarding')} className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors w-fit">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              
              <h2 className="text-4xl font-display font-bold mb-2">Upload your materials</h2>
              <p className="text-white/80 mb-8 text-lg">We need your pitch deck or executive summary to build your personalized training plan.</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-white/40 rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-aurora-lime" />
                  </div>
                  <h3 className="font-bold text-xl mb-1">Upload Pitch Deck</h3>
                  <p className="text-sm text-white/70">PDF, PPTX (Max 10MB)</p>
                </div>

                {/* Text Area */}
                <div className="flex flex-col">
                  <textarea 
                    value={pitchText}
                    onChange={(e) => setPitchText(e.target.value)}
                    placeholder="Or paste your startup summary, problem, solution, and traction here..."
                    className="flex-1 bg-white/5 border border-white/20 rounded-3xl p-6 text-white placeholder:text-white/50 focus:outline-none focus:border-aurora-lime focus:ring-1 focus:ring-aurora-lime resize-none min-h-[250px] text-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setCurrentStep('dashboard')}
                  className="px-8 py-4 bg-aurora-lime text-aurora-blue font-bold rounded-full transition-all hover:bg-white flex items-center gap-2 text-lg"
                >
                  Analyze & Build Plan
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: DASHBOARD (NEW) */}
          {currentStep === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col p-6 max-w-5xl mx-auto w-full z-10 pt-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-display font-bold mb-2">Your Readiness Dashboard</h2>
                  <p className="text-white/80 text-lg">Based on your uploaded materials, here is your current status.</p>
                </div>
                <button 
                  onClick={() => setCurrentStep('mode')}
                  className="px-8 py-4 bg-aurora-lime text-aurora-blue font-bold rounded-full transition-all hover:bg-white flex items-center gap-2 shadow-lg hover:scale-105"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Start Training
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Readiness Meter */}
                <div className="bg-white/10 border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <h3 className="text-lg font-medium text-white/80 mb-6 w-full text-left">Overall Readiness</h3>
                  
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* SVG Speedometer */}
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 absolute inset-0">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      {/* 65% full. Circumference = 2 * pi * 40 = 251.2. 65% = 163.28. Offset = 251.2 - 163.28 = 87.92 */}
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-aurora-lime" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="87.92" strokeLinecap="round" />
                    </svg>
                    <div className="flex flex-col items-center">
                      <span className="text-5xl font-display font-bold text-aurora-lime">65%</span>
                      <span className="text-sm text-white/60 mt-1">Ready for Finals</span>
                    </div>
                  </div>
                  
                  <p className="mt-6 text-sm text-white/80">
                    Your pitch structure is solid, but Q&A readiness needs work.
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-6">
                  <div className="bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-aurora-cyan/20 flex items-center justify-center text-aurora-cyan mb-4">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-4xl font-display font-bold mb-1">2</div>
                      <div className="text-white/70">Pitches Completed</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-aurora-lime/20 flex items-center justify-center text-aurora-lime mb-4">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-4xl font-display font-bold mb-1">10<span className="text-2xl text-white/40">/30</span></div>
                      <div className="text-white/70">Questions Mastered</div>
                    </div>
                  </div>

                  <div className="bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-4xl font-display font-bold mb-1">5</div>
                      <div className="text-white/70">Days until Investor Pitch</div>
                    </div>
                  </div>

                  <div className="bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col justify-between">
                    <div className="w-12 h-12 rounded-full bg-aurora-cyan/20 flex items-center justify-center text-aurora-cyan mb-4">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-4xl font-display font-bold mb-1">+15%</div>
                      <div className="text-white/70">Confidence Score Growth</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actionable Insights */}
              <div className="bg-aurora-dark border border-white/10 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-aurora-lime" />
                  Main Topics to Work On
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-aurora-cyan font-bold mb-2">Unit Economics</div>
                    <p className="text-sm text-white/70">Investors will drill into your CAC and LTV. Let's practice defending your numbers.</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-aurora-lime font-bold mb-2">Go-to-Market</div>
                    <p className="text-sm text-white/70">Your organic growth is great, but how will you scale to enterprise clients?</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <div className="text-white font-bold mb-2">Competitor Analysis</div>
                    <p className="text-sm text-white/70">Saying "we have no competitors" is a red flag. Let's reframe this.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: MODE SELECTION */}
          {currentStep === 'mode' && (
            <motion.div 
              key="mode"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full z-10"
            >
              <button onClick={() => setCurrentStep('dashboard')} className="absolute top-8 left-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to Dashboard
              </button>

              <h2 className="text-5xl font-display font-bold mb-4 text-center">Choose your training mode</h2>
              <p className="text-white/80 mb-12 text-center max-w-2xl text-lg">
                Select how you want to practice today.
              </p>

              <div className="grid md:grid-cols-2 gap-6 w-full">
                {/* Roast Mode */}
                <button 
                  onClick={() => startSimulator('roast')}
                  className="group relative overflow-hidden rounded-[2rem] border-2 border-white/20 bg-white/5 p-10 text-left hover:border-aurora-cyan hover:bg-white/10 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-aurora-cyan/20 flex items-center justify-center mb-6 text-aurora-cyan">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Roast My Pitch</h3>
                  <p className="text-white/70 leading-relaxed mb-8 text-lg">
                    Hardcore mode. I will act as a skeptical investor, asking tough questions about your unit economics, competitors, and risks.
                  </p>
                  <div className="flex items-center gap-2 text-aurora-cyan font-bold text-lg">
                    Start Roast <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Polish Mode */}
                <button 
                  onClick={() => startSimulator('polish')}
                  className="group relative overflow-hidden rounded-[2rem] border-2 border-white/20 bg-white/5 p-10 text-left hover:border-aurora-lime hover:bg-white/10 transition-all"
                >
                  <div className="w-16 h-16 rounded-full bg-aurora-lime/20 flex items-center justify-center mb-6 text-aurora-lime">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4">Polish My Pitch</h3>
                  <p className="text-white/70 leading-relaxed mb-8 text-lg">
                    Supportive mode. We will work together to refine your wording, make your value prop clearer, and improve your storytelling.
                  </p>
                  <div className="flex items-center gap-2 text-aurora-lime font-bold text-lg">
                    Start Polish <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: IMMERSIVE SIMULATOR */}
          {currentStep === 'simulator' && (
            <motion.div 
              key="simulator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col max-w-4xl mx-auto w-full z-10 h-full bg-aurora-dark/50 rounded-t-3xl border-t border-x border-white/10 mt-4 shadow-2xl"
            >
              {/* Simulator Header */}
              <div className="p-6 flex items-center justify-between border-b border-white/10 bg-white/5 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${selectedMode === 'roast' ? 'bg-aurora-cyan' : 'bg-aurora-lime'}`} />
                  <span className="font-bold text-sm tracking-wider uppercase text-white/80">
                    {selectedMode === 'roast' ? 'Investor Q&A Session' : 'Mentorship Session'}
                  </span>
                </div>
                <button onClick={() => setCurrentStep('dashboard')} className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                  End Session
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {messages.map((msg) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={msg.id} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                      {msg.role === 'ai' && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm font-bold text-white/70">Aurora Mentor</span>
                        </div>
                      )}
                      <div className={`
                        p-6 rounded-[2rem] text-lg leading-relaxed shadow-sm
                        ${msg.role === 'user' 
                          ? 'bg-white text-aurora-blue rounded-tr-sm font-medium' 
                          : selectedMode === 'roast' 
                            ? 'bg-aurora-cyan/20 border border-aurora-cyan/30 text-white rounded-tl-sm'
                            : 'bg-aurora-lime/20 border border-aurora-lime/30 text-white rounded-tl-sm'
                        }
                      `}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-white/10 border border-white/20 p-6 rounded-[2rem] rounded-tl-sm flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-white/70" />
                      <span className="text-white/70 font-medium">Analyzing response...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 pt-0 bg-transparent">
                <form onSubmit={handleSendMessage} className="relative flex items-end gap-2 bg-white/10 border border-white/20 rounded-[2rem] p-2 focus-within:border-white/50 focus-within:bg-white/15 transition-all shadow-lg">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your answer..."
                    className="flex-1 bg-transparent text-white placeholder:text-white/50 p-4 max-h-32 min-h-[60px] resize-none focus:outline-none text-lg"
                    disabled={isTyping}
                  />
                  <div className="flex items-center gap-2 p-2">
                    <button type="button" className="p-4 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors">
                      <Mic className="w-6 h-6" />
                    </button>
                    <button 
                      type="submit" 
                      disabled={!inputValue.trim() || isTyping}
                      className={`p-4 rounded-full transition-colors ${
                        inputValue.trim() && !isTyping 
                          ? 'bg-aurora-lime text-aurora-blue shadow-md hover:scale-105' 
                          : 'bg-white/20 text-white/40'
                      }`}
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4 text-sm text-white/50">
                  Press Enter to send, Shift + Enter for new line
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: REPORT */}
          {currentStep === 'report' && (
            <motion.div 
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col p-6 max-w-4xl mx-auto w-full z-10 pt-12"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-aurora-lime/20 text-aurora-lime mb-6">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h2 className="text-5xl font-display font-bold mb-4">Session Complete</h2>
                <p className="text-xl text-white/80">Here is your actionable feedback summary.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 border border-white/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-aurora-lime">
                    <Sparkles className="w-6 h-6" /> Strengths
                  </h3>
                  <ul className="space-y-4 text-white/90 text-lg">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-aurora-lime shrink-0" />
                      Clear problem statement and deep understanding of the target audience.
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-aurora-lime shrink-0" />
                      Strong founder-market fit demonstrated in your answers.
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 border border-white/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-aurora-cyan">
                    <MessageSquare className="w-6 h-6" /> Areas to Improve
                  </h3>
                  <ul className="space-y-4 text-white/90 text-lg">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-aurora-cyan shrink-0" />
                      Be more specific about your Customer Acquisition Cost (CAC).
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-aurora-cyan shrink-0" />
                      The "no competitors" claim needs to be reframed to acknowledge indirect alternatives.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center gap-6">
                <button 
                  onClick={() => setCurrentStep('dashboard')}
                  className="px-8 py-4 bg-white/20 text-white font-bold rounded-full transition-all hover:bg-white/30 flex items-center gap-2 text-lg"
                >
                  <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                </button>
                <button 
                  className="px-8 py-4 bg-aurora-lime text-aurora-blue font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 shadow-lg text-lg"
                >
                  <FileText className="w-5 h-5" /> Export PDF Report
                </button>
              </div>
            </motion.div>
          )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
