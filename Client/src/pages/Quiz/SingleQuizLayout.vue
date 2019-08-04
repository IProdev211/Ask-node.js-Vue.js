<template>
  <section class="bg">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 mt-4">
          <quiz-info />
        </div>
        <div class="col-12 question-section">
          <quiz-question />
        </div>
        <hr />
        <div class="col-12 mb-5">
          <quiz-navigation />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import QuizInfo from './QuizComponents/QuizInfo.vue';
import QuizNavigation from './QuizComponents/QuizNavigation.vue';
import QuizQuestion from './QuizComponents/QuizQuestion.vue';

export default {
  components: { QuizInfo, QuizNavigation, QuizQuestion }
};
</script>

<style lang="scss" scoped>
.question-section {
  padding: 3em 0 8em 0;
}

@media (max-width: 678px) {
  .question-section {
    padding: 1.5em 0 3em 0 !important;
  }
}
</style>