<template>
  <section>
    <div class="text-ltr">
      <div>
        <h2 class="text-center">Courses Overview</h2>
        <p class="text-center">
          Here is a list of all active courses on this site
          <a
            href="/courses"
            target="_blank"
          >ALL COURSES</a>
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
                  v-on:change="changeLimitListener"
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
              <el-table :data="tableData">
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
                v-model="pagination.currentPage"
                :value="pagination.currentPage"
                :per-page="pagination.perpage"
                :total="pagination.total"
                :pageCount="pagination.pages"
                v-on:input="changePageListener"
              ></base-pagination>
            </div>
          </card>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <CreateEditCourse v-bind="course" @course="courseActionListener" @reset="reset"></CreateEditCourse>
    </div>
  </section>
</template>
<script>
import CreateEditCourse from './CreateEditCourse';
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import Swal from 'sweetalert';
import backend from '../../../backend';

export default {
  components: {
    CreateEditCourse,
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
        perPage: 10,
        currentPage: 1,
        perPageOptions: [3, 5, 10, 15, 20],
        total: 0,
        pages: 0
      },
      propsToSearch: ['courseName', 'comments', 'courseUsers', 'courseType'],
      tableColumns: [
        {
          prop: 'title',
          label: 'Course Name',
          minWidth: 220
        },
        {
          prop: 'comments',
          label: 'comments',
          minWidth: 80
        },
        {
          prop: 'users',
          label: 'Course Users',
          minWidth: 80
        },
        {
          prop: 'type',
          label: 'Course Type',
          minWidth: 80
        }
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      course: undefined
    };
  },
  methods: {
    dataLoad(page) {
      backend
        .get(
          '/admin/courses?page=' + page + '&limit=' + this.pagination.perPage
        )
        .then(response => {
          this.tableData = response.data.docs;
          this.pagination.currentPage = parseInt(response.data.page, 10);
          this.pagination.pages = response.data.totalPages;
          this.pagination.total = response.data.totalDocs;
          this.pagination.perPage = response.data.limit;
        });
    },
    handleEdit(index, row) {
      Swal({
        title: `Editing: ${row.title}`,
        buttonsStyling: false,
        className: 'text-ltr',
        buttons: false,
        timer: 1900,
        confirmButtonClass: 'btn btn-info btn-fill'
      });
      this.course = row;
    },
    handleDelete(index, row) {
      Swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this`,
        className: 'text-ltr',
        icon: 'warning',
        buttons: {
          cancel: 'Cancel',
          catch: {
            text: 'Yes, delete it',
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
        .post(`/admin/courses/${row.id}/delete`)
        .then(response => {
          if (response.data.status === 'error') {
            this.$notify({
              type: 'danger',
              message: 'درخواست شما توسط سرور رد شد.',
              icon: 'tim-icons icon-bell-55'
            });
            return;
          }
          const indexToDelete = this.tableData.findIndex(
            tableRow => tableRow.id === row.id
          );
          if (indexToDelete >= 0) {
            this.tableData.splice(indexToDelete, 1);
          }
          Swal({
            title: 'Deleted!',
            className: 'text-ltr',
            text: `You deleted ${row.title}`,
            icon: 'success'
          });
        })
        .catch(error => {
          this.$notify({
            type: 'danger',
            message:
              'در حال حاظر سرور پاسخ درخواست شما را بدرستی ارسال نمیکند.',
            icon: 'tim-icons icon-bell-55'
          });
        });
    },
    changePageListener(page) {
      this.dataLoad(page);
    },
    changeLimitListener(limit) {
      this.pagination.perPage = limit;
      this.dataLoad(1);
    },
    courseActionListener(course) {
      if (this.course) {
        for (const key in this.tableData) {
          if (this.tableData[key] !== undefined) {
            if (this.tableData[key].id == this.course.id) {
              this.tableData[key] = course;
            }
          }
        }
      } else {
        this.tableData.push(course);
      }
    },
    reset() {
      this.course = undefined;
    }
  },
  mounted() {
    this.dataLoad(1);
  },
  watch: {}
};
</script>
<style>
.pagination-select,
.search-input {
  width: 200px;
}
</style>
