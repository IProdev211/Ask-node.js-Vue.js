<template>
  <div class="container">
    <div class="text-right pb-5">
      <h1 class="text-success">دوره های در حال یادگیری</h1>
      <p class="pb-4">در این بخش دور های نقدی که در آن ثبت نام کرده اید لیست میشود</p>
      <hr class="fadeline2">
    </div>
    <p class="no-courses-message text-right pt-5">هیچ درسی تهیه نشده است 😣</p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.no-courses-message {
  font-size: 1.1rem;
  color: rgb(180, 180, 180);
}
p {
  font-size: 1.1rem;
  color: rgb(180, 180, 180);
}

.fadeline2 {
  height: 1px;
  background-image: linear-gradient(
    270deg,
    rgba(255, 0, 0, 0),
    rgb(65, 65, 65) 20%,
    rgba(255, 0, 0, 0)
  );
}
</style>
