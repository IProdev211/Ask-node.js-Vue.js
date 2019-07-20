<template>
  <div class="container">
    <h1 class="pb-5 text-danger text-right">امتحان های شما</h1>

    <!-- New Quizzes -->
    <div class="py-5">
      <h2 class="text-right text-primary">امتحان های جدید</h2>
      <div class="row">
        <quiz-card />
      </div>
    </div>

    <!-- Completed Quizzes -->
    <div class="py-5">
      <h2 class="text-right text-default">امتحان های تکمیل شده</h2>
      <div class="row">
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
}
</style>

