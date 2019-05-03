<template>
	<div class="container" v-if="post.id">
		<div class="row pb-5">
			<div class="col-12 pb-4">
				<BlogHeader :title="post.name"></BlogHeader>
			</div>
			<div class="col-md-12 my-3">
				<BlogInfo :name="post.author.name" :createdAt="post.createdAt" :categories="post.categories"></BlogInfo>
			</div>
			<div class="container text-ltr card pb-5">
				<div class="text-center pt-5">
					<img
						class="rounded-circle img-fluid blog-img"
						:src="post.image"
						:alt="post.name"
					>
				</div>
				<h3 class="subheading pt-3">{{post.name}}</h3>
				<div v-html="post.content"></div>
			</div>
		</div>
	</div>
</template>

<script>
import BlogHeader from './BlogComponents/BlogHeader.vue';
import BlogInfo from './BlogComponents/BlogInfo.vue';
import backend from '../../../../backend';

export default {
	components: {
		BlogInfo,
		BlogHeader
	},
	data() {
		return {
			post: {},
		};
	},
	methods: {
		dataLoad() {
			backend.get(`blog/${this.$route.params.slug}`).then(response => {
				this.post = response.data.post;
			});
		}
	},
	mounted() {
		this.dataLoad();
	},
};
</script>

<style lang="scss" scoped>
.card {
	border-radius: 20px;
}
p {
	font-size: 1rem;
}
.blog-img {
	width: 200px;
}
</style>
