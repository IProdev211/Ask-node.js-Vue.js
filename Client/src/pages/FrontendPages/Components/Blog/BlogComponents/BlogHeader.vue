<template>
  <div>
    <h1 class="text-center pt-2">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: ['title']
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2.2em;
  font-family: IranSansBold;
  line-height: inherit !important;
  color: rgb(255, 255, 255) !important;
}
</style>
