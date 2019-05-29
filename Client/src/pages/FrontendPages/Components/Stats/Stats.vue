<template>
  <div class="container-fluid">
    <div class="text-center text-white stat-cards">
      <div class="row">
        <div class="col-4">
          <div class="card stat-box-1">
            <h2 class="headerStyling">{{ episodes }}</h2>
            <p>درس</p>
          </div>
        </div>

        <div class="col-4">
          <div class="card stat-box-2">
            <h2 class="headerStyling">{{ hours }}</h2>
            <p>ساعت</p>
          </div>
        </div>

        <div class="col-4">
          <div class="card stat-box-3">
            <h2 class="headerStyling">{{ total }}</h2>
            <p>دوره</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.stat-cards {
  padding: 0 33%;
}

@media (max-width: 800px) {
  .stat-cards {
    padding: 0 01%;
  }
}
.stat-box-1 {
  background-image: linear-gradient(180deg, #21c8f6, #637bff);
  border-radius: 20px;
}

.stat-box-2 {
  background-image: linear-gradient(180deg, #f44881, #ec454f);
  border-radius: 20px;
}

.stat-box-3 {
  background-image: linear-gradient(180deg, #6edcc4, #1aab8b);
  border-radius: 20px;
}
</style>

