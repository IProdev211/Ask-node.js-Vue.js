<template>
	<div class="row text-ltr">
		<div class="col-md-12">
			<card class="stacked-form" title="Stacked Form">
				<h4 slot="header" class="card-title">
					<span class="font-weight-bold pr-1">
						<span v-if="data.id">Edit</span>
						<span v-else>Add</span>
					</span> Episode
				</h4>
				<form @submit="submitFormListener">
					<div>
						<div class="row py-4">
							<div class="col-md-3">
								<base-input
									label="Episode Name"
									placeholder="Episode Name"
									:error="fieldErrors.title"
									v-model="data.title"
								>
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input
									label="Video Length"
									placeholder="Length"
									:error="fieldErrors.time"
									v-model="data.time"
								>
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input
									label="Unit No."
									placeholder="No."
									:error="fieldErrors.number"
									v-model="data.number"
								>
								</base-input>
							</div>
							<div class="col-md-5">
								<base-input
									label="Video Link"
									placeholder="Video Link"
									:error="fieldErrors.videoUrl"
									v-model="data.videoUrl"
								>
								</base-input>
							</div>
							<div class="col-md-12 py-3">
								<base-input
								label="Unit Description (CKEditor 5)"
								placeholder="Unit Description"
								v-model="data.body"
								:error="fieldErrors.body"
								>
									<ckeditor :editor="ckeditor.editor" v-model="data.body" :config="ckeditor.editorConfig"></ckeditor>
								</base-input>
							</div>
							<div class="col-md-2">
								<base-input
									label="xP Points"
									placeholder="xP"
									v-model="data.xp"
									:error="fieldErrors.xp"
								>
								</base-input>
							</div>
							<div class="col-md-5 pt-4">
								<el-select
									class="select-primary"
									size="large"
									placeholder="Unit Type"
									v-model="data.type"
									:error="fieldErrors.type"
								>
									<el-option
										v-for="option in selects.CourseType"
										class="select-primary"
										:value="option.value"
										:label="option.label"
										:key="option.label"
									></el-option>
								</el-select>
							</div>
							<div class="col-md-3">
								<div class="form-group has-label">
									<label> Related Course  </label>
									<autocomplete
										source="/api/v1/admin/courses?filter="
										results-property="docs"
										:initialValue="data.course"
										:initialDisplay="data.courseName"
										resultsDisplay="title"
										v-model="data.course"
										:placeholder="data.courseName || 'Search'"
										@selected="onSelectCourse"
										input-class="form-control">
									</autocomplete>
								</div>
							</div>
						</div>
						<div class="col-md-12 pt-5" v-if="formErrors.length">
							<p class="text-right text-rtl">
								<b>لطفا اشتباهات زیر را تصحیح کنید:</b>
								<ul>
									<li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
								</ul>
							</p>
						</div>
						<div class="mt-5 pull-right">
							<base-button class="px-5" native-type="submit" type="primary" :loading="loading">
								<span v-if="data.id">Edit</span>
								<span v-else>Create</span>
								<span class="ml-1">Episode</span>
							</base-button>
							<base-button class="px-5 ml-1" native-type="button" @click="reset" type="default" v-if="data.id"> reset </base-button>
						</div>
					</div>
				</form>
			</card>
		</div>
	</div>
</template>

<script>
import { Select, Option } from 'element-ui';
import Autocomplete from 'vuejs-auto-complete';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import backend from '../../../backend';

