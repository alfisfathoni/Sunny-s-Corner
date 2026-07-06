import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Info, 
  Calendar, 
  Truck, 
  Heart,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { treatmentData } from './data/treatments';
import type { TreatmentItem } from './types/treatment';

// Custom WhatsApp SVG Icon
const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.389 9.805-9.788.002-2.615-1.012-5.074-2.859-6.924C16.378 2.042 13.926.969 11.312.969c-5.41 0-9.813 4.403-9.815 9.803-.001 1.73.457 3.42 1.32 4.922L1.75 22.24l6.732-1.766-.182.16zM17.487 14.4c-.27-.136-1.6-.79-1.848-.88-.249-.09-.43-.136-.61.136-.18.272-.7.88-.857 1.058-.157.179-.315.2-.585.065-.27-.136-1.14-.42-2.172-1.34-1.03-1.157-1.748-2.527-1.95-2.87-.202-.341-.022-.525.148-.693.153-.15.342-.4.513-.6.172-.2.229-.341.343-.57.114-.227.057-.43-.028-.6-.086-.17-.7-.1.957-1.638-.25-.603-.51-.519-.7-.528-.18-.009-.387-.01-.595-.01s-.54.078-.823.388c-.282.31-1.077 1.053-1.077 2.568s1.101 2.977 1.254 3.184c.153.207 2.167 3.31 5.251 4.643.734.317 1.307.507 1.753.649.737.234 1.407.201 1.937.122.59-.088 1.848-.756 2.11-.1.488.261.262.775.262.88 0 .104-.1.186-.271.272z"/>
  </svg>
);

// Custom Instagram SVG Icon
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// Custom card leaf outline icon next to names
const CardLeafIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    className="w-4 h-4 text-sage-500 shrink-0 mt-1 animate-pulse" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 3.58 8 8 8h2a10 10 0 0 0 10-10C22 6.48 17.52 2 12 2Z" />
    <path d="M12 2c0 5.52-4.48 10-10 10" />
  </svg>
);

// Eucalyptus Branch SVG - Faint outline (stroke-opacity 7-8%)
const EucalyptusDecor = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 400 700" 
    className={`pointer-events-none select-none text-sage-400 transition-all duration-700 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2"
    strokeOpacity="0.08"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stem */}
    <path d="M50 680 C 130 520, 180 340, 260 80" />
    {/* Pair 1 */}
    <path d="M92 560 C 52 540, 32 480, 52 450 C 72 420, 102 440, 112 490 C 122 540, 112 570, 92 560 Z" />
    <path d="M92 560 Q 77 505 52 450" />
    <path d="M130 530 C 170 510, 200 460, 188 420 C 176 380, 136 400, 116 440 C 96 480, 106 510, 130 530 Z" />
    <path d="M130 530 Q 152 475 188 420" />
    {/* Pair 2 */}
    <path d="M152 385 C 112 365, 92 305, 112 275 C 132 245, 162 265, 172 315 C 182 365, 172 395, 152 385 Z" />
    <path d="M152 385 Q 137 330 112 275" />
    <path d="M190 355 C 230 335, 260 285, 248 245 C 236 205, 196 225, 176 265 C 156 305, 166 335, 190 355 Z" />
    <path d="M190 355 Q 212 300 248 245" />
    {/* Pair 3 */}
    <path d="M202 225 C 172 205, 152 155, 172 125 C 192 95, 212 115, 222 165 C 232 215, 222 235, 202 225 Z" />
    <path d="M202 225 Q 187 175 172 125" />
    <path d="M232 205 C 267 185, 292 135, 280 105 C 268 75, 238 95, 218 135 C 198 175, 208 195, 232 205 Z" />
    <path d="M232 205 Q 252 150 280 105" />
  </svg>
);

// Blooming Flower SVG - Faint outline (stroke-opacity 7-8%)
const BloomingFlowerDecor = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 500 500" 
    className={`pointer-events-none select-none text-sage-400 transition-all duration-700 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2"
    strokeOpacity="0.08"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Inner Layer */}
    <path d="M250 250 C 230 200, 190 200, 190 230 C 190 260, 230 260, 250 250 Z" />
    <path d="M250 250 C 270 200, 310 200, 310 230 C 310 260, 270 260, 250 250 Z" />
    <path d="M250 250 C 200 270, 200 310, 230 310 C 260 310, 260 270, 250 250 Z" />
    <path d="M250 250 C 300 270, 300 310, 270 310 C 240 310, 240 270, 250 250 Z" />
    {/* Middle Layer */}
    <path d="M250 250 C 210 150, 140 160, 140 210 C 140 260, 210 270, 250 250 Z" />
    <path d="M250 250 C 290 150, 360 160, 360 210 C 360 260, 290 270, 250 250 Z" />
    <path d="M250 250 C 150 290, 160 360, 210 360 C 260 360, 270 290, 250 250 Z" />
    <path d="M250 250 C 350 290, 340 360, 290 360 C 240 360, 230 290, 250 250 Z" />
    {/* Outer Petals */}
    <path d="M250 250 C 170 100, 80 120, 80 190 C 80 260, 170 280, 250 250 Z" />
    <path d="M250 250 C 330 100, 420 120, 420 190 C 420 260, 330 280, 250 250 Z" />
    <path d="M250 250 C 100 330, 120 420, 190 420 C 260 420, 280 330, 250 250 Z" />
    <path d="M250 250 C 400 330, 380 420, 310 420 C 240 420, 220 330, 250 250 Z" />
    {/* Center Detail */}
    <circle cx="250" cy="250" r="14" strokeWidth="1.5" />
    <circle cx="250" cy="250" r="6" />
    {/* Floating vines */}
    <path d="M250 264 C 250 350, 290 410, 360 440" />
    <path d="M290 330 Q 340 320 365 345 C 340 360, 315 350, 290 330" />
  </svg>
);

