<template>
  <div class="fileinput text-center mb-0">
    <div>
      <span class="btn btn-primary btn-simple btn-file">
        <span class="fileinput-new">
          <i class="pl-2 fas fa-cloud-upload-alt"></i>
          پیوست فایل
        </span>
        <input type="hidden" value name />
        <input
          @change="selectFile"
          type="file"
          name="..."
          class="valid"
          :multiple="false"
          aria-invalid="false"
          :key="this.file"
        />
      </span>
      <base-button v-if="fileExists" @click="removeFile" round type="danger">
        <i class="fas fa-times"></i>
        حذف فایل
      </base-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'file-upload',
  data() {
    return {
      fileExists: false
    };
  },
  methods: {
    selectFile(event) {
      let file = event.target.files[0];
      this.fileExists = true;
      this.$emit('change', file);
    },
    removeFile() {
      this.fileExists = false;
      this.file = null;
      this.$emit('change', null);
    }
  }
};
</script>
<style></style>
