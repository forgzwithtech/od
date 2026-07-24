import React, { useState, useEffect, useRef } from "react";
import pageFlipSound from "../assets/page.ogg";
import fest from "../assets/fest.jpeg";
import drop from "../assets/drop.jpg";
import rankings from "../assets/rankings.png";

/**
 * ------------------------------------------------------------------
 *  MANGA HERO V3 — The "Shonen Jump" Spread Edition
 *  A completely panel-driven, ink-styled, asymmetric comic layout.
 * ------------------------------------------------------------------
 */

export interface GuildType {
  name: string;
  primary: string;
  secondary: string;
}

interface SlideMember {
  name: string;
  avatar: string;
  quote: string;
}

interface SlideData {
  id: number;
  panel: string;
  tag: string;
  stamp: string;
  sfx: string;
  title1: string;
  title2: string;
  desc: string; 
  btn: string;
  image: string;
  kanji: string;
  member?: SlideMember;
}

interface HeroProps {
  guild?: GuildType;
}

const DEFAULT_GUILD: GuildType = {
  name: "Crimson Guild",
  primary: "#FF2E4D", 
  secondary: "#FFE14D", 
};

// Data integrating your local assets and AniList fallbacks
const CAROUSEL_SLIDES: SlideData[] = [
  {
    id: 1,
    panel: "01",
    tag: "Next IRL Drop",
    stamp: "EP. 01 — LIVE EVENT",
    sfx: "GATHER!!",
    title1: "Anime",
    title2: "Fest",
    kanji: "オタクコネクト",
    desc: "500+ fans. One watch party, one cosplay showdown, two guilds fighting for the leaderboard. Tickets won't last.",
    btn: "Grab Your Tickets",
    image: fest, // Local Asset
  },
  {
    id: 2,
    panel: "02",
    tag: "Seasonal Radar",
    stamp: "TRANSMISSION // LIVE",
    sfx: "DROP!",
    title1: "Today's",
    title2: "Drops",
    kanji: "最新のリリース",
    desc: "Demon Slayer Hashira Training Arc Ep 4 is out. Plus, the latest One Piece chapter breakdown is live on the forums.",
    btn: "Enter The Vault",
    image: drop, // Local Asset
  },
  {
    id: 3,
    panel: "03",
    tag: "Guild Wars",
    stamp: "GLOBAL STANDINGS",
    sfx: "CLASH!!",
    title1: "Live",
    title2: "Rankings",
    kanji: "ギルドウォーズ",
    desc: "Red Guild is currently leading by 4,200 points. Complete today's daily trial and upload your cosplay to close the gap!",
    btn: "View Leaderboard",
    image: rankings, // Local Asset
  },
  {
    id: 4,
    panel: "04",
    tag: "Level Up",
    stamp: "COMMUNITY FEATURE",
    sfx: "OMEDETOU!",
    title1: "Happy",
    title2: "B-Day!",
    kanji: "お誕生日おめでとう",
    desc: "",
    member: {
      name: "@ZoroLostAgain",
      avatar: "https://s4.anilist.co/file/anilistcdn/character/large/b62-1zCVPEQGk0KA.png", // Roronoa Zoro
      quote: "Thanks for the wishes guys! Still trying to find my way to the event venue... I think I'm in the wrong city.",
    },
    btn: "Send A Gift",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg", // One Piece Scenic
  },
];

