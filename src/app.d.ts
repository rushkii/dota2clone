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

export interface HeroPreview {
  id: number
  name: string
  name_loc: string
  name_english_loc: string
  primary_attr: number
  complexity: number
}

export { HeroPreview };
