<template>
	<div class="row text-ltr">
		<div class="col-md-12">
			<card class="stacked-form">
				<h4 slot="header" class="card-title">
					<span class="font-weight-bold pr-1">
						<span v-if="data.id">Edit</span>
						<span v-else>Add</span>
					</span> Blog
				</h4>
				<form @submit="submitFormListener">
					<div>
						<div class="row">
							<div class="col-md-10">
								<div class="row">
									<div class="col-md-5">
										<base-input
										label="Blog Name"
										placeholder="Blog Name"
										v-model="data.name"
										:required="true"
										:error="fieldErrors.name">
										</base-input>
									</div>
									<div class="col-md-3">
										<div class="form-group has-label">
											<label> Blog Author  </label>
											<autocomplete
												source="/api/v1/admin/users?filter="
												results-property="docs"
												:initialValue="data.author"
												:initialDisplay="data.authorName"
												v-model="data.author"
												@selected="onSelectUser"
												input-class="form-control">
											</autocomplete>
										</div>
									</div>
									<div class="col-md-2 pt-3">
										<image-upload @change="onImageChange" select-text="Blog Image"/>
									</div>
									<div class="col-md-12 py-4">
										<base-input
											class="blogtext"
											label="Blog Content"
											placeholder="Blog Content Goes Here..."
											:error="fieldErrors.content"
										>
											<ckeditor @ready="onEditorReady" :editor="ckeditor.editor" v-model="data.content" :config="ckeditor.editorConfig"></ckeditor>
										</base-input>
									</div>
									<div class="col-md-6">
										<h4 class="lead">Tags</h4>
										<tags-input v-model="data.tags"></tags-input>
									</div>
									<div class="col-md-6">
										<h4 class="lead">Categories</h4>
										<tags-input v-model="data.categories" placeholder="Add new Category"></tags-input>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12 pt-5" v-if="formErrors.length">
										<p class="text-right text-rtl">
											<b>لطفا اشتباهات زیر را تصحیح کنید:</b>
											<ul>
												<li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
											</ul>
										</p>
									</div>
								</div>
							</div>
						</div>
						<div class="mt-5 pull-right">
							<base-button class="px-5" native-type="submit" :loading="loading" type="primary">
								<span v-if="data.id">Edit</span>
								<span v-else>Create</span>
								<span class="pl-1"> Blog</span>
							</base-button>
							<base-button class="ml-1 px-5" native-type="button" type="default" v-if="data.id" @click="reset"> reset </base-button>
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
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Autocomplete from 'vuejs-auto-complete';
import backend from '../../../backend';
import Axios from 'axios';
const CancelToken = Axios.CancelToken;
const source = CancelToken.source();

