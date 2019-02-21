<template>
  <card card-body-classes="table-full-width">
    <h3 slot="header" class="card-title">Purchase History</h3>
    <div>
      <div
        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
      ></div>
      <el-table :data="queriedData">
        <el-table-column
          v-for="column in tableColumns"
          :key="column.label"
          :min-width="column.minWidth"
          :prop="column.prop"
          :label="column.label"
        ></el-table-column>
      </el-table>
    </div>
    <div
      slot="footer"
      class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
    >
      <div class>
        <p class="card-category">
          Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
        </p>
      </div>
      <base-pagination
        class="pagination-no-border"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="total"
      ></base-pagination>
    </div>
  </card>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import purchases from './purchases';
import Fuse from 'fuse.js';

export default {
  components: {
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
        perPage: 3,
        currentPage: 1,
        total: 0
      },
      searchQuery: '',
      propsToSearch: ['product', 'price', 'date', 'status'],
      tableColumns: [
        {
          prop: 'product',
          label: 'Product',
          minWidth: 150
        },
        {
          prop: 'date',
          label: 'Date',
          minWidth: 110
        },
        {
          prop: 'price',
          label: 'Price',
          minWidth: 90
        },
        {
          prop: 'status',
          label: 'Status',
          minWidth: 135
        }
      ],
      tableData: purchases,
      searchedData: [],
      fuseSearch: null
    };
  },

  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3
    });
  }
};
</script>
