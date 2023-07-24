import type { HeroPreview } from "$types";
import type { PageServerLoad } from "./$types";

export const load = (({ fetch }) => {
  const getCharacters = async (): Promise<HeroPreview[]> => {
    const req = await fetch("/api/characters");
    return await req.json()
  }

  return { heroes: getCharacters() };
}) satisfies PageServerLoad;
