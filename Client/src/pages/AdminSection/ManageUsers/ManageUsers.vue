<template>
  <section>
    <div class="text-ltr">
      <div>
        <h2 class="text-center">Manage Users</h2>
      </div>
      <div class="mt-5">
        <card card-body-classes="table-full-width">
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
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
                  @change="searchUsersListener"
                ></el-input>
              </base-input>
            </div>
            <el-table :data="this.tableData">
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
              ></el-table-column>
              <el-table-column :min-width="135" align="right" label="Actions">
                <div slot-scope="props">
                  <base-button
                    @click.native="handleEdit(props.$index, props.row)"
                    class="edit btn-link"
                    type="warning"
                    size="sm"
                    icon
                  >
                    <router-link to="/edituser">
                      <i class="tim-icons icon-pencil"></i>
                    </router-link>
                  </base-button>
                  <base-button
                    @click.native="handleDelete(props.$index, props.row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="tim-icons icon-simple-remove"></i>
                  </base-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
            v-if="tableData.length"
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
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
        </card>
      </div>
    </div>
    <div class="pt-2">
      <CreateEditUser v-bind="user" @reset="reset" @user="userActionListener"></CreateEditUser>
    </div>
  </section>
</template>
<script>
import CreateEditUser from './CreateEditUser';
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import manageusersoverviewdata from './manageusersoverviewdata';
import Fuse from 'fuse.js';
import Swal from 'sweetalert';
import backend from '../../../backend';
import moment from 'moment';

export default {
  components: {
    CreateEditUser,
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  computed: {
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
        perPage: 4,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
        pages: 0
      },
      searchQuery: '',
      propsToSearch: ['name', 'email'],
      tableColumns: [
        {
          prop: 'name',
          label: 'Name',
          minWidth: 200
        },
        {
          prop: 'email',
          label: 'Email',
          minWidth: 250
        },
        {
          prop: 'datejoined',
          label: 'Date Joined',
          minWidth: 100
        },
        {
          prop: 'amountspent',
          label: 'Amount Spent',
          minWidth: 100
        }
      ],
      tableData: [],
      user: {}
    };
  },
  methods: {
    dataLoad(page) {
      let uri =
        '/admin/users?page=' + page + '&limit=' + this.pagination.perPage;
      if (this.searchQuery) {
        uri += '&filter=' + this.searchQuery;
      }
      backend.get(uri).then(response => {
        this.tableData = response.data.docs.map(user => {
          user.datejoined = this.date(user.createdAt);
          return user;
        });
        this.pagination.currentPage = parseInt(response.data.page, 10);
        this.pagination.pages = response.data.pages;
        this.pagination.total = response.data.total;
        this.pagination.perPage = response.data.limit;
      });
    },
    handleEdit(index, row) {
      Swal({
        title: `You want to edit ${row.name}`,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info btn-fill'
      });
      this.user = row;
    },
    handleDelete(index, row) {
      Swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
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
        this.deleteRow(row);
      });
    },
    deleteRow(row) {
      backend
        .post(`/admin/users/${row.id}/delete`)
        .then(response => {
          if (response.data.status === 'error') {
            this.$notify({
              type: 'error',
              message: 'درخواست شما توسط سرور رد شد.',
              icon: 'tim-icons icon-bell-55'
            });
            return;
          }
          let indexToDelete = this.tableData.findIndex(
            tableRow => tableRow.id === row.id
          );
          if (indexToDelete >= 0) {
            this.tableData.splice(indexToDelete, 1);
          }
          Swal({
            title: 'Deleted!',
            text: `You deleted ${row.title}`,
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
    },
    changePageListener(page) {
      if (page == this.pagination.currentPage) return;
      this.dataLoad(page);
    },
    changeLimitListener(limit) {
      this.dataLoad(1);
    },
    searchUsersListener() {
      this.dataLoad(1);
    },
    date(time) {
      return moment(time).format('MM/DD/YYYY');
    },
    reset() {
      this.user = undefined;
    },
    userActionListener(user) {
      user.datejoined = this.date(user.createdAt);
      if (this.user) {
        for (const key in this.tableData) {
          if (this.tableData[key] === undefined) continue;
          if (this.tableData[key].id == this.user.id) {
            this.tableData[key] = user;
          }
        }
      } else {
        this.tableData.push(user);
      }
    }
  },
  mounted() {
    this.dataLoad(1);
  }
};
</script>
<style>
.pagination-select,
.search-input {
  width: 200px;
}
</style>
