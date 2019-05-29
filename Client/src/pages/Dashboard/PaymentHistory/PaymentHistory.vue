<template>
  <card card-body-classes="table-full-width">
    <h3 slot="header" class="card-title">{{ 'وضعیت پرداخت' }}</h3>
    <div>
      <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"></div>
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
      <!-- <div class>
        <p class="card-category">Showing {{ from + 1 }} to {{ to }} of {{ total }} entries</p>
      </div>-->
      <base-pagination
        class="pagination-no-border text-rtl"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="total"
        :showArrows="false"
      ></base-pagination>
    </div>
  </card>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import moment from 'jalali-moment';
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
    },
    pagination() {
      return {
        perPage: 3,
        currentPage: this.payments.page,
        total: this.payments.total
      };
    },
    tableData() {
      const data = [];
      for (const payment of this.payments.docs) {
        data.push({
          id: payment.id,
          product: payment.course
            ? payment.course.title
            : payment.vip
            ? 'VIP subscription'
            : '',
          price: new Intl.NumberFormat().format(
            parseInt(payment.price.toString().replace(',', ''), 10)
          ),
          date: moment(payment.createdAt)
            .locale('fa')
            .format('DD/MM/YYYY'),
          status: payment.payment ? 'موفق' : 'ناموفق'
        });
      }
      return data;
    }
  },
  data() {
    return {
      tableColumns: [
        {
          prop: 'product',
          label: 'محصول',
          minWidth: 150
        },
        {
          prop: 'date',
          label: 'تاریخ پرداخت',
          minWidth: 110
        },
        {
          prop: 'price',
          label: 'مقدار پرداختی',
          minWidth: 90
        },
        {
          prop: 'status',
          label: 'وضعیت پرداخت',
          minWidth: 90
        }
      ],
      searchedData: [],
      fuseSearch: null
    };
  },
  props: ['payments'],
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3
    });
  }
};
</script>

<style lang="scss" scoped>
</style>

