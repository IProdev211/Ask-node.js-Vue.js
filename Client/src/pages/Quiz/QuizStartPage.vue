<template>
  <div>
    <h1>Instructions For Taking The Quiz</h1>
    <h2>Taking the Quiz</h2>
    <div class="p">
      Select an answer for every question. Unanswered questions will be scored as incorrect.
      There are three possible question types:
      Multiple Choice: click the radio button to indicate your choice. Currently, only one answer can be selected for a multiple choice question. One Answer can be saved only once.
      True/False: click the radio button to indicate your choice. One Answer can be saved only once.
      One Word: Enter one word answer for the questions asked. One Answer can be saved only once.
      Essay Type: Enter one word answer for the questions asked
      If you use a wheel button mouse, take care not to accidently change your answers. Sometimes scrolling the wheel will rotate through the answers in a selection list, when you might have meant simply to scroll farther down in the quiz window.
      Click on the Save Answer button at the bottom of the question save your answer for grading.
      Click on the Submit button at the top and bottom of the page to have your answers graded.
      The Quiz will then be evaluated by the Instructor of the course. Once evaluated you’ll be notified of the results from notifications and a message with your score will be sent to you.
      The quiz results will be available in your Profile Courses -> Results section.
      If you want to try to get a better score, You need to contact your Instructor to reset the quiz for you.
    </div>

    <div class="py-5 text-left">
      <router-link to="/singlequizlayout">
        <base-button
          native-type="submit"
          type="default"
          class="btn btn-simple animation-on-hover"
        >Start Quiz</base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>

