<template>
  <section class="container">
    <h2 class="question text-ltr">
      <!-- WHEN QUESTION IS PINNED, THE PIN SHOULD BECOME ORANGE -->
      <i class="fas fa-thumbtack pin pr-4"></i>
      1) What do we call a group of footballers?
    </h2>

    <!------------------ ANSWER SECTION ------------------>
    <!-- IF QUESTION IS ANSWERED CORRECTLY, THE BOX SHOULD BECOME GREEN -- IF IT IS WRONG IT SHOULD BECOME RED-->
    <div class="answers-section text-ltr d-flex justify-content-center row px-2 mt-5">
      <div class="answer-card col-md-5">
        <div class="answer-info row d-flex align-items-center">
          <p class="question-letter">A</p>
          <p class="answer">A band of musicians</p>
        </div>
      </div>

      <div class="answer-card col-md-5">
        <div class="answer-info row d-flex align-items-center">
          <p class="question-letter">B</p>
          <p class="answer">A crew</p>
        </div>
      </div>

      <div class="answer-card col-md-5">
        <div class="answer-info row d-flex align-items-center">
          <p class="question-letter">C</p>
          <p class="answer">A flight of steps</p>
        </div>
      </div>

      <div class="answer-card col-md-5">
        <div class="answer-info row d-flex align-items-center">
          <p class="question-letter">D</p>
          <p class="answer">A team</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.question {
  .pin:hover {
    color: rgb(255, 72, 0);
    cursor: pointer;
  }
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
    border-radius: 25px;
    background: #fff;
    border: 0;
    position: relative;
    margin: 10px;
    -webkit-box-shadow: 0 1px 20px 0px rgba(119, 45, 45, 0.2);
    box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.2);

    :hover {
      cursor: pointer;
      background-color: transparent;
      p {
        background: transparent;
      }
      .row {
        background: transparent;
      }
    }
    .question-letter {
      font-size: 1.5rem;
      color: rgb(196, 196, 196);
      padding: 0 1.2em;
      font-weight: 600;
      font-family: Arial, Helvetica, sans-serif;
    }
    .answer {
      font-size: 1rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  :hover {
    cursor: pointer;
    background: linear-gradient(315deg, #fee2f8 0%, #dcf8ef 74%);

    p {
      background-color: transparent !important;
    }

    .question-letter {
      color: rgb(0, 0, 0);
    }
  }
}

.question {
  font-size: 1.8em !important;
  padding-top: 1.2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}
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

@media (max-width: 678px) {
  .answer-card {
    margin: 5px 0 !important;
    padding: 1em !important;
  }

  .question {
    font-size: 1.55em !important;
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
}
</style>

