<template>
	<div class="row text-ltr">
		<div class="col-md-12">
			<card class="stacked-form" title="Stacked Form">
				<h4 slot="header" class="card-title">
					<span class=" pr-1">
						<span v-if="data.id">Edit</span>
						<span v-else>Add</span>
					</span> User
				</h4>
				<form @submit="checkForm" autocomplete="off">
					<div>
						<div class="row pt-2">
							<div class="col-md-12">
								<div class="row">
									<div class="text-center col-md-12">
										<div class="pb-4">
											<img class="avatar" :src="data.avatar || 'img/default-avatar.png'" alt="Users Profile Image">
										</div>
										<div class="py-4">
											<image-upload @change="onImageChange" :select-text="data.id ? 'Edit User Image' : 'Set User Image'"/>
										</div>
									</div>
									<div class="col-md-4">
										<base-input
										label="Edit User Full Name"
										placeholder="User Full Name"
										v-model="data.name"
										autocomplete="off"
										:error="fieldErrors.name">
										</base-input>
									</div>
									<div class="col-md-3">
										<base-input
										label="Edit User Email"
										placeholder="User Email"
										v-model="data.email"
										autocomplete="off"
										:error="fieldErrors.email">
										</base-input>
									</div>
									<div class="col-md-3">
										<base-input
										label="Edit User Password"
										placeholder="User Password"
										type="password"
										autocomplete="off"
										v-model="data.password"
										:error="fieldErrors.password"
										>
										</base-input>
									</div>
									<div class="col-md-2">
										<base-input
										label="Edit User xP Points"
										placeholder="xP"
										autocomplete="off"
										v-model="data.xp"
										:error="fieldErrors.xp"
										>
										</base-input>
									</div>

									<div class="col-md-2">
										<base-input
										label="VIP Valid From"
										placeholder="VIP Valid From"
										v-model="data.vipFrom"
										:error="fieldErrors.vipFrom"
										>
										</base-input>
									</div>
									
									<div class="col-md-2">
										<base-input
										label="VIP Valid To"
										placeholder="VIP Valid To"
										v-model="data.vipTime"
										:error="fieldErrors.vipTime"
										>
										</base-input>
									</div>

									<div class="col-md-4">
										<div class="form-group has-label">
											<label> Enroll Student on ... Course:  </label>
											<autocomplete
												source="/api/v1/admin/courses?filter="
												results-property="docs"
												@selected="onSelectCourse"
												resultsDisplay="title"
												placeholder="Select Course for student to be enrolled on.."
												input-class="form-control">
											</autocomplete>
										</div>
									</div>

									<div class="col-md-4">
										<base-input
										label="Enroll Student on ... Quiz:"
										placeholder="Select Quiz for student to be enrolled on..."
										>
										</base-input>
									</div>

									
									<div class="col-md-12 pt-5" v-if="formErrors.length">
										<p class="text-right text-rtl">
											<b>لطفا اشتباهات زیر را تصحیح کنید:</b>
											<ul>
												<li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
											</ul>
										</p>
									</div>

									<div class="col-md-2">
										<base-checkbox class="mb-3" v-model="data.active">
    										Activate User Account
										</base-checkbox>
									</div>

									<!-- User Stats  -->
									<div class="container pt-4">
										<!-- Enrolled Courses -->
										<div>
											<p class="enrolled-on">Courses Enrolled On:</p>
											<ul v-if="data.learning.length">
												<li v-for="(course, index) in data.learning" :key="course.id" class="enrolled-course">
													{{ course.title }}
													<span>{{ date(course.signupDate) }}</span>
													<base-button class="ml-1 p-1" native-type="button" type="danger" @click="removeCourse(index)"> <i class="fas fa-times"></i> </base-button>
												</li>
											</ul>
											<p class="text-light" v-else> - </p>
										</div>

										<!-- VIP Membership -->
										<div class="pt-4">
											<p class="vip-on">VIP Member:</p>
											<p class="vip-status" v-if="data.vipTime">
												From:
												<span class="pr-4">{{ vipFromDate() }}</span>
												To:
												<span>{{ vipToDate() }}</span>
											</p>
											<p class="text-light" v-else> - </p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="mt-5 pull-right">
							<base-button class="px-5" native-type="submit" type="primary">
								<span class="mr-1">
									<span v-if="data.id">Edit</span>
									<span v-else>Create</span>
								</span> User
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
import { ImageUpload } from 'src/components/index';
import moment from "moment";
import backend from "../../../backend";
import Autocomplete from 'vuejs-auto-complete';
import Swal from 'sweetalert';

