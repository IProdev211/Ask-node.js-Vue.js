<template>
  <div class="container-fluid">
    <h1 class="text-right mt-2 mb-5">امتحان های شما</h1>

    <!-- New Quizzes -->
    <div class="row pt-5">
      <div class="col-12">
        <free-quiz-card />
      </div>

      <div class="col-12">
        <free-quiz-card />
      </div>

      <div class="col-12">
        <free-quiz-card />
      </div>

      <div class="col-12">
        <paid-quiz-card />
      </div>
    </div>
  </div>
</template>

<script>
import FreeQuizCard from './QuizComponents/FreeQuizCard.vue';
import PaidQuizCard from './QuizComponents/PaidQuizCard.vue';

export default {
  components: {
    FreeQuizCard,
    PaidQuizCard
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

