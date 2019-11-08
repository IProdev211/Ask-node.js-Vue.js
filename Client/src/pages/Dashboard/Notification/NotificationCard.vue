<template>
  <div class="card">
    <div class="container">
      <h4 class="title text-right pt-4">اعلانات</h4>
      <div class="text-right" v-if="logs.length">
        <div class="Message pt-4" v-for="log of logs" :key="log.id">
          <p class="text-justify">
            <i :class="'fas ' +  getLogIcon(log.type) + ' iconSize'"></i>
            {{ getJalaliDate(log.createdAt) }} -
            {{ log.title }}
          </p>
        </div>
      </div>
    </div>
    <base-pagination
      class="pagination-no-border ml-auto mt-auto px-3 text-rtl"
      v-model="pagination.currentPage"
      :value="pagination.currentPage"
      :per-page="pagination.perpage"
      :total="pagination.total"
      :pageCount="pagination.pages"
      type="danger"
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
        perPage: 3,
        currentPage: 1,
        total: 0,
        pages: 0
      },
      logs: []
    };
  },
  methods: {
    dataLoad(page) {
      backend
        .get(
          '/dashboard/logs?page=' + page + '&limit=' + this.pagination.perPage
        )
        .then(response => {
          this.logs = response.data.docs;
          this.pagination.currentPage = parseInt(response.data.page, 10);
          this.pagination.pages = response.data.totalPages;
          this.pagination.total = response.data.totalDocs;
          this.pagination.perPage = response.data.limit;
        });
    },
    getLogIcon(type) {
      switch (type) {
        case 'logout':
          return 'fa-shield-alt text-danger';
        case 'login':
          return 'fa-shield-alt text-success';
        case 'register':
          return 'fa-user-tie';
        case 'buy_course':
          return 'fa-shopping-basket text-primary';
        default:
          return 'fa-star text-success';
      }
    },
    changePageListener(page) {
      this.dataLoad(page);
    },
    getJalaliDate(date) {
      return moment(date)
        .locale('fa')
        .format('dddd DD/MM/YYYY HH:mm:ss');
    }
  },
  mounted() {
    this.dataLoad(1);
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.2rem;
  font-family: IranSansBold;
}

.card {
  height: 100%;
  background-image: linear-gradient(#97288c, #f37335);
}

.white-content p {
  font-size: 1em !important;
}

.iconSize {
  font-size: 1.1em;
  padding-left: 10px;
}

.pagination {
  .page-pre {
    &.next-page {
      .page-link {
        .icon-double-right {
          &::before {
            content: '\EA23';
          }
        }
      }
    }
  }
  .page-link {
    .icon-double-left {
      &::before {
        content: '\EA24';
      }
    }
  }
}
</style>
