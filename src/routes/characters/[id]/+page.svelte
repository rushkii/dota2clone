<script lang="ts">
	import type { HeroDetail } from "$types";
	import type { PageData } from "./$types";


  export let data: PageData;
  let dataPromise: Promise<HeroDetail>;

  const getDetail = async () => {
    const req = await fetch(`/api/characters/detail?id=${data.id}`)
    return await req.json();
  }

  dataPromise = getDetail();
</script>


<div class="px-24 pt-20 ">
  {#await dataPromise}
    Waiting...
  {:then data}
    {data.name_loc}
    {data.attack_range}
  {/await}
</div>
