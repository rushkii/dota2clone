<script lang="ts">
  import type { Ability, HeroDetail } from "$types";
	import { FILTER, getHeroAbility, getTransformedValue } from "$lib";
	import { onMount } from "svelte";


  export let data: Ability;
  export let hero: HeroDetail;
  export let index: number;

  let openAbility: boolean = false;
  let abilityVideo: HTMLVideoElement;

  const playVideo = () => {
    if(abilityVideo.paused) {
      abilityVideo.play();
    }
  }

  const pauseVideo = () => {
    if(!abilityVideo.paused) {
      abilityVideo.pause();
    }
  }

  onMount(() => {
    if(!data.ability_is_granted_by_scepter && !data.ability_is_granted_by_shard) {
      // We don't need to assign this value since it doesn't meet the requirement.
      abilityVideo = document.getElementsByClassName("ability-video")[index] as HTMLVideoElement;
    }
  })

</script>


<div class="flex flex-col items-center relative {!data.ability_is_granted_by_scepter && !data.ability_is_granted_by_shard? "block" : "hidden"}">
  <img
    src={getHeroAbility(hero.name_loc, data.name, false, "png")} alt=""
    class="w-[45px] lg:w-[60px] xl:w-[75px] transition duration-200 hover:scale-110 cursor-pointer"
    style="box-shadow: 0px 0px 20px #000, 0px 0px 20px #000;"
    aria-hidden draggable="false"
    on:mouseenter={() => {openAbility = true; playVideo()}}
    on:mouseleave={() => {openAbility = false; pauseVideo()}}
  >
  <div
    class="absolute w-[300px] {openAbility? "block": "hidden"}"
    style="transform: translateY(-100%);
          filter: drop-shadow(2px 2px 8px black);"
    aria-hidden
    on:mouseenter={() => {openAbility = true; playVideo()}}
    on:mouseleave={() => {openAbility = false; pauseVideo()}}
  >
    <div
      class="w-[300px] bg-black min-h-0 flex flex-col text-left polygon-abilities"
    >
      <div
        class="w-full h-[169px]"
        style="background: linear-gradient(150deg, #68727C, #14171A);"
      >
        <video
          loop muted preload="none" draggable="false" class="ability-video w-full h-full"
          poster={getHeroAbility(hero.name, data.name, true, "jpg")}
        >
          <track kind="captions"/>
          <source type="video/webm" src={getHeroAbility(hero.name, data.name, true, "webm")}>
          <source type="video/mp4" src={getHeroAbility(hero.name, data.name, true, "mp4")}>
        </video>
      </div>
      <div
        class="w-[300px] py-3 px-4 pb-9"
        style="background: linear-gradient(150deg, #68727C, #14171A);"
      >
        <div class="font-reaver text-xl font-bold tracking-[2px] uppercase">
          {data.name_loc}
        </div>
        <div class="font-radiance mt-1 text-[#ddd] font-semibold overflow-y-auto max-h-[150px] {FILTER[hero.primary_attr].attr_name}">
          {@html getTransformedValue(data.desc_loc, data)}
        </div>
      </div>
    </div>
  </div>
</div>
