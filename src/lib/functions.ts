import type { Ability } from "$types";


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

// Function to transform abilitiy description that containing like %placeholder_name%
// with a values_float from the special_values data containing that placeholder_name.
const findAbilityValuesFloat = (data: Ability, match: string, placeholder: string) => {
  const item = data.special_values.find((entry) => entry.name === placeholder);
  if (item && item.values_float && item.values_float.length > 0) {
    return item.values_float[0].toString();
  }
  return match; // If the placeholder is not found or has no valid value, return the original match.
}

export const getTransformedValue = (description: string , data: Ability) => {
  return description.replace(/%([a-zA-Z_]+)%/g, (match, placeholder) => findAbilityValuesFloat(data, match, placeholder));
}
