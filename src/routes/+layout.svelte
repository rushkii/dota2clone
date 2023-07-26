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
      song.src = playlist[songIndex];
      song?.play();
    }
  }

  onMount(() => {
    song = new Audio();
    song.addEventListener("ended", next, false);
    play();
  })
</script>


<div
  id="root" class="relative antialiased min-h-screen w-full bg-no-repeat">
  <Navigations/>
  <main class="flex-col justify-center items-center"> <!--px-24 py-10-->
    <slot/>
  </main>
</div>

<style>
  #root {
    background: url('https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg');
    background-size: cover;
    background-attachment: fixed;
  }
</style>
