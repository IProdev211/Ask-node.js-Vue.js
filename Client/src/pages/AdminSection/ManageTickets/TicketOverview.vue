<template>
  <div class="text-ltr container-fluid">
    <div class="container">
      <ticket-data></ticket-data>
    </div>
    <h2 class="text-center">Manage Tickets</h2>
    <div class="mt-5">
      <card card-body-classes="table-full-width">
        <!-- SEARCH NEEDS TO WORK & HEART IS FOR IMPORTANT MESSAGES  -->
        <!-- TICKETS SHOULD BE SORTED FROM NEWEST TO OLDEST -->
        <div>
          <div class="d-flex justify-content-between">
            <el-select
              class="select-primary mb-3 pr-3 pagination-select"
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

            <base-input>
              <el-input
                type="search"
                class="mb-3 search-input"
                clearable
                prefix-icon="el-icon-search"
                placeholder="Search records"
                v-model="searchQuery"
                aria-controls="datatables"
              ></el-input>
            </base-input>
          </div>
          <el-table :data="queriedData">
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
            ></el-table-column>
            <el-table-column :min-width="135" align="right" label="Actions">
              <div slot-scope="props">
                <!-- THIS IS FOR MARKING THE TICKET IMPORTANT - WHEN CLICKED THE HEART SHOULD BECOME RED -->
                <base-button
                  @click.native="handleLike(props.$index, props.row)"
                  class="like btn-link"
                  type="info"
                  size="sm"
                  icon
                >
                  <i class="far fa-heart"></i>
                </base-button>

                <!-- THIS IS FOR EDITING THE TICKET -->
                <base-button
                  @click.native="handleEdit(props.$index, props.row)"
                  class="edit btn-link"
                  type="warning"
                  size="sm"
                  icon
                >
                  <i class="fas fa-pencil-alt"></i>
                </base-button>

                <!-- THIS IS FOR CLOSING THE TICKET -->
                <base-button
                  @click.native="handleEdit(props.$index, props.row)"
                  class="edit btn-link"
                  type="warning"
                  size="sm"
                  icon
                >
                  <i class="fas fa-clipboard-check"></i>
                </base-button>

                <!-- THIS IS FOR DELETING THE TICKET -->
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
    <manage-ticket></manage-ticket>
  </div>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import data from './data';
import Fuse from 'fuse.js';
// import swal from 'sweetalert2';

import TicketData from './TicketData';
import ManageTicket from './ManageTicket';

export default {
  components: {
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    TicketData,
    ManageTicket
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
        perPageOptions: [5, 10, 25, 50],
        total: 0
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
      tableColumns: [
        {
          prop: 'id',
          label: 'ID',
          minWidth: 60
        },
        {
          prop: 'name',
          label: 'Name',
          minWidth: 200
        },
        {
          prop: 'subject',
          label: 'Subject',
          minWidth: 250
        },
        {
          prop: 'department',
          label: 'Department',
          minWidth: 150
        },
        {
          prop: 'priority',
          label: 'Priority',
          minWidth: 100
        },
        {
          prop: 'date',
          label: 'Date',
          minWidth: 120
        }
      ],
      tableData: data,
      searchedData: [],
      fuseSearch: null
    };
  },
  // methods: {
  //   handleLike(index, row) {
  //     swal({
  //       title: `You liked ${row.name}`,
  //       buttonsStyling: false,
  //       type: 'success',
  //       confirmButtonClass: 'btn btn-success btn-fill'
  //     });
  //   },
  //   handleEdit(index, row) {
  //     swal({
  //       title: `You want to edit ${row.name}`,
  //       buttonsStyling: false,
  //       confirmButtonClass: 'btn btn-info btn-fill'
  //     });
  //   },
  //   handleDelete(index, row) {
  //     swal({
  //       title: 'Are you sure?',
  //       text: `You won't be able to revert this!`,
  //       type: 'warning',
  //       showCancelButton: true,
  //       confirmButtonClass: 'btn btn-success btn-fill',
  //       cancelButtonClass: 'btn btn-danger btn-fill',
  //       confirmButtonText: 'Yes, delete it!',
  //       buttonsStyling: false
  //     }).then(result => {
  //       if (result.value) {
  //         this.deleteRow(row);
  //         swal({
  //           title: 'Deleted!',
  //           text: `You deleted ${row.name}`,
  //           type: 'success',
  //           confirmButtonClass: 'btn btn-success btn-fill',
  //           buttonsStyling: false
  //         });
  //       }
  //     });
  //   },
  //   deleteRow(row) {
  //     let indexToDelete = this.tableData.findIndex(
  //       tableRow => tableRow.id === row.id
  //     );
  //     if (indexToDelete >= 0) {
  //       this.tableData.splice(indexToDelete, 1);
  //     }
  //   }
  // }
  // mounted() {
  //   // Fuse search initialization.
  //   this.fuseSearch = new Fuse(this.tableData, {
  //     keys: ['name', 'email'],
  //     threshold: 0.3
  //   });
  // }
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
