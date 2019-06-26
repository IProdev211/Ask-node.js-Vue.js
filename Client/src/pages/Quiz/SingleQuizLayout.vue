<template>
  <div class="container">
    <!-- QUIZ TITLE -->
    <h1 class="text-right pb-5 quiz-title">
      آزمون آنلاین
      <span class="quiz-subtitle text-success">زمان آینده استمراری</span>
    </h1>

    <div class="row">
      <div class="col-md-8">
        <div class="question-number d-flex justify-content-between">
          <!-- COUNTDOWN TIMER GOES HERE -->
          <h3 class="question-number">
            سوال
            <span>2</span> از
            <span>6</span>
          </h3>
          <h3 class="timer">01:32</h3>
        </div>

        <div class="progress">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 30%;"
            aria-valuenow="30"
            aria-valuemin="0"
            aria-valuemax="100"
          >30%</div>
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
          <!-- <p class="quiz-navbar-item">
            <span>
              <i class="fas fa-ban"></i>
            </span> پایان آزمون
          </p>-->

          <p class="quiz-navbar-item">
            <span>
              <i class="fas fa-thumbtack"></i>
            </span> PIN
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <div class="question-number-section">
          <div class="question-number">1</div>
          <div class="question-number">2</div>
          <div class="question-number">3</div>
          <div class="question-number">4</div>
          <div class="question-number">5</div>
          <div class="question-number">6</div>
        </div>
      </div>
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

    <div class="d-flex justify-content-between py-3">
      <div class="next-question">
        <base-button
          native-type="submit"
          type="default"
          class="btn animation-on-hover custom-button"
        >
          <i class="fas fa-caret-right pl-2"></i>
          Next Question
        </base-button>
      </div>
      <div class="previous-question">
        <base-button
          native-type="submit"
          type="default"
          class="btn animation-on-hover custom-button"
        >
          Previous Question
          <i class="fas fa-caret-left pr-2"></i>
        </base-button>
      </div>
    </div>

    <div class="py-5 text-left">
      <router-link to="/gradesheet">
        <base-button native-type="submit" type="default" class="btn btn-simple animation-on-hover">
          <i class="fas pl-2 fa-ban"></i>
          پایان آزمون
        </base-button>
      </router-link>
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
.question-number-section {
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 4px;
  overflow: hidden;

  .question-number {
    float: left;
    width: 32px;
    margin: 4px;
    padding: 8px;
    border-radius: 4px;
    border: solid 2px rgba(190, 190, 190, 0.4);
    text-decoration: none;
    text-align: center;
    color: rgb(31, 31, 31);
    background-color: rgba(255, 255, 255, 0.295);
    transition: all 0.1s;
    font-family: IranSansBold;
  }
  .question-number:hover {
    border: solid 2px rgba(134, 134, 134, 0.8);
    background-color: rgba(255, 255, 255, 0.4);
    color: rgba(0, 0, 0, 0.781);
    box-shadow: 0 0 5px rgba(83, 83, 83, 0.8);
    cursor: pointer;
  }
}

.quiz-title {
  font-family: IranSansBold;
}

.quiz-subtitle {
  color: rgb(20, 167, 110) !important;
  font-family: IranSansDN;
  font-size: 0.8em;
  padding-right: 5px;
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
    font-weight: 600;

    p {
      background-color: transparent !important;
    }
  }
}

@media (max-width: 678px) {
  .quiz-title {
    font-size: 1.23em;
  }

  .quiz-subtitle {
    font-size: 1.23em;
  }

  .question {
    font-size: 1.3em;
    line-height: inherit;
  }

  .question-letter {
    font-size: 1.2em;
  }
  .answer {
    font-size: 1em;
  }

  .question-number {
    font-size: 1.15em;
  }
  .timer {
    font-size: 1.15em;
  }
  .custom-button {
    font-size: 0.9em;
    font-weight: 0;
    padding: 10px 10px;
  }
}

// IF ANSWER IS CORRECT - .answer-card SHOULD BECOME GREEN
// IF ANSWER IS INCORRECT - .answer-card SHOULD BECOME RED
</style>

