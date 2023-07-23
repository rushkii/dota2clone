<div class="absolute px-5 lg:px-6 xl:px-7 py-4 xl:py-5">
  <div>
    <a href="/" class="transition-opacity cursor-pointer relative w-max">
      <img
        id="glow-logo"
        src="/images/dota2_logo.png" alt="logo"
        draggable="false"
        class="w-[150px] lg:w-[180px] xl:w-[200px]"
      >
    </a>
  </div>
</div>


<style>
  #glow-logo {
    opacity: .8;
    filter: brightness(50%) sepia(100) saturate(100) hue-rotate(25deg) drop-shadow(0 0 0.6rem rgba(202, 70, 0, .8));
  }

  #glow-logo:hover {
    opacity: 1;
    filter: brightness(50%) sepia(100) saturate(100) hue-rotate(25deg) drop-shadow(0 0 0.6rem rgba(202, 70, 0, 1));
  }
</style>
