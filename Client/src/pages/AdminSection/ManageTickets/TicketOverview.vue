<template>
  <div class="container-fluid">
    <ticket-data
      :openTickets="openTickets"
      :answeredTickets="answeredTickets"
      :inprogressTickets="inprogressTickets"
      :onHoldTickets="onHoldTickets"
      :closedTickets="closedTickets"
    ></ticket-data>

    <h2 class="text-center">Manage Tickets</h2>
    <div class="mt-5">
      <!-- <card card-body-classes="table-full-width"> -->
      <div class="d-flex justify-content-between mb-5">
        <el-select
          class="select-primary mb-3 pagination-select"
          v-model="pagination.perPage"
          placeholder="Per page"
          @change="changeLimitListener"
        >
          <el-option
            class="select-primary"
            v-for="item in pagination.perPageOptions"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>

        <base-input>
          <el-input
            type="search"
            class="mb-3 search-input"
            clearable
            prefix-icon="el-icon-search"
            placeholder="Search records"
            v-model="searchQuery"
            aria-controls="datatables"
            @change="searchTicketsListener"
          ></el-input>
        </base-input>
      </div>

      <!-------------- NEW TICKET DESIGN -------------->
      <div class="single-ticket-row" v-for="ticket in tickets" :key="ticket.id">
        <div class="ticket-card d-flex justify-content-between align-items-center row text-right">
          <div class="ticket-id">
            <h3>#</h3>
            <p>{{ ticket.ticket_id }}</p>
          </div>

          <div class="ticket-username">
            <h3>نام کاربر</h3>
            <p>{{ ticket.user.name }}</p>
          </div>

          <div class="w-100 d-md-none pt-2"></div>

          <div class="ticket-title">
            <h3>عنوان</h3>
            <p
              :title="ticket.title"
            >{{ ticket.title.substring(0, 35) + (ticket.title.length > 35 ? ' ...' : '') }}</p>
          </div>

          <div class="w-100 d-md-none pt-3"></div>
          <div class="ticket-dept">
            <h3>دپارتمان</h3>
            <p>{{ ticket.department }}</p>
          </div>

          <div class="ticket-priority">
            <h3>اولویت</h3>
            <p>{{ ticket.priority }}</p>
          </div>

          <div class="ticket-date">
            <h3>زمان</h3>
            <p>{{ date(ticket.date) }}</p>
          </div>

          <div class="w-100 d-md-none pt-4"></div>
          <div class="ticket-status">
            <h3>وضعیت</h3>
            <span
              :class="getStatusLabelClasses(ticket.status)"
            >{{ getStatusTranslate(ticket.status) }}</span>
          </div>

          <div class="ticket-actions">
            <h3>اقدامات</h3>
            <div class="icon-group">
              <base-button
                @click.native="handleHighlight(ticket)"
                class="like btn-link"
                type="info"
                size="sm"
                icon
              >
                <i class="pr-2" :class="ticket.isHighlight ? 'fas fa-heart' : 'far fa-heart'"></i>
              </base-button>

              <base-button
                @click.native="handleEdit(ticket)"
                class="edit btn-link"
                type="warning"
                size="sm"
                icon
              >
                <i class="fas fa-pencil-alt"></i>
              </base-button>

              <base-button
                @click.native="handleDelete(ticket)"
                class="remove btn-link"
                type="danger"
                size="sm"
                icon
              >
                <i class="fas fa-times"></i>
              </base-button>
            </div>
          </div>

          <div class="w-100 d-md-none pt-3"></div>
          <div class="view-ticket">
            <router-link :to="`/tickets/view/${ticket.id}`">
              <base-button class="px-3" round type="info">
                <i class="pl-3 fas fa-eye"></i> نمایش
              </base-button>
            </router-link>
          </div>
        </div>
      </div>
      <div
        v-if="tickets.length"
        slot="footer"
        class="col-12 pt-5 d-flex justify-content-center justify-content-sm-between flex-wrap"
      >
        <div class>
          <p
            class="card-category"
          >Showing {{ from + 1 }} to {{ to }} of {{ pagination.total }} entries</p>
        </div>
        <base-pagination
          :value="pagination.currentPage"
          :per-page="pagination.perpage"
          :total="pagination.total"
          :pageCount="pagination.pages"
          @input="changePageListener"
        ></base-pagination>
      </div>
      <!-- </card> -->
    </div>
    <div class="pt-5">
      <manage-ticket @ticket="ticketAddListener" v-bind="ticket"></manage-ticket>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import Fuse from 'fuse.js';
import TicketData from './TicketData';
import ManageTicket from './ManageTicket';
import Swal from 'sweetalert';
import backend from '../../../backend';
import moment from 'moment';

import { Badge } from 'src/components';

