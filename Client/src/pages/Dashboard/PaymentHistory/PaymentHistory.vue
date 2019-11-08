<template>
  <card card-body-classes="table-full-width">
    <h3 slot="header" class="card-title">{{ 'وضعیت پرداخت' }}</h3>
    <div>
      <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"></div>
      <el-table :data="tableData">
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
      <base-pagination
        class="pagination-no-border text-rtl"
        v-model="pagination.currentPage"
        :per-page="pagination.perPage"
        :total="pagination.total"
        @input="changePageListener"
      ></base-pagination>

      <!-- <div class>
        <p class="card-category">Showing {{ from + 1 }} to {{ to }} of {{ total }} entries</p>
      </div>-->
    </div>
  </card>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import moment from 'jalali-moment';
import Fuse from 'fuse.js';
import backend from '../../../backend';

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
    tableData() {
      const data = [];
      for (const payment of this.docs) {
        let product = '';
        if (payment.course) {
          product = payment.course.title;
        } else if (payment.vip) {
          if (!payment.vipMonth) {
            if (payment.price === 39000) {
              payment.vipMonth = 1;
            } else if (payment.price === 139000) {
              payment.vipMonth = 4;
            } else if (payment.price === 309000) {
              payment.vipMonth = 12;
            }
          }
          product = `${payment.vipMonth} ماه عضویت ویژه`;
        }
        data.push({
          id: payment.id,
          product: product,
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
          minWidth: 105
        },
        {
          prop: 'price',
          label: 'مبلغ کل',
          minWidth: 85
        },
        {
          prop: 'status',
          label: 'وضعیت پرداخت',
          minWidth: 105
        }
      ],
      searchedData: [],
      fuseSearch: null,
      docs: [],
      pagination: {
        perPage: 0,
        currentPage: 0,
        total: 0
      }
    };
  },
  props: ['payments'],
  mounted() {
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name', 'email'],
      threshold: 0.3
    });
  },
  methods: {
    dataLoad(page) {
      backend
        .get(
          '/dashboard/payments?page=' +
            page +
            '&limit=' +
            this.pagination.perPage
        )
        .then(response => {
          this.docs = response.data.docs;
          this.pagination.currentPage = parseInt(response.data.page, 10);
          this.pagination.total = response.data.totalDocs;
          this.pagination.perPage = response.data.limit;
        });
    },
    changePageListener(page) {
      this.dataLoad(page);
    }
  },
  watch: {
    payments: function(newValue, oldValue) {
      this.docs = newValue.docs;
      this.pagination.currentPage = parseInt(newValue.page, 10);
      this.pagination.total = newValue.totalDocs;
      this.pagination.perPage = newValue.limit;
    }
  }
};
</script>

<style lang="scss" scoped>
.card-title {
  font-family: IranSansBold;
}
</style>

