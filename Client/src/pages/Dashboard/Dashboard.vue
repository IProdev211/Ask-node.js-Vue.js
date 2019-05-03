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
          subTitle: 'دوره های من',
          type: 'warning',
          icon: 'tim-icons icon-book-bookmark',
          footer:
            '<a href="/courses"><i class="tim-icons icon-bag-16 pl-2"></i> در حال یادگیری</a>'
        },
        {
          title: myEpisodes + ' / ' + totalEpisodes,
          subTitle: 'درس های باز شده',
          type: 'danger',
          icon: 'tim-icons icon-molecule-40',
          footer:
            '<i class="tim-icons icon-video-66 pl-2"></i> مجموع درس های موجود'
        },
        {
          title: '27',
          subTitle: 'امتحان ها',
          type: 'info',
          icon: 'fas fa-university',
          footer:
            '<i class="far fa-bookmark pl-2"></i> تعداد امتحانات که موجود هستن'
        },
        {
          title: '+45 xP',
          subTitle: 'امتیاز اسک آریا',
          type: 'primary',
          icon: 'tim-icons icon-shape-star',
          footer:
            '<i class="tim-icons icon-sound-wave pl-2"></i></i> مرحله ی بعد BEGINNER <span class="coloredLink">85%</span>  '
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