export default {
  components: {
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    TicketData,
    ManageTicket,
    Badge
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tickets;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      return Math.min(
        this.pagination.total,
        this.from + this.pagination.perPage
      );
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    }
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
      searchQuery: '',
      propsToSearch: [
        'id',
        'name',
        'subject',
        'email',
        'department',
        'priority',
        'date'
      ],
      tickets: [],
      searchedData: [],
      fuseSearch: null,
      openTickets: 0,
      answeredTickets: 0,
      inprogressTickets: 0,
      onHoldTickets: 0,
      closedTickets: 0,
      ticket: undefined,
      tableKey: 0
    };
  },
  methods: {
    handleHighlight(ticket) {
      backend.post(`admin/tickets/${ticket.id}/highlight`).then(
        response => {
          ticket.isHighlight = !ticket.isHighlight;
          Swal({
            title: `You ${
              ticket.isHighlight
                ? 'Hightlighted Ticket No. -'
                : ' Unhightlighted Ticket No. -'
            }  ${ticket.ticket_id}`,

            //  title: `You ${
            //   ticket.isHighlight ? 'hightlighted' : 'removed hightlight of'
            // }  ${ticket.ticket_id}: ${ticket.title}`,
            icon: 'success',
            className: 'text-ltr'
          });
        },
        err => {
          Swal({
            title: `Cannot connect to Server !`,
            className: 'text-ltr',
            text: 'Please check your conection and try again',
            icon: 'error'
          });
        }
      );
    },
    handleEdit(ticket) {
      swal({
        title: `Do you want to edit ticket number: ${ticket.ticket_id}?`,
        // title: `Do you want to edit Ticket: ${ticket.ticket_id}: ${ticket.title}?`,
        className: 'text-ltr'
      });
      this.ticket = ticket;
    },
    handleDelete(ticket) {
      Swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        className: 'text-ltr',
        icon: 'warning',
        buttons: {
          cancel: 'cancel',
          catch: {
            text: 'Yes, delete it!',
            value: true
          }
        }
      }).then(result => {
        if (!result) return;
        this.deleteRow(ticket);
      });
    },
    deleteRow(ticket) {
      backend
        .post(`/admin/tickets/${ticket.id}/delete`)
        .then(response => {
          if (response.data.status === 'error') {
            this.$notify({
              type: 'error',
              message: 'درخواست شما توسط سرور رد شد.',
              icon: 'tim-icons icon-bell-55'
            });
            return;
          }
          let indexToDelete = this.tickets.findIndex(
            tableRow => tableRow.id === ticket.id
          );
          if (indexToDelete >= 0) {
            this.tickets.splice(indexToDelete, 1);
          }
          Swal({
            title: 'Deleted!',
            className: 'text-ltr',
            text: `You deleted ${ticket.title}`,
            icon: 'success'
          });
          this.pagination.total--;
        })
        .catch(error => {
          this.$notify({
            type: 'error',
            message:
              'در حال حاظر سرور پاسخ درخواست شما را بدرستی ارسال نمیکند.',
            icon: 'tim-icons icon-bell-55'
          });
        });
    },
    dataLoad(page) {
      const query = {
        page: page,
        limit: this.pagination.perPage
      };
      if (this.searchQuery) {
        query.filter = this.searchQuery;
      }
      backend
        .get('/admin/tickets' + this.encodeQueryData(query))
        .then(response => {
          this.pagination.currentPage = parseInt(response.data.page, 10);
          this.pagination.pages = response.data.totalPages;
          this.pagination.total = response.data.totalDocs;
          this.pagination.perPage = response.data.limit;
          this.tickets = response.data.docs;
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
    date(time) {
      return moment(time).format('DD/MM/YYYY');
    },
    getStatusTranslate(status) {
      switch (status) {
        case 1:
          return `Open`;
        case 2:
          return `Answered`;
        case 3:
          return `In Progress`;
        case 4:
          return `On Hold`;
        case 5:
          return `Closed`;
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
    },
    encodeQueryData(data) {
      const ret = [];
      for (const d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      return '?' + ret.join('&');
    },
    changePageListener(page) {
      if (page == this.pagination.currentPage) return;
      this.dataLoad(page);
    },
    changeLimitListener(limit) {
      this.dataLoad(1);
    },
    ticketAddListener(ticket) {
      this.ticket = undefined;
      let isNew = true;
      for (const key in this.tickets) {
        if (this.tickets[key].id == ticket.id) {
          isNew = false;
          switch (this.tickets[key].status) {
            case 1:
              this.openTickets--;
              break;
            case 2:
              this.answeredTickets--;
              break;
            case 3:
              this.inprogressTickets--;
              break;
            case 4:
              this.onHoldTickets--;
              break;
            case 5:
              this.closedTickets--;
              break;
          }
          this.tickets[key] = ticket;
          this.tableKey++;
          break;
        }
      }
      if (isNew) {
        this.tickets.splice(0, 0, ticket);
      }
      switch (ticket.status) {
        case 1:
          this.openTickets++;
          break;
        case 2:
          this.answeredTickets++;
          break;
        case 3:
          this.inprogressTickets++;
          break;
        case 4:
          this.onHoldTickets++;
          break;
        case 5:
          this.closedTickets++;
          break;
      }
      this.pagination.total++;
    },
    searchTicketsListener() {
      this.dataLoad(1);
    },
    handleInProgress(ticket) {
      Swal({
        title: 'Mark As In Progress ?',
        text: `You can change this later by editing ticket`,
        className: 'text-ltr',
        icon: 'warning',
        buttons: {
          cancel: 'cancel',
          catch: {
            text: 'Yes, do it!',
            value: true
          }
        }
      }).then(result => {
        if (!result) return;
        this.markAsInProgress(ticket);
      });
    },
    markAsInProgress(ticket) {
      backend
        .post(`/admin/tickets/${ticket.id}/edit`, {
          status: 3
        })
        .then(response => {
          if (response.data.status === 'error') {
            this.$notify({
              type: 'error',
              message: 'درخواست شما توسط سرور رد شد.',
              icon: 'tim-icons icon-bell-55'
            });
            return;
          }
          for (const item of this.tickets) {
            if (ticket.id == item.id) {
              item.status = 3;
              break;
            }
          }
          Swal({
            title: 'Success !',
            className: 'text-ltr',
            icon: 'success'
          });
        })
        .catch(error => {
          this.$notify({
            type: 'error',
            message:
              'در حال حاظر سرور پاسخ درخواست شما را بدرستی ارسال نمیکند.',
            icon: 'tim-icons icon-bell-55'
          });
        });
    }
  },
  mounted() {
    this.dataLoad(1);
  }
};
</script>

<style lang="scss" scoped>
.pagination-select,
.search-input {
  width: 200px;
}
.fa-heart {
  color: red;
}

.white-content .el-table table > thead > tr > th {
  text-align: center !important;
}

.white-content .el-table table > tbody > tr > td {
  text-align: center !important;
}

.single-ticket-row {
  .ticket-card {
    padding: 1.5em 2.5em;
    margin-bottom: 10px;
    // background-color: #7f5a83;
    // background-image: linear-gradient(270deg, #0d324d 0%, #553258 74%);
    background-color: #6e6e6e;
    background-image: linear-gradient(
      270deg,
      rgb(218, 218, 218) 0%,
      rgb(231, 231, 231) 74%
    );
    // background-color: rgb(226, 226, 226);
    border-radius: 15px;
    border: 1px solid rgb(216, 216, 216);
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(158, 158, 158, 0.23) !important;

    h3 {
      font-size: 0.9em;
      color: rgba(65, 65, 65, 0.5) !important;
      text-align: right;
      font-family: IranSansBold;
      padding: 0;
      margin: 0;
    }

    p {
      font-size: 1em;
      color: rgba(39, 39, 39, 0.89) !important;
      text-align: right;
      font-family: IranSans;
      padding-top: 5px;
    }

    .badge {
      margin-top: 10px;
    }

    .ticket-actions {
      i {
        color: #1669f5;

        .icon-group {
          margin-top: 10px;
        }
      }
    }
  }
  &:last-child {
    .ticket-card {
      border-bottom: none;
    }
  }
}

.ticket-card:hover,
.ticket-card:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.6);
  box-shadow: 40px rgba(121, 121, 121, 0.6);
  // transition: transform 0.6s;
  // -webkit-transform: translateY(-2px);
  // transform: translateY(-2px);
  // cursor: pointer;
}

@media (max-width: 768px) {
  .single-ticket-row {
    .ticket-card {
      margin-top: 10px;
      padding: 2em;
      background-color: rgb(226, 226, 226);
      border-radius: 15px;
      color: rgb(41, 41, 41);

      h3 {
        font-size: 1em;
        font-family: IranSans;
        color: rgb(129, 129, 129);
        padding: 0;
        margin: 0;
      }

      p {
        font-size: 1.1em;
        font-family: IranSans;
        padding-top: 10px;
      }

      .badge {
        margin-top: 10px;
      }

      // .ticket-username {
      //   margin-right: 0 !important;
      // }

      // .ticket-title {
      //   width: 100%;
      // }
      .ticket-dept {
        padding-top: 1.1em;
        // width: 100%;
      }

      .ticket-priority {
        padding-top: 1.1em;
      }

      .ticket-date {
        padding-top: 1.1em;
        // width: 100%;
      }
    }
  }
}
</style>
