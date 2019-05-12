<template>
	<div class="row text-ltr">
		<div class="col-md-12">
			<card class="stacked-form">
				<h4 slot="header" class="card-title">
					<span class="font-weight-bold pr-1">
						<span v-if="data.id">Edit</span>
						<span v-else>Add</span>
					</span> Course
				</h4>
				<form @submit="checkForm">
					<div>
						<div class="row">
								<div class="col-md-3 align-self-center">
								<img class="img-thumbnail img-fluid rounded mx-auto d-block image-preview" :src="data.imagepreview || 'img/placeholder.jpg'" alt="Course Image">
							</div>
							<div class="col-md-3">
								<base-input
									label="Course Name"
									placeholder="Course Name"
									v-model="data.title"
									:required="true" 
									:error="fieldErrors.title">
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input
									label="Course Price"
									placeholder="Course Price"
									v-model="data.price"
									:required="true" 
									:error="fieldErrors.price">
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input label="Old Price" placeholder="Old Price" v-model="data.oldPrice"></base-input>
							</div>
							<div class="col-md-2">
								<base-input label="xP" placeholder="xP" v-model="data.xp"></base-input>
							</div>
						
							<div class="col-md-12 py-5">
								<base-input
									class="coursetext"
									label="Course Text"
									placeholder="Course Text"
									:required="true" 
									:error="fieldErrors.body">
									<ckeditor :editor="ckeditor.editor" v-model="data.body" :config="ckeditor.editorConfig"></ckeditor>
								</base-input>
							</div>
								<div class="col-md-3 pt-4">
								<el-select
									class="select-primary"
									size="large"
									label="Course Type"
									placeholder="Course Type"
									v-model="data.type"
									@change="changeTypeListener"
									:error="fieldErrors.type">
									<el-option
										v-for="option in selects.CourseType"
										class="select-primary"
										v-model="option.value"
										:label="option.label"
										:key="option.label"
									></el-option>
								</el-select>
							</div>
							<div class="col-md-5">
								<base-input
									label="Course Introduction Video"
									v-model="data.videoUrl"
									placeholder="Video Link...">
								</base-input>
							</div>
							<div class="col-md-4 ">
								<h4 class="lead">Tags</h4>
								<tags-input v-model="data.tags"></tags-input>
							</div>
							<div class="col-md-3 pt-4">
								<image-upload
									@change="onImageChange"
									:select-text="data.id ? 'Edit Course Image' : 'Select Course Image'"
									change-text="Edit Course Image"
									/>
							</div>
							
							<div class="col-md-12 pt-5" v-if="formErrors.length">
								<p class="text-right text-rtl">
									<b>لطفا اشتباهات زیر را تصحیح کنید:</b>
									<ul>
										<li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
									</ul>
								</p>
							</div>
						</div>
						<div class="mt-5 pull-right">
							<base-button class="px-5" native-type="submit" type="primary">
								<span v-if="data.id">Edit </span> <span v-else>Create </span> <span class="ml-1">Course</span>
							</base-button>
							<base-button class="ml-2 px-5" native-type="button" @click="reset" type="light" v-if="data.id">
								reset
							</base-button>
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
import backend from "../../../backend";

