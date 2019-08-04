<template>
  <section class="container text-right">
    <div>
      <h1>
        #{{ticket.ticket_id}}
        <span class="subtitle">مشاهده تیکت</span>
      </h1>
    </div>
    <div class="container mt-5 pb-5">
      <h2 class="ticket-desc pt-4 pr-3">{{ticket.title}}</h2>
      <div></div>
      <!-- CARD RIGHT -->
      <div
        v-for="message of messages"
        :key="message.id"
        class="card-custom py-4 pb px-5 my-3"
        :class="message.user.id == ticket.id ? 'ml-5' : 'mr-5'"
      >
        <div class="d-flex justify-content-between">
          <p class="ticket-user">
            <!-- USER PICTURE SHOULD GO INSTEAD OF ICON -->
            <i class="pl-1 text-danger far fa-user"></i>
            {{message.user.name}}
          </p>
          <p class="ticket-date text-muted font-weight-bold">
            <!-- ADMIN SHOULD ONLY SEE THESE ICONS - WHEN MESSAGE WANTS TO BE EDITED - IT SHOULD BE EDITED WITH CKEDITOR -->
            <span class="pl-5" v-if="isAdmin">
              <i @click="handleEdit(message)" class="fas fa-pencil-alt pl-2"></i>
              <i @click="handleDelete(message)" class="far fa-trash-alt pr-1"></i>
            </span>

            <span class="pl-2 font-weight-normal">{{ getTime(message.createdAt) }}</span>
            {{ getDate(message.createdAt) }}
          </p>
        </div>
        <p class="pt-4">{{ message.message }}</p>
        <hr v-if="message.files.length" />
        <ul v-if="message.files.length">
          <li v-for="file in message.files" :key="file.name">
            <a :href="'/api/v1' + file.downloadUrl">{{ file.name }}</a>
          </li>
        </ul>
      </div>
      <!-- Ticket Reply -->
      <form @submit.prevent="submitFormListener">
        <h4 class="pt-5">{{ editingMessage ? 'ویرایش پیام' : 'پاسخی ارسال کنید!' }}</h4>
        <base-input>
          <!-- CKEDITOR SHOULD GO HERE! -->
          <textarea class="form-control" placeholder="متن تیکت" rows="3" v-model="message"></textarea>
        </base-input>
        <div class="btn-group pt-3">
          <file-upload
            v-if="isAdmin && !editingMessage"
            @change="onFileSelect"
            class="animation-on-hover"
            :key="uploaderKey"
          />
          <image-upload
            v-else-if="!editingMessage"
            @change="onFileSelect"
            select-text="پیوست فایل"
            class="animation-on-hover mb-0"
            :key="uploaderKey"
          />
          <base-button
            class="animation-on-hover"
            type="danger"
            native-type="Submit"
            :loading="loading"
          >
            <!-- <i class="pl-2 far fa-paper-plane"></i> -->
            {{editingMessage ? 'ویرایش' : 'ارسال'}}
          </base-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import backend from '../../backend';
import * as moment from 'moment';
import { ImageUpload } from 'src/components/index';
import fileUpload from '../AdminSection/ManageTickets/Components/FileUpload';
import Swal from 'sweetalert';

export default {
  components: {
    fileUpload,
    ImageUpload
  },
  data() {
    return {
      ticket: {},
      messages: [],
      loading: false,
      message: '',
      file: undefined,
      uploaderKey: 0,
      editingMessage: undefined
    };
  },
  methods: {
    dataLoad() {
      if (!this.$route.params.ticket) {
        return;
      }
      backend.get(`tickets/view/${this.$route.params.ticket}`).then(
        response => {
          this.ticket = response.data.ticket;
          this.messages = response.data.messages;
        },
        error => {}
      );
    },
    getDate(date) {
      return moment(date).format('YYYY/MM/DD');
    },
    getTime(time) {
      return moment(time).format('HH:ss');
    },
    submitFormListener() {
      let haveError = false;
      if (!this.message) {
      }
      if (haveError) {
        return;
      }
      let data = {};
      if (!this.editingMessage && this.file instanceof File) {
        data = new FormData();
        data.append('ticket', this.ticket.id);
        data.append('message', this.message);
        data.append('file', this.file);
      } else {
        data = {
          message: this.message
        };
        if (!this.editingMessage) {
          data.ticket = this.ticket.id;
        }
      }
      let url = '';
      if (this.editingMessage) {
        url = `/admin/tickets/messages/${this.editingMessage.id}/edit`;
      } else {
        url = `tickets/reply`;
      }
      backend.post(url, data).then(response => {
        if (this.editingMessage) {
          for (const item of this.messages) {
            if (item.id == this.editingMessage.id) {
              item.message = data.message;
              break;
            }
          }
          this.editingMessage = undefined;
        } else {
          const messages = this.messages;
          messages.push(response.data.message);
          messages.sort(function(x, y) {
            return new Date(x.createdAt) - new Date(y.createdAt);
          });
          this.messages = messages;
        }
        this.resetReplyForm();
      });
    },
    onFileSelect(file) {
      this.file = file;
    },
    resetReplyForm() {
      this.message = '';
      this.file = undefined;
      this.uploaderKey++;
    },
    handleDelete(message) {
      Swal({
        title: 'Are you sure?',
        text: `You won't be able to revert this!`,
        className: 'text-ltr',
        icon: 'warning',
        buttons: {
          cancel: 'cancel',
          catch: {
            text: 'Yes, delete it!',
            value: true
          }
        }
      }).then(result => {
        if (!result) return;
        this.deleteMessage(message);
      });
    },
    deleteMessage(message) {
      backend
        .post(`/admin/tickets/messages/${message.id}/delete`)
        .then(response => {
          if (response.data.status === 'error') {
            this.$notify({
              type: 'error',
              message: 'درخواست شما توسط سرور رد شد.',
              icon: 'tim-icons icon-bell-55'
            });
            return;
          }
          let indexToDelete = this.messages.findIndex(
            item => item.id == message.id
          );
          if (indexToDelete >= 0) {
            this.messages.splice(indexToDelete, 1);
          }
          Swal({
            title: 'Deleted!',
            className: 'text-ltr',
            text: `You deleted the message`,
            icon: 'success'
          });
        })
        .catch(error => {
          this.$notify({
            type: 'error',
            message: 'ارتباط با سرور بدرستی برقرار نشد',
            icon: 'tim-icons icon-bell-55'
          });
        });
    },
    handleEdit(message) {
      this.editingMessage = message;
      this.message = message.message;
      document.body.scrollTop += 50;
      const mainpanel = document.querySelector('.main-panel');
      mainpanel.scrollTop = mainpanel.scrollHeight;
    }
  },
  mounted() {
    this.dataLoad();
    setInterval(this.dataLoad, 4000);
  },
  computed: {
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    }
  }
};
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

