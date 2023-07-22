<div class="absolute px-5 lg:px-6 xl:px-7 py-4 xl:py-5">
  <div>
    <div class="transition-opacity cursor-pointer relative w-max">
      <img
        id="glow-logo"
        src="/images/dota2_logo.png" alt="logo"
        draggable="false"
        class="w-[150px] lg:w-[180px] xl:w-[200px]"
      >
    </div>
  </div>
</div>


<style>
  #glow-logo {
    animation: neon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    opacity: .8;
    filter: brightness(50%) sepia(100) saturate(100) hue-rotate(25deg) drop-shadow(0 0 0.6rem rgba(202, 70, 0, .8));
  }

  #glow-logo:hover {
    opacity: 1;
    filter: brightness(50%) sepia(100) saturate(100) hue-rotate(25deg) drop-shadow(0 0 0.6rem rgba(202, 70, 0, 1));
  }

  @keyframes neon-pulse {
    50% {
      opacity: 1;
      filter: brightness(50%) sepia(100) saturate(100) hue-rotate(25deg) drop-shadow(0 0 0.6rem rgba(202, 70, 0, 1));
    }
  }
</style>
