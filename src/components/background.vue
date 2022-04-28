<template>
  <div class="bgc">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "BackGround",
};
</script>

<style lang="less" scoped>
.bgc {
  opacity: 0.85;
  position: relative;
  background-color: #93afe4;
  background-image: radial-gradient(
      closest-side,
      rgb(96, 212, 187, 1),
      rgba(235, 105, 78, 0)
    ),
    radial-gradient(closest-side, rgb(11, 104, 243), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgb(131, 205, 254), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgb(114, 84, 197), rgba(170, 142, 245, 0)),
    radial-gradient(
      closest-side,
      rgba(211, 147, 248, 1),
      rgba(248, 192, 147, 0)
    );
  background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
    110vmax 110vmax, 90vmax 90vmax;
  background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
    -30vmax -10vmax, 50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 10s movement linear infinite;
}

// .bgc::after {
//   content: "";
//   display: block;
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 0;
//   left: 0;
//   backdrop-filter: blur(10px);
//   -webkit-backdrop-filter: blur(10px);
// }

span {
  display: flex;
  min-height: 100vh;
}

@keyframes movement {
  0%,
  100% {
    background-size: 130vmax 130vmax, 80vmax 80vmax, 90vmax 90vmax,
      110vmax 110vmax, 90vmax 90vmax;
    background-position: -80vmax -80vmax, 60vmax -30vmax, 10vmax 10vmax,
      -30vmax -10vmax, 50vmax 50vmax;
  }
  25% {
    background-size: 100vmax 100vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 60vmax 60vmax;
    background-position: -60vmax -90vmax, 50vmax -40vmax, 0vmax -20vmax,
      -40vmax -20vmax, 40vmax 60vmax;
  }
  50% {
    background-size: 80vmax 80vmax, 110vmax 110vmax, 80vmax 80vmax,
      60vmax 60vmax, 80vmax 80vmax;
    background-position: -50vmax -70vmax, 40vmax -30vmax, 10vmax 0vmax,
      20vmax 10vmax, 30vmax 70vmax;
  }
  75% {
    background-size: 90vmax 90vmax, 90vmax 90vmax, 100vmax 100vmax,
      90vmax 90vmax, 70vmax 70vmax;
    background-position: -50vmax -40vmax, 50vmax -30vmax, 20vmax 0vmax,
      -10vmax 10vmax, 40vmax 60vmax;
  }
}
</style>