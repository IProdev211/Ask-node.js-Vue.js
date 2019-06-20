<template>
  <div class="bg">
    <div class="container text-center">
      <div class="text-section">
        <p class="header text-white">به زودی برمیگردیم</p>
        <p class="sub-header pt-2 text-white">سایت در حال تعمیر است</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: left;
  min-height: 85vh;
  position: relative;
}
.text-section {
  padding-top: 15vh;
  padding-bottom: 25vh;
}
.header {
  font-size: 3.5rem;
  font-family: IranSansDNBold;
}

.sub-header {
  font-size: 1.5rem;
}
</style>
