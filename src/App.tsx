import React, { useEffect, useState } from 'react';
import { Phone, Instagram, MapPin, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';
import { Product, Category } from './types';
import { Navbar, BottomNav, Logo } from './components/Navigation';
import ProductCard from './components/ProductCard';
import Chatbot from './components/Chatbot';
import { cn } from './lib/utils';

const CATEGORIES: Category[] = ['All', 'Cots', 'Sofas', 'Mattresses', 'Dressing Tables', 'Computer Tables'];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
    const timer = setTimeout(() => setShowWelcome(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      setProducts(data && data.length > 0 ? data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = (p.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false) || 
                         (p.category?.toLowerCase()?.includes(searchQuery.toLowerCase()) ?? false);
    return matchesCategory && matchesSearch;
  });

  const handleInstagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const deepLink = "instagram://user?username=sushma_furniture";
    const webLink = "https://www.instagram.com/sushma_furniture";

    if (isMobile) {
      window.location.href = deepLink;
      // Fallback if app not installed or doesn't open
      setTimeout(() => {
        if (document.hasFocus()) {
          window.open(webLink, '_blank');
        }
      }, 2500);
    } else {
      window.open(webLink, '_blank');
    }
  };

  return (
    <AnimatePresence>
      {showWelcome ? (
        <motion.div
          key="welcome"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-brand-cream flex items-center justify-center"
        >
          <Logo className="text-3xl md:text-5xl scale-150" />
        </motion.div>
      ) : (
        <motion.div 
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen pb-32 bg-brand-cream"
        >
          <div className="opacity-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 pt-12">
          {/* Quote Section */}
          <section className="mb-16 text-center px-4">
            <div className="relative inline-block">
              <p className="font-serif italic text-xl md:text-2xl text-brand-accent/80 max-w-2xl mx-auto leading-relaxed">
                "Beautiful furniture for a beautiful home."
              </p>
            </div>
          </section>

            {/* Categories Horizontal Scroll */}
            <section className="mb-12 overflow-x-auto no-scrollbar -mx-4 px-4">
              <div className="flex gap-3 min-w-max pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-medium transition-all border",
                      activeCategory === cat
                        ? "bg-brand-accent text-white border-brand-accent shadow-md"
                        : "bg-brand-cream text-brand-accent/60 border-brand-beige hover:border-brand-accent/30"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </section>

            {/* Product Grid */}
            <section>
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-4">
                      <div className="aspect-[4/5] bg-brand-beige rounded-2xl" />
                      <div className="h-4 bg-brand-beige rounded w-1/2" />
                      <div className="h-6 bg-brand-beige rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                      {filteredProducts.map((product) => (
                        <ProductCard 
                          key={product.id} 
                          product={product} 
                          onClick={() => setSelectedProduct(product)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-brand-accent/40 font-serif italic text-xl">No products found matching your search.</p>
                      <button 
                        onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                        className="mt-4 text-brand-accent underline underline-offset-4"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* Social Links Footer Section */}
            <section className="mt-24 pt-12 border-t border-brand-beige">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                  <h3 className="font-serif text-3xl italic mb-2">Sushma Furniture</h3>
                  <p className="text-brand-accent/60 text-sm">Premium Quality. Timeless Design.</p>
                </div>
                
                <div className="flex gap-6">
                  <SocialIcon 
                    href="https://wa.me/9581692607" 
                    icon={
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    } 
                    label="WhatsApp" 
                  />
                  <SocialIcon 
                    href="https://www.instagram.com/sushma_furniture" 
                    onClick={handleInstagramClick}
                    icon={<Instagram size={20} />} 
                    label="Instagram" 
                  />
                  <SocialIcon 
                    href="https://maps.app.goo.gl/LjqkFvoc3TjuciU68" 
                    icon={<MapPin size={20} />} 
                    label="Visit Us" 
                  />
                </div>
              </div>
              <div className="mt-12 text-center text-[10px] uppercase tracking-widest text-brand-accent/40">
                © 2026 Sushma Furniture. All Rights Reserved.
              </div>
            </section>
          </main>

          <Chatbot />
          <BottomNav 
            onSearchClick={() => setIsSearchOpen(true)} 
            activeTab={isSearchOpen ? 'search' : 'home'}
          />

          {/* Search Overlay */}
          {isSearchOpen && (
            <div
              className="fixed inset-0 z-[60] bg-brand-cream flex flex-col"
            >
                <div className="p-6 flex items-center gap-4 border-b border-brand-beige">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent/50" size={20} />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search furniture..."
                      className="w-full bg-white border border-brand-beige rounded-full py-3 pl-12 pr-6 focus:outline-none focus:ring-1 focus:ring-brand-accent transition-all text-sm"
                    />
                  </div>
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-brand-beige rounded-full transition-colors"
                  >
                    <X size={24} className="text-brand-accent" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  {searchQuery && (
                    <div className="mb-6">
                      <h4 className="text-xs uppercase tracking-widest text-brand-accent/40 font-bold mb-4">Results for "{searchQuery}"</h4>
                      {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                          {filteredProducts.map(product => (
                            <div 
                              key={product.id} 
                              className="flex items-center gap-4 p-2 rounded-xl hover:bg-brand-beige/30 transition-colors cursor-pointer"
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsSearchOpen(false);
                              }}
                            >
                              <img 
                                src={product.image_url || product.image} 
                                alt={product.title} 
                                className="w-16 h-16 object-cover rounded-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800";
                                }}
                              />
                              <div>
                                <p className="font-serif text-sm font-bold">{product.title}</p>
                                <p className="text-xs text-brand-accent/60">₹{product.price.toLocaleString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-brand-accent/40 italic">No matches found.</p>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-8">
                    <h4 className="text-xs uppercase tracking-widest text-brand-accent/40 font-bold mb-4">Popular Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveCategory(cat);
                            setIsSearchOpen(false);
                          }}
                          className="px-4 py-2 rounded-full bg-white border border-brand-beige text-xs hover:border-brand-accent transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          {/* Product Detail Modal */}
          {selectedProduct && (
            <div
              className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <div
                className="bg-brand-cream w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur rounded-full shadow-md hover:bg-white transition-colors"
                  >
                    <X size={20} className="text-brand-accent" />
                  </button>

                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 aspect-[4/5] md:aspect-auto">
                      <img 
                        src={selectedProduct.image_url || selectedProduct.image} 
                        alt={selectedProduct.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <p className="text-xs uppercase tracking-[0.3em] text-brand-accent/40 font-bold mb-4">
                        {selectedProduct.category}
                      </p>
                      <h2 className="font-serif text-4xl md:text-5xl text-brand-accent mb-6 leading-tight">
                        {selectedProduct.title}
                      </h2>
                      <p className="text-2xl font-light text-brand-accent/70 mb-8">
                        ₹{selectedProduct.price.toLocaleString('en-IN')}
                      </p>
                      
                      <div className="space-y-6 mb-12">
                        <div className="flex items-center gap-4 text-sm text-brand-accent/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          Premium Quality Teak Wood
                        </div>
                        <div className="flex items-center gap-4 text-sm text-brand-accent/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          5 Years Warranty
                        </div>
                        <div className="flex items-center gap-4 text-sm text-brand-accent/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                          Free Home Delivery
                        </div>
                      </div>

                      <button 
                        onClick={() => window.open(`https://wa.me/9581692607?text=Hi, I'm interested in the ${selectedProduct.title}.`, '_blank')}
                        className="w-full bg-brand-accent text-white py-5 rounded-2xl font-bold tracking-widest uppercase text-sm shadow-xl hover:bg-brand-accent/90 transition-all active:scale-[0.98]"
                      >
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SocialIcon({ href, icon, label, onClick }: { href: string; icon: React.ReactNode; label: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-12 h-12 rounded-full border border-brand-beige flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300">
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </a>
  );
}
