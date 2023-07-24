import { json } from '@sveltejs/kit';


const getCharacters = async () => {
  const req = await fetch("https://www.dota2.com/datafeed/herolist?language=english");
  const res = await req.json()
  return res.result.data.heroes;
}


export async function GET() {
	return json(await getCharacters());
}
