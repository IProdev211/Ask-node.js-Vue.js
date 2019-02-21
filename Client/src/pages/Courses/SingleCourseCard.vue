<template>
  <div>
    <router-link to="singlecourse">
      <div class="hover m-widget7 m-widget7--skin-dark widget-3">
        <div class="m-widget7__courseimage">
          <img class="m-widget7__courseimage" src="/img/notesCourse.png">
        </div>
        <div class="course__name">
          <h4 class="text-center pt-3">Letter Writing Short Course</h4>
        </div>
        <div class="m-widget7__user">
          <div class="m-widget7__user-img">
            <img class="m-widget7__img" src="/img/arya.png">
          </div>
          <div class="m-widget7__info">
            <span class="m-widget7__username">Arya Doroudian</span>
            <br>
            <span class="m-widget7__time">01/01/2019</span>
          </div>
        </div>
        <hr class="fadeline">
        <div class="bottom price d-flex justify-content-between px-4 pb-3">
          <div>
            <p class="pricehighlight">
              <i class="tim-icons icon-money-coins pr-2"></i>29,000 Tomans
            </p>
          </div>
          <div>
            <p>
              <i class="tim-icons icon-watch-time pr-2"></i>04:37:19
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.outline {
  border-radius: 25px;
}

.pricehighlight {
  color: #4ace33be;
  font-weight: 600;
}

.fadeline {
  height: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0),
    rgb(145, 161, 145) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.price {
  font-size: 0.8rem;
  color: white;
}

.course-info {
  border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.widget-3 {
  background-color: #32325d;
  /* padding: 20px 0; */
  border: 1px solid #1d1d46;
  border-radius: 25px;
}

.hover:hover,
.hover:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(97, 97, 97, 0.144);
  box-shadow: 0 15px 35px -5px rgba(7, 78, 45, 0.288);
  transition: transform 0.6s;
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
  cursor: pointer;
}

.m-widget7__title {
  text-align: center;
}

.m-widget7 .m-widget7__courseimage {
  border-radius: 15px;
}

.m-widget7 .m-widget7__description {
  text-align: center;
  margin-top: 4rem;
  padding: 0 30px;
  font-size: 1.1rem;
}

.m-widget7 .m-widget7__user {
  margin: 0 auto;
  display: table;
  margin-top: 0.35rem;
  margin-bottom: 1rem;
}

.m-widget7 .m-widget7__user .m-widget7__user-img .m-widget7__img {
  width: 2.3rem;
  border-radius: 50%;
  margin-top: 1.14rem;
}

.m-widget7 .m-widget7__user .m-widget7__info {
  display: table-cell;
}

.m-widget7 .m-widget7__user .m-widget7__info .m-widget7__username {
  margin-top: 0.71rem;
  margin-left: 0.71rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.m-widget7 .m-widget7__user .m-widget7__info .m-widget7__time {
  margin-left: 0.71rem;
  margin-top: 0.71rem;
  font-size: 0.75rem;
}

.m-widget7 .m-widget7__button {
  text-align: center;
  margin-bottom: 1.85rem;
}

.m-widget7 .m-widget7__description {
  color: #575962;
}

.m-widget7 .m-widget7__info .m-widget7__username {
  color: #575962;
}

.m-widget7 .m-widget7__info .m-widget7__time {
  color: #9c9c9c !important;
}

.m-widget7.m-widget7--skin-dark .m-widget7__description {
  color: #fff;
}

.m-widget7.m-widget7--skin-dark .m-widget7__info .m-widget7__username {
  color: #fff;
}

.m-widget7.m-widget7--skin-dark .m-widget7__info .m-widget7__time {
  color: #fff;
}
</style>
