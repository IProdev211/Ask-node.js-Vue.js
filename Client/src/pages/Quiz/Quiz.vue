<template>
  <div class="container">
    <h1 class="pb-5 text-success text-right">آزمونهای شما</h1>
    <!-- Quizzes -->
    <SingleQuiz></SingleQuiz>
  </div>
</template>
<script>
import SingleQuiz from './SingleQuiz';

export default {
  components: {
    SingleQuiz
  }
};
</script>

<style scoped>
</style>
