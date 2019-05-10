<template>
	<div class="card container">
		<h4 class="title d-flex justify-content-start pt-2">اعلانات</h4>
		<div class="py-3 text-right" v-if="logs.length">
			<div class="Message py-4" v-for="log of logs" :key="log.id">
				<p class="text-justify">
					<i :class="'fas ' +  getLogIcon(log.type) + ' iconSize'"></i>
					{{ getJalaliDate(log.createdAt) }} - 
					{{ log.title }}
				</p>
			</div>
		</div>
		<base-pagination
			class="pagination-no-border mt-auto mr-auto"
			v-model="pagination.currentPage"
			:value="pagination.currentPage"
			:per-page="pagination.perpage"
			:total="pagination.total"
			:pageCount="pagination.pages"
			@input="changePageListener"
		></base-pagination>
	</div>
</template>
<script>
import { BasePagination } from 'src/components';
import backend from '../../../backend';
import moment from 'jalali-moment';

export default {
	components: {
		BasePagination
	},
	data() {
		return {
			pagination: {
				perPage: 2,
				currentPage: 1,
				total: 0,
				pages: 0
			},
			logs: [],
		};
	},
	methods: {
		dataLoad(page) {
			backend.get('/dashboard/logs?page=' + page).then(response => {
				this.logs = response.data.docs;
				this.pagination.currentPage = parseInt(response.data.page, 10);
				this.pagination.pages = response.data.pages;
				this.pagination.total = response.data.total;
				this.pagination.perPage = response.data.limit;
			});
		},
		getLogIcon(type) {
			switch (type) {
				case 'logout':
				case 'login': return 'fa-shield-alt';
				case 'register': return 'fa-user-tie';
				case 'buy_course': return 'fa-shopping-basket';
				default: return 'fa-history';
			}
		},
		changePageListener(page) {
			this.dataLoad(page);
		},
		getJalaliDate(date) {
			return moment(date).locale('fa').format('dddd DD/MM/YYYY HH:mm:ss');
		}
	},
	mounted() {
		this.dataLoad(1);
	},
};
</script>

<style lang="scss">
.title {
  font-size: 1.2rem;
}

.card {
  height: 100%;
  background-image: linear-gradient(#97288c, #f37335);
}

.iconSize {
  font-size: 1rem;
  padding-left: 10px;
}
.pagination {
	.page-pre {
		&.next-page {
			.page-link {
				.icon-double-right {
					&::before {
						content: "\EA23";
					}
				}
			}
		}
	}
	.page-link {
		.icon-double-left {
			&::before {
				content: "\EA24";
			}
		}
	}
}
</style>
