<template>
  <div class="container">
    <h1 class="text-danger text-right pb-4">امتحان های شما</h1>

    <!-- New Quizzes -->
    <div class="pt-5">
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

