<script lang="ts">
  import {
    ROLES, FILTER, ROLE_LEVELS_WIDTH, getHeroAnimation,
    getHeroAttackType, getHeroThumbnail, calculateAttack
  } from "$lib";
  import type { HeroDetail } from "$types";
  import type { PageData } from "./$types";
  import Ability from "$components/Ability.svelte";


  export let data: PageData;
  let dataPromise: Promise<HeroDetail>;
  let readStory: boolean = false;
  let openAbility: boolean = false;

  const getDetail = async () => {
    const req = await fetch(`/api/characters/detail?id=${data.id}`)
    return await req.json();
  }

  dataPromise = getDetail();
</script>


<svelte:head>
  {#await dataPromise}
    <title>Dota 2 Clone</title>
  {:then hero}
    <title>Dota 2 Clone | {hero.name_loc}</title>
  {/await}
</svelte:head>

<div class="overflow-hidden">
  {#await dataPromise then hero}
    <div class="relative 2lg:px-[3.4rem] xl:px-[4.4rem] h-[70vh] xl:h-[80vh] overflow-hidden">
      <div class="absolute bottom-5 xl:bottom-7 left-0 lg:left-28 xl:right-32 flex flex-col w-full lg:w-auto xl:w-auto items-center xl:items-end z-[9999]">
        <div class="flex flex-col items-center">
          <div class="font-radiance font-semibold tracking-widest text-lg uppercase mb-1 select-none">
            Abilities
          </div>
          <div class="flex items-center">
            <div class="flex flex-col items-center relative mr-2 lg:mr-4 xl:mr-5">
              <img
                src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/talents.svg"
                alt="" aria-hidden draggable="false"
                class="w-[40px] lg:w-[50px] xl:w-[60px] transition duration-200 hover:scale-110 cursor-pointer"
                on:mouseenter={() => openAbility = true} on:mouseleave={() => openAbility = false}
              >
              <div
                class="absolute w-[300px] {openAbility? "block": "hidden"}"
                style="transform: translateY(-100%) translateX(-100px);
                      filter: drop-shadow(2px 2px 8px black);"
                aria-hidden
                on:mouseenter={() => openAbility = true} on:mouseleave={() => openAbility = false}
              >
                <div
                  class="w-[500px] bg-black min-h-0 flex flex-col text-left polygon-abilities"
                >
                  <div
                    class="flex flex-col gap-3 p-5 pb-10"
                    style="background: linear-gradient(150deg, #68727C, #14171A);"
                  >
                    <div class="font-reaver text-xl font-semibold tracking-widest uppercase text-center select-none">
                      Talent Tree
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex space-x-2 lg:space-x-3 xl:space-x-3">
              {#each hero.abilities as ability, index}
                <Ability data={ability} hero={hero} index={index}/>
              {/each}
            </div>
          </div>
        </div>
      </div>
      <div class="absolute flex flex-col space-y-3 pt-20 xl:pt-28 px-5 lg:px-14 xl:px-20 w-[400px] lg:w-[500px] xl:w-[665px] z-50 animate-to-top">
        <div class="flex flex-col">
          <div class="{hero.name_loc.split(" ").length > 1? "text-2xl xl:text-4xl": "text-4xl xl:text-6xl"} font-semibold font-reaver uppercase">
            {hero.name_loc}
          </div>
          <div class="font-radiance font-semibold text-base xl:text-lg tracking-widest text-[#a5e0f3] uppercase">
            {hero.npe_desc_loc}
          </div>
        </div>
        <div class="space-y-1 font-radiance">
          <div class="{readStory? "text-base xl:text-lg": "text-lg xl:text-2xl"} text-[#eee] font-medium overflow-y-auto max-h-[210px] {FILTER[hero.primary_attr].attr_name}">
            {@html readStory? hero.bio_loc : hero.hype_loc}
          </div>
          <div
            on:click={() => readStory = !readStory}
            aria-hidden
            class="underline text-xs lg:text-sm xl:text-base text-[#8a8a8a] hover:text-[#ddd] select-none cursor-pointer w-max"
          >
            {!readStory? "Read" : "Close"} Full History
          </div>
        </div>
        <div class="flex space-x-5 font-radiance uppercase tracking-widest font-semibold pt-2 select-none">
          <div>
            <div class="text-xs lg:text-sm xl:text-base text-[#959595]">Attack Type</div>
            <div class="flex justify-center space-x-2 pt-1">
              <img
                src={getHeroAttackType(hero.attack_capability)}
                alt="" draggable="false"
                class="w-[16px] lg:w-[20px] xl:w-[24px]"
              >
              <div class="text-xs lg:text-sm xl:text-base">
                {hero.attack_capability === 1 ? "melee": "ranged"}
              </div>
            </div>
          </div>
          <div>
            <div class="text-xs lg:text-sm xl:text-base text-[#959595]">Complexity</div>
            <div class="flex justify-center space-x-3 xl:space-x-4 pt-2">
              {#each Array(3) as _, index}
                {#if hero.complexity >= index + 1}
                  <div
                    class="w-3 xl:w-4 h-3 xl:h-4 border rotate-45 animate-complexity"
                    style="animation-delay: {(index + 1) * 40}0ms;"
                  />
                {:else}
                  <div class="w-3 xl:w-4 h-3 xl:h-4 border rotate-45"/>
                {/if}
              {/each}
            </div>
          </div>
          <div class="flex flex-col items-center">
            <div class="text-xs lg:text-sm xl:text-base text-[#959595]">Attribute</div>
            <div class="flex items-center space-x-1 xl:space-x-2 pt-1">
              <img
                src="{FILTER[hero.primary_attr].attr_hero}" alt="" draggable="false"
                class="w-[18px] lg:w-[20px] xl:w-[24px]"
              >
              <div class="text-xs lg:text-sm xl:text-base">
                {FILTER[hero.primary_attr].attr_name}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-0 right-[-5%] h-full w-[80%] hidden xl:flex justify-center animate-to-left">
        <video
          poster={getHeroAnimation(hero.name, "png")}
          autoplay loop preload="auto"
          class=" scale-75 lg:scale-100 xl:scale-100" draggable="false"
        >
          <track kind="captions">
          <source src={getHeroAnimation(hero.name)} type="video/webm">
          <img src={getHeroAnimation(hero.name, "png")} alt="" draggable="false">
        </video>
      </div>
    </div>
    <div class="flex flex-col xl:flex-row bg-stats justify-evenly px-5 space-y-5 xl:space-y-0 xl:px-0 py-5 border-y-2 border-t-[#282828] border-b-[#2c2e2e] shadow-stats z-[2]">
      <div class="flex flex-col items-center">
        <div class="flex">
          <div class="flex flex-col w-[150px] h-fit z-[3]">
            <img src={getHeroThumbnail(hero.name)} alt="" draggable="false">
            <div
              class="relative flex items-center font-radiance font-semibold"
              style="background: linear-gradient(to right, #286323, #7AF03C);"
            >
              <div
                class="flex justify-center items-center w-full text-sm xl:text-lg"
                style="text-shadow: 1px 1px 2px black;"
              >
                {hero.max_health}
              </div>
              <div class="absolute right-0 text-xs mx-2 text-[#286323]">
                +{hero.health_regen.toFixed(1)}
              </div>
            </div>
            <div
              class="relative flex items-center font-radiance font-semibold border-t border-gray-600"
              style="background: linear-gradient(to right, #1056DB, #73F5FE);"
            >
              <div
                class="flex justify-center items-center w-full text-sm xl:text-lg"
                style="text-shadow: 1px 1px 2px black;"
              >
                {hero.max_mana}
              </div>
              <div class="absolute right-0 text-xs mx-2 text-[#1056db]">
                +{hero.mana_regen.toFixed(1)}
              </div>
            </div>
          </div>
          <div class="px-5 xl:px-14 space-y-3">
            <div class="flex items-center space-x-2">
              <img
                src={FILTER[0].attr_hero} alt="" draggable="false"
                class="w-[25px] xl:w-[30px]"
              >
              <div class="font-reaver font-semibold xl:text-xl">
                {hero.str_base}
              </div>
              <div class="font-radiance text-xs xl:text-sm text-[#999]">+{hero.str_gain}</div>
            </div>
            <div class="flex items-center space-x-2">
              <img
                src={FILTER[1].attr_hero} alt="" draggable="false"
                class="w-[25px] xl:w-[30px]"
              >
              <div class="font-reaver font-semibold xl:text-xl">
                {hero.agi_base}
              </div>
              <div class="font-radiance text-xs xl:text-sm text-[#999]">+{hero.agi_gain}</div>
            </div>
            <div class="flex items-center space-x-2">
              <img
                src={FILTER[2].attr_hero} alt="" draggable="false"
                class="w-[25px] xl:w-[30px]"
              >
              <div class="font-reaver font-semibold xl:text-xl">
                {hero.int_base}
              </div>
              <div class="font-radiance text-xs xl:text-sm text-[#999]">+{hero.int_gain}</div>
            </div>
          </div>
        </div>
        <div class="pt-3 xl:pt-5 font-radiance xl:text-xl uppercase text-[#959595] tracking-widest select-none">
          Attributes
        </div>
      </div>
      <div class="max-w-full xl:w-[1px] max-h-[1px] xl:max-h-full bg-[#4f4f4f] rounded-t-lg rounded-b-lg">&nbsp;</div>
      <div class="flex flex-col items-center">
        <div class="flex flex-wrap justify-center max-w-md gap-4">
          {#each ROLES as role, index}
            <div class="flex flex-col w-[30%] h-[35px]">
              <div class="font-radiance font-semibold text-sm xl:text-base select-none">{role}</div>
              <div class="w-full bg-white max-h-[4.5px] xl:max-h-[6px] relative mt-1 flex-grow">
                <div class="absolute top-0 left-0 w-full h-full bg-[#4c4c4c]"/>
                <div
                  class="absolute top-0 left-0 animate-bar {ROLE_LEVELS_WIDTH[hero.role_levels[index]]} h-full bg-white"
                  style="box-shadow: 0px 0px 10px #427ed1, 0px 0px 10px #427ed1;"
                />
              </div>
            </div>
          {/each}
        </div>
        <div class="pt-3 xl:pt-5 font-radiance xl:text-xl uppercase text-[#959595] tracking-widest select-none">
          Roles
        </div>
      </div>
      <div class="max-w-full xl:w-[1px] max-h-[1px] xl:max-h-full bg-[#4f4f4f] rounded-t-lg rounded-b-lg">&nbsp;</div>
      <div class="flex flex-col items-center">
        <div class="flex justify-between font-radiance font-semibold w-full xl:w-[400px]">
          <div class="flex flex-col uppercase">
            <div class="text-[#969696] tracking-wider select-none text-sm xl:text-base">Attack</div>
            <div class="pt-2 space-y-2">
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_damage.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{calculateAttack(hero)}</div>
              </div>
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_attack_time.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.attack_rate}</div>
              </div>
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_attack_range.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.attack_range}</div>
              </div>
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_projectile_speed.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.projectile_speed}</div>
              </div>
            </div>
          </div>
          <div class="flex flex-col uppercase">
            <div class="text-[#969696] tracking-wider select-none text-sm xl:text-base">Defense</div>
            <div class="pt-2 space-y-2">
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_armor.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.armor.toFixed(1)}</div>
              </div>
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_magic_resist.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.magic_resistance}%</div>
              </div>
            </div>
          </div>
          <div class="flex flex-col uppercase">
            <div class="text-[#969696] tracking-wider select-none text-sm xl:text-base">Mobility</div>
            <div class="pt-2 space-y-2">
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_movement_speed.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.movement_speed}</div>
              </div>
            </div>
            <div class="pt-2 space-y-2">
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_turn_rate.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.turn_rate}</div>
              </div>
            </div>
            <div class="pt-2 space-y-2">
              <div class="flex space-x-2">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/stats/icon_vision.png"
                  alt="" draggable="false" class="w-[20px] h-[20px] xl:w-[24px] xl:h-[24px]"
                >
                <div class="font-light text-sm xl:text-base">{hero.sight_range_day}/{hero.sight_range_night}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pt-3 xl:pt-5 font-radiance xl:text-xl uppercase text-[#959595] tracking-widest select-none">
          Stats
        </div>
      </div>
    </div>
    <div>Test</div>
  {/await}
</div>


<style>
  :global(.Strength > b) {
   color: #EC3D06;
  }

  :global(.Agility > b) {
    color: #26E030;
  }

  :global(.Intelligence > b) {
    color: #02CADC;
  }

  :global(.Universal > b) {
    color: #cd74ff;;
  }

  :global(.polygon-abilities) {
    clip-path: polygon(0px 0px, 0px calc(100% - 20px), calc(50% - 20px) calc(100% - 20px), 50% 100%, calc(50% + 20px) calc(100% - 20px), 100% calc(100% - 20px), 100% 0px);
  }

  .bg-stats {
    background: linear-gradient(80deg, #252728 0%, #101415 100%);
  }

  .shadow-stats {
    box-shadow: 0px 0px 8px #000;
  }

  .animate-to-top {
    animation-name: fadeToTop;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  .animate-to-left {
    animation-name: fadeToLeft;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  .animate-bar {
    animation-name: fadeRolesBar;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  .animate-complexity {
    animation-name: fadeComplexity;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes fadeToTop {
    from {
      transform: translateY(1.25rem);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeToLeft {
    from {
      transform: translateX(10rem);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeRolesBar {
    from {
      width: 0px;
    }
  }

  @keyframes fadeComplexity {
    from {
      background: transparent;
      transform: rotate(45deg) scaleX(3) scaleY(3);
    }
    to {
      background: white;
      transform: rotate(45deg) scaleX(1) scaleY(1);
    }
  }
</style>
