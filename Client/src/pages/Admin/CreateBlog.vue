<template>
  <div id="app">
        <ckeditor :editor="editor" ... ></ckeditor>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {
            // Use the <ckeditor> component in this view.
            ckeditor: CKEditor.component
        },
        data() {
            return {
                editor: ClassicEditor,

                // ...
            };
        }
    }
</script>

<style>
</style>
