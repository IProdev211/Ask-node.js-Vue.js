<template>
  <section class="pt-5">
    <h4 slot="header" class="card-title">Send Ticket</h4>
    <card>
      <form class="text-rtl pt-2">
        <div class="form-row">
          <div class="col-md-6">
            <label class="pull-right">عنوان</label>
            <base-input></base-input>
          </div>

          <div class="col-md-2">
            <label class="pull-right">مربوط به</label>
            <base-input placeholder="USER SEARCH"></base-input>
          </div>

          <div class="col-md-2">
            <label class="pull-right">اهمیت</label>
            <base-input>
              <select class="form-control">
                <option selected>عادی</option>
                <option>مهم</option>
                <option>فوری</option>
              </select>
            </base-input>
          </div>

          <div class="col-md-2">
            <label class="pull-right">دپارتمان</label>
            <base-input>
              <select class="form-control">
                <option selected>پشتیبانی</option>
                <option>فروش و مالی</option>
                <option>آموزش</option>
              </select>
            </base-input>
          </div>
        </div>

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
      </form>
    </card>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>

