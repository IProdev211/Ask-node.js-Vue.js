<template>
  <section>
    <div>
      <h2 class="text-center">Episode Overview</h2>
    </div>
    <div class="mt-5">
      <div>
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
            </div>
            <el-table :data="tableData">
              <el-table-column
                align="left"
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
                    <i class="fas fa-pencil-alt"></i>
                  </base-button>
                  <base-button
                    @click.native="handleDelete(props.$index, props.row)"
                    class="remove btn-link"
                    type="danger"
                    size="sm"
                    icon
                  >
                    <i class="fas fa-times"></i>
                  </base-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
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
    <div class="pt-3">
      <CreateEditEpisode v-bind="episode" @episode="episodeActionListener" @reset="reset"></CreateEditEpisode>
    </div>
  </section>
</template>
<script>
import CreateEditEpisode from './CreateEditEpisode';
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import Swal from 'sweetalert';
import backend from '../../../backend';

export default {
  components: {
    CreateEditEpisode,
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
      tableColumns: [
        {
          prop: 'title',
          label: 'Episode Name',
          minWidth: 150
        },
        {
          prop: 'courseName',
          label: 'Related Course',
          minWidth: 150
        },
        {
          prop: 'number',
          label: 'Order',
          minWidth: 70
        },
        {
          prop: 'viewCount',
          label: ' Views',
          minWidth: 70
        },
        {
          prop: 'type',
          label: 'Type',
          minWidth: 70
        }
      ],
      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [5, 10, 15, 20, 25],
        total: 0,
        pages: 0
      },
      tableData: [],
      searchedData: [],
      episode: undefined
    };
  },
  methods: {
    dataLoad(page) {
      backend
        .get(
          '/admin/episodes?page=' + page + '&limit=' + this.pagination.perPage
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
      this.episode = row;
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
        .post(`/admin/episodes/${row.id}/delete`)
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
            const episode = this.tableData[indexToDelete];
            this.tableData.splice(indexToDelete, 1);
            for (const item of this.tableData) {
              if (item.course.id == episode.course.id) {
                if (item.number > episode.number) {
                  item.number--;
                }
              }
            }
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
    episodeActionListener(episode) {
      let removedIndex = -1;
      for (const key in this.tableData) {
        if (this.tableData[key] !== undefined) {
          if (this.tableData[key].id == episode.id) {
            this.tableData.splice(key, 1);
            removedIndex = key;
            break;
          }
        }
      }
      if (removedIndex !== -1) {
        for (let i = removedIndex; i < this.tableData.length; i++) {
          if (this.tableData[i].course.id == episode.course.id) {
            this.tableData[i].number--;
          }
        }
      }
      let insertedKey = -1;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].course.id == episode.course.id) {
          if (this.tableData[i].number >= episode.number) {
            this.tableData.splice(i, 0, episode);
            insertedKey = i;
            break;
          }
          if (
            this.tableData[i + 1] !== undefined &&
            this.tableData[i + 1].course.id !== episode.course.id
          ) {
            this.tableData.splice(i + 1, 0, episode);
            insertedKey = i + 1;
            break;
          }
        }
      }
      if (insertedKey === -1) {
        this.tableData.push(episode);
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (i > insertedKey && this.tableData[i] !== undefined) {
            if (this.tableData[i].course.id == episode.course.id) {
              this.tableData[i].number++;
            }
          }
        }
      }
    },
    reset() {
      this.episode = undefined;
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
