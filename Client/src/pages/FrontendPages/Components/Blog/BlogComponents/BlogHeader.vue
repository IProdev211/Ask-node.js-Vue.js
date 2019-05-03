<template>
  <div class="col-md-12">
    <h1 class="text-center pt-5 text-danger text-ltr">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: [ 'title' ],
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 5px;
}
h1 {
  font-weight: 600;
}
</style>
