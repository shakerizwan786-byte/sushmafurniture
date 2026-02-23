import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Logo } from './components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TOS() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar onNavClick={() => navigate('/')} />
      
      <main className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-brand-accent/60 hover:text-brand-accent mb-12 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-serif italic">Back to Home</span>
          </button>

          <h1 className="font-serif text-5xl mb-12 italic text-brand-accent">Terms of Service</h1>
          
          <div className="bg-white p-10 rounded-3xl border border-brand-beige shadow-sm">
            <p className="text-xl text-brand-accent/80 leading-relaxed font-light">
              By using this app, you agree to our furniture sales and delivery terms.
            </p>
          </div>

          <div className="mt-20 text-center">
            <Logo className="opacity-20 grayscale scale-75" />
            <p className="mt-4 text-[10px] uppercase tracking-widest text-brand-accent/40">
              © 2026 Sushma Furniture. All Rights Reserved.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
