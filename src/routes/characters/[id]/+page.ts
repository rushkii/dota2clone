import type { PageLoad } from "./$types";


export const load = ( async ({ params, fetch }) => {
  return { id: params.id }
}) satisfies PageLoad;
