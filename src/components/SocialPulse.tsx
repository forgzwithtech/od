import { useState, useEffect } from "react";

/**
 * ------------------------------------------------------------------
 *  SOCIAL PULSE — Live API-Driven Transmissions & Media Grid
 *  Channels: YouTube (@Otakus_Domain), TikTok (@otakus_domain5), X (@otakus__domain), Insta (@otakus__domain)
 * ------------------------------------------------------------------
 */

interface SocialData {
  title: string;
  link: string;
  thumbnail: string;
  date: string;
  platform: "youtube" | "tiktok" | "x" | "insta";
}

/* ---------- Custom Manga Styles Hook ---------- */
function useSocialMangaAssets() {
  useEffect(() => {
    if (document.getElementById("social-manga-assets")) return;
    const style = document.createElement("style");
    style.id = "social-manga-assets";
    style.innerHTML = `
      .ink-box-social {
        border: 4px solid #000;
        border-radius: 2px 255px 3px 255px / 255px 5px 225px 3px;
      }
      .halftone-dark {
        background-image: radial-gradient(rgba(0,0,0,0.7) 1.5px, transparent 1.5px);
        background-size: 6px 6px;
      }
      .halftone-light {
        background-image: radial-gradient(rgba(255,255,255,0.4) 1.5px, transparent 1.5px);
        background-size: 8px 8px;
      }
      .manga-dialogue-bubble {
        border: 3px solid #000;
        border-radius: 100% / 120%;
        background: #fff;
        position: relative;
      }
      .manga-dialogue-bubble::after {
        content: '';
        position: absolute;
        bottom: -15px;
        left: 20%;
        border-width: 15px 15px 0;
        border-style: solid;
        border-color: #000 transparent transparent transparent;
      }
      .manga-dialogue-bubble::before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 22%;
        border-width: 10px 10px 0;
        border-style: solid;
        border-color: #fff transparent transparent transparent;
        z-index: 10;
      }
      @keyframes marquee-scroll {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee-custom {
        display: inline-flex;
        white-space: nowrap;
        animation: marquee-scroll 25s linear infinite;
      }
      .animate-marquee-custom:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

const F_DISPLAY = "'Anton', sans-serif";
const F_MONO = "'Space Mono', monospace";

export default function SocialPulse() {
  useSocialMangaAssets();

  // Initial loading/fallback states
  const [youtube, setYoutube] = useState<SocialData>({
    platform: "youtube",
    title: "Loading latest transmission...",
    link: "https://www.youtube.com/@Otakus_Domain",
    thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQ0mbXSmRiOh.jpg", // Fallback JJK banner
    date: "Standby",
  });

  const [tiktok, setTiktok] = useState<SocialData>({
    platform: "tiktok",
    title: "Loading latest short...",
    link: "https://www.tiktok.com/@otakus_domain5",
    thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKABiqAsH.jpg",
    date: "Standby",
  });

  const [twitter, setTwitter] = useState<SocialData>({
    platform: "x",
    title: "Connecting to X terminal...",
    link: "https://x.com/otakus__domain",
    thumbnail: "",
    date: "Standby",
  });

  const [insta, setInsta] = useState<SocialData>({
    platform: "insta",
    title: "Loading latest post...",
    link: "https://instagram.com/otakus__domain",
    thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    date: "Standby",
  });

  // Client-side API Fetching via Public RSS Bridges
  useEffect(() => {
    // Helper to fetch and parse feeds without needing backend auth tokens
    const fetchFeed = async (rssUrl: string) => {
      const bridgeUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      const res = await fetch(bridgeUrl);
      const data = await res.json();
      if (data.status === "ok" && data.items.length > 0) return data.items[0];
      throw new Error("Feed empty or rate limited");
    };

    // Extract images embedded inside HTML content of RSS feeds
    const extractImage = (content: string) => {
      const match = /<img.*?src=["'](.*?)["']/.exec(content);
      return match ? match[1] : null;
    };

    const fetchAll = async () => {
      try {
        // 1. YouTube Fetch
        const ytData = await fetchFeed("https://rsshub.app/youtube/user/@Otakus_Domain");
        setYoutube(prev => ({
          ...prev,
          title: ytData.title,
          link: ytData.link,
          thumbnail: extractImage(ytData.content) || ytData.thumbnail || prev.thumbnail,
          date: new Date(ytData.pubDate).toLocaleDateString(),
        }));
      } catch (e) { console.warn("YT API fallback active"); }

      try {
        // 2. TikTok Fetch
        const ttData = await fetchFeed("https://rsshub.app/tiktok/user/@otakus_domain5");
        setTiktok(prev => ({
          ...prev,
          title: ttData.title,
          link: ttData.link,
          thumbnail: extractImage(ttData.content) || prev.thumbnail,
          date: new Date(ttData.pubDate).toLocaleDateString(),
        }));
      } catch (e) { console.warn("TikTok API fallback active"); }

      try {
        // 3. X (Twitter) Fetch
        const xData = await fetchFeed("https://rsshub.app/twitter/user/otakus__domain");
        setTwitter(prev => ({
          ...prev,
          title: xData.title.replace(/(<([^>]+)>)/gi, ""), // Strip HTML tags
          link: xData.link,
          date: new Date(xData.pubDate).toLocaleDateString(),
        }));
      } catch (e) { console.warn("X API fallback active"); }

      try {
        // 4. Instagram Fetch
        const igData = await fetchFeed("https://rsshub.app/instagram/user/otakus__domain");
        setInsta(prev => ({
          ...prev,
          title: igData.title || "New post from the domain.",
          link: igData.link,
          thumbnail: extractImage(igData.content) || prev.thumbnail,
          date: new Date(igData.pubDate).toLocaleDateString(),
        }));
      } catch (e) { console.warn("Insta API fallback active"); }
    };

    fetchAll();
  }, []);

  const headlines = [
    'New JJK chapter breakdown drops Friday',
    'Naruto rewatch marathon this weekend',
    'One Piece theory thread blowing up on X (@otakus__domain)',
    'Fairy Tail 100 Years Quest update',
    'Catch our latest shorts on TikTok (@otakus_domain5)',
  ];

  return (
    <section className="px-4 md:px-6 max-w-[100rem] mx-auto w-full py-16 relative">
      
      {/* MANGA PANEL CONTAINER */}
      <div className="ink-box-social bg-[#e8e4d8] shadow-[15px_15px_0px_#000] p-6 md:p-10 relative overflow-hidden">
        
        {/* Background Screentone */}
        <div className="absolute inset-0 opacity-20 pointer-events-none halftone-dark" />

        {/* SECTION HEADER */}
        <div className="relative z-10 flex flex-col items-start mb-8 border-b-4 border-black pb-4 border-dashed">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
            <span className="bg-black text-white font-bold uppercase text-xs px-3 py-0.5 ink-box-social rotate-[-1deg]" style={{ fontFamily: F_MONO }}>
              Live API Feed
            </span>
          </div>
          <h2 className="uppercase text-5xl md:text-7xl text-black tracking-tighter" style={{ fontFamily: F_DISPLAY }}>
            The <span className="text-white" style={{ WebkitTextStroke: "2px black", textShadow: "4px 4px 0px #000" }}>Pulse</span>
          </h2>
        </div>

        {/* MEDIA EMBED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 relative z-10">
          
          {/* YOUTUBE PANEL (Span 8) */}
          <div className="md:col-span-8 ink-box-social bg-black p-4 md:p-6 shadow-[8px_8px_0px_#000] flex flex-col group relative overflow-hidden">
            <div className="absolute inset-0 halftone-light opacity-10 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-4 z-10">
              <span className="text-red-500 font-bold text-sm uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: F_MONO }}>
                ▶ YouTube <span className="text-white">@Otakus_Domain</span>
              </span>
              <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 font-bold uppercase">Latest Video</span>
            </div>

            <a 
              href={youtube.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-full flex-1 min-h-[250px] rounded-lg border-2 border-white/20 overflow-hidden group-hover:border-red-500 transition-colors block shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"
            >
              <img src={youtube.thumbnail} alt={youtube.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-16 bg-red-600/90 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_#000] group-hover:bg-red-600 group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-white text-xl md:text-2xl uppercase tracking-wide drop-shadow-[2px_2px_0px_#000] line-clamp-2" style={{ fontFamily: F_DISPLAY }}>
                  {youtube.title}
                </span>
                <span className="text-[11px] text-gray-300 font-mono mt-1 block font-bold">{youtube.date}</span>
              </div>
            </a>
          </div>

          {/* TIKTOK PANEL (Span 4) */}
          <div className="md:col-span-4 ink-box-social bg-zinc-950 p-4 md:p-6 shadow-[8px_8px_0px_#000] flex flex-col group overflow-hidden relative">
             <div className="absolute inset-0 halftone-light opacity-10 pointer-events-none" />
            
            <div className="flex justify-between items-center mb-4 z-10">
              <span className="text-cyan-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: F_MONO }}>
                ♪ TikTok <span className="text-white">@otakus_domain5</span>
              </span>
            </div>

            <a 
              href={tiktok.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-full flex-1 min-h-[250px] rounded-lg border-2 border-white/20 overflow-hidden group-hover:border-cyan-400 transition-colors block"
            >
              <img src={tiktok.thumbnail} alt="TikTok Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-14 h-14 bg-cyan-400 text-black rounded-full flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_#fff] group-hover:scale-110 transition-transform">
                  ♫
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 text-center">
                <span className="text-white text-sm font-bold line-clamp-2" style={{ fontFamily: F_MONO }}>{tiktok.title}</span>
              </div>
            </a>
          </div>

          {/* X (TWITTER) PANEL (Span 6) */}
          <div className="md:col-span-6 ink-box-social bg-[#1a1a1a] p-6 shadow-[8px_8px_0px_#000] flex flex-col group relative overflow-visible mt-4">
            <span className="absolute -top-4 left-6 bg-black text-white px-3 py-1 font-bold text-xs uppercase ink-box-social rotate-[-2deg]" style={{ fontFamily: F_MONO }}>
              X // @otakus__domain
            </span>

            {/* Manga Dialogue Bubble for the Tweet */}
            <a 
              href={twitter.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="manga-dialogue-bubble flex-1 p-6 md:p-8 mt-2 flex items-center justify-center group-hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
            >
              <p className="text-black font-black text-base md:text-lg italic text-center line-clamp-4" style={{ fontFamily: F_MONO }}>
                "{twitter.title}"
              </p>
            </a>
            <div className="mt-6 text-right pr-4">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: F_MONO }}>{twitter.date}</span>
            </div>
          </div>

          {/* INSTAGRAM PANEL (Span 6) */}
          <div className="md:col-span-6 ink-box-social bg-zinc-900 p-6 shadow-[8px_8px_0px_#000] flex flex-col group relative mt-4 overflow-hidden">
             <div className="absolute inset-0 halftone-light opacity-10 pointer-events-none" />
            <span className="absolute -top-4 right-6 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white px-3 py-1 font-bold text-xs uppercase ink-box-social rotate-[2deg] z-20" style={{ fontFamily: F_MONO }}>
              Insta // @otakus__domain
            </span>

            {/* "Polaroid/Manga Photo" style for Instagram */}
            <a 
              href={insta.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative w-full flex-1 min-h-[180px] mt-2 bg-white p-3 ink-box-social rotate-[-1deg] group-hover:rotate-0 transition-transform shadow-[6px_6px_0px_rgba(0,0,0,0.5)] flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden border-2 border-black">
                <img src={insta.thumbnail} alt="Instagram Post" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <p className="text-black font-bold text-xs mt-3 line-clamp-1 text-center" style={{ fontFamily: F_MONO }}>
                {insta.title}
              </p>
            </a>
          </div>

        </div>

        {/* TICKER MARQUEE */}
        <div className="relative z-10 ink-box-social bg-black py-3 px-4 overflow-hidden shadow-[6px_6px_0px_rgba(0,0,0,0.8)] flex items-center">
          <div className="bg-[var(--guild-primary)] text-black font-bold uppercase text-xs px-4 py-1 mr-4 ink-box-social shrink-0 z-20" style={{ fontFamily: F_MONO }}>
            BREAKING NEWS
          </div>
          
          <div className="overflow-hidden w-full relative">
            <div className="animate-marquee-custom flex gap-12">
              {[...headlines, ...headlines].map((h, i) => (
                <span key={i} className="text-xs uppercase text-white font-bold tracking-wider flex items-center gap-2" style={{ fontFamily: F_MONO }}>
                  <span className="text-[var(--guild-secondary)]">✦</span> {h}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}