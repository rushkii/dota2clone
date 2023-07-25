export const getHeroThumbnail = (name: string) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name.replace("npc_dota_hero_", "")}.png`;
}

export const getHeroAttackType = (type: number) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/${type ? 'ranged' : 'meele'}.svg`
}

export const getHeroAnimation = (name: string, extension: string = "webm") => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${name.replace("npc_dota_hero_", "")}.${extension}`
}
