<template>
  <section>
    <div class="text-ltr">
      <div>
        <h2 class="text-center">Blogs Overview</h2>
        <p class="text-center">
          Here is a list of all active courses on this site
          <a href="/" target="_blank">ALL Blogs</a>
        </p>
      </div>
      <div class="mt-5">
        <div>
          <card card-body-classes="table-full-width">
            <div>
              <div
                class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
              >
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
              </div>
              <el-table :data="this.tableData">
                <el-table-column
                  v-for="column in tableColumns"
                  :key="column.label"
                  :min-width="column.minWidth"
                  :prop="column.prop"
                  :label="column.label"
                ></el-table-column>
                <el-table-column :min-width="105" align="center" label="Settings">
                  <div slot-scope="props">
                    <base-button
                      @click.native="handleEdit(props.$index, props.row)"
                      class="edit btn-link"
                      type="warning"
                      size="sm"
                      icon
                    >
                      <i class="tim-icons icon-pencil"></i>
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
    </div>
    <div class="pt-3">
      <CreateEditBlog v-bind="post" @reset="reset" @post="postActionListener"></CreateEditBlog>
    </div>
  </section>
</template>
<script>
import CreateEditBlog from './CreateEditBlog';
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import Swal from 'sweetalert';
import backend from '../../../backend';

export default {
  components: {
    CreateEditBlog,
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
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 15, 25],
        total: 0,
        pages: 0
      },
      tableColumns: [
        {
          prop: 'name',
          label: 'Blog Name',
          minWidth: 200
        },
        {
          prop: 'views',
          label: 'Blog Views',
          minWidth: 120
        }
      ],
      tableData: [],
      post: {},
      searchQuery: ''
    };
  },
  methods: {
    dataLoad(page) {
      let uri =
        '/admin/blog/posts?page=' + page + '&limit=' + this.pagination.perPage;
      if (this.searchQuery) {
        uri += '&filter=' + this.searchQuery;
      }
      backend.get(uri).then(response => {
        this.tableData = response.data.docs;
        this.pagination.currentPage = parseInt(response.data.page, 10);
        this.pagination.pages = response.data.pages;
        this.pagination.total = response.data.total;
        this.pagination.perPage = response.data.limit;
      });
    },
    handleEdit(index, row) {
      this.post = undefined;
      Swal({
        title: `Editing: ${row.name}`,
        buttonsStyling: false,
        className: 'text-ltr',
        buttons: false,
        timer: 1900,
        confirmButtonClass: 'btn btn-info btn-fill'
      });
      this.post = row;
    },
    handleDelete(index, row) {
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
        this.deleteRow(row);
      });
    },
    deleteRow(row) {
      backend
        .post(`/admin/blog/posts/${row.id}/delete`)
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
    reset() {
      this.post = undefined;
    },
    postActionListener(post) {
      if (this.post) {
        for (const key in this.tableData) {
          if (this.tableData[key] === undefined) continue;
          if (this.tableData[key].id == this.post.id) {
            this.tableData[key] = post;
            break;
          }
        }
      } else {
        this.tableData.push(post);
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
