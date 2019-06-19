<template>
  <div>
    <h1 class="text-right">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: IranSansBold;
  color: rgb(245, 245, 245) !important;
}
</style>
