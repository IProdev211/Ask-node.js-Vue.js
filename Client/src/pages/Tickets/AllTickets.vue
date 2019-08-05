<template>
  <section class="container-fluid text-right">
    <!-- SHOULD HAVE PAGINATION -->
    <h1 class="pb-5 text-danger">تیکت ها</h1>
    <div class="pb-5">
      <router-link to="/createticket">
        <base-button round type="success">
          <i class="pl-3 fas fa-eye"></i> تیکت جدید
        </base-button>
      </router-link>
    </div>
    <el-table :data="tableData">
      <el-table-column min-width="50" header-align="center" type="ticket_id"></el-table-column>
      <el-table-column min-width="200" header-align="right" prop="title" label="عنوان"></el-table-column>
      <el-table-column min-width="110" header-align="center" prop="department" label="دپارتمان"></el-table-column>
      <el-table-column min-width="100" header-align="center" prop="date" label="زمان"></el-table-column>
      <el-table-column min-width="120" header-align="center" prop="status" label="وضعیت">
        <template scope="scope" class="text-center">
          <span
            :class="getStatusLabelClasses(scope.row.status)"
          >{{ getStatusTranslate(scope.row.status) }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="150" header-align="right">
        <div slot-scope="{row}" class="text-right">
          <router-link :to="`/tickets/view/${row.id}`">
            <base-button class="px-3" round type="info">
              <i class="pl-3 fas fa-eye"></i> نمایش
            </base-button>
          </router-link>
        </div>
      </el-table-column>
    </el-table>
    <base-pagination
      :value="pagination.currentPage"
      :per-page="pagination.perpage"
      :total="pagination.total"
      :pageCount="pagination.pages"
      @input="changePageListener"
    ></base-pagination>

    <!-------------- NEW TICKET DESIGN -------------->
    <div class="single-ticket-row">
      <div class="ticket-card d-flex justify-content-between align-items-center row">
        <div class="ticket-name">
          <!-- THERE SHOULD BE A LIMIT OF 7 WORDS SHOWING THEN 3 ... - FOR EXAMPLE:   با آدرس وشنبه گزارش ورود به سیستم... -->
          <h3>عنوان</h3>
          <p>وشنبه گزارش ورود به سیستم با آدرس...</p>
        </div>

        <div class="ticket-dept">
          <h3>دپارتمان</h3>
          <p>فروش و مالی</p>
        </div>

        <div class="ticket-date">
          <h3>زمان</h3>
          <p>04/08/2019</p>
        </div>

        <div class="ticket-status">
          <h3>وضعیت</h3>
          <badge type="success">پاسخ داده شده</badge>
        </div>
        <div class="w-100 d-md-none"></div>
        <div class="view-ticket">
          <base-button class="px-3" round type="info">
            <i class="pl-3 fas fa-eye"></i> نمایش
          </base-button>
        </div>
      </div>
    </div>

    <div class="single-ticket-row">
      <div class="ticket-card d-flex justify-content-between align-items-center row">
        <div class="ticket-name">
          <!-- THERE SHOULD BE A LIMIT OF 7 WORDS SHOWING THEN 3 ... - FOR EXAMPLE:   با آدرس وشنبه گزارش ورود به سیستم... -->
          <h3>عنوان</h3>
          <p>وشنبه گزارش ورود به سیستم با آدرس...</p>
        </div>

        <div class="ticket-dept">
          <h3>دپارتمان</h3>
          <p>فروش و مالی</p>
        </div>

        <div class="ticket-date">
          <h3>زمان</h3>
          <p>04/08/2019</p>
        </div>

        <div class="ticket-status">
          <h3>وضعیت</h3>
          <badge type="success">پاسخ داده شده</badge>
        </div>
        <div class="w-100 d-md-none"></div>
        <div class="view-ticket">
          <base-button class="px-3" round type="info">
            <i class="pl-3 fas fa-eye"></i> نمایش
          </base-button>
        </div>
      </div>
    </div>

    <div class="single-ticket-row">
      <div class="ticket-card d-flex justify-content-between align-items-center row">
        <div class="ticket-name">
          <!-- THERE SHOULD BE A LIMIT OF 7 WORDS SHOWING THEN 3 ... - FOR EXAMPLE:   با آدرس وشنبه گزارش ورود به سیستم... -->
          <h3>عنوان</h3>
          <p>وشنبه گزارش ورود به سیستم با آدرس...</p>

          <!-- <p>وشنبه گزارش ورود به سیستم با آدرس آی پی وشنبه 14/05/1398 13:25:35 - گزارش ورود به سیستم با آدرس آی پی</p> -->
        </div>

        <div class="ticket-dept">
          <h3>دپارتمان</h3>
          <p>فروش و مالی</p>
        </div>

        <div class="ticket-date">
          <h3>زمان</h3>
          <p>04/08/2019</p>
        </div>

        <div class="ticket-status">
          <h3>وضعیت</h3>
          <badge type="success">پاسخ داده شده</badge>
        </div>
        <div class="w-100 d-md-none"></div>
        <div class="view-ticket">
          <base-button class="px-3" round type="info">
            <i class="pl-3 fas fa-eye"></i> نمایش
          </base-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import { BasePagination } from 'src/components';
import backend from '../../backend';
import moment from 'moment';

import { Badge } from 'src/components';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
    Badge
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 15, 20, 30, 50],
        total: 0,
        pages: 0
      },
      tableData: []
    };
  },
  methods: {
    changePageListener(page) {
      if (page == this.pagination.currentPage) return;
      this.dataLoad(page);
    },
    dataLoad(page) {
      const query = {
        page: page,
        limit: this.pagination.perPage
      };
      backend.get('/tickets' + this.encodeQueryData(query)).then(response => {
        this.pagination.currentPage = parseInt(response.data.page, 10);
        this.pagination.pages = response.data.totalPages;
        this.pagination.total = response.data.totalDocs;
        this.pagination.perPage = response.data.limit;
        this.tableData = response.data.docs.map(ticket => {
          ticket.date = this.date(ticket.date);
          return ticket;
        });
        if (!response.data.tickets) {
          response.data.tickets = [];
        }
        for (const item of response.data.tickets) {
          switch (item.status) {
            case 1:
              this.openTickets = item.count;
              break;
            case 2:
              this.answeredTickets = item.count;
              break;
            case 3:
              this.inprogressTickets = item.count;
              break;
            case 4:
              this.onHoldTickets = item.count;
              break;
            case 5:
              this.closedTickets = item.count;
              break;
          }
        }
      });
    },
    encodeQueryData(data) {
      const ret = [];
      for (const d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      return '?' + ret.join('&');
    },
    date(time) {
      return moment(time).format('DD/MM/YYYY');
    },
    getStatusTranslate(status) {
      switch (status) {
        case 1:
          return `باز`;
        case 2:
          return `پاسخ داده شده`;
        case 3:
          return `درحال پیگیری`;
        case 4:
          return `On Hold`;
        case 5:
          return `بسته شده`;
      }
    },
    getStatusLabelClasses(status) {
      switch (status) {
        case 1:
          return `badge badge-primary`;
        case 2:
          return `badge badge-success`;
        case 3:
          return `badge badge-warning`;
        case 4:
          return `badge badge-danger`;
        case 5:
          return `badge badge-secondary`;
      }
    }
  },
  mounted() {
    this.dataLoad(1);
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: IranSansBold;
}

.single-ticket-row {
  .ticket-card {
    padding: 0.8em 2em;
    background-color: rgb(226, 226, 226);
    border-radius: 15px 0 0 15px;
    color: rgb(41, 41, 41);
    border: 1px solid rgb(214, 214, 214);

    h3 {
      font-size: 1.1em;
      font-family: IranSansBold;
      padding: 0;
      margin: 0;
    }

    p {
      font-size: 0.9em;
      font-family: IranSans;
      padding-top: 10px;
    }

    .badge {
      margin-top: 10px;
    }
  }
}

@media (max-width: 768px) {
  .single-ticket-row {
    .ticket-card {
      margin-top: 10px;
      padding: 0.8em 2em;
      background-color: rgb(226, 226, 226);
      border-radius: 15px;
      color: rgb(41, 41, 41);

      h3 {
        font-size: 1em;
        font-family: IranSansBold;
        padding: 0;
        margin: 0;
      }

      p {
        font-size: 0.9em;
        font-family: IranSans;
        padding-top: 10px;
      }

      .badge {
        margin-top: 10px;
      }

      .ticket-name {
        width: 100%;
      }
      .ticket-dept {
        padding-top: 1.1em;
        // width: 100%;
      }
      .ticket-date {
        padding-top: 1.1em;
        // width: 100%;
      }
      .ticket-status {
        padding-top: 1.1em;
      }
    }
  }
}
</style>
