<template>
  <div class="private-classes-background">
    <div class="container">
      <h1 class="text-center custom-title pt-4">کلاس های خصوصی ما</h1>
      <div class="private-classes pb-5">
        <div class="row pricing">
          <div class="col-lg-4 col-sm-12 px-3">
            <div class="pricing-box hover">
              <div class="pricing-title bg-bronze">
                <h3 class="text-white titleSize py-3">برنز</h3>
              </div>
              <div class="pricing-field">
                <span class="price">۱۲۵,۰۰۰ تومان</span>
                <p class="py-0 my-0 smalltext">هر جلسه</p>
              </div>
              <div class="pricing-features pt-3">
                <ul>
                  <li>تمرین مکالمه</li>
                  <li>تمرین لیسنینگ</li>
                  <li>تمرین لغات و تلفظ</li>
                  <li>برگزاری آزمون تعیین سطح</li>
                  <li>گواهی پایان دوره</li>
                </ul>
              </div>
              <div class="pricing-action">
                <router-link to="contact">
                  <base-button
                    native-type="submit"
                    class="btn btn-lg btn-block btn-outline-primary"
                  >ثبت نام</base-button>
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-sm-12 px-3">
            <div class="pricing-box hover">
              <div class="pricing-title bg-silver">
                <h3 class="text-white titleSize py-3">سيلور</h3>
              </div>
              <div class="pricing-field">
                <span class="price">۱۷۵,۰۰۰ تومان</span>
                <p class="py-0 my-0 smalltext">هر جلسه</p>
              </div>
              <div class="pricing-features pt-3">
                <ul>
                  <li>تمرین مکالمه</li>
                  <li>تمرین لغات، تلفظ و گرامر</li>
                  <li>تمرین لیسنینگ</li>
                  <li>خواندن کتاب و مجلات</li>
                  <li>برگزاری ۲ آزمون در طول ترم</li>
                  <li>آمادگی آزمون های ايلتس و تافل</li>
                  <li>برگزاری آزمون تعیین سطح</li>
                  <li>گواهی پایان دوره</li>
                </ul>
              </div>
              <div class="pricing-action">
                <router-link to="contact">
                  <base-button
                    native-type="submit"
                    class="btn btn-lg btn-block btn-outline-primary"
                  >ثبت نام</base-button>
                </router-link>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-sm-12 px-3">
            <div class="pricing-box hover">
              <div class="pricing-title bg-gold">
                <h3 class="titleSize text-black py-3">گلد</h3>
              </div>
              <div class="pricing-field">
                <span class="price">۲۰۰,۰۰۰ تومان</span>
                <p class="py-0 my-0 smalltext">هر جلسه</p>
              </div>
              <div class="pricing-features pt-3">
                <ul>
                  <li>بحث آزاد</li>
                  <li>تمرين ليسنينگ و مكالمه</li>
                  <li>يادگيری لغات، تلفظ و گرامر</li>
                  <li>برگزاری ۲ آزمون در طول ترم</li>
                  <li>برگزاری آزمون تعين سطح</li>
                  <li>نقد فيلم و تاک شو ها</li>
                  <li>آمادگی آزمون های ايلتس و تافل</li>
                  <li>آزمون آزمایشی زبان انگلیسی هوانوردی</li>
                  <li>آموزش و تمرین نکات کلیدی و کاربردی مکالمه</li>
                  <li>کمک به ترجمه انواع رزومه جهت مهاجرت</li>
                  <li>گواهی پایان دوره</li>
                </ul>
              </div>
              <div class="pricing-action">
                <router-link to="contact">
                  <base-button
                    native-type="submit"
                    class="btn btn-lg btn-block btn-outline-primary"
                  >ثبت نام</base-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.private-classes-background {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: left;
  min-height: 85vh;
  position: relative;
  // padding-bottom: 50px;
}

.btn {
  font-weight: inherit;
}

.custom-title {
  font-size: 1.7rem;
  color: #fff !important;
  font-family: IranSansBold;
}

.section-header {
  font-size: 1.5rem;
  color: white;
}

li,
ul {
  margin: 0;
  padding: 0;
}

.private-classes {
  padding: 20px 8% 0 8%;

  .pricing {
    position: relative;
  }

  .pricing [class^='col-'] {
    padding: 0;
    margin-top: 10px;
  }

  .pricing-box {
    position: relative;
    border-radius: 16px !important;
    text-align: center;
    box-shadow: 0 10px 19px 6px rgba(0, 0, 0, 0.199);
    background-color: rgb(238, 238, 238);
  }

  .pricing-title {
    background-color: rgb(68, 68, 129);
    border-radius: 16px 16px 0 0;
  }

  .titleSize {
    font-size: 1.7rem;
  }

  .pricing-field {
    position: relative;
    padding: 16px 0;
    color: #fff;
  }

  .price {
    font-size: 1.7rem;
    color: #2e2e2e;
  }

  .pricing-price:after {
    content: '';
    position: absolute;
    width: 100px;
    border-top: 1px solid rgba(224, 224, 224, 0.3);
    top: auto;
    bottom: 0;
    left: 50%;
    margin-left: -50px;
  }

  .pricing-price span {
    display: inline-block;
    color: #fff;
    margin: 7px 3px 0 0;
    font-size: 1.9rem;
  }

  .pricing-features {
    border-bottom: 1px solid rgba(194, 194, 194, 0.212);
  }

  .pricing-features ul {
    margin: 0;
    padding: 17px 0;
    list-style: none;
  }

  .pricing-features li {
    padding: 6px 0;
    font-size: 0.85rem;
  }

  .pricing-action {
    padding: 15px 30px;
  }

  .hover {
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 5px;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }

  .hover:hover {
    -webkit-box-shadow: 0 10px 30px -5px rgba(136, 136, 136, 0.4);
    box-shadow: 0 10px 30px -5px rgba(114, 114, 114, 0.4);
    -webkit-transform: translateY(-10px);
    transform: translateY(-10);
    cursor: pointer;
  }

  p {
    font-size: 17px;
    padding-top: 13px;
  }
  .smalltext {
    font-size: 15px;
    color: #696969;
  }
  .bg-gold {
    background-color: #ffd700 !important;
  }

  .bg-silver {
    background-color: #c0c0c0 !important;
  }

  .bg-bronze {
    background-color: #cd7f32 !important;
  }
  .text-black {
    color: black;
  }
}
</style>