export default {
	props: [
		'id',
		'name',
		'image',
		'content',
		'author',
		'tags',
		'categories',
	],
	components: {
		[Option.name]: Option,
		[Select.name]: Select,
		ImageUpload,
		TagsInput,
		ckeditor: CKEditor.component,
		Autocomplete,
	},
	data() {
		return {
			loading: false,
			fieldErrors: {},
			formErrors: {},
			imageFile: {},
			ckeditor: {
				editor: ClassicEditor,
				editorConfig: {},
			},
			data: {
				id: undefined,
				name: "",
				content: "",
				author: this.$root.$data.user.id,
				authorName: this.$root.$data.user.name,
				tags: [],
				categories: [],
			}
		};
	},
	methods: {
		onImageChange(file) {
			this.imageFile = file;
		},
		submitFormListener(e) {
			e.preventDefault();
			let haveError = false;
			if (! this.data.name) {
				this.fieldErrors.name = 'نام پست مورد نیاز است';
				haveError = true;
			}
			if (! this.data.author) {
				this.fieldErrors.author = 'نویسنده پست مورد نیاز است';
				haveError = true;
			}
			if (! this.data.tags.length) {
				this.$notify({
					type: 'danger',
					message: 'تگ های پست مورد نیاز است',
					icon: 'tim-icons icon-bell-55'
				});
				haveError = true;
			}
			if (! this.data.categories.length) {
				this.$notify({
					type: 'danger',
					message: 'دسته بندی های پست مورد نیاز است',
					icon: 'tim-icons icon-bell-55'
				});
				haveError = true;
			}
			if (haveError) {
				return;
			}
			let data = {};
			if (this.imageFile instanceof File) {
				data = new FormData();
				data.append("image", this.imageFile);
				data.append("name", this.data.name);
				data.append("author", this.data.author);
				data.append("tags", this.data.tags);
				data.append("content", this.data.content);
				data.append("categories", this.data.categories);
			} else {
				data = {
					name: this.data.name,
					author: this.data.author,
					content: this.data.content,
					tags: this.data.tags,
					categories: this.data.categories,
				};
			}
			this.loading = true;
			const errorHandler = (response) => {
				if (response && response.data && response.data.status === "error") {
					this.formErrors = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
					return;
				};
			}
			const requestURL = this.id ? `admin/blog/posts/${this.id}/edit` : 'admin/blog/posts/add';
			backend.post(requestURL, data).then(response => {
				this.loading = false;
				if (response.data.status === "error") {
					errorHandler(response);
					return;
				}
				this.$notify({
					type: 'success',
					message: this.id ? `پست با موفقیت ویرایش شد.` : 'پست با موفقیت اضافه شد.',
					icon: 'tim-icons icon-bell-55'
				});
				this.$emit('post', response.data.post);
				this.reset();
			}).catch((error) => {
				this.loading = false;
				errorHandler(error.response);
			});
		},
		onSelectUser(item) {
			this.data.author = item.value;
		},
		reset() {
			this.data.id = undefined;
			this.data.name = "";
			this.data.content = "";
			this.data.author = this.$root.$data.user.id;
			this.data.authorName = this.$root.$data.user.name;
			this.data.tags = [];
			this.data.categories = [];
			this.fieldErrors = {};
			this.formErrors = {};
			this.$emit('reset');
		},
		onEditorReady(editor) {
			editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
				class ImageUploadAdapter {
					constructor(loader) {
						this.loader = loader
					}
					upload() {
						const uploader = (file) => {
							return new Promise((resolve, reject) => {
								const data = new FormData();
								data.append("file", file);
								backend.post("admin/blog/images/upload", data, {
									CancelToken: source.token,
									onUploadProgress: progressEvent => {
										loader.uploadTotal = progressEvent.total;
										loader.uploaded = progressEvent.loaded;
									},
								}).then(response => {
									resolve({
										default: response.data.image,
									});
								}, reject);
							});
						};
						return loader.file.then( uploader );
					}
					abort() {
						source.cancel();
					}
				}
				return new ImageUploadAdapter( loader );
			};
		}
	},
	watch: {
		id: function(newValue) {
			this.fieldErrors = {};
			this.formErrors = {};
			this.data.id = newValue;
		},
		name: function(newValue) {
			this.data.name = newValue;
		},
		content: function(newValue) {
			this.data.content = newValue;
		},
		author: function(newValue) {
			if (newValue == undefined) {
				this.data.author = this.$root.$data.user.id;
				this.data.authorName = this.$root.$data.user.name;
			} else {
				this.data.author = newValue.id;
				this.data.authorName = newValue.name;
			}
		},
		tags: function(newValue) {
			this.data.tags = newValue;
		},
		categories: function(newValue) {
			this.data.categories = newValue;
		}
	},
};
</script>

<style lang="scss">
.autocomplete {
	background: transparent;
	.autocomplete__box {
		background: transparent;
		border-color: #2b3553;
		border-radius: 0.4285rem;
		font-size: 0.75rem;
		-webkit-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
		transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out, background-color 0.3s ease-in-out;
	}
	.autocomplete__results {
		.autocomplete__results__item {
			color: #333;
		}
	}
}
.ck-editor__editable {
    min-height: 320px;
}
</style>