export default {
	props: [
		'id',
		'title',
		'thumb',
		'type',
		'body',
		'price',
		'tags',
		'oldPrice',
		'xp',
		'videoUrl',
	],
	components: {
		[Option.name]: Option,
		[Select.name]: Select,
		ImageUpload,
		TagsInput,
		ckeditor: CKEditor.component,
	},
	data() {
		return {
			fieldErrors: {},
			formErrors: {},
			selects: {
				CourseType: [
					{ value: 'Paid', label: 'Paid' },
					{ value: 'VIP', label: 'VIP' },
					{ value: 'Free', label: 'Free' }
				],
				multiple: 'ARS',
			},
			ckeditor: {
				editor: ClassicEditor,
				editorConfig: {
					toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
				},
			},
			images: {},
			data: {
				id: undefined,
				title: "",
				thumb: "",
				type: "",
				body: "",
				price: 0,
				tags: [],
				oldPrice: 0,
				xp: 0,
				imagepreview: "",
				videoUrl: "",
			}
		};
	},
	methods: {
		onImageChange(file) {
			this.images = file;
			if (file instanceof File) {
				var reader = new FileReader();
				const that = this;
				reader.onload = function(e) {
					that.data.imagepreview = e.target.result;
				}
				reader.readAsDataURL(file);
			} else {
				this.data.imagepreview = this.thumb;
			}
		},
		checkForm(e) {
			e.preventDefault();
			this.fieldErrors = {};
			this.formErrors = [];
			let haveError = false;
			if (!this.data.title) {
				this.fieldErrors.title = 'عنوان مورد نیاز است';
				haveError = true;
			}
			if (!this.data.type) {
				this.$notify({
					type: 'warning',
					message: 'نوع دوره مشخص نشده است',
				});
				haveError = true;
			}
			if (this.data.type.toLowerCase() == "free") {
				this.data.price = 0;
			} else if (!this.data.price) {
				this.fieldErrors.price = 'قیمت دوره مشخص نشده است';
				haveError = true;
			}
			if (!this.data.body) {
				this.fieldErrors.body = 'توضیحات دوره مورد نیاز است';
				haveError = true;
			}
			if (!this.data.videoUrl) {
				this.fieldErrors.videoUrl = 'ویدئو معرفی دوره مورد نیاز است';
				haveError = true;
			}
			if (! this.images instanceof File) {
				this.$notify({
					type: 'warning',
					message: 'تصویر دوره مشخص نشده است',
				});
				haveError = true;
			}
			if (haveError) {
				return;
			}
			const errorHandler = (response) => {
				if (response && response.data && response.data.status === "error") {
					this.formErrors = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
					return;
				};
			}
			this.loading = true;
			const data = new FormData();
			data.append("title", this.data.title);
			data.append("type", this.data.type);
			data.append("price", this.data.price);
			data.append("oldPrice", this.data.oldPrice);
			data.append("images", this.images);
			data.append("body", this.data.body);
			data.append("videoUrl", this.data.videoUrl);
			data.append("tags", this.data.tags.join(" "));
			const requestUrl = this.id !== undefined ? `/admin/courses/${this.id}/edit` : "/admin/courses/create";
			backend.post(requestUrl, data).then((response) => {
				this.loading = false;
				if (response.data.status === "error") {
					errorHandler(response);
					return;
				}
				this.$notify({
					type: 'success',
					message: this.id ? `دوره با موفقیت ویرایش شد.` : 'دوره با موفقیت اضافه شد.',
					icon: 'tim-icons icon-bell-55'
				});
				this.$emit('course', response.data.data.course);
				this.reset();
			}).catch((error) => {
				this.loading = false;
				errorHandler(error.response);
			});
		},
		reset() {
			this.data.id = undefined;
			this.data.title = "";
			this.data.images = "";
			this.data.type = "";
			this.data.body = "";
			this.data.price = "";
			this.data.videoUrl = "";
			this.data.tags = [];
			this.data.imagepreview = "";
			this.$emit('reset');
		},
		changeTypeListener(type) {
			if (type.toLowerCase() == "free") {
				this.data.price = 0;
			} else if (this.price) {
				this.data.price = this.price;
			}
		},
	},
	watch: {
		id: function(newValue, oldValue) {
			this.formErrors = [];
			this.data.id = newValue;
		},
		title: function(newValue, oldValue) {
			this.data.title = newValue;
		},
		type: function(newValue, oldValue) {
			this.data.type = newValue;
		},
		body: function(newValue, oldValue) {
			this.data.body = newValue;
		},
		price: function(newValue, oldValue) {
			this.data.price = newValue;
		},
		oldPrice: function(newValue, oldValue) {
			this.data.oldPrice = newValue;
		},
		xp: function(newValue, oldValue) {
			this.data.xp = newValue;
		},
		tags: function(newValue, oldValue) {
			this.data.tags = newValue;
		},
		thumb: function(value) {
			this.data.imagepreview = value;
		},
		videoUrl: function(value) {
			this.data.videoUrl = value;
		},
	}
};
</script>

<style lang="scss">
.image-preview {
	width: 200px;
	height: 200px;
}
.ck-editor__editable {
    min-height: 150px;
}
.ck.ck-editor__main > .ck-content  {
	background: transparent;
	* {
		color: #fff;
	}
}
</style>
