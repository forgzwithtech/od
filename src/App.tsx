import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

export type GuildType = 'blue' | 'red';

interface UserProfile {
  guild?: GuildType;
}

// TODO(auth): once login exists, replace this with the logged-in user's
// saved guild. Everything downstream already reads from `guild` state,
// so this is the only line that needs to change.
const currentUser: UserProfile | null = null;

// Type assertion prevents TypeScript from collapsing the property check to `never`
const initialGuild: GuildType = (currentUser as unknown as UserProfile)?.guild ?? 'blue';

export default function App() {
  const [guild, setGuild] = useState<GuildType>(initialGuild);

  useEffect(() => {
    document.documentElement.setAttribute('data-guild', guild);
  }, [guild]);

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--guild-primary)] rounded-full mix-blend-screen blur-[120px] opacity-20 animate-pulse pointer-events-none transition-colors duration-700" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar guild={guild} setGuild={setGuild} />
          <main className="flex-grow pt-32 pb-20 flex flex-col gap-20">
            <Routes>
              <Route path="/" element={<Home guild={guild} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}