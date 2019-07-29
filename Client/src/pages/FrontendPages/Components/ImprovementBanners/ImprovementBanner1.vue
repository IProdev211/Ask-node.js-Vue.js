<template>
  <section class="container">
    <div class="card">
      <div class="text-section">
        <h2 class="pb-5">آیا تغییرات مورد نظر را در خودتان نمیبینید؟</h2>
        <p class="main-text">
          یک چند ماهی هست که کلاس های زبانت رو شروع کردی. خب تا یک جاهایی خوب پیش میره، شما حس میکنید که در مکالمه، لغات و گرامر دارید پیشرفت میکنید.
          <br />
          <br />اما این حس مقطعی هست، و ناگهان پیشرفت زبان شما کم میشه و دیگه حس اون تغییرات مثبت در شما ایجاد نمیشه، انگار که هر چه بیشتر درس بخونید باز هم پیشرفتی نمیبینی و نمیتونی خودتو به سطح بالاتر برسونی، اونجاست که انگیزه ی شما به عنوان زبان آموز کم میشه و نا امید میشید.
          <br />
          <br />به احتمال خیلی زیاد این داستان برای شما هم اتفاق افتاده، داستانی که گفته شد عموما برای اکثر زبان آموزان ها اتفاق میافتد. که هم داستان کلافه کننده ای هست و بیشتر از آن نا امید کننده.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.white-content .card:not(.card-white) {
  border-radius: 30px;
  background: linear-gradient(270deg, #0d032cde, #18012be0),
    url(/img/frontend/confused-banner.svg) no-repeat;
  background-position: bottom left;
  background-size: cover;
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.4);
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2);
}
.text-section {
  text-align: right;
  padding: 3.6em;

  h2 {
    color: #fff !important;
    line-height: inherit !important;
    font-family: IranSansBold;
    padding: 0;
    margin: 0;
  }

  .main-text {
    color: #fff !important;
    line-height: inherit !important;
    font-size: 1.15em;
  }
}
@media (max-width: 680px) {
  .text-section {
    padding: 2em;
    h2 {
      font-size: 1.6em;
    }
    .main-text {
      font-size: 1.1em;
    }
  }
}
</style>

