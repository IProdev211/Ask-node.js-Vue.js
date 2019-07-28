<template>
  <div class="widget-vip card px-2">
    <div class="row">
      <div class="col-md-3">
        <p class="px-4 my-4 vip-title text-black">
          <i class="fas fa-unlock pl-2 icon"></i>
          VIP Access
        </p>
      </div>
      <div class="col-md-5 my-auto">
        <p
          class="px-3 my-auto vip-desc text-center py-3 text-black"
        >با خریداری این پنل شما میتوانید به ویدیوهای ویژه سایت به مدت یک ماه بطور کامل دسترسی داشته باشید.</p>
      </div>
      <div class="col-md-3 dropdown-prices my-auto">
        <base-dropdown title="عضویت" title-classes="btn btn-default px-5">
          <a class="dropdown-item" href="#" @click.prevent="payment">ماهانه - 39 هزار تومان</a>
          <a class="dropdown-item" href="#" @click.prevent="payment(4)">۴ ماهه - 139 هزار تومان</a>
          <a class="dropdown-item" href="#" @click.prevent="payment(12)">یکساله - 309 هزار تومان</a>
        </base-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { BaseDropdown } from 'src/components';
import { Select, Option } from 'element-ui';
import backend from '../../backend';
import moment from 'jalali-moment';
import Swal from 'sweetalert';

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
  },
  methods: {
    payment(plan = 1) {
      backend.post('/vip/payment', { plan }).then(response => {
        if (response.data.status == 'success') {
          window.location.href = response.data.redirect;
        } else {
          Swal({
            title: 'خطا',
            text: `در حال حاضر امکان ارتباط با درگاه پرداخت وجود ندارد.`,
            icon: 'success'
          });
        }
      });
    }
  },
  mounted() {
    if (
      this.$route.query.hasOwnProperty('Authority') &&
      this.$route.query.hasOwnProperty('Status')
    ) {
      const authority = this.$route.query.Authority;
      const status = this.$route.query.Status;
      if (status !== 'OK') {
        Swal({
          title: 'تراکنش ناموفق',
          text: `تراکنش شما با موفقیت پرداخت نشد. درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد`,
          icon: 'warning'
        });
      } else {
        backend
          .post(`vip/payment/verification`, { status, authority })
          .then(response => {
            this.$root.$data.user.vipTime = response.data.vipTime;
            Swal({
              title: 'تراکنش موفق',
              text: `اکانت شما تا ${moment(response.data.vipTime)
                .locale('fa')
                .format('YYYY/MM/DD')} تمدید شد.`,
              icon: 'success'
            });
          })
          .catch(response => {
            Swal({
              title: 'تراکنش ناموفق',
              text: `تراکنش شما با موفقیت پرداخت نشد.\nدرصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد`,
              icon: 'warning'
            });
          });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@media (max-width: 680px) {
  .dropdown-prices {
    text-align: center !important;
    padding-bottom: 15px;
  }
}

.widget-vip {
  background-image: linear-gradient(90deg, #bf953f, #fcf6ba);
  border-radius: 15px;
}

.text-black {
  color: black;
}

.vip-title {
  font-size: 1.7rem;
  // font-weight: 600;
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
