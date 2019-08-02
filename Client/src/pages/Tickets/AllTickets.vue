<template>
  <section class="container-fluid text-right">
    <!-- SHOULD HAVE PAGINATION -->
    <h1 class="pb-5 text-danger">تیکت ها</h1>
 
    <el-table :data="tableData">
      <el-table-column min-width="50" header-align="center" type="index"></el-table-column>
      <el-table-column min-width="230" header-align="right" prop="name" label="عنوان"></el-table-column>
      <el-table-column min-width="100" header-align="center" prop="department" label="دپارتمان"></el-table-column>
      <el-table-column min-width="100" header-align="center" prop="date" label="زمان"></el-table-column>
      <el-table-column min-width="100" header-align="center" prop="status" label="وضعیت"></el-table-column>

      <el-table-column min-width="150" header-align="right">
        <div slot-scope="{row}" class="text-right">
          <router-link to="/singleticket">
            <base-button class="px-3" round type="info">
              <i class="pl-3 fas fa-eye"></i> نمایش
            </base-button>
          </router-link>
        </div>
      </el-table-column>
    </el-table>
       <div class="pt-5 text-left">
      <router-link to="/createticket">
        <base-button round type="success">
          <!-- <i class="pl-3 fas fa-eye"></i> -->
          <i class="pl-3 fas fa-pencil-alt"></i>
           تیکت جدید
        </base-button>
      </router-link>
    </div>
  </section>
</template>

<script>
import { Table, TableColumn } from 'element-ui';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: 'Release date for next episode',
          date: '04/06/2019',
          department: 'آموزش',
          status: 'بسته شده'
        },
        {
          id: 2,
          name: 'Discounts for course',
          date: '05/06/2019',
          department: 'فروش و مالی',
          status: 'در حال پیگیری'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: IranSansBold;
}
</style>

