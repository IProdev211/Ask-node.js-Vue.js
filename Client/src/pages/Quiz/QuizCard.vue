<template>
  <section class="container">
    <div class="col-md-4 card">
      <!-- Quiz Name (Course Name) -->
      <div class="text-center">
        <p class="quiz-title pt-4">Proper Nouns Quiz</p>
        <router-link class="quiz-subtitle" to="/courses/دوره-ی-گرامر-انگلیسی">Grammar Bootcamp</router-link>
      </div>

      <div class="d-flex justify-content-around text-center pt-4">
        <div>
          <p class="item">
            2
            <br />
            <span class="itemSpan">مدت زمان امتحان</span>
          </p>
        </div>
        <div>
          <p class="item">
            3
            <br />
            <span class="itemSpan">تعداد سوالات</span>
          </p>
        </div>
      </div>

      <div class="d-flex justify-content-between text-center">
        <div class="card-body pb-4">
          <router-link to="/singlequizlayout">
            <base-button native-type="submit" type="success" class="btn btn-simple">شرکت در امتحان</base-button>
          </router-link>
        </div>

        <!-- IF USER HAS COMPLETED THE TEST THEY CAN CHECK THEIR RESULTS BY CLICKING THE BUTTON -->
        <div class="card-body pb-4">
          <router-link to="/gradesheet">
            <base-button native-type="submit" type="success" class="btn btn-simple">مشاهده نتیجه</base-button>
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
.card {
  box-sizing: border-box;
  $border: 2px;
  color: #fff !important;
  background-image: linear-gradient(
    to top,
    #667eea 0%,
    #764ba2 100%
  ) !important;
  border-radius: 1em !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23) !important;

  .quiz-title {
    font-size: 1.7em;
    color: #fff !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
  }

  .quiz-subtitle {
    font-size: 1em;
    color: rgba(255, 255, 255, 0.616) !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .quiz-subtitle:hover {
    text-decoration: underline !important;
    color: #fff !important;
  }
  .item {
    color: rgb(255, 255, 255);
    padding-right: 0.7rem;
    font-size: 1.2rem;
    font-family: IranSansBold;
  }
  .itemSpan {
    font-size: 0.73rem;
    color: #ffffff9a;
    font-family: IranSans;
  }
  .btn {
    color: #fff !important;
    font-size: 0.9em;
    border-color: #fff !important;
  }
  @media (max-width: 680px) {
    .btn {
      font-size: 0.7em;
    }
  }
}
</style>