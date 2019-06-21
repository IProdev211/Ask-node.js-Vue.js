<template>
  <section
    class="card UnitSection mb-5"
    v-if="episodes.length"
    :style="scrollable ? {'overflow-y': 'auto'} : ''"
  >
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
.UnitSection {
  background: transparent !important;
}
.UnitBox {
  -webkit-box-align: center;
  background: transparent !important;
  padding: 15px 15px;
  align-items: center;
  border: 1px solid rgba(133, 133, 133, 0.199);
  border-radius: 10px;
  // margin-top: 2px;
  border-right: 11px solid rgba(156, 156, 156, 0.377);
  transition: all 0.2s ease 0s;
}

h4 {
  font-family: IranSansBold !important;
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
    background: #068570 !important;
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
  background: rgb(1, 7, 63) !important;
  padding: 8px 10px;
  border-radius: 12px;
}

.detail-price {
  color: rgb(255, 255, 255) !important;
  font-size: 0.9em;
  align-self: center;
  background: rgb(88, 74, 214) !important;
  padding: 8px 10px;
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