<template>
	<section class="UnitSection"  v-if="episodes.length" :style="scrollable ? {'overflow-y': 'auto'} : ''">
		<!-- UNIT 1 -->
		<div class="UnitBox d-flex justify-content-between" v-for="episode of episodes" :key="episode.id">
			<div class="right d-flex justify-content-end">
				<div :class="getUnitBadge(episode.type)">
					<i :class="'fas ' + getEpisodeIcon(episode.type)"></i>
				</div>
				<div class="UnitName pr-4">
					<router-link :to="'/courses/episode/' + episode.id">
						<p class="UnitName text-right">{{ episode.title }}</p>
					</router-link>
				</div>
			</div>
			<div class="left d-flex justify-content-between">
				<div class="pl-3">
					<p class="detail-price">{{ getEpisodeType(episode.type) }}</p>
				</div>

				<div>
					<p class="detail-time">{{ episode.time }}</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	props: [
		'episodes',
		'scrollable',
		'maxepisodes'
	],
	methods: {
		getEpisodeType(type) {
			switch (type.toLowerCase()) {
				case "free":
					return "رایگان";
				case "cash":
				case "paid":
					return "پرداختنی";
				case "vip":
					return "VIP";
			}
		},
		getEpisodeIcon(type) {
			switch (type.toLowerCase()) {
				case "free":
					return "fa-unlock-alt";
				case "cash":
				case "paid":
					return "fa-lock";
				case "vip":
					return "fa-key";
			}
		},
		getUnitBadge(type) {
			switch (type.toLowerCase()) {
				case "free":
					return "UnitBadgeUnlocked";
				case "cash":
				case "paid":
					return "UnitBadgelocked";
				case "vip":
					return "UnitBadgeVIP";
			}
		}
	},
	mounted() {
		if (this.scrollable) {
			const height = (this.$el.querySelector(".UnitBox").clientHeight + 2) * this.maxepisodes;
			this.$el.style["max-height"] = height + "px";
		}
	}
};
</script>

<style lang="scss" scoped>
.UnitSection {
	background: rgb(39, 39, 53);
	border-radius: 10px;
	overflow: hidden;
	border-width: 1px;
	border-style: solid;
	border-color: rgba(0, 0, 0, 0.1);
	border-image: initial;
}
.UnitBox {
	// border-radius: 10px;
	-webkit-box-align: center;
	padding: 20px 25px;
	align-items: center;
	border-bottom: 1px solid rgba(133, 133, 133, 0.377);
	border-right: 10px solid rgba(156, 156, 156, 0.377);
	transition: all 0.2s ease 0s;
}

.UnitBox:hover {
	border-right-color: #07d9b6;
	.UnitBadgeUnlocked {
		color: #07d9b6;
	}
	.UnitBadgelocked {
		color: #d82a50;
	}
	.detail-time {
		background: #107a69;
	}
	.UnitName {
		color: white;
	}
}

.UnitBadgeUnlocked {
	font-size: 1.5rem;
	color: #06a086;
}

.UnitBadgelocked {
	font-size: 1.5rem;
	color: #ac2451;
}

.UnitBadgeVIP {
	font-size: 1.5rem;
	color: #e7d800;
}

.UnitName {
	font-size: 1rem;
	color: rgb(158, 158, 158);
	margin-top: auto;
}
.detail-time {
	color: rgb(255, 255, 255);
	font-size: 1em;
	align-self: center;
	background: rgb(44, 62, 80);
	padding: 8px 15px;
	border-radius: 12px;
}

.detail-price {
	color: rgb(255, 255, 255);
	font-size: 1em;
	align-self: center;
	background: rgb(13, 55, 97);
	padding: 8px 15px;
	border-radius: 8px;
}
</style>

