<script lang="ts">
  import "../app.css";
	import Navigations from "$components/Navigations.svelte";
	import { onMount } from "svelte";

  const playlist = [
    "/audio/lobby_music_orchestra.mp3",
    "/audio/lobby_music_flutte.webm",
    "/audio/lobby_music_reborn.mp3"
  ];

  let songIndex = 0;
  let song: HTMLAudioElement | null = null;

  const next = () => {
		if (songIndex === playlist.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }
    play();
	}

  const play = () => {
    if(song?.paused) {
      song?.play();
      console.log("Playing:", playlist[songIndex]);
    }
  }

  onMount(() => {
    const audio = document.getElementById("theme-song") as HTMLSourceElement;
    audio.addEventListener("ended", next, false);
  })
</script>


<div
  id="root" class="relative antialiased min-h-screen w-full bg-no-repeat">
  <Navigations/>
  <main class="flex-col justify-center items-center"> <!--px-24 py-10-->
    <slot/>
  </main>
  <audio loop autoplay>
    <source id="theme-song" src="{playlist[songIndex]}">
  </audio>
</div>

<style>
  #root {
    background: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg');
    background-size: cover;
    background-attachment: fixed;
  }
</style>
