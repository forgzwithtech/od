import { useEffect } from "react";

/**
 * ------------------------------------------------------------------
 *  VAULT GATEWAY — Trending Manga/Anime & Red Light District
 * ------------------------------------------------------------------
 */

/* ---------- Authentic Trending Data with User-Provided Images ---------- */
const TRENDING_VAULT = [
  {
    id: 1,
    title: "Jujutsu Kaisen",
    type: "MANGA // ONGOING",
    status: "HOT",
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 2,
    title: "Wind Breaker",
    type: "ANIME // S2 DROP",
    status: "NEW",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgyMKiaRU1zSAorTTfscQ4YrtE2Wk6BKvRrW_ozZgoA&s=10"
  },
  {
    id: 3,
    title: "Demon Slayer",
    type: "INFINITY CASTLE",
    status: "TRENDING",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_0VZKOqVXAWixOpTvFSj7FKq3iN5rlkNdFvOkGC8oA&s=10"
  },
  {
    id: 4,
    title: "Bleach: TYBW",
    type: "ANIME // COUR 4",
    status: "UPDATED",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhOPbIto7GtqPONL964K59AArRQZWtSpX8PoAJs9PbHA&s=10"
  },
  {
    id: 5,
    title: "Boruto: TBV",
    type: "MANGA // LATEST CH",
    status: "HOT",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-sByLr8d3z0eDxv9ZiLl5lIK1JnxKrB3FqE9X68N22Q&s=10"
  }
];

/* ---------- Custom Manga Styles Hook ---------- */
function useVaultMangaAssets() {
  useEffect(() => {
    if (document.getElementById("vault-manga-assets")) return;
    const style = document.createElement("style");
    style.id = "vault-manga-assets";
    style.innerHTML = `
      .ink-box-vault {
        border: 4px solid #000;
        border-radius: 2px 255px 3px 255px / 255px 5px 225px 3px;
      }
      .halftone-bg {
        background-image: radial-gradient(rgba(0,0,0,0.4) 1.5px, transparent 1.5px);
        background-size: 6px 6px;
      }
      .hazard-tape {
        background: repeating-linear-gradient(
          -45deg,
          #000,
          #000 15px,
          #dc2626 15px,
          #dc2626 30px
        );
      }
      
      /* Brutalist Custom Scrollbar for the horizontal list */
      .manga-scrollbar::-webkit-scrollbar {
        height: 12px;
      }
      .manga-scrollbar::-webkit-scrollbar-track {
        background: #e8e4d8;
        border: 3px solid #000;
        border-radius: 4px;
      }
      .manga-scrollbar::-webkit-scrollbar-thumb {
        background-color: var(--guild-primary, #000);
        border: 2px solid #000;
        border-radius: 4px;
      }
      .manga-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #000;
      }

      /* Cyberpunk Glitch Effect for Red Light District */
      .glitch-text {
        position: relative;
      }
      .glitch-text::before, .glitch-text::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.8;
      }
      .glitch-text::before {
        left: 2px;
        text-shadow: -2px 0 red;
        clip: rect(24px, 550px, 90px, 0);
        animation: glitch-anim 3s infinite linear alternate-reverse;
      }
      .glitch-text::after {
        left: -2px;
        text-shadow: -2px 0 blue;
        clip: rect(85px, 550px, 140px, 0);
        animation: glitch-anim 2.5s infinite linear alternate-reverse;
      }
      @keyframes glitch-anim {
        0% { clip: rect(10px, 9999px, 44px, 0); }
        20% { clip: rect(85px, 9999px, 11px, 0); }
        40% { clip: rect(20px, 9999px, 90px, 0); }
        60% { clip: rect(98px, 9999px, 23px, 0); }
        80% { clip: rect(44px, 9999px, 76px, 0); }
        100% { clip: rect(12px, 9999px, 88px, 0); }
      }
    `;
    document.head.appendChild(style);
  }, []);
}

const F_DISPLAY = "'Anton', sans-serif";
const F_MONO = "'Space Mono', monospace";

