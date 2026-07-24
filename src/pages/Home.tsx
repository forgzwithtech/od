import React from 'react';
import type { GuildType as AppGuildType } from '../App';
import GlobalBackground from '../components/GlobalBackground';
import Hero from '../components/Hero';
import GuildInvites from '../components/GuildInvites';
import SocialPulse from '../components/SocialPulse';
import VaultGateway from '../components/VaultGateway';
import SuggestionFooter from '../components/SuggestionFooter';

interface HomeProps {
  guild: AppGuildType;
}

// 1. We map the simple string from App.tsx into the detailed objects
const GUILD_THEMES = {
  blue: {
    name: "Azure Syndicate",
    primary: "#6bb5ff", // Manga Light Blue
    secondary: "#1a4a9c", // Deep Ink Blue
  },
  red: {
    name: "Crimson Vanguard",
    primary: "#FF2E4D", // Shonen Red
    secondary: "#FFE14D", // Impact Yellow
  },
};

export default function Home({ guild }: HomeProps) {
  // 2. Select the theme object based on the current guild string
  // Fallback to red just in case an unexpected value is passed
  const activeTheme = GUILD_THEMES[guild as keyof typeof GUILD_THEMES] || GUILD_THEMES.red;

  return (
    // 3. Inject the CSS variables here so GlobalBackground and the rest of the page inherit the active colors
    <div 
      className="flex flex-col gap-24 relative z-0"
      style={{
        "--guild-primary": activeTheme.primary,
        "--guild-secondary": activeTheme.secondary,
      } as React.CSSProperties}
    >
      
      {/* 4. The persistent manga background is now safely housed in Home */}
      <GlobalBackground />
      
      {/* 5. Pass the mapped theme object down to clear the TS errors */}
      <Hero guild={activeTheme} />
      
      <GuildInvites />
      
      <SocialPulse />
      
      {/* 
        These components haven't been upgraded to the manga style yet. 
        They will sit here safely until we style them.
      */}
      <VaultGateway />
      
      <SuggestionFooter />
      
    </div>
  );
}