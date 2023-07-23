<script lang="ts">
	import { FILTER } from "$lib";
	import type { HeroPreview } from "$types";
	import { onMount } from "svelte";
	import Diamond from "./Diamond.svelte";


  export let hero: HeroPreview;
  export let index: number;
  let loaded: boolean = false;

  const getHeroThumbnail = (name: string) => {
    return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${name.replace("npc_dota_hero_", "")}.png`;
  }


  onMount(() => {
    loaded = true;
  })

</script>


<a
  href="/characters/{hero.id}"
  class="group relative w-[150px] h-[80px] xl:w-[256px] xl:h-[144px] hover:z-50 transition {!loaded? `opacity-0 scale-125` : 'opacity-100'} duration-300 scale-100 hover:scale-125 rounded-sm bg-no-repeat bg-cover overflow-hidden"
  style="background-image: url('{getHeroThumbnail(hero.name)}');
        box-shadow: -7px 7px 10px black;
        --index: {index};"
  draggable="false"
>
  <div class="flex space-x-1 absolute top-0 right-0 xl:top-1 xl:right-2 scale-[.6] xl:scale-100">
    {#each Array(hero.complexity) as _, i}
      <div
        class="transition group-hover:translate-y-0 -translate-y-8 duration-300"
        style="transition-delay: {(i + 1) * 8}0ms;
              filter: drop-shadow(-1px 1px 1px black);"
      >
        <Diamond/>
      </div>
    {/each}
  </div>
  <div class="flex items-center absolute bottom-1 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 translate-y-8 opacity-0 scale-70 transition duration-300 px-1 xl:px-3 space-x-2">
    <img
      src="{FILTER[hero.primary_attr].attr_hero}" alt=""
      class="w-[25px] xl:w-[40px]"
    >
    <div class="text-xs md:text-sm xl:text-xl uppercase select-none font-reaver font-semibold">
      {hero.name_english_loc}
    </div>
  </div>
  <div
    class="absolute bottom-0 w-[256px] h-[70px] -z-50 transition duration-300 group-hover:opacity-100 opacity-0"
    style="background: linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, .7) 60%, rgba(0, 0, 0, .9) 80%);"
  />
</a>


<style>
  .transition-delay {
    transition-delay: calc((var(--index) + 1) * 80ms);
  }
</style>
