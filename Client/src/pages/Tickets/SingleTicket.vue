<template>
  <section class="container text-right">
    <div>
      <h1>
        #001
        <span class="subtitle">(goes here عنوان تیکت)</span>
      </h1>
    </div>
    <div class="container mt-5 pb-5">

      <!-- CARD RIGHT -->
      <div class="card-custom my-3">
        <div class="d-flex justify-content-between">
          <p class="ticket-user">
            <!-- USER PICTURE SHOULD GO INSTEAD OF ICON -->
            <i class="pl-1 text-danger far fa-user"></i>
            Example User
          </p>
          <p class="ticket-date">
            05/06/2019
            <span class="pr-3">00:28</span>
          </p>
        </div>
        <!-- IF TEXT IS WRITTEN IN FARSI, TEXT SHOULD BE RTL, AND IF IT IS WRITTEN IN ENGLISH IT SHOULD BE LTR -->
        <p
          class="pt-4 main-ticket-text"
        >This example user has asked a question. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum impedit laboriosam quam, perferendis corrupti in quaerat necessitatibus sed, ad dolorum accusamus ea tempora dolor provident magni enim architecto cum adipisci!</p>

        <!-- ADMIN SHOULD ONLY SEE THESE ICONS - WHEN MESSAGE WANTS TO BE EDITED - IT SHOULD BE EDITED WITH CKEDITOR -->
        <div class="icons text-left pt-3">
          <i class="fas fa-pencil-alt pl-3"></i>
          <i class="far fa-trash-alt pl-5 pr-1"></i>
        </div>
      </div>

      <!-- CARD LEFT -->
      <div class="card-custom card-reply-left my-3">
        <div class="d-flex justify-content-between">
          <p class="ticket-user">
            <!-- USER PICTURE SHOULD GO INSTEAD OF ICON -->
            <i class="pl-2 text-danger far fa-user"></i>
            Arya Doroudian
          </p>
          <p class="ticket-date">
            05/06/2019
            <span class="pr-3">23:05</span>
          </p>
        </div>

        <!-- IF TEXT IS WRITTEN IN FARSI, TEXT SHOULD BE RTL, AND IF IT IS WRITTEN IN ENGLISH IT SHOULD BE LTR -->
        <p
          class="pt-4 main-ticket-text"
        >This user has answered them. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia doloremque eum provident quia, voluptatum dignissimos minus sequi quibusdam recusandae sapiente laboriosam quisquam ad alias porro nulla praesentium fuga corporis fugiat?</p>
          <!-- ADMIN SHOULD ONLY SEE THESE ICONS - WHEN MESSAGE WANTS TO BE EDITED - IT SHOULD BE EDITED WITH CKEDITOR -->
        <div class="icons text-left pt-3">
          <i class="fas fa-pencil-alt pl-3"></i>
          <i class="far fa-trash-alt pl-5 pr-1"></i>
        </div>
      </div>

      <!-- CARD RIGHT 2 -->
      <div class="card-custom my-3">
        <div class="d-flex justify-content-between">
          <p class="ticket-user">
            <!-- USER PICTURE SHOULD GO INSTEAD OF ICON -->
            <i class="pl-1 text-danger far fa-user"></i>
            Example User
          </p>
          <p class="ticket-date">      
            05/06/2019
            <span class="pr-3">00:28</span>
          </p>
        </div>
        <p class="pt-4 main-ticket-text">This is an example of a reply</p>
          <!-- ADMIN SHOULD ONLY SEE THESE ICONS - WHEN MESSAGE WANTS TO BE EDITED - IT SHOULD BE EDITED WITH CKEDITOR -->
        <div class="icons text-left pt-3">
          <i class="fas fa-pencil-alt pl-3"></i>
          <i class="far fa-trash-alt pl-5 pr-1"></i>
        </div>
      </div>

      <!-- Ticket Reply -->
      <h4 class="pt-5">پاسخی ارسال کنید!</h4>
      <base-input>
        <!-- CKEDITOR SHOULD GO HERE! -->
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          placeholder="متن تیکت"
          rows="3"
        ></textarea>
      </base-input>
      <div class="btn-group send-buttons pt-3">
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
.main-card {
  border-radius: 25px;
  min-height: 70vh;
  background-color: transparent !important;
}
.card-custom {
  background-color: rgb(236, 236, 236);
  border-radius: 25px;
  padding: 2em 3em;
}

.send-buttons {
  i {
  color: white;
  }
}

.ticket-date {
font-family: IranSansBold;
color: rgba(145, 145, 145, 0.85);

  span {
  font-family: IranSans;
  }
}

.card-reply-left {
  margin-right: 2em;
  margin-left: -2em;
}

.ticket-user {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9rem;
  color: rgba(77, 77, 77, 0.877);
}

i {
  color: rgba(145, 145, 145, 0.788);
}
i:hover {
  cursor: pointer;
  color: rgb(255, 136, 0);
}

@media (max-width: 768px) {
  .ticket-user {
    font-size: 0.8em;
    width: 100%;
  }
  .ticket-date {
    font-size: 0.8em;
    width: 100%;
    display: block;
  }

  .card-custom {
    padding: 20px;
    .main-ticket-text {
      font-size: 0.94em;
    }
  }
}
</style>

