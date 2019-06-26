<template>
  <section>
    <div class="banner-box d-block text-center">
      <div class="banner-card">
        <router-link to="/privateclasses">
          <i class="fas bell fa-bell pl-2"></i>آیندت رو بساز! تخفیف 30٪ ویژه شروع تابستان
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.banner-box {
  font-family: IranSansBold;
  padding: 0.65em 0;
  background-color: #ffed24;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 90 90'%3E%3Ccircle fill-opacity='0.59' fill='%23ffffff' cx='45' cy='45' r='5'/%3E%3Cg fill='%23ffffff' fill-opacity='0.59'%3E%3Ccircle cx='0' cy='90' r='5'/%3E%3Ccircle cx='90' cy='90' r='5'/%3E%3Ccircle cx='90' cy='0' r='5'/%3E%3Ccircle cx='0' cy='0' r='5'/%3E%3C/g%3E%3C/svg%3E");
}
.banner-card {
  justify-content: center;
  align-items: center;
  // background: #fff;
  padding: 7px 10px;
  margin: 0 20%;
  // -webkit-border-radius: 3px;
  // border-radius: 3px;
  position: relative;
  font-family: IranSansBold;
  font-size: 1.2em;

  @media (max-width: 760px) {
    margin: 0 6%;
    font-size: 0.8rem;
  }

  a {
    color: rgb(255, 67, 108) !important;
  }
}

.banner-card a:hover {
  // color: rgb(50, 156, 68) !important;
  text-decoration: underline;
}

.bell {
  font-size: 1.2em;
  -webkit-transform-origin: 70% 0;
  transform-origin: 70% 0;
  -webkit-animation: swinging 2.5s ease-in-out forwards infinite;
  animation: swinging 1.5s ease-in-out forwards infinite;
}

@-webkit-keyframes swinging {
  0% {
    -webkit-transform: rotate(10deg);
  }
  50% {
    -webkit-transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(10deg);
  }
}

@keyframes swinging {
  0% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
