<template>
  <section class="container-fluid">
    <div class="free-quiz-card d-flex justify-content-between align-items-center row">
      <div class="block-element">
        <p class="quiz-title">نام امتحان</p>
        <h3 class="quiz-info">Proper Nouns Quiz</h3>
      </div>

      <div class="w-100 d-md-none py-3"></div>

      <div class="block-element">
        <p class="quiz-title">دوره مرتبط</p>
        <h3 class="quiz-info">General Grammar Course</h3>
      </div>

      <div class="w-100 d-md-none py-3"></div>

      <div>
        <p class="quiz-title">مدت زمان امتحان</p>
        <h3 class="quiz-info">20 دقیقه</h3>
      </div>

      <div>
        <p class="quiz-title">تعداد سوالات</p>
        <h3 class="quiz-info">15 سوال</h3>
      </div>

      <div class="w-100 d-md-none py-2"></div>

      <div class="button-section d-flex align-items-center justify-content-around">
        <!-- IF USER HAS ALREADY DONE THE EXAM THE TEXT IN THE BUTTON SHOULD BE - امتحان مجدد -->
        <div class="pl-4">
          <router-link to="/singlequizlayout">
            <base-button native-type="submit" type="warning" class="btn btn-round">شرکت در امتحان</base-button>
          </router-link>
        </div>

        <!-- IF USER HAS COMPLETED THE TEST THEY CAN CHECK THEIR RESULTS BY CLICKING THE BUTTON -->
        <div>
          <router-link to="/gradesheet">
            <base-button native-type="submit" type="info" class="btn btn-round">مشاهده نتیجه</base-button>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.free-quiz-card {
  padding: 2em;
  margin-bottom: 15px;
  background-color: #6e72fc;
  background-image: linear-gradient(315deg, #6e72fc, #ad1deb) !important;
  border-radius: 1.2em !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important;
}

.quiz-title {
  font-size: 1em;
  color: rgba(255, 255, 255, 0.4) !important;
  font-family: IranSansBold;
  text-align: right;
}
.quiz-info {
  font-size: 1.2em;
  color: #fff !important;
  font-family: IranSansDN;
  text-align: right;
}

h3 {
  padding: 0;
  margin: 0;
}

.badge {
  margin-top: 10px;
}
i {
  color: white;
}

@media screen and (max-width: 768px) {
  .quiz-title,
  .quiz-subtitle,
  .quiz-questions,
  .quiz-time {
    padding: 0;
    margin: 0;
  }

  .button-section {
    padding-top: 1em;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  .rtl .btn {
    padding: 13px !important;
    font-size: 0.82em !important;
  }
}

@media screen and (max-width: 1199px) and (min-width: 700px) {
  .block-element {
    width: 100%;
    margin-bottom: 15px;
  }
}

.free-quiz-card:hover,
.free-quiz-card:focus,
.paid-quiz-card:hover,
.paid-quiz-card:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.6);
  box-shadow: 40px rgba(121, 121, 121, 0.6);
  // transition: transform 0.6s;
  // -webkit-transform: translateY(-3px);
  // transform: translateY(-3px);
  // cursor: pointer;
}

.farsi {
  font-family: IranSans;
}
</style>