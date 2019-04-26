<template>
	<div class="row text-ltr">
		<div class="col-md-12">
			<card class="stacked-form">
				<h4 slot="header" class="card-title">
					<span class="font-weight-bold pr-1">
						<span v-if="id">Edit</span>
						<span v-else>Add</span>
					</span> Course
				</h4>
				<form @submit="checkForm">
					<div>
						<div class="row">
							<div class="col-md-3">
								<base-input
									label="Course Name"
									placeholder="Course Name"
									v-model="title"
									:required="true" 
									:error="fieldErrors.email">
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input
									label="Course Price"
									placeholder="Course Price"
									v-model="price"
									:required="true" 
									:error="fieldErrors.price">
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input label="Old Price" placeholder="Old Price" v-model="oldPrice"></base-input>
							</div>
							<div class="col-md-2">
								<base-input label="xP" placeholder="xP" v-model="xp"></base-input>
							</div>
							<div class="col-md-3 pt-4">
								<el-select
									class="select-primary"
									size="large"
									label="Course Type"
									placeholder="Course Type"
									v-model="type"
									@change="changeTypeListener"
									:required="true" 
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
							<div class="col-md-12 py-3">
								<base-input
									class="coursetext"
									label="Course Text (CKEditor 5)"
									placeholder="Course Text"
									:required="true" 
									:error="fieldErrors.body">
									<ckeditor :editor="ckeditor.editor" v-model="body" :config="ckeditor.editorConfig"></ckeditor>
								</base-input>
							</div>
							<div class="col-md-5 pt-3">
								<h4 class="lead">Tags</h4>
								<tags-input v-model="tags"></tags-input>
							</div>
							<div class="col-md-4 pt-5">
								<image-upload
									@change="onImageChange"
									select-text="Course Image"/>
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
								<span v-if="id">Edit </span> <span v-else>Create </span> <span class="ml-1">Course</span>
							</base-button>
							<base-button class="ml-2 px-5" native-type="button" @click="reset" type="light" v-if="id">
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
			images: {
				regular: null,
				avatar: null
			},
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
		};
	},
	methods: {
		onImageChange(file) {
			this.images = file;
		},
		checkForm(e) {
			e.preventDefault();
			this.fieldErrors = {};
			this.formErrors = [];
			let haveError = false;
			if (!this.title) {
				this.fieldErrors.title = 'عنوان مورد نیاز است';
				haveError = true;
			}
			if (!this.type) {
				this.fieldErrors.type = 'نوع درس مشخص نشده است';
				haveError = true;
			}
			if (this.type == "Free") {
				this.price = 0;
			} else if (!this.price) {
				this.fieldErrors.price = 'قیمت درس مشخص نشده است';
				haveError = true;
			}
			if (!this.body) {
				this.fieldErrors.body = 'توضیحات درس مورد نیاز است';
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
			data.append("title", this.title);
			data.append("type", this.type);
			data.append("price", this.price);
			data.append("images", this.images);
			data.append("body", this.body);
			data.append("tags", this.tags.join(" "));
			const requestUrl = this.id !== undefined ? `/courses/${this.id}/edit` : "/courses/create";
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
				this.reset();
				this.$emit('course', response.data.data.course);
			}).catch((error) => {
				this.loading = false;
				errorHandler(error.response);
			});
		},
		reset() {
			this.id = undefined;
			this.title = "";
			this.images = "";
			this.type = "";
			this.body = "";
			this.price = "";
			this.tags = "";
		},
		changeTypeListener(type) {
			if (type.toLowerCase() == "free") {
				this.price = 0;
			}
		}
	}
};
</script>

<style scoped></style>
