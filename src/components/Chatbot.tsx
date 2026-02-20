import React, { useState } from 'react';
import { X, ExternalLink, Headset } from 'lucide-react';
import { cn } from '../lib/utils';

const GeminiStars = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <div 
    className={cn("relative flex items-center justify-center", className)}
    style={{ width: size, height: size }}
  >
    {/* Normal Star */}
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full"
    >
      <path d="M12 0C12 0 12.5 9.5 14.5 11.5C16.5 13.5 24 14 24 14C24 14 16.5 14.5 14.5 16.5C12.5 18.5 12 24 12 24C12 24 11.5 18.5 9.5 16.5C7.5 14.5 0 14 0 14C0 14 7.5 13.5 9.5 11.5C11.5 9.5 12 0 12 0Z" />
    </svg>
    
    {/* Small Star */}
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="absolute -top-1 -right-1 w-1/2 h-1/2"
    >
      <path d="M12 0C12 0 12.5 9.5 14.5 11.5C16.5 13.5 24 14 24 14C24 14 16.5 14.5 14.5 16.5C12.5 18.5 12 24 12 24C12 24 11.5 18.5 9.5 16.5C7.5 14.5 0 14 0 14C0 14 7.5 13.5 9.5 11.5C11.5 9.5 12 0 12 0Z" />
    </svg>
  </div>
);

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen && (
        <div
          className="mb-4 w-72 bg-white rounded-2xl shadow-2xl border border-brand-beige overflow-hidden"
        >
          <div className="bg-brand-accent p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <GeminiStars size={24} />
              <div>
                <h3 className="font-serif text-lg leading-tight">Sushma Assistant</h3>
                <p className="text-xs opacity-80">Online to help you</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-2">
            <ChatButton label="View Pricing" onClick={() => window.open('https://wa.me/9581692607?text=Hi, I would like to know the pricing.', '_blank')} />
            <ChatButton label="Contact Support" onClick={() => window.open('https://wa.me/9581692607', '_blank')} />
            <ChatButton label="View Products" onClick={() => setIsOpen(false)} />
            <ChatButton label="Website Link" onClick={() => window.location.reload()} />
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brand-accent/90 transition-colors"
      >
        {isOpen ? <X size={28} /> : <GeminiStars size={32} />}
      </button>
    </div>
  );
}

function ChatButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl border border-brand-beige hover:bg-brand-cream hover:border-brand-accent transition-all text-sm font-medium flex justify-between items-center group"
    >
      {label}
      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
