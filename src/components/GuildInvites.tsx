import React, { useEffect } from "react";
import blue from "../assets/bluelogo.png";
import red from "../assets/RedlogoDark.png";

/**
 * ------------------------------------------------------------------
 *  GUILD WARS — "VS" Comic Panel & Sponsors
 * ------------------------------------------------------------------
 */

// Placeholder Sponsor Data (Can be swapped with actual logo images later)
const SPONSORS = [
  { id: 1, name: "CRUNCHYROLL", role: "Streaming Partner" },
  { id: 2, name: "BANDAI NAMCO", role: "Gaming Ally" },
  { id: 3, name: "KODANSHA", role: "Publishing Sponsor" },
  { id: 4, name: "MAPPA STUDIOS", role: "Animation Partner" },
];

/* ---------- Custom Manga Styles Hook ---------- */
function useGuildMangaAssets() {
  useEffect(() => {
    if (document.getElementById("guild-manga-assets")) return;
    const style = document.createElement("style");
    style.id = "guild-manga-assets";
    style.innerHTML = `
      .ink-box-alt {
        border: 4px solid #000;
        border-radius: 2px 255px 3px 255px / 255px 5px 225px 3px;
      }
      .halftone-light {
        background-image: radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px);
        background-size: 8px 8px;
      }
      .halftone-dark {
        background-image: radial-gradient(rgba(0,0,0,0.6) 1.5px, transparent 1.5px);
        background-size: 6px 6px;
      }
      .speed-lines-vertical {
        background-image: repeating-linear-gradient(90deg, transparent 0px, transparent 15px, rgba(0,0,0,0.1) 15px, rgba(0,0,0,0.1) 17px);
      }
      .vs-jagged {
        clip-path: polygon(10% 0, 100% 15%, 90% 100%, 0 85%);
      }
    `;
    document.head.appendChild(style);
  }, []);
}

const F_DISPLAY = "'Anton', sans-serif";
const F_SFX = "'Bangers', cursive";
const F_MONO = "'Space Mono', monospace";

