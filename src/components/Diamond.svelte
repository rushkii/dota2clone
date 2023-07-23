<div class="diamond group-hover:hover"/>

<style>
  .diamond {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: white;
    position: relative;
    top: -9.5px;
  }

  .diamond.group-hover\:hover {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: white;
    position: relative;
    top: -10px;
  }

  .diamond:after {
    content: '';
    position: absolute;
    left: -10px;
    top: 9.5px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: white;
  }

  .diamond:after.group-hover\:hover {
    content: '';
    position: absolute;
    left: -10px;
    top: 10px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: white;
  }
</style>
