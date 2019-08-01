<template>
  <div class="row">
    <div
      class="col-md-9 card UnitSection mb-5"
      v-if="episodes.length"
      :style="scrollable ? {'overflow-y': 'auto'} : ''"
    >
      <div
        class="UnitBox d-flex justify-content-between"
        v-for="episode of episodes"
        :key="episode.id"
        :class="activeEpisode == episode.id ? 'active' : ''"
      >
        <div class="right d-flex justify-content-end">
          <div :class="getUnitBadge(episode.type)">
            <i :class="'fas ' + getEpisodeIcon(episode.type)"></i>
          </div>
          <div class="UnitName pr-3">
            <router-link
              :to="'/courses/' + course.slug + '/unit-' + episode.number"
              v-if="!mustBuy(episode.type)"
            >
              <p class="UnitName text-right">{{ episode.title }}</p>
            </router-link>
            <p
              @click="throwClickEvent"
              class="UnitName text-right"
              v-if="mustBuy(episode.type)"
            >{{ episode.title }}</p>
          </div>
        </div>
        <div class="left d-flex justify-content-between">
          <div class="pl-2 d-flex align-self-center" v-if="purchased">
            <i :class="episode.done ? 'fas fa-check text-success fas-2x' : 'fas fa-times text-danger fas-2x'"></i>
          </div>
          <div class="pl-2">
            <p class="detail-price">{{ getEpisodeType(episode.type) }}</p>
          </div>

          <div>
            <p class="detail-time">{{ getUnitTime(episode.time) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <custom-card :enrolled="purchased" :done="courseDonePercentage" :remain="courseRemainPercentage" />
    </div>
  </div>
</template>

<script>
import timeUtil from '../../../util/time';
import CustomCard from './CustomCard.vue';

export default {
  components: {
    CustomCard
  },
  props: ['course', 'episodes', 'scrollable', 'maxepisodes', 'purchased', 'courseDonePercentage', 'courseRemainPercentage', 'activeEpisode'],
  methods: {
    getEpisodeType(type) {
      switch (type.toLowerCase()) {
        case 'free':
          return 'رایگان';
        case 'cash':
        case 'paid':
          return 'پرداختنی';
        case 'vip':
          return 'VIP';
      }
    },
    getEpisodeIcon(type) {
      switch (type.toLowerCase()) {
        case 'free':
          return 'fa-unlock-alt';
        case 'cash':
        case 'paid':
          if (this.purchased) {
            return 'fa-unlock-alt';
          }
          return 'fa-lock';
        case 'vip':
          return 'fa-key';
      }
    },
    getUnitBadge(type) {
      switch (type.toLowerCase()) {
        case 'free':
          return 'UnitBadgeUnlocked';
        case 'cash':
        case 'paid':
          if (this.purchased) {
            return 'UnitBadgeUnlocked';
          }
          return 'UnitBadgelocked';
        case 'vip':
          if (this.IAmVIP) {
            return 'UnitBadgeUnlocked';
          }
          return 'UnitBadgeVIP';
      }
    },
    getUnitTime(time) {
      return timeUtil.secondsToTime(timeUtil.timeToSeconds(time));
    },
    mustBuy(type) {
      return (
        ['cash', 'paid', 'vip'].indexOf(type.toLowerCase()) != -1 &&
        !this.purchased
      );
    },
    throwClickEvent() {
      this.$emit('buy');
    },
  },
  computed: {
    IAmVIP() {
      return (
        this.$root.$data.user &&
        this.$root.$data.user.vipTime &&
        new Date(this.$root.$data.user.vipTime) > new Date()
      );
    }
  },
  mounted() {
    if (this.scrollable) {
      const height =
        (this.$el.querySelector('.UnitBox').clientHeight + 2) *
        this.maxepisodes;
      this.$el.style['max-height'] = height + 'px';
    }
  }
};
</script>

<style lang="scss" scoped>
.UnitSection {
  background: #f5f4f4 !important;
  height: 100%;
}
.UnitBox {
  -webkit-box-align: center;
  background: rgb(253, 253, 253) !important;
  padding: 19px 15px;
  align-items: center;
  border-bottom: 1px solid rgba(133, 133, 133, 0.199);
  border-radius: 0 10px 10px 0;
  // margin-top: 6px;
  border-right: 11px solid rgba(156, 156, 156, 0.377);
  transition: all 0.2s ease 0s;
}

h4 {
  font-family: IranSansBold !important;
}

.UnitBox:hover,
.active {
  border-right-color: #07d9b6;
  .UnitBadgeUnlocked {
    color: #07d9b6;
  }
  .UnitBadgelocked {
    color: #d82a50;
  }
  .detail-time {
    background: #07d9b6 !important;
  }
  .UnitName {
    cursor: pointer;
    font-family: IranSansBold;
    color: #0caf94;
  }
}

.UnitBadgeUnlocked {
  font-size: 1.3rem;
  color: #06a086;
}

.UnitBadgelocked {
  font-size: 1.3rem;
  color: #ac2451;
}

.UnitBadgeVIP {
  font-size: 1.3rem;
  color: #e7d800;
}

.UnitName {
  font-size: 1rem;
  color: rgb(158, 158, 158);
  margin-top: auto;
}
.detail-time {
  color: rgb(255, 255, 255) !important;
  font-size: 0.9em;
  align-self: center;
  background: rgb(29, 35, 83) !important;
  padding: 8px 13px;
  border-radius: 8px;
}

.detail-price {
  color: rgb(255, 255, 255) !important;
  font-size: 0.9em;
  align-self: center;
  background: rgba(70, 110, 218, 0.788) !important;
  padding: 8px 15px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .UnitBox {
    padding: 20px 7px;
  }

  .UnitName {
    font-size: 0.86rem;
  }

  .detail-time {
    font-size: 0.6rem;
    align-self: center;
    padding: 7px;
  }

  .detail-price {
    font-size: 0.6rem;
    align-self: center;
    padding: 7px;
  }
  .UnitBadgeUnlocked,
  .UnitBadgeVIP,
  .UnitBadgelocked {
    font-size: 0.9rem;
  }
}
</style>