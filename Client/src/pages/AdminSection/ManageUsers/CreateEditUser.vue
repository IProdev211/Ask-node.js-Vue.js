<template>
	<div class="row text-ltr">
		<div class="col-md-12">
			<card class="stacked-form" title="Stacked Form">
				<h4 slot="header" class="card-title">
					<span class="font-weight-bold pr-1">
						<span v-if="data.id">Edit</span>
						<span v-else>Add</span>
					</span> User
				</h4>
				<form @submit="checkForm">
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
									<div class="col-md-3">
										<base-input
										label="Edit User Full Name"
										placeholder="User Full Name"
										v-model="data.name"
										:error="fieldErrors.name">
										</base-input>
									</div>
									<div class="col-md-3">
										<base-input
										label="Edit User Email"
										placeholder="User Email"
										v-model="data.email"
										:error="fieldErrors.email">
										</base-input>
									</div>
									<div class="col-md-2">
										<base-input
										label="Edit User Password"
										placeholder="User Password"
										type="password"
										v-model="data.password"
										:error="fieldErrors.password"
										>
										</base-input>
									</div>
									<div class="col-md-2">
										<base-input
										label="Edit User xP Points"
										placeholder="xP"
										v-model="data.xp"
										:error="fieldErrors.xp"
										>
										</base-input>
									</div>

									<div class="col-md-2 py-4">
										<el-select
											class="select-primary text-ltr"
											size="large"
											placeholder="VIP Access"
											v-model="selects.simple"
										>
											<el-option
												v-for="option in selects.CourseType"
												class="select-primary text-ltr"
												:value="option.value"
												:label="option.label"
												:key="option.label"
											></el-option>
										</el-select>
									</div>
									<div class="col-md-12 pt-5" v-if="formErrors.length">
										<p class="text-right text-rtl">
											<b>لطفا اشتباهات زیر را تصحیح کنید:</b>
											<ul>
												<li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
											</ul>
										</p>
									</div>
									<!-- User Stats  -->
									<div class="container pt-4">
										<!-- Enrolled Courses -->
										<div v-if="data.learning.length">
											<p class="enrolled-on font-weight-bold">Courses Enrolled On:</p>
											<ul>
												<li v-for="course of data.learning" :key="course" class="enrolled-course">
													{{ course.title }}
													<span>{{ date(course.signupDate) }}</span>
												</li>
											</ul>
										</div>

										<!-- VIP Membership -->
										<div class="pt-4" v-if="data.vipTime">
											<p class="vip-on font-weight-bold">VIP Member:</p>
											<p class="vip-status">
												From:
												<span class="pr-4">{{ vipFromDate() }}</span>
												To:
												<span>{{ vipToDate() }}</span>
											</p>
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

export default {
	props: [
		'id',
		'avatar',
		'name',
		'email',
		'xp',
		'learning',
		'vipTime',
	],
	components: {
		[Option.name]: Option,
		[Select.name]: Select,
		ImageUpload
	},
	data() {
		return {
			image: {},
			selects: {
				simple: '',
				CourseType: [
					{ value: '1-Month VIP', label: '1-Month Access' },
					{ value: '2-Month VIP', label: '2-Month Access' },
					{ value: '3-Month VIP', label: '3-Month Access' }
				],
				multiple: 'ARS'
			},
			data: {
				id: undefined,
				avatar: undefined,
				name: undefined,
				email: "",
				password: "",
				xp: undefined,
				learning: [],
				vipTime: undefined,
			},
			isVIP: false,
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
			return moment(time).format('MM/DD/YYYY');
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
			this.image = undefined;
			this.$emit("reset");
		},
		vipFromDate() {
			return moment(this.data.vipTime).subtract(1, 'months').format('MM/DD/YYYY');
		},
		vipToDate() {
			return moment(this.data.vipTime).format('MM/DD/YYYY');
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
			if (this.image instanceof File) {
				data = new FormData();
				data.append("name", this.data.name);
				data.append("email", this.data.email);
				data.append("xp", this.data.xp !== undefined ? this.data.xp : 0);
				data.append("avatar", this.image);
				if (this.data.password) {
					data.append("password", this.data.password);
				}
			} else {
				data = {
					name: this.data.name,
					email: this.data.email,
					xp: this.data.xp !== undefined ? this.data.xp : 0,
				};
				if (this.data.password) {
					data.password = this.data.password;
				}
			}
			
			const requestUrl = this.id !== undefined ? `/admin/users/${this.id}/edit` : "/admin/users/create";
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
				this.reset();
				this.$emit('user', response.data.data.user);
			}).catch((error) => {
				this.loading = false;
				errorHandler(error.response);
			});
		},
	},
	watch: {
		id: function(newValue, oldValue) {
			thid.formErrors = [];
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
			this.data.vipTime = newValue;
			this.isVIP = (this.data.vipTime && new Date(this.data.vipTime) > new Date())
		},
	}
};
</script>


<style lang="scss" scoped>
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
</style>
