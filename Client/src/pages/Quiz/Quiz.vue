<template>
  <div class="container">
    <h1 class="pb-5 text-danger text-right">آزمونهای شما</h1>
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

<style lang="scss" scoped>
h1 {
  font-family: IranSansBold;
}
</style>

