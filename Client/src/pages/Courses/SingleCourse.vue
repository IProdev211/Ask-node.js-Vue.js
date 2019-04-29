<template>
	<div>
		<div class="row" v-if="course.id">
			<!-- Video Section -->
			<div class="col-md-12 card-background card-body text-center my-3">
				<div class="row">
					<!-- Course Info DIV  -->
					<div class="col-lg-3 col-md-12 col-sm-12 mb-3 container">
						<div class="hover m-widget7 m-widget7--skin-dark infoBox">
							<!-- COURSE HEADER / LEARNING OBJECTIVES -->
							<div class="head-section px-3">
								<p class="course-title font-weight-bold pt-3">{{ course.title }}</p>

								<p class="lead" v-html="course.body"></p>
							</div>
							<hr>
							<div class="head-section purchase-status px-3">
								<p v-if="! notEnrolled || course.type.toLowerCase() == 'free'" class="text-success">
									شما به طور کامل به این دوره دسترسی دارید.
								</p>
								<p v-else-if="notEnrolled && course.type.toLowerCase() == 'paid'" class="text-danger">
									برای دسترسی به این درس لطفا لینک
									خرید را دنبال کنید.
								</p>
								<p v-else-if="notEnrolled && course.type.toLowerCase() == 'vip'" class="text-danger">
									برای دسترسی به این درس اکانت VIP تهیه کنید.
								</p>
							</div>

							<hr>
							<!-- COURSE CREATED AT -->
							<div class="d-flex justify-content-between px-3 pt-1">
								<div>
									<h5>
										<i class="tim-icons icon-badge pl-2"></i>ایجاد شده در:
									</h5>
								</div>
								<div>
									<h5 class="bold"> {{ getCourseCreatedAtDate() }} </h5>
								</div>
							</div>
							<!-- COURSE LENGTH -->
							<div class="d-flex justify-content-between px-3 pt-2">
								<div>
									<h5>
										<i class="tim-icons icon-watch-time pl-2"></i>طول دوره:
									</h5>
								</div>
								<div>
									<h5 class="bold">{{ course.time }}</h5>
								</div>
							</div>
							<!-- COURSE PRICE  -->
							<div v-if="notEnrolled" class="d-flex justify-content-between px-3 pt-1">
								<div>
									<h5>
										<i class="tim-icons icon-money-coins pl-2"></i>قیمت:
									</h5>
								</div>
								<div>
									<h5 class="bold">{{ getCoursePrice() }}</h5>
								</div>
							</div>

							<!-- COURSE VIEWS  -->
							<div class="d-flex justify-content-between px-3 pt-1">
								<div>
									<h5>
										<i class="tim-icons icon-single-02 pl-2"></i>تعداد شرکت کنندگان:
									</h5>
								</div>
								<div>
									<h5 class="bold">{{ enrolledCount }}</h5>
								</div>
							</div>

							<!-- COURSE INSTRUCTOR -->
							<div class="d-flex justify-content-between px-3 pt-1">
								<div>
									<h5>
										<i class="tim-icons icon-badge pl-2"></i>معلم:
									</h5>
								</div>
								<div>
									<h5 class="bold">{{ course.user.name }}</h5>
								</div>
							</div>
							<base-button v-if="notEnrolled && course.type.toLowerCase() == 'paid'" native-type="submit" class="btn-fill btn-success btn btn-sm">خرید</base-button>
						</div>
					</div>
					<div class="col-lg-9 col-md-12 col-sm-12 mb-3">
						<AllUnits :episodes="course.episodes"></AllUnits>
					</div>
				</div>
				<p class="card-description py-3">
					"The only person who is educated is the one who has learned how to
					learn and change - Carl Rogers"
				</p>
			</div>
		</div>
	</div>
</template>
<script>
import AllUnits from '../SingleLesson/Components/AllUnits.vue';
import moment from "moment";
import backend from '../../backend';

