<template>
  <section>
    <div class="text-ltr">
      <div>
        <h2 class="text-center">Episode Overview</h2>
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
              <el-table :data="queriedData">
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
                    <router-link to="editcourse">
                      <base-button
                        @click.native="handleEdit(props.$index, props.row)"
                        class="edit btn-link"
                        type="warning"
                        size="sm"
                        icon
                      >
                        <i class="tim-icons icon-pencil"></i>
                      </base-button>
                    </router-link>
                    <router-link to="deletecourse">
                      <base-button
                        @click.native="handleDelete(props.$index, props.row)"
                        class="remove btn-link"
                        type="danger"
                        size="sm"
                        icon
                      >
                        <i class="tim-icons icon-simple-remove"></i>
                      </base-button>
                    </router-link>
                  </div>
                </el-table-column>
              </el-table>
            </div>
            <div
              slot="footer"
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <div class>
                <p class="card-category">Showing {{ from + 1 }} to {{ to }} of {{ total }} entries</p>
              </div>
              <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="total"
              ></base-pagination>
            </div>
          </card>
        </div>
      </div>
    </div>
    <div class="pt-3">
      <CreateEditEpisode></CreateEditEpisode>
    </div>
  </section>
</template>
<script>
import CreateEditEpisode from './CreateEditEpisode';
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import episodeoverviewdata from './episodeoverviewdata';
import swal from 'sweetalert2';

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
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    }
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 15],
        total: 0
      },
      propsToSearch: [
        'episodeName',
        'episodeNumber',
        'relatedCourse',
        'episodeViews',
        'episodeType'
      ],
      tableColumns: [
        {
          prop: 'episodeName',
          label: 'Episode Name',
          minWidth: 150
        },
        {
          prop: 'relatedCourse',
          label: 'Related Course',
          minWidth: 150
        },
        {
          prop: 'episodeNumber',
          label: 'Episode No.',
          minWidth: 70
        },
        {
          prop: 'episodeViews',
          label: 'Episode Views',
          minWidth: 80
        },
        {
          prop: 'episodeType',
          label: 'Episode Type',
          minWidth: 80
        }
      ],
      tableData: episodeoverviewdata,
      searchedData: [],
      fuseSearch: null
    };
  },
  methods: {
    handleEdit(index, row) {
      swal({
        title: `You want to edit ${row.name}`,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-info btn-fill'
      });
    },
    handleDelete(index, row) {
      swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success btn-fill',
        cancelButtonClass: 'btn btn-danger btn-fill',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
      }).then(result => {
        if (result.value) {
          this.deleteRow(row);
          swal({
            title: 'Deleted!',
            text: `You deleted ${row.name}`,
            type: 'success',
            confirmButtonClass: 'btn btn-success btn-fill',
            buttonsStyling: false
          });
        }
      });
    },
    deleteRow(row) {
      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.id === row.id
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    }
  },
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3
    });
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== '') {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    }
  }
};
</script>
<style>
.pagination-select,
.search-input {
  width: 200px;
}
</style>