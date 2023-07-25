<script lang="ts">
  import { FILTER, getHeroThumbnail } from "$lib";
  import type { HeroPreview } from "$types";
  import { onMount } from "svelte";


  export let hero: HeroPreview;
  let loaded: boolean = false;

  onMount(() => {
    loaded = true;
  })

</script>


<a
  href="/characters/{hero.id}"
  class="group relative w-[150px] h-[80px] xl:w-[256px] xl:h-[144px] hover:z-50 transition {!loaded? `opacity-0 scale-125` : 'opacity-100'} duration-300 scale-100 hover:scale-125 rounded-sm bg-no-repeat bg-cover overflow-hidden"
  style="background-image: url('{getHeroThumbnail(hero.name)}');
        box-shadow: -7px 7px 10px black;"
  draggable="false"
>
  <div class="flex space-x-1 xl:space-x-2 absolute top-1 right-2 xl:top-2 xl:right-2">
    {#each Array(3) as _, i}
      <div
        class="transition group-hover:translate-y-0 -translate-y-8 duration-300"
        style="transition-delay: {(i + 1) * 8}0ms;
              filter: drop-shadow(-1px 1px 1px black);"
      >
        <div class="w-2 h-2 xl:w-3 xl:h-3 border rotate-45 {hero.complexity >= i + 1 ? "bg-white" : ""}"/>
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
