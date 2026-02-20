import React from 'react';
import { Search, ShoppingBag, User, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Logo({ className, layoutId = "main-logo" }: { className?: string, layoutId?: string }) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] // Custom high-end ease-out curve
      }}
      className={cn("flex items-center gap-3 shrink-0", className)}
    >
      <img 
        src="https://i.ibb.co/B5KgvsR8/logo.png" 
        alt="Sushma Furniture Logo" 
        className="h-8 w-8 md:h-12 md:w-12 object-contain shrink-0"
        referrerPolicy="no-referrer"
      />
      <h1 className="font-serif font-bold italic tracking-[0.1em] text-brand-gold whitespace-nowrap overflow-visible">
        SUSHMA FURNITURE
      </h1>
    </motion.div>
  );
}

export function Navbar({ onNavClick }: { onNavClick?: (tab: string) => void }) {
  return (
    <nav className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-md border-b border-brand-beige px-6 py-4 md:py-6 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <button onClick={() => onNavClick?.('home')}>
          <Logo className="text-xl md:text-2xl justify-start" />
        </button>
        
        <div className="hidden md:flex items-center gap-8 font-serif italic text-lg">
          <button onClick={() => onNavClick?.('collections')} className="hover:text-brand-accent transition-colors whitespace-nowrap">Collections</button>
          <button onClick={() => onNavClick?.('about')} className="hover:text-brand-accent transition-colors whitespace-nowrap">About Us</button>
        </div>
      </div>
    </nav>
  );
}

export function BottomNav({ onSearchClick, onNavClick, activeTab = 'home' }: { onSearchClick: () => void, onNavClick?: (tab: string) => void, activeTab?: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-brand-cream border-t border-brand-beige px-6 py-3 pb-6 md:pb-3">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <NavItem icon={<Home size={24} />} label="Home" active={activeTab === 'home'} onClick={() => onNavClick?.('home')} />
        <NavItem icon={<Search size={24} />} label="Search" active={activeTab === 'search'} onClick={onSearchClick} />
        <NavItem icon={<ShoppingBag size={24} />} label="Cart" active={activeTab === 'cart'} onClick={() => onNavClick?.('cart')} />
        <NavItem icon={<User size={24} />} label="Profile" active={activeTab === 'profile'} onClick={() => onNavClick?.('profile')} />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors",
        active ? "text-brand-accent" : "text-brand-accent/40 hover:text-brand-accent/70"
      )}
    >
      {icon}
      <span className="text-[10px] font-semibold uppercase tracking-wider">{label}</span>
    </button>
  );
}
