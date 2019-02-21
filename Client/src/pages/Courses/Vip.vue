<template>
  <div class="widget-vip card px-2">
    <div class="row">
      <div class="col-md-4">
        <p class="px-4 my-4 vip-title text-black">
          <i class="fas fa-unlock px-3"></i>VIP Access
        </p>
      </div>

      <div class="col-md-5 my-auto">
        <p class="px-4 my-auto vip-desc text-black">
          <span class="font-weight-bold">1 Month</span> full access to
          <span class="font-weight-bold">all</span> VIP content.
        </p>
      </div>

      <div class="col-md-3 my-auto text-right px-3">
        <router-link to="buyVIP">
          <base-button class="px-2 mb-2" type="danger">
            <i class="tim-icons icon-money-coins pr-2"></i> 29,000 Tomans
          </base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-vip {
  background-image: linear-gradient(90deg, #bf953f, #fcf6ba);
  border-radius: 15px;
}

.text-black {
  color: black;
}

.vip-title {
  font-size: 2rem;
  font-weight: 600;
}

.vip-desc {
  font-size: 1.1rem;
}
</style>
