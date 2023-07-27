export const getHeroThumbnail = (name: string) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name.replace("npc_dota_hero_", "")}.png`;
}

export const getHeroAttackType = (type: number) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/${type === 1 ? 'melee' : 'ranged'}.svg`
}

export const getHeroAnimation = (name: string, extension: string = "webm") => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${name.replace("npc_dota_hero_", "")}.${extension}`
}

export const getHeroAbility = (heroName: string, abilityName: string, isVideo: boolean, extension: string = "webm") => {
  let endpoint: string;
  let extraEndpoint: string;

  if(!isVideo) {
    endpoint = "images";
    extraEndpoint = "";
  } else {
    endpoint = "videos"
    extraEndpoint = `${heroName.toLowerCase()}/`
  }

  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/${endpoint}/dota_react/abilities/${extraEndpoint}${abilityName.toLowerCase()}.${extension}`
}
