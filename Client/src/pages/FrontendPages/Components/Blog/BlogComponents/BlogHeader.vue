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
  font-size: 2em;
  font-family: IranSansBold;
  line-height: inherit !important;
  color: rgb(245, 245, 245) !important;
}
</style>
