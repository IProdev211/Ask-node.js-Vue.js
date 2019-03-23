<template>
  <div class="widget-vip card px-2">
    <div class="row">
      <div class="col-md-4">
        <p class="px-4 my-4 vip-title text-black">
          VIP Access<i class="fas fa-unlock px-3"></i>
        </p>
      </div>

      <div class="col-md-5 my-auto">
        <p class="px-4 my-auto vip-desc text-center py-3 text-black">
          <span class="font-weight-bold">۱ ماه</span> دسترسی کامل به
          <span class="font-weight-bold">تمام</span> محتوای عضویت ویژه.
        </p>
      </div>
      <div class="col-md-3 my-auto text-center px-3">
        <router-link to="buyVIP">
          <base-button class="mb-2" type="danger">
            <i class="tim-icons icon-money-coins px-2"></i> ۲۹،۰۰۰ تومان‎ 
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
  font-size: 1rem;
}
</style>
