<template>
  <div class="row">
    <!-- User Profile Section -->
    <div class="col-lg-7 col-md-12 mb-4">
      <user-card :user="$root.$data.user"></user-card>
    </div>
    <!-- Notification Section -->
    <div class="col-lg-5 col-md-12 mb-4">
      <NotificationCard></NotificationCard>
    </div>

    <!-- Stats Cards Section -->
    <div class="col-lg-4 col-md-4 ml-auto mr-auto" v-for="card in statsCards" :key="card.title">
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
import moment from 'moment';

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
          // subTitle: 'دوره های تهیه شده ی سما',

          type: 'warning',
          icon: 'tim-icons icon-book-bookmark',
          footer:
            '<a href="/mycourses"><i class="tim-icons icon-bag-16 pl-2"></i> در حال یادگیری</a>'
        },
        {
          title: totalEpisodes + ' / ' + myEpisodes,
          subTitle: 'درس های من',
          // subTitle: 'درس های ثبت نام شده',
          type: 'danger',
          icon: 'tim-icons icon-molecule-40',
          footer:
            '<i class="tim-icons icon-video-66 pl-2"></i> مجموع درس های موجود'
        },
        {
          title: 'به زودی',
          subTitle: 'امتحان های من',
          type: 'primary',
          icon: 'far fa-check-square',
          footer:
            '<a href="/comingsoon"><i class="far fa-check-square pl-2"></i> امتحان های شما</a>'
        }
        // {
        //   title: '0',
        //   subTitle: 'امتحان ها',
        //   type: 'info',
        //   icon: 'fas fa-university',
        //   footer:
        //     '<i class="far fa-bookmark pl-2"></i> تعداد امتحانات که موجود هستن'
        // }
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
<style lang="scss" scoped>
.white-content .card:not(.card-pricing).card-stats .card-title {
  font-family: IranSansBold !important;
}

.coloredLink {
  color: #de4dc7;
}

.form-check input[type='checkbox'] + .form-check-sign::after {
  background-color: #ff0000;
}

.form-horizontal .col-form-label,
.form-horizontal .label-on-right {
  text-align: left !important;
}
</style>
