// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

interface HeroPreview {
  id: number
  name: string
  name_loc: string
  name_english_loc: string
  primary_attr: number
  complexity: number
}

interface HeroDetail {
  id: number
  name: string
  order_id: number
  name_loc: string
  bio_loc: string
  hype_loc: string
  npe_desc_loc: string
  str_base: number
  str_gain: number
  agi_base: number
  agi_gain: number
  int_base: number
  int_gain: number
  primary_attr: number
  complexity: number
  attack_capability: number
  role_levels: number[]
  damage_min: number
  damage_max: number
  attack_rate: number
  attack_range: number
  projectile_speed: number
  armor: number
  magic_resistance: number
  movement_speed: number
  turn_rate: number
  sight_range_day: number
  sight_range_night: number
  max_health: number
  health_regen: number
  max_mana: number
  mana_regen: number
  abilities: Ability[]
  talents: Talent[]
}

interface Ability {
  id: number
  name: string
  name_loc: string
  desc_loc: string
  lore_loc: string
  notes_loc: string[]
  shard_loc: string
  scepter_loc: string
  type: number
  behavior: string
  target_team: number
  target_type: number
  flags: number
  damage: number
  immunity: number
  dispellable: number
  max_level: number
  cast_ranges: number[]
  cast_points: number[]
  channel_times: number[]
  cooldowns: number[]
  durations: number[]
  damages: number[]
  mana_costs: number[]
  gold_costs: any[]
  health_costs: any[]
  special_values: SpecialValue[]
  is_item: boolean
  ability_has_scepter: boolean
  ability_has_shard: boolean
  ability_is_granted_by_scepter: boolean
  ability_is_granted_by_shard: boolean
  item_cost: number
  item_initial_charges: number
  item_neutral_tier: number
  item_stock_max: number
  item_stock_time: number
  item_quality: number
}

interface SpecialValue {
  name: string
  values_float: number[]
  is_percentage: boolean
  heading_loc: string
  bonuses: Bonus[]
  values_shard: number[]
  values_scepter: number[]
}

interface Bonus {
  name: string
  value: number
  operation: number
}

interface Talent {
  id: number
  name: string
  name_loc: string
  desc_loc: string
  lore_loc: string
  notes_loc: any[]
  shard_loc: string
  scepter_loc: string
  type: number
  behavior: string
  target_team: number
  target_type: number
  flags: number
  damage: number
  immunity: number
  dispellable: number
  max_level: number
  cast_ranges: number[]
  cast_points: number[]
  channel_times: number[]
  cooldowns: number[]
  durations: number[]
  damages: number[]
  mana_costs: number[]
  gold_costs: any[]
  health_costs: any[]
  special_values: SpecialValue[]
  is_item: boolean
  ability_has_scepter: boolean
  ability_has_shard: boolean
  ability_is_granted_by_scepter: boolean
  ability_is_granted_by_shard: boolean
  item_cost: number
  item_initial_charges: number
  item_neutral_tier: number
  item_stock_max: number
  item_stock_time: number
  item_quality: number
}

export { HeroPreview, HeroDetail };
