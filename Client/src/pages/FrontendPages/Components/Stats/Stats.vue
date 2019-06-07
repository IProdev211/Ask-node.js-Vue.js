<template>
  <div class="container">
    <div class="stat-cards text-center">
      <div class="row">
        <div class="col-4">
          <div class="stitched3">
            <h2 class="headerStyling3">{{ total }}</h2>
            <p class="subheader">عدد دوره آموزشی</p>
          </div>
        </div>

        <div class="col-4">
          <div class="stitched1">
            <h2 class="headerStyling1">{{ episodes }}</h2>
            <p class="subheader">عدد درس آموزشی</p>
          </div>
        </div>

        <div class="col-4">
          <div class="stitched2">
            <h2 class="headerStyling2">{{ hours }}</h2>
            <p class="subheader">ساعت آموزش کاربردی</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['total', 'hours', 'episodes'],
  data: function() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.stitched1 {
  padding: 15px;
  margin: 10px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling1 {
    color: #f5b435;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.8rem;
  }
}

.stitched2 {
  padding: 15px;
  margin: 10px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling2 {
    color: #21c8f6;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.8rem;
  }
}

.stitched3 {
  padding: 15px;
  margin: 10px;
  background: rgb(30, 37, 59);
  color: #fff;
  font-size: 21px;
  font-weight: bold;
  line-height: 1.3em;
  border: 2px dashed rgb(117, 117, 117);
  border-radius: 10px;
  box-shadow: 0 0 0 4px rgb(30, 37, 59), 2px 1px 6px 4px rgba(10, 10, 0, 0.5);
  text-shadow: -1px -1px rgb(30, 37, 59);
  font-weight: normal;

  .headerStyling3 {
    color: #6edcc4;
    // font-weight: 600;
    margin: 0;
    padding: 0;
  }
  .subheader {
    font-size: 0.8rem;
  }
}

.stat-cards {
  padding: 0 17%;
}

@media (max-width: 800px) {
  .stat-cards {
    padding: 0 01%;
  }
}
</style>

