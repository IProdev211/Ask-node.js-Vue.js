<template>
  <div class="container">
    <h1 class="text-right">امتحان های شما</h1>

    <!-- New Quizzes -->
    <div class="row pt-5">
      <div class="col-lg-4 col-md-6 col-sm-12">
        <quiz-card />
      </div>

      <div class="col-lg-4 col-md-6 col-sm-12">
        <quiz-card />
      </div>

      <div class="col-lg-4 col-md-6 col-sm-12">
        <quiz-card />
      </div>
    </div>
  </div>
</template>

<script>
import QuizCard from './QuizCard.vue';

export default {
  components: {
    QuizCard
  }
};
</script>

<style lang="scss" scoped>
h1,
h2 {
  font-family: IranSansBold;
  color: #667eea !important;
}
</style>

