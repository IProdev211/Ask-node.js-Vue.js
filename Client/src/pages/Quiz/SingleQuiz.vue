<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 card">
        <!-- Quiz Name (Course Name) -->
        <div class="text-center">
          <p class="quiz-title">Proper Noun Quiz</p>
          <hr class="fadeline">
          <p class="quiz-subtitle">Grammar Bootcamp</p>
        </div>

        <div class="card-body text-center">
          <div>
            <a href="#" class="btn btn-primary btn-simple">Start Quiz</a>
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
.card {
  box-sizing: border-box;
  $border: 2px;
  color: #fff;
  background: #000;
  background-clip: padding-box; /* !importanté */
  border: solid $border transparent; /* !importanté */
  border-radius: 1em;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -$border; /* !importanté */
    border-radius: inherit; /* !importanté */
    background: linear-gradient(to top, #61d4ae, rgb(145, 209, 25));
  }

  background-color: rgb(31, 31, 48);
}
.fadeline {
  height: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0),
    rgba(159, 201, 159, 0.466) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}
.card {
  border-radius: 25px;
}
.quiz-title {
  padding: 0.75rem 1.25rem;
  font-size: 1.3rem;
  background-color: rgba(29, 29, 29, 0.03);
}

.quiz-subtitle {
  font-size: 1rem;
  color: rgb(133, 133, 133);
}

.QuizScore {
  font-size: 1.2rem;
}
</style>

