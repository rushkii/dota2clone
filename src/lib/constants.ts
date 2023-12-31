export const FILTER = [
  {
    attr: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-str-active.png",
    attr_hero: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png",
    attr_name: "Strength"
  },
  {
    attr: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-agi-active.png",
    attr_hero: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png",
    attr_name: "Agility"
  },
  {
    attr: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-int-active.png",
    attr_hero: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png",
    attr_name: "Intelligence"
  },
  {
    attr: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-uni-active.png",
    attr_hero: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_universal.png",
    attr_name: "Universal"
  }
]

// Role levels width of TailwindCSS
export const ROLE_LEVELS_WIDTH = ["w-0", "w-1/3", "w-2/3", "w-full"]

export const ROLES = ["Carry", "Support", "Nuker", "Disabler", "Jungler", "Durable", "Escape", "Pusher", "Initiator"];

const CHAR_CODES = Array.from(Array(26)).map((_, i) => i + 65);
export const ALLOWED_ASCII = ["-", "_", ...CHAR_CODES.map((x) => String.fromCharCode(x).toLowerCase())];
