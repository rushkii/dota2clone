import { json, type RequestHandler } from '@sveltejs/kit';


const getCharacterDetail = async (id: string) => {
  const req = await fetch(`https://www.dota2.com/datafeed/herodata?language=english&hero_id=${id}`);
  const res = await req.json()
  return res.result.data.heroes[0];
}

export const GET = ( async ({ url }) => {
	return json(await getCharacterDetail(url.searchParams.get("id") ?? "0"));
}) satisfies RequestHandler;