export default {
	props: [
		'id',
		'title',
		'time',
		'number',
		'videoUrl',
		'body',
		'xp',
		'type',
		'course',
	],
	components: {
		[Option.name]: Option,
		[Select.name]: Select,
		Autocomplete,
		ckeditor: CKEditor.component,
	},
	data() {
		return {
			ckeditor: {
				editor: ClassicEditor,
				editorConfig: {
					toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
				},
			},
			selects: {
				CourseType: [
					{ value: 'Paid', label: 'Paid' },
					{ value: 'VIP', label: 'VIP' },
					{ value: 'Free', label: 'Free' }
				],
			},
			data: {
				id: undefined,
				title: "",
				time: 0,
				number: 1,
				videoUrl: "",
				body: "",
				xp: 0,
				type: "",
				course: "",
				courseName: "",
			},
			fieldErrors: {},
			formErrors: {},
			loading: false,
		};
	},
	methods: {
		submitFormListener(e) {
			e.preventDefault();
			let haveError = false;
			if (! this.data.title) {
				this.fieldErrors.title = 'نام درس مورد نیاز است.';
				haveError = true;
			}
			if (! this.data.time || this.data.time <= 0) {
				this.fieldErrors.time = 'مدت زمان درس مورد نیاز است.';
				haveError = true;
			}
			if (! this.data.number || this.data.number <= 0) {
				this.fieldErrors.number = 'شماره درس مورد نیاز است.';
				haveError = true;
			}
			if (! this.data.videoUrl) {
				this.fieldErrors.videoUrl = 'آدرس اینترنتی درس مورد نیاز است.';
				haveError = true;
			}
			if (! this.data.body) {
				this.fieldErrors.body = 'توضیحات درس مورد نیاز است.';
				haveError = true;
			}
			if (this.data.xp < 0) {
				this.fieldErrors.xp = 'امتیاز درس مورد نیاز است.';
				haveError = true;
			}
			if (! this.data.type) {
				this.fieldErrors.type = 'نوع درس مورد نیاز است.';
				this.$notify({
					type: 'warning',
					message: 'نوع درس مورد نیاز است.',
					icon: 'tim-icons icon-bell-55'
				});
				haveError = true;
			}
			if (! this.data.course) {
				this.fieldErrors.course = 'دوره درس مورد نیاز است.';
				this.$notify({
					type: 'warning',
					message: 'دوره درس مورد نیاز است.',
					icon: 'tim-icons icon-bell-55'
				});
				haveError = true;
			}
			if (haveError) {
				return;
			}
			this.loading = true;
			const errorHandler = (response) => {
				if (response && response.data && response.data.status === "error") {
					this.formErrors = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
					return;
				};
			}
			const url = this.id ? `admin/episodes/${this.id}/edit` : `admin/episodes/add`
			backend.post(url, this.data).then(response => {
				this.loading = false;
				if (response.data.status === "error") {
					errorHandler(response);
					return;
				}
				this.$notify({
					type: 'success',
					message: this.id ? `درس با موفقیت ویرایش شد.` : 'درس با موفقیت اضافه شد.',
					icon: 'tim-icons icon-bell-55'
				});
				this.$emit('episode', response.data.episode);
				this.reset();
			}).catch(err => {
				this.loading = false;
				errorHandler(err.message);
			});
		},
		onSelectCourse(item) {
			this.data.course = item.value;
			backend.post(`/admin/courses/${this.data.course}/insert/episode/number`).then(response => {
				this.data.number = response.data.number;
				
			});
		},
		reset() {
			this.data.id = undefined;
			this.data.title = "";
			this.data.time = 0;
			this.data.number = 1;
			this.data.videoUrl = "";
			this.data.body = "";
			this.data.xp = 0;
			this.data.type = "";
			this.data.course = "";
			this.data.courseName = "";
			this.fieldErrors = {};
			this.formErrors = {};
			this.$emit('reset');
		},
	},
	watch: {
		id: function(value) {
			this.formErrors = {};
			this.fieldErrors = {};
			this.data.id = value;
		},
		title: function(value) {
			this.data.title = value;
		},
		time: function(value) {
			this.data.time = value;
		},
		number: function(value) {
			this.data.number = value;
		},
		videoUrl: function(value) {
			this.data.videoUrl = value;
		},
		body: function(value) {
			this.data.body = value;
		},
		xp: function(value) {
			this.data.xp = value;
		},
		type: function(value) {
			this.data.type = value;
		},
		course: function(value) {
			if (value === undefined) {
				this.data.course = "";
				this.data.courseName = "";
			} else {
				this.data.course = value.id;
				this.data.courseName = value.title;
			}
		},
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
    min-height: 500px;
}
.ck.ck-editor__main > .ck-content  {
	background: transparent;
	* {
		color: #fff;
	}
}
</style>

