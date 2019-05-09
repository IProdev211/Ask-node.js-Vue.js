<template>
  <div class="not-found-page">
    <div class="Message container text-center">
      <h1 class="display-1 text-danger">صفحه مورد نظر پیدا نشد</h1>
      <h3 class="display-2">خطای ۴۰۴</h3>
      <div class="pt-3 px-2">
        <router-link to="/">
          <base-button
            native-type="submit"
            type="success"
            class="btn btn-simple"
          >{{ 'مشاهده صفحه اصلی' }}</base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
// .Message {
//   padding-top: 30vh;
// }
// .not-found-page {
//   .full-page > .content,
//   .centered {
//     min-height: calc(100vh - 160px);
//   }
//   .not-found-icon {
//     margin-right: 10px;
//   }
//   .centered {
//     h1,
//     i {
//       font-size: 50px;
//     }
//     p {
//       font-size: 20px;
//     }
//     display: flex;
//     padding-bottom: 150px;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     color: white;
//   }
// }
</style>