export default function GuildInvites() {
  useGuildMangaAssets();

  return (
    <section className="px-4 md:px-6 max-w-[100rem] mx-auto w-full py-16 relative">
      
      {/* 
        The "Manga Page" Canvas for this section 
        Contrasts the dark theme by looking like an actual physical paper glued to the site
      */}
      <div className="ink-box-alt bg-[#e8e4d8] shadow-[15px_15px_0px_#000] p-6 md:p-10 relative overflow-hidden">
        
        {/* Ambient Screentone */}
        <div className="absolute inset-0 opacity-20 pointer-events-none halftone-dark" />
        <div className="absolute inset-0 opacity-40 pointer-events-none speed-lines-vertical mix-blend-multiply" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-center text-center mb-10">
          <span className="bg-black text-white font-bold uppercase text-xs px-4 py-1 ink-box-alt rotate-[-2deg] mb-3" style={{ fontFamily: F_MONO }}>
            Choose Your Alignment
          </span>
          <h2 className="uppercase text-5xl md:text-7xl text-black tracking-tighter" style={{ fontFamily: F_DISPLAY }}>
            Join the <span className="text-white" style={{ WebkitTextStroke: "2px black", textShadow: "4px 4px 0px #000" }}>Guild War</span>
          </h2>
        </div>

        {/* --- GUILD PANELS (The VS Spread) --- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          
          {/* THE "VS" BADGE (Centered on Desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 vs-jagged bg-white border-4 border-black w-32 h-32 items-center justify-center shadow-[6px_6px_0px_#000] rotate-6">
            <span className="text-black text-6xl rotate-[-6deg]" style={{ fontFamily: F_SFX }}>VS</span>
          </div>

          {/* BLUE GUILD PANEL */}
          <div className="relative group perspective-1000">
            <div className="ink-box-alt bg-[#1a4a9c] p-6 md:p-8 min-h-[350px] flex flex-col justify-between relative overflow-hidden shadow-[8px_8px_0px_#000] lg:skew-x-[-3deg] lg:-rotate-1 transition-transform group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_#000]">
              
              {/* Local Image Background for Blue */}
              <img 
                src={blue} 
                alt="Blue Guild Art" 
                // Using object-contain center so if it's a transparent logo, it fits nicely
                className="absolute inset-0 w-full h-full object-contain object-center p-4 opacity-40 mix-blend-hard-light group-hover:scale-110 transition-transform duration-[10s]"
              />
              <div className="absolute inset-0 halftone-light opacity-30 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2859] via-transparent to-transparent opacity-90" />

              <div className="relative z-10 lg:skew-x-[3deg]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="uppercase text-5xl md:text-6xl text-white drop-shadow-[3px_3px_0px_#000]" style={{ fontFamily: F_DISPLAY }}>
                    Azure <br/> <span className="text-[#6bb5ff]">Syndicate</span>
                  </h3>
                  <div className="bg-white text-black font-black text-3xl px-3 py-1 ink-box-alt rotate-6 shadow-[3px_3px_0px_#000]" style={{ fontFamily: F_SFX }}>
                    青
                  </div>
                </div>
                
                <p className="text-white/90 text-sm md:text-base font-bold bg-black/60 p-3 ink-box-alt border-white" style={{ fontFamily: F_MONO }}>
                  Tactical, calculated, and elite. 1,204 active members dominating the global leaderboards.
                </p>
              </div>

              <div className="relative z-10 mt-8 lg:skew-x-[3deg]">
                <button className="w-full bg-white text-black text-xl uppercase py-4 ink-box-alt hover:bg-black hover:text-white hover:border-white transition-all shadow-[6px_6px_0px_#000] active:translate-y-2 active:shadow-none" style={{ fontFamily: F_DISPLAY }}>
                  Pledge to Blue
                </button>
              </div>
            </div>
          </div>

          {/* RED GUILD PANEL */}
          <div className="relative group perspective-1000">
            <div className="ink-box-alt bg-[#b01e33] p-6 md:p-8 min-h-[350px] flex flex-col justify-between relative overflow-hidden shadow-[8px_8px_0px_#000] lg:skew-x-[3deg] lg:rotate-1 transition-transform group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_#000]">
              
              {/* Local Image Background for Red */}
              <img 
                src={red} 
                alt="Red Guild Art" 
                // Using object-contain center so if it's a transparent logo, it fits nicely
                className="absolute inset-0 w-full h-full object-contain object-center p-4 opacity-50 mix-blend-color-burn group-hover:scale-110 transition-transform duration-[10s]"
              />
              <div className="absolute inset-0 halftone-light opacity-30 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#590d18] via-transparent to-transparent opacity-90" />

              <div className="relative z-10 lg:skew-x-[-3deg]">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="uppercase text-5xl md:text-6xl text-white drop-shadow-[3px_3px_0px_#000]" style={{ fontFamily: F_DISPLAY }}>
                    Crimson <br/> <span className="text-[#ff788c]">Vanguard</span>
                  </h3>
                  <div className="bg-black text-white font-black text-3xl px-3 py-1 ink-box-alt rotate-[-6deg] shadow-[3px_3px_0px_#fff]" style={{ fontFamily: F_SFX }}>
                    赤
                  </div>
                </div>
                
                <p className="text-white/90 text-sm md:text-base font-bold bg-black/60 p-3 ink-box-alt border-white" style={{ fontFamily: F_MONO }}>
                  Aggressive, relentless, and fierce. 987 active members rising rapidly through the ranks.
                </p>
              </div>

              <div className="relative z-10 mt-8 lg:skew-x-[-3deg]">
                <button className="w-full bg-black text-white text-xl uppercase py-4 ink-box-alt border-white hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_#000] active:translate-y-2 active:shadow-none" style={{ fontFamily: F_DISPLAY }}>
                  Pledge to Red
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* --- SPONSORS SECTION (Allied Factions) --- */}
        <div className="relative z-10 mt-16 pt-10 border-t-4 border-black border-dashed">
          
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e8e4d8] px-4">
            <h3 className="uppercase text-2xl text-black" style={{ fontFamily: F_DISPLAY }}>
              Allied Factions <span className="text-sm tracking-widest text-black/60 ml-2" style={{ fontFamily: F_MONO }}>// SPONSORS</span>
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-center">
            {SPONSORS.map((sponsor) => (
              <div 
                key={sponsor.id} 
                className="ink-box-alt bg-white px-6 py-4 flex flex-col items-center justify-center min-w-[180px] shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all cursor-crosshair"
              >
                {/* Simulated Logo Typography */}
                <span className="uppercase text-xl text-black leading-none mb-1" style={{ fontFamily: F_DISPLAY }}>
                  {sponsor.name}
                </span>
                <span className="text-[10px] text-black/60 uppercase font-bold tracking-widest" style={{ fontFamily: F_MONO }}>
                  {sponsor.role}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}