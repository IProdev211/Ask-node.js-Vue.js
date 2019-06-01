<template>
  <div class="col-md-12 pt-5">
    <h1 class="text-center text-success text-ltr">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 600;
}
</style>
