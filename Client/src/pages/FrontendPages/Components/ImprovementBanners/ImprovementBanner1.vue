<template>
  <section class="bg">
    <div class="container">
      <div class="text-section">
        <h2 class="pb-5">آیا تغییرات مورد نظر را در خودتان نمیبینید؟</h2>
        <p class="main-text">
          یک چند ماهی هست که کلاس های زبانت رو شروع کردی. خب تا یک جاهایی خوب پیش میره، شما حس میکنید که در مکالمه، لغات و گرامر دارید پیشرفت میکنید.
          <br />
          <br />اما این حس مقطعی هست، و ناگهان پیشرفت زبان شما کم میشه و دیگه حس اون تغییرات مثبت در شما ایجاد نمیشه، انگار که هر چه بیشتر درس بخونید باز هم پیشرفتی نمیبینی و نمیتونی خودتو به سطح بالاتر برسونی، اونجاست که انگیزه ی شما به عنوان زبان آموز کم میشه و نا امید میشید.
          <br />
          <br />به احتمال خیلی زیاد این داستان برای شما هم اتفاق افتاده، داستانی که گفته شد عموما برای اکثر زبان آموزان ها اتفاق میافتد. که هم داستان کلافه کننده ای هست و بیشتر از آن نا امید کننده.
        </p>

        <div class="text-left">
          <base-button
            v-scroll-to="{
              el: '#element',
              duration: 900,
              easing: 'linear',
              offset: -20,
              force: true,
              cancelable: true,
              onStart: onStart,
              onDone: onDone,
              onCancel: onCancel,
              x: false,
              y: true
            }"
            native-type="submit"
            type="success"
            class="btn btn-lg btn-round animation-on-hover"
          >
            <!-- <i class="fas fa-info-circle ml-2"></i> -->
            راه حل؟
          </base-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #2876f9;
  background: linear-gradient(270deg, #38048de7 50%, #1a54b9c7),
    url(/img/frontend/confused-banner.svg) no-repeat;
  background-position: bottom left;
  background-size: cover;
  border-radius: 30px;
  margin: 2% 12%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -o-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.text-section {
  text-align: right;
  padding: 3em 2em;

  h2 {
    font-size: 2em;
    color: #fff !important;
    line-height: inherit !important;
    font-family: IranSansBold;
    padding: 0;
    margin: 0;
  }

  .main-text {
    color: #fff !important;
    font-size: 1.3em;
    line-height: 1.7em !important;
  }
}

.rtl .btn {
  font-family: IranSansBold;
  font-size: 1em !important;
  padding: 0.9em 2em;
}

@media (max-width: 680px) {
  .bg {
    margin: 1.2em;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    -o-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  }
  .text-section {
    padding: 2em 0.5em;

    h2 {
      font-size: 1.6em;
    }
    .main-text {
      font-size: 1.1em;
    }
    .rtl .btn {
      font-family: IranSansBold;
      font-weight: inherit;
      padding: 0.6em 1.5em;
    }
  }
}
</style>

