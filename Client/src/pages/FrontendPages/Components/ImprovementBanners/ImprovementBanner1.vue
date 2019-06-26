<template>
  <section class="bg text-right">
    <div class="container-fluid">
      <div class="text-block">
        <h2 class="pb-5">آیا تغییرات مورد نظر را در خودتان نمیبینید؟</h2>
        <p class="main-text">
          یک چند ماهی هست که کلاس های زبانت رو شروع کردی. خب تا یک جاهایی خوب پیش میره، شما حس میکنید که در مکالمه، لغات و گرامر دارید پیشرفت میکنید.
          <br>
          <br>اما این حس مقطعی هست، و ناگهان پیشرفت زبان شما کم میشه و دیگه حس اون تغییرات مثبت در شما ایجاد نمیشه، انگار که هر چه بیشتر درس بخونید باز هم پیشرفتی نمیبینی و نمیتونی خودتو به سطح بالاتر برسونی، اونجاست که انگیزه ی شما به عنوان زبان آموز کم میشه و نا امید میشید.
          <br>
          <br>به احتمال خیلی زیاد این داستان برای شما هم اتفاق افتاده، داستانی که گفته شد عموما برای اکثر زبان آموزان ها اتفاق میافتد. که هم داستان کلافه کننده ای هست و بیشتر از آن نا امید کننده.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(270deg, (rgba(77, 25, 145, 0.9)), (#24074600)),
    url(/img/frontend/confused-banner.svg) no-repeat;
  background-position: bottom left;
  background-size: cover;
  padding: 5% 0;
}

.text-block {
  padding-left: 55%;
  padding-right: 30px;
}

@media (max-width: 970px) {
  .bg {
    background: linear-gradient(90deg, (rgba(39, 9, 78, 0.8))),
      url(/img/frontend/confused-banner.svg) no-repeat;
    background-position: left bottom;
    background-size: cover;
    padding: 4em 0;
  }
  .text-block {
    padding-left: 15px;
    padding-right: 15px;
  }
  h2 {
    font-size: 1.2rem !important;
  }

  .main-text {
    font-size: 0.9rem !important;
  }
}

h2 {
  font-size: 1.6rem;
  color: #fff !important;
  line-height: inherit !important;
  font-family: IranSansBold;
  padding: 0;
  margin: 0;
}

.main-text {
  font-size: 1.15rem;
  color: #fff !important;
  line-height: inherit !important;
}
</style>