export default {
	props: [
		'id',
		'avatar',
		'name',
		'email',
		'xp',
		'learning',
		'vipTime',
		'vipFrom',
		"active",
	],
	components: {
		[Option.name]: Option,
		[Select.name]: Select,
		ImageUpload,
		Autocomplete
	},
	data() {
		return {
			image: {},
			data: {
				id: undefined,
				avatar: undefined,
				name: undefined,
				email: "",
				password: "",
				xp: undefined,
				learning: [],
				vipTime: undefined,
				vipFrom: undefined,
				course: undefined,
				active: false,
			},
			fieldErrors: {},
			formErrors: {},
		};
	},
	methods: {
		onImageChange(file) {
			this.image = file;
			if (file instanceof File) {
				var reader = new FileReader();
				const that = this;
				reader.onload = function(e) {
					that.data.avatar = e.target.result;
				}
				reader.readAsDataURL(file);
			} else {
				this.data.avatar = this.avatar ? this.avatar : undefined;
			}
		},
		date(time) {
			return moment(time).format('DD/MM/YYYY');
		},
		reset() {
			this.data.id = undefined;
			this.data.name = "";
			this.data.email = "";
			this.data.avatar = "";
			this.data.password = "";
			this.data.xp = 0;
			this.data.learning = [];
			this.data.vipTime = "";
			this.data.vipFrom = "";
			this.data.active = false;
			this.image = undefined;
			this.$emit("reset");
		},
		vipFromDate() {
			return moment(this.data.vipFrom).format('DD/MM/YYYY');
		},
		vipToDate() {
			return moment(this.data.vipTime).format('DD/MM/YYYY');
		},
		checkForm(e) {
			e.preventDefault();
			this.fieldErrors = {};
			this.formErrors = [];
			let haveError = false;
			if (!this.data.name) {
				this.fieldErrors.name = 'نام کاربر مورد نیاز است';
				haveError = true;
			}
			if (!this.data.email) {
				this.fieldErrors.email = 'ایمیل مورد نیاز است';
				haveError = true;
			}
			if (!this.data.password && !this.data.id) {
				this.fieldErrors.email = 'کلمه عبور مورد نیاز است';
				haveError = true;
			}
			if (this.data.vipTime) {
				if (! moment(this.data.vipTime, 'YYYY/MM/DD').isValid()) {
					this.fieldErrors.vipTime = 'مقدار وارد شده نامعتبر است.';
					haveError = true;
				}
			}
			if (this.data.vipFrom) {
				if (! moment(this.data.vipFrom, 'YYYY/MM/DD').isValid()) {
					this.fieldErrors.vipFrom = 'مقدار وارد شده نامعتبر است.';
					haveError = true;
				}
			}
			if (this.data.vipTime && this.data.vipFrom) {
				if (moment(this.data.vipFrom).isAfter(this.data.vipTime)) {
					this.fieldErrors.vipTime = 'مقدار وارد شده نامعتبر است.';
					haveError = true;
				}
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
			let data = {};
			const courses = [];
			for (const course of this.data.learning) {
				courses.push(course.id);
			}
			if (this.image instanceof File) {
				data = new FormData();
				data.append("name", this.data.name);
				data.append("email", this.data.email);
				data.append("xp", this.data.xp !== undefined ? this.data.xp : 0);
				data.append("avatar", this.image);
				if (this.data.password) {
					data.append("password", this.data.password);
				}
				data.append("vipTime", this.data.vipTime);
				data.append("vipFrom", this.data.vipFrom);
				data.append("active", this.data.active);
				data.append("courses", courses);
			} else {
				data = {
					name: this.data.name,
					email: this.data.email,
					vipTime: this.data.vipTime,
					vipFrom: this.data.vipFrom,
					xp: this.data.xp !== undefined ? this.data.xp : 0,
					active: this.data.active,
					courses: courses,
				};
				if (this.data.password) {
					data.password = this.data.password;
				}
			}
			
			const requestUrl = this.data.id !== undefined ? `/admin/users/${this.id}/edit` : "/admin/users/create";
			backend.post(requestUrl, data).then((response) => {
				this.loading = false;
				if (response.data.status === "error") {
					errorHandler(response);
					return;
				}
				this.$notify({
					type: 'success',
					message: this.id ? `کاربر با موفقیت ویرایش شد.` : 'کاربر با موفقیت اضافه شد.',
					icon: 'tim-icons icon-bell-55'
				});
				this.$emit('user', response.data.data.user);
				this.reset();
			}).catch((error) => {
				this.loading = false;
				errorHandler(error.response);
			});
		},
		onSelectCourse(item) {
			if (! this.data.learning) {
				this.data.learning = [];
			}
			let found = false;
			for (const course of this.data.learning) {
				if (course.id === item.value) {
					Swal({
						title: 'User purchased this course before!',
						className: 'text-ltr',
						icon: 'error'
					});
					found = true;
					break;
				}
			}
			if (! found) {
				this.data.learning.push({
					id: item.value,
					title: item.display,
					signupDate: (new Date()).toISOString(),
				});
			}
		},
		removeCourse(index) {
			if (this.data.learning[index] === undefined) {
				return;
			}
			const course = this.data.learning[index];
			Swal({
				title: 'Delete this Course',
				text: ``,
				className: 'text-ltr',
				icon: 'warning',
				buttons: {
				catch: {
					text: 'Yes, delete it!',
					value: true
				},
				cancel: 'Cancel'
				}
			}).then(result => {
				if (! result) return;
				
				this.data.learning.splice(index, 1);
			});
		},
	},
	watch: {
		id: function(newValue, oldValue) {
			this.formErrors = [];
			this.data.id = newValue;
		},
		name: function(newValue, oldValue) {
			this.data.name = newValue;
		},
		email: function(newValue, oldValue) {
			this.data.email = newValue;
		},
		avatar: function(newValue, oldValue) {
			this.data.avatar = newValue;
		},
		password: function(newValue, oldValue) {
			this.data.password = newValue;
		},
		xp: function(newValue, oldValue) {
			this.data.xp = newValue;
		},
		learning: function(newValue, oldValue) {
			this.data.learning = newValue !== undefined ? newValue : [];
		},
		vipTime: function(newValue, oldValue) {
			if (newValue === undefined) {
				this.data.vipTime = undefined;
				return;
			}
			this.data.vipTime = moment(newValue).format('YYYY/MM/DD');
		},
		vipFrom: function(newValue, oldValue) {
			if (newValue === undefined) {
				this.data.vipTime = undefined;
				return;
			}
			this.data.vipFrom = moment(newValue).format('YYYY/MM/DD');
		},
		active: function(val, oldValue) {
			this.data.active = val;
		},
	}
};
</script>


<style lang="scss">
.enrolled-on {
	font-size: 1rem;
}
.enrolled-course {
	padding-top: 10px;
	span {
		font-size: 0.8rem;
		padding-left: 10px;
		color: rgb(165, 165, 165);
	}
}

.vip-on {
	font-size: 1rem;
}
.vip-status {
	padding-top: 10px;
	span {
		padding-left: 3px;
		color: rgb(161, 161, 161);
	}
}
.card {
	.avatar {
		width: 64px;
		height: 64px;
	}
}
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

</style>
