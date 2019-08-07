<template>
  <section class="container">
    <div class="row d-flex justify-content-between align-items-center pb-3">
      <p class="quiz-title">زمان آینده استمراری</p>

      <div class="timer">
        <!-- COUNTDOWN TIMER GOES HERE -->
        <h3>01:32</h3>
      </div>
    </div>

    <!-- <div>
      <h3 class="question-number">
        سوال
        <span>1</span> از
        <span>6</span>
      </h3>
    </div>-->

    <div class="progress mt-auto mb-4">
      <!-- PLEASE USE THIS PROGRESS BAR - https://demos.creative-tim.com/vue-black-dashboard-pro/documentation/components/progress.html  -->
      <div
        class="progress-bar"
        role="progressbar"
        style="width: 10%;"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
      >10%</div>
    </div>

    <!-- <quiz-navigation /> -->
  </section>
</template>

<script>
import QuizNavigation from './QuizNavigation.vue';

export default {
  components: { QuizNavigation }
};
</script>

<style lang="scss" scoped>
section {
  padding: 15px;
  border-radius: 25px;
  .quiz-title {
    font-family: IranSansBold;
    font-size: 1.6em;
    color: rgba(0, 0, 0, 0.514);
  }

  .timer h3 {
    font-size: 3em;
    color: rgb(44, 44, 44);
    font-family: IranSansBold;
    padding: 0;
    margin: 0;
  }
}

.question-number {
  color: rgb(0, 0, 0);
  text-align: right;
  font-size: 1.5em;

  span {
    color: rgb(0, 0, 0);
    font-family: IranSansBold;
    font-size: 1.3em;
    padding: 0 5px;
  }
}

.progress-bar {
  background-color: #44ee10;
}

@media (max-width: 678px) {
  .timer {
    font-size: 0.9em;
    width: 100%;
    text-align: right;
  }

  .quiz-title {
    font-size: 1.4em !important;
  }

  .question-number {
    font-size: 1.15em;
  }

  .custom-button {
    font-size: 0.9em;
    font-weight: 0;
    padding: 10px 10px;
  }
}
</style>
