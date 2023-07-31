<script lang="ts">
  import HeroBox from "$components/HeroBox.svelte";
  import { FILTER } from "$lib";
  import type { HeroPreview } from "$types";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let search: string = "";
  let filtAttr: number | null = null;
  let filtComp: number | null = null;

  // Sort heroes data by ascending alphabetically.
  let heroes = data.heroes.sort((prev: HeroPreview, next: HeroPreview) => {
    // https://stackoverflow.com/a/19259270.

    // Lower case these hero names.
    let a = prev.name_english_loc.toLowerCase();
    let b = next.name_english_loc.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
  })

  const selectFilterAttr = (index: number) => {
    filtAttr = index === filtAttr ? null : index;
  }

  const selectFilterComp = (index: number) => {
    filtComp = index === filtComp ? null : index;
  }

  $: filteredHeroes = heroes.filter(hero =>
    (filtAttr === null || hero.primary_attr === filtAttr) &&
    (filtComp === null || hero.complexity === filtComp + 1) &&
    (search === "" || hero.name_english_loc.toLowerCase().includes(search))
  );
</script>


<div class="px-5 lg:px-16 xl:px-24 py-20 xl:py-24 space-y-3 lg:space-y-4 xl:space-y-5 flex-col justify-center items-center">
  <div class="xl:space-y-3 text-center select-none">
    <div class="font-reaver text-2xl xl:text-5xl font-bold uppercase tracking-widest">Choose Your Hero</div>
    <div class="font-radiance text-sm lg:text-lg xl:text-2xl font-medium max-w-5xl mx-auto text-gray-200">
      From magical tacticians to fierce brutes and cunning rogues,
      Dota 2's hero pool is massive and limitlessly diverse.
      Unleash incredible abilities and devastating ultimates on your way to victory.
    </div>
  </div>

  <!-- Filter UI wrapper. -->
  <div class="flex flex-col space-y-3 2lg:flex-row 2lg:space-y-0 justify-between items-center select-none border-gradient p-4 xl:p-5 uppercase font-radiance tracking-wider font-medium bg-gradient-to-r from-[#00000086] from-[30%] to-[#0000004e]">
    <div class="text-xl">Filter Heroes By</div>

    <!-- Filter attribute UI. -->
    <div class="flex space-x-2 items-center text-[#808fa6] {filtAttr !== null? 'text-shadow text-[#cee0ff]' : ''}">
      <div>Attribute</div>
      <div class="flex space-x-1">
        {#each FILTER as filt, index}
          <button on:click={() => selectFilterAttr(index)}>
            <img
              src="{filt.attr}" alt="" draggable="false"
              class="cursor-pointer w-[35px] xl:w-[40px] {!(filtAttr === index)? 'color-transform' : 'shadow-transform'}"
            >
          </button>
        {/each}
      </div>
    </div>

    <!-- Filter complexity UI. -->
    <div class="flex space-x-2 items-center text-[#96a0ae] {filtComp !== null? 'text-shadow text-[#e9ecf2]' : ''}">
      <div>Complexity</div>
      <div class="flex space-x-1">
        {#each Array(3) as _, index}
          <button on:click={() => {selectFilterComp(index)}}>
            <img
              src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-diamond.png"
              alt="" draggable="false"
              class="cursor-pointer w-[35px] xl:w-[40px] {!(filtComp !== null ? index <= filtComp : false)? 'color-transform' : 'shadow-transform'}"
            >
          </button>
        {/each}
      </div>
    </div>

    <div class="bg-[#00000054] backdrop-blur-md dark:backdrop-blur-none flex border-gradient transition ease-in-out duration-150 h-[40px]">
      <input type="text" bind:value={search} placeholder="Search hero"
        class="bg-transparent outline-none border-none w-[12em] text-center px-3 placeholder:text-sm placeholder:text-[#96a0ae] font-semibold placeholder:font-light uppercase"
      >
    </div>

  </div>


  <!-- Display heroes with flex wrap.  -->
  <div class="flex flex-wrap justify-center items-center gap-4" data-sveltekit-preload-data="off"> <!-- grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -->
    {#each filteredHeroes as hero (hero.name)}
      <HeroBox hero={hero}/>
    {/each}
  </div>

</div>


<svelte:head>
  <title>Dota 2 Clone | Heroes</title>
</svelte:head>


<style>
  .border-gradient {
    border: 1px solid;
    border-image:
    linear-gradient(
      193deg,
      rgb(170, 179, 199),
      rgba(0, 0, 0, 0)
    ) 1;
  }

  .text-shadow {
    text-shadow: 0 0 10px #60baff;
  }

  .shadow-transform {
    filter: drop-shadow(0 0 3px #60baff);
  }

  .color-transform {
    filter: brightness(0.5) saturate(0);
  }
</style>
