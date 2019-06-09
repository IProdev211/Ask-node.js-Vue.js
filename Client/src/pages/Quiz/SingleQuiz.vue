<template>
  <div class="container">
    <!-- QUIZ TITLE -->
    <h1 class="text-right pb-5 quiz-title">آزمون آنلاین 3</h1>

    <div class="question-number d-flex justify-content-between">
      <!-- COUNTDOWN TIMER GOES HERE -->
      <h3 class="question-number">
        سوال
        <span>1</span> از
        <span>18</span>
      </h3>
      <h3 class="timer">01:32</h3>
    </div>

    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        style="width: 10%;"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
      >10%</div>
    </div>

    <!-- WHEN ITEMS ARE CLICKED A SEPERATE VUE SHOULD REPLACE THE QUESTION SECTION -->
    <div class="quiz-navbar d-flex justify-content-around pt-4">
      <p class="quiz-navbar-item">
        <span>
          <i class="fas fa-question"></i>
        </span> سوال
      </p>
      <p class="quiz-navbar-item">
        <span>
          <i class="fas fa-book"></i>
        </span> توضیح
      </p>
      <p class="quiz-navbar-item">
        <span>
          <i class="fas fa-comments"></i>
        </span> نظرات
      </p>
      <p class="quiz-navbar-item">
        <span>
          <i class="fas fa-ban"></i>
        </span> پایان آزمون
      </p>
    </div>

    <!-- QUESTION -->
    <div class="mt-5">
      <h2 class="question text-ltr">What do we call a group of footballers?</h2>
    </div>

    <!-- ANSWERS -->
    <div class="answers-section mt-5">
      <div class="answer-card row d-flex align-items-center text-ltr">
        <p class="question-letter">A</p>
        <p class="answer">A band of musicians</p>
      </div>

      <div class="answer-card row d-flex align-items-center text-ltr">
        <p class="question-letter">B</p>
        <p class="answer">A crew</p>
      </div>

      <div class="answer-card row d-flex align-items-center text-ltr">
        <p class="question-letter">C</p>
        <p class="answer">A flight of steps</p>
      </div>

      <div class="answer-card row d-flex align-items-center text-ltr">
        <p class="question-letter">D</p>
        <p class="answer">A team</p>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert';

export default {
  components: {}
};
</script>

<style lang="scss" scoped>
.quiz-title {
  font-family: IranSansBold;
}

.timer {
  font-family: IranSansBold;
}

.quiz-navbar {
  .quiz-navbar-item {
    font-size: 1rem;
    color: rgb(109, 109, 109);
    font-family: IranSansBold;
  }

  :hover {
    color: rgb(124, 174, 240);
    cursor: pointer;
  }
}

.question {
  font-size: 1.4rem;
  padding-top: 1.2rem;
}

.question-number {
  color: rgb(102, 102, 102);

  span {
    font-family: IranSansBold;
    color: rgb(0, 0, 0);
  }
}
.answers-section {
  .answer-card {
    padding: 1.4rem 1rem;
    background: #fff;
    border: 0;
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    -webkit-box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
    :hover {
      cursor: pointer;
      background-color: rgba(240, 243, 192, 0.781);
      p {
        background-color: rgba(240, 243, 192, 0.781);
      }
    }
    .question-letter {
      font-size: 1.5rem;
      color: rgb(168, 168, 168);
      padding: 0 2rem 0 0;
      font-weight: 600;
      font-family: Arial, Helvetica, sans-serif;
    }
    .answer {
      font-size: 1rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  .row {
    margin-right: 0px !important;
    margin-left: 0px !important;
  }
  :hover {
    cursor: pointer;
    background-color: rgba(240, 243, 192, 0.781);
    p {
      background-color: transparent !important;
    }
  }
}

// IF ANSWER IS CORRECT - .answer-card SHOULD BECOME GREEN
// IF ANSWER IS INCORRECT - .answer-card SHOULD BECOME RED
</style>

