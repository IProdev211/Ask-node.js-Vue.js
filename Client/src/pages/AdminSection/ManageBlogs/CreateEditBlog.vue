<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form">
        <h4 slot="header" class="card-title">
          <span class="font-weight-bold pr-1">Add/Edit</span> Blog
        </h4>
        <form @submit.prevent>
          <div>
            <div class="row">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-5">
                    <base-input label="Blog Name" placeholder="Blog Name"></base-input>
                  </div>
                  <div class="col-md-3">
                    <base-input label="Blog Author" placeholder="Blog Author"></base-input>
                  </div>
                  <div class="col-md-2 pt-3">
                    <image-upload @change="onImageChange" select-text="Blog Image"/>
                  </div>
                  <div class="col-md-12 py-4">
                    <base-input
                      class="blogtext"
                      label="Blog Text (CKEditor5)"
                      placeholder="Blog Text"
                    >
                      <textarea class="form-control"></textarea>
                    </base-input>
                  </div>
                  <div class="col-md-6">
                    <h4 class="lead">Tags</h4>
                    <tags-input v-model="tags.dynamicTags"></tags-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 pull-right">
              <base-button class="px-5" native-type="submit" type="primary">Create / Edit Blog</base-button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import { ImageUpload, TagsInput } from 'src/components/index';

export default {
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    ImageUpload,
    TagsInput
  },
  data() {
    return {
      images: {
        regular: null,
        avatar: null
      },
      tags: {
        dynamicTags: ['Tag 1', 'Tag 2']
      }
    };
  },
  methods: {
    onImageChange(file) {
      this.images.regular = file;
    },
    onAvatarChange(file) {
      this.images.avatar = file;
    }
  }
};
</script>

<style scoped></style>