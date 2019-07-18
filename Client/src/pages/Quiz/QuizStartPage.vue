<template>
  <div class="container pt-5 text-right">
    <h1>Instructions For Taking The Quiz</h1>
    <div class="quiz-info py-5">
      <h3>Quiz Name:</h3>
      <h3>Quiz Code:</h3>
      <h3>Quiz Level:</h3>
      <h3>Quiz Time Limit:</h3>
      <h3>Number of Questions:</h3>
    </div>

    <div class="p">
      آزمون تعیین سطح انگلیسی حاضر آزمون استانداری است که توسط دانشگاه کمبریج طراحی شده است. این آزمون تعیین سطح شامل 25 سوال چند گزینه ای است که همه آنها مربوط به انگلیسی عمومی می باشند.
      با پاسخ دادن به هر سوال یک امتیاز دریافت خواهید کرد و مجموع امتیازات هم 25 است. در نظر داشته باشید برای اتمام آزمون باید به تمامی سوالات پاسخ داده شود.
      با انجام این آزمون تعیین سطح آنلاین کاملا رایگان، از سطح تقریبی زبان خود آگاه خواهید شد. به طور کلی (طبق دانشگاه کمبریج) امتیازات کسب شده را می توان به با سطوح زیر تفسیر کرد:
    </div>

    <div class="py-5 text-left">
      <router-link to="/singlequizlayout">
        <base-button native-type="submit" type="success" class="btn animation-on-hover">Start Quiz</base-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h3 {
  margin: 9px 0;
}
</style>

