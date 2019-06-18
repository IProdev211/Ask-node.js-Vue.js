<template>
  <section>
    <div class="banner-box d-block text-center">
      <div class="banner-card">
        <router-link to="/privateclasses">
          <i class="fas bell fa-bell pl-2"></i>
          آیندت رو بساز! تخفیف 30٪ ویژه شروع تابستان
        </router-link>
        <!-- <i class="fas fa-long-arrow-alt-left pr-3"></i> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.banner-box {
  font-family: IranSansBold;
  padding: 0.65em 0;
  background-color: #ff416d;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235c942c' fill-opacity='0.11' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  // background-color: #ff416d;
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='304' height='304' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23e63a62' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E");
  //   background: linear-gradient(-90deg, #ff416d, #ff4b2b),
  //     url(/img/frontend/london-seemless-bg.svg);
}
.banner-card {
  justify-content: center;
  align-items: center;
  // background: #fff;
  padding: 7px 10px;
  margin: 0 33%;
  // -webkit-border-radius: 3px;
  // border-radius: 3px;
  position: relative;
  font-family: IranSansBold;
  font-size: 1.2em;

  @media (max-width: 760px) {
    margin: 0 8%;
    font-size: 0.75rem;
  }

  a {
    color: #fff !important;
  }
}

.banner-card a:hover {
  // color: rgb(50, 156, 68) !important;
  text-decoration: underline;
}

.bell {
  font-size: 1.2em;
  -webkit-transform-origin: 70% 0;
  transform-origin: 70% 0;
  -webkit-animation: swinging 2.5s ease-in-out forwards infinite;
  animation: swinging 1.5s ease-in-out forwards infinite;
}

@-webkit-keyframes swinging {
  0% {
    -webkit-transform: rotate(10deg);
  }
  50% {
    -webkit-transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(10deg);
  }
}

@keyframes swinging {
  0% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
