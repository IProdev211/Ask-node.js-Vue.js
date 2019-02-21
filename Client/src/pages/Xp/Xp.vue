<template>
  <div>
    <card>
      <div class="row">
        <!-- Table -->
        <div class="col-md-5 mb-5 pt-3">
          <div slot="header">
            <h2 class="card-title text-center pb-3">
              Ask Arya xP Points System
            </h2>
          </div>
          <el-table :data="tableData">
            <el-table-column min-width="65" label="Badge" align="center">
              <div class="photo" slot-scope="{ row }">
                <img :src="row.img" alt="Table image" />
              </div>
            </el-table-column>
            <el-table-column
              min-width="100"
              prop="title"
              label="Title"
            ></el-table-column>
            <el-table-column
              min-width="85"
              prop="xp"
              label="xP"
            ></el-table-column>
          </el-table>
        </div>
        <!-- Points System Explanation -->
        <div class="col-md-7 mb-5 pt-3">
          <div>
            <h2 class="card-title text-center pb-3">How Does It Work?</h2>
            <!-- video element -->
            <vue-plyr class="videoWidth videoPlayer pt-5 px-3">
              <video poster="poster.png" src="video.mp4">
                <source
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                  type="video/mp4"
                  size="720"
                />
                <track
                  kind="captions"
                  label="English"
                  srclang="en"
                  src="captions-en.vtt"
                  default
                />
              </video>
            </vue-plyr>
            <div class="container">
              <p class="pt-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Tenetur doloremque aperiam cumque quaerat sit rem tempore, rerum
                quis assumenda? Unde ducimus exercitationem voluptatum odio
                modi, expedita, doloribus, asperiores maxime enim dicta.
                <br />
                <br />Eveniet dolor assumenda maxime molestias esse voluptatem
                est molestiae corporis, rem adipisci est temporibus accusantium.
                Excepturi quibusdam blanditiis, oloremque nostrum porro
                excepturi eligendi non soluta quasi nam autem repudiandae neque
                itaque amet atque, molestias aut eaque fugit voluptatem?
              </p>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-12 mb-4">
          <NewTodo></NewTodo>
        </div>-->
      </div>
    </card>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui';
import { BaseCheckbox } from 'src/components';
// import NewTodo from './../Dashboard/NewTodo/NewTodo';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    // NewTodo,
    BaseCheckbox
  },
  data() {
    return {
      tableData: [
        {
          id: 8,
          img: '/img/badges/8-Master.svg',
          title: 'Master',
          xp: '500 xP'
        },
        {
          id: 7,
          img: '/img/badges/7-Experienced.svg',
          title: 'Experienced',
          xp: '300 xP'
        },
        {
          id: 6,
          img: '/img/badges/6-Seasoned.svg',
          title: 'Seasoned',
          xp: '200 xP'
        },
        {
          id: 5,
          img: '/img/badges/5-Skilled.svg',
          title: 'Skilled',
          xp: '150 xP'
        },
        {
          id: 4,
          img: '/img/badges/4-Talented.svg',
          title: 'Talented',
          xp: '100 xP'
        },
        {
          id: 3,
          img: '/img/badges/3-Beginner.svg',
          title: 'Beginner',
          xp: '60 xP'
        },
        {
          id: 2,
          img: '/img/badges/2-Rookie.svg',
          title: 'Rookie',
          xp: '30 xP'
        },
        {
          id: 1,
          img: '/img/badges/1-Novice.svg',
          title: 'Novice',
          xp: '10 xP'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.checkbox-cell {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-table table > thead > tr > th {
  font-size: 15px !important;
}

.el-table table > tbody > tr > td .photo {
  height: 50px !important;
  width: 50px !important;
}
</style>
