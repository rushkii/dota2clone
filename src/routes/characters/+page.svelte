<script lang="ts">
  import HeroBox from "$components/HeroBox.svelte";
	import { ALPHABET, FILTER } from "$lib";
	import type { HeroPreview } from "$types";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;

  let search: string = "";
  let filtAttr: number | null = null;
  let filtComp: number | null = null;
  let selectAll: boolean = false;

  // Sort heroes data by ascending alphabetically.
  let heroes = data.heroes.sort((prev: HeroPreview, next: HeroPreview) => {
    // https://stackoverflow.com/a/19259270.

    // Lower case these hero names.
    let a = prev.name_english_loc.toLowerCase();
    let b = next.name_english_loc.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
  })

  // Keyboard keypress event.
  const onKeyDown = (e: KeyboardEvent) => {
    // Check if pressed key containing alphabet and only accept shift key.
    if(
      (ALPHABET.includes(e.key.toLowerCase()) && e.shiftKey) ||
      (ALPHABET.includes(e.key.toLowerCase()) && !(e.ctrlKey || e.altKey))
    ) {
      // If condition are met, then append string the pressed key.
      search += e.key.toLowerCase();
    }

    //  Check if CTRL + A or select all met this condition.
    if(e.key === "a" && e.ctrlKey) {
      selectAll = true;
    }

    // Remove a character one-by-one from searched hero.
    if(e.key === "Backspace") {
      search = search.substring(0, search.length - 1);
    }

    // Select all then delete searched hero, just like CTRL + A -> Backspace.
    if(e.key === "Backspace" && selectAll) {
      search = "";
      selectAll = false;
    }
  }

  const selectFilterAttr = (index: number) => {
    filtAttr = index === filtAttr ? null : index;
  }

  const selectFilterComp = (index: number) => {
    filtComp = index === filtComp ? null : index;
  }

  let filterHeroes: HeroPreview[];
  $: if(filtAttr !== null || filtComp !== null) {
    filterHeroes = heroes.filter(hero =>
      (hero.primary_attr === filtAttr) ||
      (hero.complexity === (filtComp !== null ? filtComp + 1 : filtComp))
    );
  } else {
    filterHeroes = heroes;
  }

</script>

<!-- Display searched hero by name. WIP -->
<!-- {#if search !== ""}
  <div class="fixed min-h-screen w-full justify-center items-center z-[100] text-5xl font-semibold">
    {search}
  </div>
{/if} -->

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
              src="{filt.attr}" alt="" width="40" height="40" draggable="false"
              class="cursor-pointer {!(filtAttr === index)? 'color-transform' : 'shadow-transform'}"
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
              alt="" width="40" height="40" draggable="false"
              class="cursor-pointer {!(filtComp !== null ? index <= filtComp : false)? 'color-transform' : 'shadow-transform'}"
            >
          </button>
        {/each}
      </div>
    </div>

  </div>

  <!-- Display heroes with flex wrap.  -->
  <div class="flex flex-wrap justify-center items-center gap-4" data-sveltekit-preload-data="off"> <!-- grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 -->
    {#each filterHeroes as hero, index (hero.name)}
      <HeroBox hero={hero} index={index}/>
    {/each}
  </div>

</div>

<!-- Keyboard keypress event. -->
<svelte:window on:keydown|preventDefault={onKeyDown} />


<style>
  .border-gradient {
    @apply border;
    border-style: solid;
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
