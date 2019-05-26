<template>
  <div class="widget-vip card px-2">
    <div class="row">
      <div class="col-md-3">
        <p class="px-4 my-4 vip-title text-black">
          VIP Access
          <i class="fas fa-unlock pr-2 icon"></i>
        </p>
      </div>

      <div class="col-md-5 my-auto">
        <p class="px-3 my-auto vip-desc text-center py-3 text-black">
          با خریداری این پنل شما میتوانید به ویدیوهای ویژه سایت به مدت یک ماه بطور کامل دسترسی داشته باشید.
          <span
            class="font-weight-bold"
          ></span>
        </p>
      </div>
      <div class="col-md-3 my-auto py-3">
        <base-dropdown title="عضویت" title-classes="btn btn-primary px-5">
          <a class="dropdown-item" href="#">ماهانه - 39 هزار تومان</a>
          <a class="dropdown-item" href="#">۴ ماهه - 109 هزار تومان</a>
          <a class="dropdown-item" href="#">یکساله - 229 هزار تومان</a>
        </base-dropdown>

        <!-- <el-select class="select-danger" placeholder="عضویت" v-model="selects.simple">
            <el-option
              v-for="option in selects.vip"
              class="select-danger"
              :value="option.value"
              :label="option.label"
              :key="option.label"
            ></el-option>
        </el-select>-->
        <!-- <router-link to="buyVIP">
          <base-button class="mb-2" type="danger">
            <i class="tim-icons icon-money-coins px-2"></i> ۳۹،۰۰۰ تومان‎
          </base-button>
        </router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import { BaseDropdown } from 'src/components';

import { Select, Option } from 'element-ui';
export default {
  components: {
    BaseDropdown,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      selects: {
        simple: '',
        vip: [
          { value: 'vip1', label: 'ماهانه - 39 هزار تومان' },
          { value: 'vip2', label: '۴ ماهه - 109 هزار تومان' },
          { value: 'vip3', label: 'یکساله - 229 هزار تومان' }
        ]
      }
    };
  }
};
</script>


<style lang="scss" scoped>
.widget-vip {
  background-image: linear-gradient(90deg, #bf953f, #fcf6ba);
  border-radius: 15px;
}

.text-black {
  color: black;
}

.vip-title {
  font-size: 1.7rem;
  font-weight: 600;
  .icon {
    font-size: 1.6rem;
  }
}

.vip-desc {
  font-size: 0.9rem;
}

.select-danger.el-select .el-input input {
  background-color: #b42e5b !important;
  border-color: transparent !important;
}
</style>