/* ---------- Custom Manga Styles Hook ---------- */
function useMangaAssets() {
  useEffect(() => {
    if (document.getElementById("manga-hero-assets")) return;
    const style = document.createElement("style");
    style.id = "manga-hero-assets";
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Anton&family=Space+Mono:wght@400;700&family=Noto+Sans+JP:wght@900&display=swap');
      
      /* Hand-drawn ink box borders */
      .ink-box {
        border: 4px solid #000;
        border-radius: 2px 255px 3px 255px / 255px 5px 225px 3px;
      }
      
      /* Vertical Japanese Text */
      .vertical-jp {
        writing-mode: vertical-rl;
        text-orientation: upright;
        font-family: 'Noto Sans JP', sans-serif;
      }

      /* Animated Focus Lines (Anime Action Background) */
      .focus-lines {
        background: repeating-conic-gradient(
          from 0deg, 
          transparent 0deg 5deg, 
          rgba(0, 0, 0, 0.15) 5deg 10deg,
          transparent 10deg 15deg,
          rgba(255, 255, 255, 0.1) 15deg 20deg
        );
        animation: rotate-focus 20s linear infinite;
      }

      @keyframes rotate-focus {
        from { transform: rotate(0deg) scale(2); }
        to { transform: rotate(360deg) scale(2); }
      }

      /* Jagged Speech Bubble */
      .jagged-bubble {
        clip-path: polygon(
          0% 5%, 5% 0%, 95% 0%, 100% 5%, 100% 95%, 
          95% 100%, 20% 100%, 15% 115%, 10% 100%, 5% 100%, 0% 95%
        );
      }

      /* Paper Flip Keyframes */
      @keyframes flip-next-paper {
        0% { transform: perspective(2500px) rotateY(0deg) rotateX(0deg) scale(1); filter: brightness(1); }
        40% { transform: perspective(2500px) rotateY(-80deg) rotateX(-2deg) scale(1.03); filter: brightness(1.3); }
        100% { transform: perspective(2500px) rotateY(-180deg) rotateX(0deg) scale(1); filter: brightness(0.8); }
      }
      @keyframes flip-prev-paper {
        0% { transform: perspective(2500px) rotateY(0deg) rotateX(0deg) scale(1); filter: brightness(1); }
        40% { transform: perspective(2500px) rotateY(80deg) rotateX(2deg) scale(1.03); filter: brightness(1.3); }
        100% { transform: perspective(2500px) rotateY(180deg) rotateX(0deg) scale(1); filter: brightness(0.8); }
      }
      .paper-flip-next { animation: flip-next-paper 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      .paper-flip-prev { animation: flip-prev-paper 0.75s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
      
      /* Impact Shake */
      @keyframes anime-shake {
        0% { transform: translate(2px, 2px) rotate(0deg); }
        20% { transform: translate(-4px, 0px) rotate(2deg); }
        40% { transform: translate(2px, -2px) rotate(-1deg); }
        60% { transform: translate(-4px, 2px) rotate(1deg); }
        80% { transform: translate(-2px, -2px) rotate(2deg); }
        100% { transform: translate(2px, -4px) rotate(-1deg); }
      }
      .animate-manga-impact { animation: anime-shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
    `;
    document.head.appendChild(style);
  }, []);
}

/* Constants */
const F_DISPLAY = "'Anton', sans-serif";
const F_SFX = "'Bangers', cursive";
const F_MONO = "'Space Mono', monospace";
const halftoneDark = { backgroundImage: "radial-gradient(rgba(0,0,0,0.8) 1.5px, transparent 1.5px)", backgroundSize: "6px 6px" };
const halftoneLight = { backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px)", backgroundSize: "8px 8px" };

/* ------------------------------------------------------------------
 *  SFX Component
 * ------------------------------------------------------------------ */
function SfxBurst({ text, className = "", triggerAnim = false }: { text: string; className?: string; triggerAnim?: boolean }) {
  return (
    <div
      className={`select-none pointer-events-none absolute z-50 ${className} ${triggerAnim ? "animate-manga-impact" : ""}`}
      style={{
        fontFamily: F_SFX,
        color: "var(--guild-secondary)",
        WebkitTextStroke: "2.5px black",
        fontSize: "clamp(3.5rem, 7vw, 6rem)",
        lineHeight: 0.9,
        filter: "drop-shadow(6px 6px 0px rgba(0,0,0,1))",
      }}
    >
      {text}
    </div>
  );
}

/* ------------------------------------------------------------------
 *  Single Slide Component - The "Comic Layout"
 * ------------------------------------------------------------------ */
function SlidePanel({ slide, isFlipping = false }: { slide: SlideData; isFlipping?: boolean }) {
  return (
    <div className="absolute inset-0 bg-[#e8e4d8] overflow-hidden flex flex-col p-4 md:p-6 gap-4">
      {/* Background Screentone */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={halftoneDark} />
      
      <SfxBurst text={slide.sfx} className="top-10 left-8 -rotate-12" triggerAnim={!isFlipping} />

      {/* TOP SECTION: Massive Image Panel (Jagged Angled Cut) */}
      <div 
        className="relative w-full flex-1 ink-box overflow-hidden bg-black shadow-[8px_8px_0px_#000]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)" }}
      >
        <img
          src={slide.image}
          alt={slide.title1}
          className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[20000ms] hover:scale-125"
        />
        {/* Dynamic Halftone overlay on image for that printed manga look */}
        <div className="absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none" style={halftoneLight} />
        
        {/* The Vertical Kanji Title floating in the image */}
        <div 
          className="absolute right-6 top-6 vertical-jp text-white/90 text-6xl md:text-7xl lg:text-8xl font-black drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mix-blend-overlay tracking-widest z-10"
        >
          {slide.kanji}
        </div>
      </div>

      {/* BOTTOM SECTION: Text Panel & Caption Boxes */}
      <div className="relative w-full h-auto min-h-[200px] flex flex-col md:flex-row gap-4 items-end z-20">
        
        {/* Caption Box */}
        <div className="ink-box bg-white flex-1 p-6 shadow-[8px_8px_0px_#000] relative">
          <div className="absolute -top-4 -left-2 bg-[var(--guild-primary)] text-black font-bold uppercase text-xs px-3 py-1 ink-box rotate-[-3deg]" style={{ fontFamily: F_MONO }}>
            {slide.stamp}
          </div>
          
          <h1
            className="uppercase text-5xl md:text-6xl lg:text-7xl leading-[0.85] text-black tracking-tight mb-4 mt-2"
            style={{ fontFamily: F_DISPLAY }}
          >
            {slide.title1} <br/> <span style={{ color: "var(--guild-primary)", WebkitTextStroke: "2px black", textShadow: "4px 4px 0px #000" }}>{slide.title2}</span>
          </h1>

          {slide.member ? (
             <div className="flex items-center gap-3 bg-zinc-100 p-2 border-2 border-dashed border-black">
               <img src={slide.member.avatar} alt={slide.member.name} className="w-10 h-10 border-2 border-black object-cover grayscale" />
               <div>
                 <p className="text-black text-[10px] uppercase font-bold" style={{ fontFamily: F_MONO }}>{slide.member.name}</p>
                 <p className="text-black/80 text-xs font-bold italic leading-tight">"{slide.member.quote}"</p>
               </div>
             </div>
          ) : (
            <p className="text-black/80 text-sm md:text-base font-bold leading-snug border-l-4 border-black pl-3" style={{ fontFamily: F_MONO }}>
              {slide.desc}
            </p>
          )}
        </div>

        {/* Action Button Panel */}
        <div className="shrink-0 flex items-center justify-center">
          <button
            className="ink-box bg-black text-white px-8 py-6 uppercase tracking-widest text-lg hover:bg-[var(--guild-primary)] hover:text-black transition-all shadow-[6px_6px_0px_var(--guild-primary)] hover:shadow-[8px_8px_0px_#000] active:translate-y-2 active:shadow-none -rotate-2"
            style={{ fontFamily: F_DISPLAY }}
          >
            {slide.btn}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 *  Main Hero Component
 * ------------------------------------------------------------------ */
export default function Hero({ guild = DEFAULT_GUILD }: HeroProps) {
  useMangaAssets();

  const [current, setCurrent] = useState<number>(0);
  const [pending, setPending] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // FIXED: Using ReturnType<typeof setInterval> resolves the NodeJS namespace error in React/Vite
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isFlipping = pending !== null;

  useEffect(() => {
    audioRef.current = new Audio(pageFlipSound);
    audioRef.current.volume = 0.6;
  }, []);

  const playFlipSound = () => {
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => { /* Handle auto-play block */ });
    }
  };

  const goTo = (targetIndex: number, dir: "next" | "prev") => {
    if (isFlipping || targetIndex === current) return;
    setDirection(dir);
    setPending(targetIndex);
    playFlipSound();
  };

  const handleNext = () => goTo((current + 1) % CAROUSEL_SLIDES.length, "next");
  const handlePrev = () => goTo((current - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length, "prev");
  
  const handleJump = (targetIndex: number) => {
    if (targetIndex === current) return;
    const len = CAROUSEL_SLIDES.length;
    const diff = (targetIndex - current + len) % len;
    goTo(targetIndex, diff <= len / 2 ? "next" : "prev");
  };

  const onPageTransitionEnd = (e: React.AnimationEvent) => {
    if (e.animationName.includes('flip') && pending !== null) {
      setCurrent(pending);
      setPending(null);
    }
  };

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 8500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, isFlipping, isMuted]);

  const bottomSlide = CAROUSEL_SLIDES[isFlipping && pending !== null ? pending : current];
  const topSlide = CAROUSEL_SLIDES[current];
  const flipClass = direction === "next" ? "paper-flip-next" : "paper-flip-prev";

  return (
    <section
      style={{ "--guild-primary": guild.primary, "--guild-secondary": guild.secondary } as React.CSSProperties}
      // FIXED: Adjusted padding-top (pt-10 md:pt-16) to pull the spread much closer to the navbar
      className="min-h-screen bg-transparent pt-10 md:pt-6 pb-6 px-4 md:px-6 max-w-[100rem] mx-auto w-full flex flex-col lg:flex-row gap-6 relative overflow-hidden"
    >
      {/* --- LEFT: CAROUSEL (The Manga Page) --- */}
      <div
        className="w-full lg:w-2/3 lg:h-full relative flex-1 min-h-[70vh] rounded-lg overflow-visible bg-black z-10 shadow-[15px_15px_0px_rgba(0,0,0,0.5)] border-l-[12px] border-l-black"
        style={{ perspective: "3000px" }}
      >
        <SlidePanel slide={bottomSlide} isFlipping={isFlipping} />

        {isFlipping && (
          <div
            className={`absolute inset-0 z-30 ${flipClass}`}
            style={{ transformStyle: "preserve-3d", transformOrigin: direction === "next" ? "left center" : "right center" }}
            onAnimationEnd={onPageTransitionEnd}
          >
            <div className="absolute inset-0 shadow-[20px_0_30px_rgba(0,0,0,0.5)]" style={{ backfaceVisibility: "hidden" }}>
              <SlidePanel slide={topSlide} isFlipping={true} />
            </div>

            {/* Back of Page: Raw Screentone */}
            <div
              className="absolute inset-0 bg-[#e8e4d8] flex items-center justify-center border-l-[12px] border-black"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <div className="absolute inset-0 opacity-70" style={halftoneDark} />
              <div className="text-black/40 font-black text-[12rem] tracking-tighter" style={{ fontFamily: F_DISPLAY }}>
                {topSlide.panel}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Center Gutter Shadow */}
        {isFlipping && (
          <div
            className="absolute inset-y-0 w-32 z-[35] pointer-events-none"
            style={{
              [direction === "next" ? "left" : "right"]: 0,
              background: `linear-gradient(to ${direction === "next" ? "right" : "left"}, rgba(0,0,0,1), transparent)`,
            }}
          />
        )}

        {/* Global Nav & Controls overlapping the page */}
        <div className="absolute -bottom-5 right-6 z-40 flex items-center gap-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="ink-box bg-white w-12 h-12 flex items-center justify-center text-black hover:bg-[var(--guild-secondary)] shadow-[4px_4px_0px_#000] active:translate-y-1 transition-all"
          >
            {isMuted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 5L6 9H2v6h4l5 4V5z M23 9l-6 6 M17 9l6 6"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 5L6 9H2v6h4l5 4V5z M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            )}
          </button>
          
          <div className="flex gap-1 ink-box bg-white p-1 shadow-[4px_4px_0px_#000]">
            <button onClick={handlePrev} className="w-10 h-10 bg-black text-white hover:bg-[var(--guild-primary)] flex justify-center items-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg></button>
            <button onClick={handleNext} className="w-10 h-10 bg-black text-white hover:bg-[var(--guild-primary)] flex justify-center items-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg></button>
          </div>
        </div>

        {/* Pagination tabs sticking out the side */}
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 flex flex-col gap-2 z-0">
          {CAROUSEL_SLIDES.map((s, i) => (
             <button
               key={s.id}
               onClick={() => handleJump(i)}
               className={`w-12 h-14 ink-box flex items-center justify-center transition-transform hover:-translate-x-2 ${i === current ? 'bg-[var(--guild-primary)] -translate-x-3' : 'bg-white'}`}
               style={{ borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
             >
               <span className="font-black text-black -rotate-90" style={{ fontFamily: F_DISPLAY }}>{s.panel}</span>
             </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT: SIDEBAR (Cutout Panels) --- */}
      <aside className="w-full lg:w-1/3 lg:h-full flex flex-col gap-6 z-10">
        
        {/* DAILY TRIAL PANEL - Action Focus Layout */}
        <div className="flex-1 ink-box bg-zinc-900 shadow-[10px_10px_0px_#000] relative overflow-hidden flex flex-col group min-h-[300px]">
          {/* Animated Speed/Focus Lines */}
          <div className="absolute inset-0 focus-lines opacity-40 pointer-events-none mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          
          <div className="relative z-10 p-6 flex flex-col h-full justify-between items-center text-center">
            <h3 className="uppercase text-4xl text-white tracking-wide" style={{ fontFamily: F_DISPLAY, textShadow: "3px 3px 0 #000" }}>
              <span className="text-[var(--guild-primary)] block text-5xl mb-1 animate-pulse">⚡</span>
              Daily Trial
            </h3>

            {/* Jagged Shout Bubble */}
            <div className="jagged-bubble bg-white text-black p-8 w-full max-w-[90%] my-4 relative group-hover:scale-105 transition-transform">
               <p className="font-black text-xl italic leading-tight" style={{ fontFamily: F_MONO }}>
                "Who forged Ichigo Kurosaki's true dual Zangetsu blades?"
               </p>
            </div>

            <button
              className="w-full py-4 ink-box bg-[var(--guild-primary)] text-black uppercase text-xl tracking-widest hover:bg-white transition-all shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-2 active:shadow-none shrink-0"
              style={{ fontFamily: F_DISPLAY }}
            >
              Submit Answer
            </button>
          </div>
        </div>

        {/* RECRUITMENT PANEL - Torn Paper / Classified Layout */}
        <div
          className="shrink-0 ink-box shadow-[10px_10px_0px_#000] p-6 relative overflow-visible group hover:-translate-y-2 transition-all"
          style={{ backgroundColor: "var(--guild-secondary)" }}
        >
          <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" style={halftoneDark} />
          
          {/* Faux Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 rotate-2 border border-white/20 backdrop-blur-sm shadow-sm z-50" />

          <SfxBurst text="JOIN!" className="-top-12 -right-6 rotate-[25deg]" triggerAnim={true} />

          <div className="relative z-10 flex flex-col items-start">
            <h3 className="uppercase text-4xl text-black leading-none mb-2" style={{ fontFamily: F_DISPLAY }}>
              Star in our video
            </h3>
            <p className="text-black bg-white px-2 py-1 text-xs uppercase mb-4 font-bold border-2 border-black ink-box" style={{ fontFamily: F_MONO }}>
              Drop your handle
            </p>

            <div className="flex w-full shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <input
                type="text"
                placeholder="@your_insta"
                className="flex-1 bg-white border-y-4 border-l-4 border-black px-4 py-3 focus:outline-none text-black font-bold placeholder-gray-400"
                style={{ fontFamily: F_MONO }}
              />
              <button
                type="button"
                className="bg-black text-white border-4 border-black uppercase text-lg px-6 py-3 hover:bg-[var(--guild-primary)] hover:text-black transition-colors"
                style={{ fontFamily: F_DISPLAY }}
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}