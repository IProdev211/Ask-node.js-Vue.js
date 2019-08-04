<template>
  <section>
    <h1 slot="header" class="card-title text-danger text-right pb-5">ارسال تیکت</h1>
    <manage-ticket @ticket="ticketAddListener"></manage-ticket>
  </section>
</template>

<script>
import ManageTicket from '../AdminSection/ManageTickets/ManageTicket';
export default {
  components: {
    ManageTicket
  },
  methods: {
    ticketAddListener(ticket) {}
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: IranSansBold;
}
</style>

