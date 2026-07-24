import { Link } from 'react-router-dom';
import type { GuildType } from '../App';
import blueLogo from '../assets/bluelogo.png';
import redLogo from '../assets/Redlogo.png';

interface NavbarProps {
  guild: GuildType;
  setGuild: (val: GuildType) => void;
}

export default function Navbar({ guild, setGuild }: NavbarProps) {
  const isBlue = guild === 'blue';

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b-4 transition-colors duration-500"
         style={{ borderBottomColor: 'var(--guild-primary)' }}>
      {/* Decorative top manga line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
        
        {/* LOGO SECTION */}
        <Link to="/" className="flex items-center gap-3 group shrink-0 relative z-10">
          <div className="relative">
            <img
              src={isBlue ? blueLogo : redLogo}
              alt="Otaku Domain Logo"
              className="h-12 w-12 object-contain relative z-10 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110"
            />
            {/* Logo Glow Behind */}
            <div className="absolute inset-0 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" 
                 style={{ backgroundColor: 'var(--guild-primary)' }} />
          </div>
          <div className="flex flex-col uppercase tracking-widest skew-x-[-10deg]">
            <span className="font-display text-xl font-black leading-none text-white">Otaku's</span>
            <span className="font-display text-sm font-bold leading-none" style={{ color: 'var(--guild-primary)' }}>Domain</span>
          </div>
        </Link>

        {/* CENTER LINKS - Angled Manga Style */}
        <div className="hidden md:flex items-center gap-2 font-display text-sm uppercase tracking-wider font-bold">
          {['Vault', 'Forum', 'Events', 'Store'].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase()}`} 
              className="relative px-5 py-2 skew-x-[-15deg] overflow-hidden group border-2 border-transparent hover:border-white/20 transition-all"
            >
              <div className="absolute inset-0 bg-[var(--guild-primary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-gray-300 group-hover:text-black transition-colors duration-300 block skew-x-[15deg]">
                {item}
              </span>
            </Link>
          ))}
        </div>

        {/* GUILD SWITCHER - Fighting Game VS Style */}
        <div className="relative z-10 flex items-center shrink-0">
          <p className="hidden lg:block mr-4 font-mono-tag text-[10px] uppercase text-gray-400 tracking-widest text-right">
            Current<br/>Alignment
          </p>
          <button
            onClick={() => setGuild(isBlue ? 'red' : 'blue')}
            className="group relative flex items-center h-12 w-[160px] bg-zinc-900 border-2 border-white/20 skew-x-[-15deg] overflow-hidden shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000] transition-all"
            aria-label="Switch guild"
          >
            {/* BLUE SIDE */}
            <div
              className="absolute inset-y-0 left-0 w-[55%] bg-blue-600 flex items-center justify-start pl-4 transition-transform duration-500 ease-in-out"
              style={{ transform: isBlue ? 'translateX(0)' : 'translateX(-100%)', boxShadow: isBlue ? '0 0 20px rgba(46,143,255,0.8)' : 'none' }}
            >
              <span className="font-display text-sm font-black text-white skew-x-[15deg]">BLUE</span>
            </div>
            
            {/* RED SIDE */}
            <div
              className="absolute inset-y-0 right-0 w-[55%] bg-red-600 flex items-center justify-end pr-4 transition-transform duration-500 ease-in-out"
              style={{ transform: !isBlue ? 'translateX(0)' : 'translateX(100%)', boxShadow: !isBlue ? '0 0 20px rgba(255,59,59,0.8)' : 'none' }}
            >
              <span className="font-display text-sm font-black text-white skew-x-[15deg]">RED</span>
            </div>

            {/* VS BADGE */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 bg-black border-2 border-white flex items-center justify-center font-display font-black text-[10px] text-white z-10 skew-x-[15deg] group-hover:rotate-12 transition-transform">
              VS
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}