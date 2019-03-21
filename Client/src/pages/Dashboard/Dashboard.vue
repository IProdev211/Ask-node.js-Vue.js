<template>
  <div class="row">
    <!-- User Profile Section -->
    <div class="col-lg-8 col-md-12 mb-4">
      <user-card :user="$root.$data.user"></user-card>
    </div>
    <!-- Notification Section -->
    <div class="col-lg-4 col-md-12 mb-4">
      <NotificationCard></NotificationCard>
    </div>

    <!-- Stats Cards Section -->
    <div class="col-lg-3 col-md-6 ml-auto mr-auto" v-for="card in statsCards" :key="card.title">
      <stats-card
        :title="card.title"
        :sub-title="card.subTitle"
        :type="card.type"
        :icon="card.icon"
      >
        <div slot="footer" v-html="card.footer"></div>
      </stats-card>
    </div>

    <!-- Payment History Section -->
    <div class="col-md-12 mb-4 text-center">
      <PaymentHistory :payments="payments"></PaymentHistory>
    </div>

    <!-- Todos Section -->
    <!-- <div class="col-md-12 mb-4">
      <NewTodo></NewTodo>
    </div>-->
    <!-- <div class="col-lg-12 col-md-12">
      <card type="tasks" :header-classes="{ 'text-right': isRTL }">
        <template slot="header">
          <h4 class="title d-inline">Tasks</h4>
        </template>
        <div class="table-full-width table-responsive">
          <task-list></task-list>
        </div>
      </card>
    </div>-->
    <!-- Add/Edit Tasks -->
    <!-- <div class="col-lg-5">
      <card title="Horizontal Form">
        <h4 slot="header" class="card-title">Add / Edit Tasks</h4>
        <br>
        <form class="form-horizontal" @submit.prevent="updateTask">
          <div class="row pb-3 mobileLeft">
            <label class="col-md-3 col-form-label">Title</label>
            <div class="col-md-9">
              <base-input type="text" placeholder="Task Title" v-model="task.title"></base-input>
            </div>
          </div>
          <div class="row mobileLeft">
            <label class="col-md-3 col-form-label">Description</label>
            <div class="col-lg-9">
              <base-input type="text" placeholder="Short Description" v-model="task.description"></base-input>
            </div>
          </div>
          <div class="row">
            <label class="col-md-3 col-form-label"></label>
          </div>
        </form>
        <br>
        <div class="row pb-2">
          <label class="col-md-3 col-form-label"></label>
          <div class="col-md-9">
            <base-checkbox>Delete Task</base-checkbox>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9 offset-md-3 col-12">
            <base-button class="mt-3" native-type="submit" type="primary">Save Task</base-button>
          </div>
        </div>
        <br>
      </card>
    </div>-->
  </div>
</template>
<script>
import StatsCard from 'src/components/Cards/StatsCard';
import UserCard from './Profile/UserCard.vue';
import NotificationCard from './Notification/NotificationCard.vue';
import PaymentHistory from './PaymentHistory/PaymentHistory.vue';
import backend from '../../backend';

export default {
  components: {
    StatsCard,
    UserCard,
    NotificationCard,
    PaymentHistory
  },
  data() {
    return {
      task: {
        title: '',
        description: ''
      },
      statsCards: [],
      payments: {
        docs: [],
        total: 0,
        page: 1
      }
    };
  },
  methods: {
    setStatsCards(courses, myEpisodes, totalEpisodes) {
      this.statsCards = [
        {
          title: courses.toString(),
          subTitle: 'دوره های در حال یادگیری',
          type: 'warning',
          icon: 'tim-icons icon-book-bookmark',
          footer:
            '<a href="/courses"><i class="tim-icons icon-bag-16"></i> دوره‌های آموزشی</a>'
        },
        {
          title: myEpisodes + ' / ' + totalEpisodes,
          subTitle: 'درس های باز شده',
          type: 'danger',
          icon: 'tim-icons icon-molecule-40',
          footer: '<i class="tim-icons icon-video-66"></i> مجموع درس های موجود'
        },
        {
          title: '27',
          subTitle: 'امتحان ها',
          type: 'info',
          icon: 'fas fa-university',
          footer: '<i class="far fa-bookmark"></i> Good Job'
        },
        {
          title: '+45 xP',
          subTitle: 'سیستم امتیاز اسک آریا',
          type: 'primary',
          icon: 'tim-icons icon-shape-star',
          footer:
            '<i class="tim-icons icon-sound-wave"></i></i> Progress To BEGINNER <span class="coloredLink">85%</span>  '
        }
      ];
    },
    getData() {
      backend.get('dashboard').then(response => {
        this.setStatsCards(
          response.data.courses,
          response.data.episodes[0],
          response.data.episodes[1]
        );
        this.payments = response.data.payments;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style>
.coloredLink {
  color: #de4dc7;
  font-weight: 600;
}

.form-check input[type='checkbox'] + .form-check-sign::after {
  background-color: #ff0000;
}

.form-horizontal .col-form-label,
.form-horizontal .label-on-right {
  text-align: left !important;
}
</style>