export default {
	components: {
		AllUnits,
	},
	data() {
		return {
			notEnrolled: true,
			enrolledCount: 0,
			course: {
				id: "",
				title: "",
				slug: "",
				body: "",
				image: "",
				categories: [],
				type: "",
				time: "",
				user: {
					id: "",
					name: "",
				},
				episodes: [],
				price: "",
				createdAt: "",
			}
		};
	},
	methods: {
		dataLoad() {
			if (! this.$route.params.hasOwnProperty("slug")) {
				console.error("404");
				return;
			}
			backend.get(`courses/${this.$route.params.slug}/?api_token=${this.$root.$data.token}`).then((response) => {
				this.course = response.data.data.course;
				this.notEnrolled = ! response.data.data.enrolled;
				this.enrolledCount = response.data.data.enrolledCount;
			});
		},
		getCourseCreatedAtDate() {
			return moment(this.course.createdAt).format('MM/DD/YYYY');
		},
		getCoursePrice() {
			switch (this.course.type.toLowerCase()) {
				case "free":
					return "رایگان !";
				case "paid":
					return this.course.price + " تومان";
				case "vip":
					return "اکانت VIP نیاز است";
			}
		}
	},
	mounted() {
		this.dataLoad();
	}
};
</script>

<style lang="scss" scoped>
.videoPlayer {
	border-radius: 25px !important;
}
.card-background {
	background: #27293d;
	border-radius: 25px;
}

.purchase-status {
	font-size: 0.9rem;
}
.outline {
	border-radius: 25px;
}

.pricehighlight {
	font-size: 0.8rem;
	font-weight: 600;
}

.course-title {
	font-size: 1.1rem;
}

.course-subtitle {
	font-size: 0.8rem;
}
.course-info {
	border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.bold {
	font-weight: 600;
}

.infoBox {
	background-image: linear-gradient(180deg, #3a2669, #27293d);
	/* padding: 20px 0; */
	/* border: 0.4px solid #49494928; */
	border-radius: 25px;
	min-height: 100%;
}

.courseInstructorImage {
	width: 2.8rem;
	margin: 0 auto;
	border-radius: 50%;
}

.m-widget7 .m-widget7__courseimage {
	border-radius: 15px;
}

.m-widget7 .m-widget7__description {
	text-align: center;
	margin-top: 4rem;
	padding: 0 30px;
	font-size: 1.1rem;
}

.m-widget7 .m-widget7__user {
	margin: 0 auto;
	display: table;
	margin-top: 0.35rem;
	margin-bottom: 1rem;
}

.m-widget7 .m-widget7__user .m-widget7__user-img .m-widget7__img {
	width: 2.3rem;
	border-radius: 50%;
	margin-top: 1.14rem;
}

.m-widget7 .m-widget7__user .m-widget7__info {
	display: table-cell;
}

.m-widget7 .m-widget7__user .m-widget7__info .m-widget7__username {
	margin-top: 0.71rem;
	margin-left: 0.71rem;
	font-size: 0.8rem;
	font-weight: 500;
}

.m-widget7 .m-widget7__user .m-widget7__info .m-widget7__time {
	margin-left: 0.71rem;
	margin-top: 0.71rem;
	font-size: 0.75rem;
}

.m-widget7 .m-widget7__button {
	text-align: center;
	margin-bottom: 1.85rem;
}

.m-widget7 .m-widget7__description {
	color: #575962;
}

.m-widget7 .m-widget7__info .m-widget7__username {
	color: #575962;
}

.m-widget7 .m-widget7__info .m-widget7__time {
	color: #9c9c9c !important;
}

.m-widget7.m-widget7--skin-dark .m-widget7__description {
	color: #fff;
}

.m-widget7.m-widget7--skin-dark .m-widget7__info .m-widget7__username {
	color: #fff;
}

.m-widget7.m-widget7--skin-dark .m-widget7__info .m-widget7__time {
	color: #fff;
}

.plyr__video-wrapper {
	border-radius: 25px;
}

.plyr--video {
	background: #000;
	overflow: hidden;
	border-radius: 25px;
}

.badge-size {
	font-size: 0.9rem;
	font-weight: 600;
}
</style>