// Monstera Outline Leaf SVG - Faint outline (stroke-opacity 7-8%)
const MonsteraDecor = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 500 500" 
    className={`pointer-events-none select-none text-sage-400 transition-all duration-700 ${className}`} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.2"
    strokeOpacity="0.08"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M250 450 C 250 300, 250 150, 250 50" />
    <path d="M250 50 
             C 270 80, 310 90, 340 110 
             L 310 140 
             C 340 160, 380 180, 400 210 
             L 360 230 
             C 380 260, 390 300, 370 340 
             L 330 330 
             C 340 370, 320 400, 290 420 
             L 250 450
             C 210 420, 190 370, 200 330 
             L 160 340 
             C 140 300, 150 260, 170 230 
             L 130 210 
             C 150 180, 190 160, 220 140 
             L 190 110 
             C 220 90, 240 80, 250 50 Z" />
    <path d="M250 140 Q 300 160 340 170" />
    <path d="M250 210 Q 320 240 360 260" />
    <path d="M250 280 Q 310 320 330 340" />
    <path d="M250 140 Q 200 160 160 170" />
    <path d="M250 210 Q 180 240 140 260" />
    <path d="M250 280 Q 190 320 170 340" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [view, setView] = useState<'home' | 'detail'>('home');
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentItem | null>(null);

  // View navigation helper (resets viewport scroll to top instantly)
  const navigateToDetail = (item: TreatmentItem) => {
    setSelectedTreatment(item);
    setView('detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = () => {
    setView('home');
    setSelectedTreatment(null);
    // Smooth scroll back to catalog view after home render
    setTimeout(() => {
      const element = document.getElementById('catalog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Categories extraction
  const categories = useMemo(() => {
    return ["All", ...treatmentData.map(cat => cat.categoryName)];
  }, []);

  // Filter & Search logic
  const filteredData = useMemo(() => {
    return treatmentData.map(category => {
      if (activeTab !== "All" && category.categoryName !== activeTab) {
        return { ...category, items: [] };
      }

      const items = category.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      return {
        ...category,
        items
      };
    }).filter(category => category.items.length > 0);
  }, [activeTab, searchQuery]);

  // WhatsApp click handler with simple format requested: "Halo Sunny's Corner, saya tertarik untuk booking treatment *[Nama]*..."
  const handleBookViaWhatsApp = (item: TreatmentItem) => {
    const isPreOrder = item.isPO ? " (Pre-Order PO)" : "";
    const message = `Halo Sunny's Corner, saya tertarik untuk booking treatment *${item.name}*${isPreOrder}. Apakah masih ada slot?`;
    
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/6285755482647?text=${encodedMessage}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-200 via-cream-100 to-cream-200 flex flex-col selection:bg-sage-200 selection:text-sage-900 overflow-x-hidden relative">
      
      {/* Visual background blurred color gradient blobs (resolving "putih plong" aesthetic) */}
      <div className="absolute top-[3%] left-[-15%] w-[450px] md:w-[600px] h-[450px] md:h-[600px] rounded-full bg-sage-300/15 blur-[120px] pointer-events-none select-none -z-10" />
      <div className="absolute top-[25%] right-[-15%] w-[550px] md:w-[750px] h-[550px] md:h-[750px] rounded-full bg-amber-100/25 blur-[140px] pointer-events-none select-none -z-10" />
      <div className="absolute bottom-[35%] left-[-20%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full bg-sage-200/20 blur-[130px] pointer-events-none select-none -z-10" />
      <div className="absolute bottom-[10%] right-[-10%] w-[550px] md:w-[750px] h-[550px] md:h-[750px] rounded-full bg-cream-400/40 blur-[150px] pointer-events-none select-none -z-10" />

      {/* Large luxury watermark text layers in background */}
      <div className="hidden lg:block absolute left-6 top-[30%] select-none pointer-events-none font-serif text-[110px] font-extralight tracking-[0.25em] text-sage-600/3 rotate-90 origin-left">SUNNY'S</div>
      <div className="hidden lg:block absolute right-6 top-[70%] select-none pointer-events-none font-serif text-[110px] font-extralight tracking-[0.25em] text-sage-600/3 -rotate-90 origin-right">GLOW</div>
      <div className="hidden lg:block absolute left-6 top-[110%] select-none pointer-events-none font-serif text-[110px] font-extralight tracking-[0.25em] text-sage-600/3 rotate-90 origin-left">BAR</div>

      {/* Large Organic Non-Repeating Botanical Accents bleeding off edges */}
      <EucalyptusDecor className="absolute top-[8%] left-[-160px] md:left-[-100px] w-[340px] md:w-[500px] h-auto rotate-12" />
      <BloomingFlowerDecor className="absolute top-[35%] right-[-160px] md:right-[-120px] w-[380px] md:w-[600px] h-auto" />
      <MonsteraDecor className="absolute bottom-[22%] left-[-220px] md:left-[-140px] w-[360px] md:w-[550px] h-auto -rotate-12" />
      <EucalyptusDecor className="absolute bottom-[2%] right-[-180px] md:right-[-120px] w-[380px] md:w-[550px] h-auto rotate-45" />

      {/* Announcement Bar */}
      <div className="bg-sage-800 text-cream-100 py-2.5 px-4 text-xs md:text-sm font-medium tracking-wide text-center flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-4 transition-all duration-300 relative z-20">
        <span className="flex items-center gap-1.5 justify-center">
          <Truck className="w-4 h-4 text-sage-300 shrink-0" />
          <span>*Ongkir menyesuaikan start 20k s/d 330k (tergantung jaraknya)</span>
        </span>
        <span className="hidden sm:inline text-sage-500">|</span>
        <span className="flex items-center gap-1.5 justify-center">
          <Calendar className="w-4 h-4 text-sage-300 shrink-0" />
          <span className="font-semibold text-sage-200">Homecare by appointment only</span>
        </span>
      </div>

      {/* Elegant Sticky Blurred Navbar */}
      <header className="sticky top-0 z-50 transition-all duration-300 glass-nav shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={navigateToHome}>
            <img 
              src="/logo.jpg" 
              alt="Sunny's Corner Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-md border border-sage-200/50"
            />
            <div>
              <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-charcoal-900 block leading-none">
                Sunny's Corner
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-sage-600 block mt-1">
                Glow & Lash Bar
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal-800">
            <button onClick={navigateToHome} className="hover:text-sage-600 transition-colors duration-200 cursor-pointer font-semibold bg-transparent border-0 p-0 text-sm">Home</button>
            <a href="#about" onClick={(e) => { if (view !== 'home') { e.preventDefault(); navigateToHome(); } }} className="hover:text-sage-600 transition-colors duration-200">About</a>
            <a href="#catalog" onClick={(e) => { if (view !== 'home') { e.preventDefault(); navigateToHome(); } }} className="hover:text-sage-600 transition-colors duration-200">Catalog Menu</a>
            <a href="#contact" className="hover:text-sage-600 transition-colors duration-200">Contact</a>
          </nav>

          <a 
            href="https://wa.me/6285755482647" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 bg-sage-500 hover:bg-sage-600 text-cream-50 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </a>
        </div>
      </header>

      {view === 'home' ? (
        <>
          {/* Hero Section (Editorial Luxury Layout with double-framed visuals) */}
          <section id="home" className="relative pt-16 pb-24 md:py-36 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Brand Intro */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-bold uppercase tracking-wider animate-fade-in">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Beauty & Treatment</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7.5xl font-bold tracking-tight text-charcoal-900 leading-[1.05] animate-fade-in">
                Sunny's Corner
                <span className="block text-2xl sm:text-4xl lg:text-5xl font-light italic text-sage-600 mt-2.5">
                  Glow & Lash Bar
                </span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-charcoal-700 leading-relaxed font-light animate-fade-in-delayed">
                Kami percaya kecantikan sejati terpancar dari rasa nyaman. Hadirkan pengalaman perawatan eksklusif standard klinik kecantikan premium langsung ke depan pintu rumah Anda.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in-delayed">
                <a 
                  href="#catalog"
                  className="w-full sm:w-auto text-center bg-charcoal-800 hover:bg-charcoal-900 text-cream-50 font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  Lihat Menu Perawatan
                </a>
                <a 
                  href="https://wa.me/6285755482647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/70 hover:bg-white text-charcoal-800 font-semibold px-8 py-3.5 rounded-full shadow-xs border border-sage-200 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-green-600" />
                  <span>Jadwalkan Konsultasi</span>
                </a>
              </div>
            </div>

            {/* Overlapping double-frame visuals with AI generated cosmetic picture */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative animate-fade-in-delayed">
              
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
                {/* Back decorative circular vine stroke */}
                <div className="absolute w-[94%] h-[94%] rounded-full border border-sage-300/35 -z-10 animate-pulse" />
                
                {/* Main arched picture frame containing cosmetics hero image */}
                <div className="relative w-[84%] h-[92%] rounded-[120px] overflow-hidden border-[6px] border-white shadow-2xl bg-cream-300">
                  <img 
                    src="/cosmetics_hero.jpg" 
                    alt="Sunny's Corner Luxury Cosmetic Flatlay" 
                    className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Overlapping custom glass card containing stars review */}
                <div className="absolute bottom-4 left-[-10px] sm:left-[-25px] bg-white/80 backdrop-blur-md p-4 rounded-[24px] border border-white shadow-xl max-w-[190px] hover:translate-y-[-5px] transition-transform duration-300">
                  <div className="flex items-center gap-0.5 mb-1 text-amber-500">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-sage-800">Highly Rated</span>
                  <p className="text-[11px] text-charcoal-700 font-light mt-0.5 leading-snug">
                    Dipercaya lebih dari 100+ pelanggan glowing di Wagir & sekitarnya.
                  </p>
                </div>

                {/* Second overlapping small accent card */}
                <div className="absolute top-10 right-[-10px] sm:right-[-25px] bg-sage-800 text-cream-50 px-4 py-3 rounded-[20px] shadow-lg hover:translate-y-[-5px] transition-transform duration-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sage-300 animate-spin" />
                  <div>
                    <span className="block text-[9px] font-bold uppercase tracking-widest text-sage-200">Treatment</span>
                    <span className="block text-xs font-bold text-cream-50 mt-0.5">Organic & Safe</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Large Luxury Homecare Info Banner Card */}
          <div className="mt-16 w-full max-w-5xl mx-auto">
            <div className="bg-white/45 backdrop-blur-md rounded-[32px] p-6 sm:p-8 border border-white/60 shadow-xl relative overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-8">
              
              <div className="md:col-span-4 flex items-start gap-4 border-b md:border-b-0 md:border-r border-sage-200/50 pb-6 md:pb-0 md:pr-6">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 shrink-0">
                  <Calendar className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider font-bold text-sage-700">Reservasi Jadwal</span>
                  <p className="text-base font-bold text-charcoal-900 mt-1">Appointment Only</p>
                  <p className="text-xs text-charcoal-700 font-light mt-1">Disarankan pemesanan H-1 terlebih dahulu.</p>
                </div>
              </div>

              <div className="md:col-span-4 flex items-start gap-4 border-b md:border-b-0 md:border-r border-sage-200/50 pb-6 md:pb-0 md:pr-6">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 shrink-0">
                  <Truck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider font-bold text-sage-700">Transport Ongkir</span>
                  <p className="text-base font-bold text-charcoal-900 mt-1">Start 20k s/d 330k</p>
                  <p className="text-xs text-charcoal-700 font-light mt-1">Biaya kirim disesuaikan jarak dari Wagir.</p>
                </div>
              </div>

              <div className="md:col-span-4 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 shrink-0">
                  <Info className="w-5.5 h-5.5" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider font-bold text-sage-700">Area Jangkauan</span>
                  <p className="text-base font-bold text-charcoal-900 mt-1">Jawa Timur</p>
                  <p className="text-xs text-charcoal-700 font-light mt-1">Meliputi Sukodadi, Wagir, Malang, Surabaya, Sidoarjo, Lamongan, dan sekitarnya.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Elegant Value Proposition Section */}
      <section id="about" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="glass-card hover:glass-card-hover rounded-3xl p-6 transition-all duration-300 group hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Premium Ingredients</h3>
              <p className="text-sm text-charcoal-700 font-light leading-relaxed">
                Kami hanya menggunakan material skinbooster, serum, dan eyelash extension premium yang aman dan bersertifikasi klinis.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-card hover:glass-card-hover rounded-3xl p-6 transition-all duration-300 group hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Homecare Convenience</h3>
              <p className="text-sm text-charcoal-700 font-light leading-relaxed">
                Nikmati kepraktisan treatment tanpa perlu macet atau mengantre di salon. Kami membawa kenyamanan spa langsung ke rumah Anda.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-card hover:glass-card-hover rounded-3xl p-6 transition-all duration-300 group hover:-translate-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">Tailored Beauty Care</h3>
              <p className="text-sm text-charcoal-700 font-light leading-relaxed">
                Setiap jenis kulit membutuhkan penanganan yang berbeda. Kami melakukan analisis sebelum memulai pengerjaan treatment.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog Grid & Filters Section */}
      <section id="catalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-sage-400" />
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-charcoal-900 mb-4">
            Menu Treatment Catalog
          </h2>
          <p className="text-sm sm:text-base text-charcoal-700 font-light">
            Temukan rahasia kulit berkilau dan bulu mata cantik ternutrisi. Pilih kategori di bawah ini dan klik tombol untuk melakukan reservasi.
          </p>
        </div>

        {/* Filter Tab Bar & Search Box */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Tabs Filter */}
          <div className="flex flex-wrap items-center gap-2 bg-sage-100/40 p-2 rounded-2xl overflow-x-auto border border-sage-200/30">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeTab === cat
                    ? "bg-sage-500 text-cream-50 shadow-sm"
                    : "text-charcoal-800 hover:text-sage-700 hover:bg-sage-100/70"
                }`}
              >
                {cat === "All" ? "Semua Treatment" : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4.5 h-4.5 text-sage-600 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari menu perawatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/50 backdrop-blur-xs border border-sage-200/70 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all duration-200 shadow-2xs"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredData.length > 0 ? (
          <div className="space-y-16">
            {filteredData.map((category) => (
              <div key={category.categoryName} className="space-y-8">
                
                {/* Category Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-sage-200/60">
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-900">
                    {category.categoryName}
                  </h3>
                  <span className="text-[11px] bg-sage-100 text-sage-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-sage-200/20">
                    {category.items.length} Treatment
                  </span>
                </div>

                {/* Treatment Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item: TreatmentItem) => (
                    <div 
                      key={item.name} 
                      onClick={() => navigateToDetail(item)}
                      className="group bg-white/50 backdrop-blur-md rounded-[32px] p-6 flex flex-col justify-between hover:bg-white/80 border border-cream-300/45 shadow-[0_15px_30px_-10px_rgba(141,163,153,0.08)] hover:shadow-[0_20px_45px_-12px_rgba(141,163,153,0.18)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer"
                    >
                      {/* Interactive Visual Overlay Highlight */}
                      <div className="absolute -top-12 -left-12 w-24 h-24 bg-sage-200/10 rounded-full group-hover:scale-150 transition-transform duration-500 blur-xl" />

                      <div className="space-y-5 relative z-10">
                        {/* Treatment Image Banner */}
                        <div className="w-full h-48 rounded-2xl overflow-hidden bg-cream-200 border border-sage-200/30 relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                        </div>

                        {/* Name & Pricing Badges */}
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <div className="flex items-start gap-2">
                              <CardLeafIcon />
                              <h4 className="font-serif text-lg font-bold text-charcoal-900 group-hover:text-sage-800 transition-colors duration-200 leading-snug">
                                {item.name}
                              </h4>
                            </div>
                            {item.isPO && (
                              <span className="inline-block mt-2 ml-6 bg-amber-100/70 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-amber-200/50 uppercase tracking-wider">
                                Pre-Order (PO)
                              </span>
                            )}
                          </div>
                          <span className="shrink-0 bg-sage-100 text-sage-800 text-xs font-bold px-3 py-1.5 rounded-full border border-sage-200/30 whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>

                        {/* Special Custom Alert Box for Notes */}
                        {item.notes ? (
                          <div className="bg-sage-100/50 p-3.5 rounded-2xl border border-sage-200/40 flex items-start gap-2.5 text-xs text-charcoal-800 leading-relaxed font-light">
                            <AlertCircle className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                            <span>{item.notes}</span>
                          </div>
                        ) : (
                          // Visual spacer
                          <div className="h-6 block" />
                        )}
                      </div>

                      {/* CTA Detail Button */}
                      <div className="mt-6 pt-5 border-t border-sage-200/30 relative z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToDetail(item);
                          }}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sage-500 hover:bg-sage-600 active:scale-[0.98] text-cream-50 text-sm font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
                        >
                          <Search className="w-4.5 h-4.5" />
                          <span>Detail Perawatan</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Fallback */
          <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[32px] border border-dashed border-sage-300 max-w-xl mx-auto">
            <AlertCircle className="w-12 h-12 text-sage-500 mx-auto mb-3" />
            <h4 className="font-serif text-xl font-bold text-charcoal-900 mb-1">Treatment Tidak Ditemukan</h4>
            <p className="text-sm text-charcoal-700 font-light max-w-md mx-auto px-6">
              Maaf, kami tidak menemukan layanan dengan nama atau deskripsi "{searchQuery}". Coba bersihkan filter pencarian.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setActiveTab("All"); }}
              className="mt-6 px-6 py-2.5 bg-sage-500 hover:bg-sage-600 text-cream-50 rounded-xl text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Detailed Booking Process info box */}
        <div className="mt-20 bg-white/40 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-white/60 max-w-3xl mx-auto flex flex-col sm:flex-row items-start gap-5 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center text-sage-600 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold text-charcoal-900 mb-2.5">Prosedur Reservasi Layanan Homecare</h4>
            <ul className="text-xs sm:text-sm text-charcoal-700 space-y-2.5 font-light leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0 mt-0.5" />
                <span>Tekan tombol **Pesan via WA** untuk menyusun draf pesan otomatis berisi detail treatment.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0 mt-0.5" />
                <span>Terapis kami akan segera memverifikasi ketersediaan jadwal serta menghitung kalkulasi biaya transport (ongkir).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sage-500 shrink-0 mt-0.5" />
                <span>Reservasi Anda resmi terdaftar setelah melakukan konfirmasi akhir jadwal di WhatsApp.</span>
              </li>
            </ul>
          </div>
        </div>

      </section>
      </>
      ) : (
        /* Dedicated Detail Treatment Page View */
        <main id="detail-page" className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 relative z-10 w-full animate-fade-in">
          
          {/* Back Button */}
          <button 
            onClick={navigateToHome}
            className="flex items-center gap-2 mb-8 text-sm font-semibold text-sage-800 hover:text-sage-900 transition-colors duration-200 cursor-pointer group bg-transparent border-0 p-0"
          >
            <ChevronRight className="w-4.5 h-4.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Menu Katalog</span>
          </button>

          {/* Details Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Treatment Image */}
            <div className="lg:col-span-5 w-full">
              <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl bg-cream-300 border-[6px] border-white group">
                {selectedTreatment?.image ? (
                  <img 
                    src={selectedTreatment.image} 
                    alt={selectedTreatment.name} 
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white/45 backdrop-blur-md">
                    <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center text-sage-500 shadow-sm animate-pulse mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-charcoal-900">Foto Perawatan</h4>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Detailed Text Info */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100/70 border border-sage-200/35 text-[10px] sm:text-xs font-bold text-sage-800 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Detail Treatment Perawatan</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
                  {selectedTreatment?.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <span className="bg-sage-500 text-cream-50 text-base font-bold px-5 py-2 rounded-full shadow-sm">
                    {selectedTreatment?.price}
                  </span>
                  {selectedTreatment?.isPO && (
                    <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-2 rounded-full border border-amber-200/50 uppercase tracking-wider">
                      Pre-Order (PO)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2">
                <span className="block text-xs uppercase tracking-wider font-bold text-sage-700">Deskripsi Layanan</span>
                <p className="text-base text-charcoal-800 leading-relaxed font-light">
                  {selectedTreatment?.description || "Perawatan kecantikan premium untuk mencerahkan, menyehatkan, dan meremajakan sel-sel kulit Anda secara optimal."}
                </p>
              </div>

              {/* Special Notes box */}
              {selectedTreatment?.notes && (
                <div className="bg-sage-100/50 p-5 rounded-3xl border border-sage-200/40 flex items-start gap-3.5 text-xs sm:text-sm text-charcoal-800 leading-relaxed font-light shadow-2xs">
                  <AlertCircle className="w-5.5 h-5.5 text-sage-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sage-900 block mb-0.5">Catatan Khusus:</span>
                    <span>{selectedTreatment.notes}</span>
                  </div>
                </div>
              )}

              {/* Homecare Info Card */}
              <div className="bg-white/45 backdrop-blur-md p-5 rounded-3xl border border-white/60 flex items-start gap-3.5 text-xs sm:text-sm text-charcoal-800 leading-relaxed font-light shadow-2xs">
                <Truck className="w-5.5 h-5.5 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-sage-900 block mb-0.5">Ketentuan Pemesanan Homecare:</span>
                  <span>Treatment ini dikerjakan langsung di rumah Anda. Hubungi kami melalui WhatsApp untuk konfirmasi alamat dan kalkulasi biaya transport (*ongkir transport Jawa Timur start 20k - 330k sesuai jarak tempuh).</span>
                </div>
              </div>

              {/* Booking CTA Button */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-sage-200/30">
                <button
                  onClick={navigateToHome}
                  className="w-full sm:w-1/3 py-3.5 rounded-2xl border border-sage-300 hover:bg-sage-100 text-charcoal-800 text-sm font-semibold transition-colors duration-200 cursor-pointer text-center bg-transparent"
                >
                  Kembali
                </button>
                
                <button
                  onClick={() => handleBookViaWhatsApp(selectedTreatment!)}
                  className="w-full sm:w-2/3 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sage-500 hover:bg-sage-600 active:scale-[0.98] text-cream-50 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                  <span>Pesan via WA</span>
                </button>
              </div>

            </div>

          </div>

        </main>
      )}

      {/* Dark Premium Footer Section */}
      <footer id="contact" className="bg-charcoal-900 text-cream-100 pt-20 pb-10 border-t border-charcoal-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
            
            {/* Column 1: Brand details */}
            <div className="space-y-5">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/logo.jpg" 
                  alt="Sunny's Corner Logo" 
                  className="w-10 h-10 rounded-full object-cover shadow-md border border-charcoal-700"
                />
                <span className="font-serif text-xl font-bold tracking-tight">Sunny's Corner</span>
              </div>
              <p className="text-xs sm:text-sm text-sage-200/70 leading-relaxed font-light">
                Glow & Lash Bar menghadirkan solusi perawatan kulit wajah glowing bersinar, skin booster PO premium, injeksi treatment, serta Korean eyelash extension profesional langsung ke tempat hunian Anda.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://wa.me/6285755482647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-sage-500 hover:scale-105 text-cream-50 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5" />
                </a>
                <a 
                  href="https://instagram.com/sunny.s_corner" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-sage-500 hover:scale-105 text-cream-50 flex items-center justify-center transition-all duration-200 shadow-sm"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Contacts */}
            <div className="space-y-5">
              <h4 className="font-serif text-base sm:text-lg font-semibold border-b border-charcoal-800 pb-2">Kontak Info Layanan</h4>
              <ul className="space-y-4 text-xs sm:text-sm font-light">
                <li className="flex items-start gap-3.5 text-sage-200/70 hover:text-cream-50 transition-colors">
                  <Phone className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" />
                  <div>
                    <a href="https://wa.me/6285755482647" className="font-semibold block text-cream-100 text-sm sm:text-base">0857 5548 2647</a>
                    <span className="text-[10px] text-sage-500 block mt-0.5">WhatsApp Only - Appointment & PO</span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 text-sage-200/70 hover:text-cream-50 transition-colors">
                  <InstagramIcon className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" />
                  <div>
                    <a href="https://instagram.com/sunny.s_corner" target="_blank" rel="noopener noreferrer" className="font-semibold block text-cream-100 text-sm sm:text-base">@sunny.s_corner</a>
                    <span className="text-[10px] text-sage-500 block mt-0.5">DM Instagram & Follow Updates</span>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 text-sage-200/70">
                  <Clock className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-cream-100">Buka Setiap Hari</span>
                    <span className="text-[10px] text-sage-500 block mt-0.5">Senin - Minggu (Booking Minimal H-1)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Location Details */}
            <div className="space-y-5">
              <h4 className="font-serif text-base sm:text-lg font-semibold border-b border-charcoal-800 pb-2">Area Layanan Jawa Timur</h4>
              <div className="flex gap-3.5 text-xs sm:text-sm font-light text-sage-200/70 leading-relaxed">
                <MapPin className="w-5 h-5 text-sage-400 shrink-0 mt-0.5" />
                <p>
                  Perumahan Panorama Garden, Blok H-60, Jamuran, Sukodadi, Wagir, Kode Pos: 65158 (Melayani Seluruh Jawa Timur)
                </p>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Perumahan+Panorama+Garden+Wagir+Malang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-sage-400 hover:text-cream-50 font-bold group transition-colors pt-2"
              >
                <span>Buka Petunjuk Google Maps</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

          {/* Copyright line */}
          <div className="border-t border-charcoal-800 pt-8 mt-8 text-center text-[11px] sm:text-xs text-sage-500 font-light flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>&copy; {new Date().getFullYear()} Sunny's Corner - Glow & Lash Bar. All Rights Reserved.</p>
            <p className="flex items-center gap-1.5">
              <span>Crafted for elegance</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              <span>& premium beauty care</span>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
