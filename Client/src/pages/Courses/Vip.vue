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
      <div class="col-md-3 my-auto">
        <base-dropdown title="عضویت" title-classes="btn btn-default px-5">
          <a class="dropdown-item" href="#">ماهانه - 39 هزار تومان</a>
          <a class="dropdown-item" href="#">۴ ماهه - 139 هزار تومان</a>
          <a class="dropdown-item" href="#">یکساله - 309 هزار تومان</a>
        </base-dropdown>
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
          { value: 'vip2', label: '۴ ماهه - 139 هزار تومان' },
          { value: 'vip3', label: 'یکساله - 309 هزار تومان' }
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
