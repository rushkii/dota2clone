import type { Ability, HeroDetail } from "$types";


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
    extraEndpoint = `${heroName.replace("npc_dota_hero_", "")}/`
  }

  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/${endpoint}/dota_react/abilities/${extraEndpoint}${abilityName.toLowerCase()}.${extension}`
}

// Function to transform abilitiy description that containing like %placeholder_name%
// with a values_float from the special_values data containing that placeholder_name.
const findAbilityValuesFloat = (data: Ability, match: string, placeholder: string) => {
  const item = data.special_values.find((entry) => entry.name.toLowerCase() === placeholder.toLowerCase());
  if (item && item.values_float && item.values_float.length > 0) {
    return `<b>${item.values_float[0].toString()}</b>`;
  }
  return match; // If the placeholder is not found or has no valid value, return the original match.
}

export const getTransformedValue = (description: string , data: Ability) => {
  description = description.replaceAll("%%%", "%%");
  return description.replace(/%([a-zA-Z_]+)%/g, (match, placeholder) => findAbilityValuesFloat(data, match, placeholder));
}


export const calculateUniversalAttack = (hero: HeroDetail) => {
  let result: string;

  if(hero.primary_attr === 3) {
    const baseAttr = (hero.str_base + hero.agi_base + hero.int_base) * 0.7;
    result = `${Number.parseInt(`${baseAttr + hero.damage_min}`)}-${Number.parseInt(`${baseAttr + hero.damage_max}`)}`;
  } else {
    result = `${hero.damage_min}-${hero.damage_max}`;
  }

  return result;
}
