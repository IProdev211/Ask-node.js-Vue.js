<template>
  <section class="container text-right">
    <div>
      <h1>
        #001
        <span class="subtitle">مشاهده تیکت</span>
      </h1>
    </div>
    <div class="card container mt-5 pb-4">
      <h2 class="ticket-desc pt-4 pr-3">(goes here عنوان تیکت)</h2>
      <!-- CARD LEFT -->
      <div class="card-custom py-3 px-3 mr-5 my-3">
        <div class="d-flex justify-content-between">
          <p class="ticket-user">
            <!-- USER PICTURE SHOULD GO INSTEAD OF ICON -->
            <i class="pl-2 text-danger far fa-user"></i>
            Arya Doroudian
          </p>
          <p class="ticket-date text-muted font-weight-bold">
            <span class="pl-1 font-weight-normal">23:05</span>
            05/06/2019
          </p>
        </div>
        <p class="pt-4">this is card left</p>
      </div>
      <!-- CARD RIGHT -->
      <div class="card-custom py-3 px-3 ml-5 my-3">
        <div class="d-flex justify-content-between">
          <p class="ticket-user">
            <!-- USER PICTURE SHOULD GO INSTEAD OF ICON -->
            <i class="pl-1 text-danger far fa-user"></i>
            Example User
          </p>
          <p class="ticket-date text-muted font-weight-bold">
            <span class="pl-2 font-weight-normal">00:28</span>
            05/06/2019
          </p>
        </div>
        <p class="pt-4">this is card right</p>
      </div>

      <!-- Ticket Reply -->
      <h4 class="pt-5">پاسخی ارسال کنید!</h4>
      <base-input>
        <!-- CKEDITOR -->
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          placeholder="متن تیکت"
          rows="3"
        ></textarea>
      </base-input>
      <div class="btn-group pt-3">
        <!-- FILE PREVIEW SHOULD BE SHOWN -- ONLY ACCEPT IMAGES FROM USERS - ADMINS CAN UPLOAD ANYTHING THEY WANT (ERRORS SHOULD SHOW IF OTHER FILES ARE UPLOADED) -->
        <base-button class="animation-on-hover" type="primary" native-type="Submit">
          <i class="pl-2 fas fa-cloud-upload-alt"></i>
          پیوست فایل
        </base-button>
        <base-button class="animation-on-hover" type="danger" native-type="Submit">
          <i class="pl-2 far fa-paper-plane"></i>
          ارسال
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 1rem;
}
.ticket-desc {
  font-size: 1.25rem;
}
.card {
  border-radius: 25px;
  min-height: 70vh;
  background-color: rgb(28, 29, 44);
}
.card-custom {
  background-color: rgb(36, 38, 56);
  border-radius: 25px;
}
.ticket-user {
  font-size: 0.9rem;
  color: rgb(168, 168, 168);
}

@media (max-width: 768px) {
  .ticket-user,
  .ticket-date {
    font-size: 0.7rem;
  }
}
</style>