export default function VaultGateway() {
  useVaultMangaAssets();

  return (
    <section className="px-4 md:px-6 max-w-[100rem] mx-auto w-full py-16 relative z-10">
      
      <div className="ink-box-vault bg-[#e8e4d8] shadow-[15px_15px_0px_#000] p-6 md:p-10 relative overflow-hidden">
        
        {/* Background Screentone */}
        <div className="absolute inset-0 opacity-20 pointer-events-none halftone-bg" />

        {/* SECTION HEADER */}
        <div className="relative z-10 flex flex-col items-start mb-10 pt-4">
          <span className="bg-white text-black font-bold uppercase text-xs px-4 py-1 ink-box-vault border-2 border-black rotate-[-2deg] mb-2 shadow-[3px_3px_0px_#000]" style={{ fontFamily: F_MONO }}>
            Archive // This Week
          </span>
          <h2 className="uppercase text-4xl md:text-6xl text-black tracking-tighter" style={{ fontFamily: F_DISPLAY }}>
            Trending in the <span className="text-white" style={{ WebkitTextStroke: "2px black", textShadow: "4px 4px 0px #000" }}>Vault</span>
          </h2>
        </div>

        {/* --- HORIZONTAL TRENDING LIST --- */}
        <div className="relative z-10 flex gap-6 overflow-x-auto pb-8 mb-12 manga-scrollbar snap-x snap-mandatory">
          {TRENDING_VAULT.map((item) => (
            <div 
              key={item.id} 
              // Set a strict fixed width here so flexbox won't stretch the cards 
              className="ink-box-vault bg-white p-4 w-[240px] md:w-[280px] shrink-0 snap-center shadow-[6px_6px_0px_#000] flex flex-col group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Cover Art */}
              <div className="aspect-[2/3] w-full ink-box-vault border-2 overflow-hidden relative mb-4 bg-zinc-900">
                {/* Manga Stamp */}
                <div className="absolute top-2 -left-1 bg-[var(--guild-primary)] text-black text-[10px] font-black uppercase px-3 py-1 border-2 border-black z-10 shadow-[2px_2px_0px_#000]" style={{ fontFamily: F_MONO }}>
                  {item.status}
                </div>
                
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/600x900/111/fff?text=IMAGE+BLOCKED";
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <button className="bg-white text-black uppercase px-6 py-2 font-black ink-box-vault border-2 shadow-[4px_4px_0px_var(--guild-primary)] hover:bg-[var(--guild-primary)] transition-colors" style={{ fontFamily: F_DISPLAY }}>
                    Open
                  </button>
                </div>
              </div>

              {/* Meta Data */}
              <div className="flex flex-col flex-1 mt-1">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1" style={{ fontFamily: F_MONO }}>
                  {item.type}
                </p>
                <h3 className="uppercase text-xl text-black leading-tight line-clamp-2" style={{ fontFamily: F_DISPLAY }}>
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* --- RED LIGHT DISTRICT (18+ SECTION) --- */}
        <div className="relative z-10 ink-box-vault border-4 border-red-600 bg-[#0a0a0a] shadow-[10px_10px_0px_#dc2626] overflow-hidden group mt-6">
          
          {/* Warning Tape Borders */}
          <div className="absolute top-0 left-0 w-full h-3 hazard-tape" />
          <div className="absolute bottom-0 left-0 w-full h-3 hazard-tape" />
          
          {/* Grungy Halftone */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay halftone-bg" style={{ filter: "invert(1) sepia(1) saturate(5) hue-rotate(300deg)" }} />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            
            <div className="flex-1">
              <span className="inline-block bg-red-600 text-white font-bold text-[10px] uppercase px-3 py-1 tracking-widest mb-3 shadow-[3px_3px_0px_#000]" style={{ fontFamily: F_MONO }}>
                ⚠ RESTRICTED ACCESS
              </span>
              
              <h3 
                className="uppercase text-4xl md:text-5xl text-white tracking-wide glitch-text mb-3" 
                data-text="RED LIGHT DISTRICT"
                style={{ fontFamily: F_DISPLAY, textShadow: "3px 3px 0 red" }}
              >
                RED LIGHT DISTRICT
              </h3>
              
              <p className="text-gray-400 text-sm md:text-base border-l-4 border-red-600 pl-4 max-w-2xl leading-relaxed" style={{ fontFamily: F_MONO }}>
                18+ Only. UI-only access currently online — absolute age verification protocol drops with the backend integration. Enter at your own risk.
              </p>
            </div>

            <button 
              className="shrink-0 bg-red-600 text-white uppercase text-xl md:text-2xl px-10 py-4 ink-box-vault border-white hover:bg-white hover:text-red-600 transition-all shadow-[6px_6px_0px_#000] active:translate-y-2 active:shadow-none -rotate-2"
              style={{ fontFamily: F_DISPLAY }}
            >
              Enter District
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}