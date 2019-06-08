<template>
  <section
    class="card UnitSection"
    v-if="episodes.length"
    :style="scrollable ? {'overflow-y': 'auto'} : ''"
  >
    <h4 class="text-center pt-3">سرفصل دوره</h4>
    <!-- UNIT 1 -->
    <div
      class="UnitBox d-flex justify-content-between"
      v-for="episode of episodes"
      :key="episode.id"
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
        <div class="pl-2">
          <p class="detail-price">{{ getEpisodeType(episode.type) }}</p>
        </div>

        <div>
          <p class="detail-time">{{ getUnitTime(episode.time) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import timeUtil from '../../../util/time';

export default {
  props: ['course', 'episodes', 'scrollable', 'maxepisodes', 'purchased'],
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
        ['cash', 'paid'].indexOf(type.toLowerCase()) != -1 && !this.purchased
      );
    },
    throwClickEvent() {
      this.$emit('buy');
    }
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
// .UnitSection {
//   background: #191e2f;
//   border-radius: 10px;
//   overflow: hidden;
//   border-width: 1px;
//   border-style: solid;
//   border-color: rgba(0, 0, 0, 0.1);
//   border-image: initial;
// }
.UnitBox {
  -webkit-box-align: center;
  padding: 20px 25px;
  align-items: center;
  border-bottom: 1px solid rgba(133, 133, 133, 0.377);
  border-right: 10px solid rgba(156, 156, 156, 0.377);
  transition: all 0.2s ease 0s;
}

h4 {
  font-family: IranSansBold;
}

.UnitBox:hover {
  border-right-color: #07d9b6;
  .UnitBadgeUnlocked {
    color: #07d9b6;
  }
  .UnitBadgelocked {
    color: #d82a50;
  }
  .detail-time {
    background: #107a69;
  }
  .UnitName {
    cursor: pointer;
    font-family: IranSansBold;
    color: #107a69;
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
  font-size: 1em;
  align-self: center;
  background: rgb(177, 177, 177) !important;
  padding: 8px 15px;
  border-radius: 12px;
}

.detail-price {
  color: rgb(255, 255, 255) !important;
  font-size: 1em;
  align-self: center;
  background: rgb(122, 122, 122) !important;
  padding: 8px 15px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .UnitBox {
    padding: 20px 7px;
  }

  .UnitName {
    font-size: 0.75rem;
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