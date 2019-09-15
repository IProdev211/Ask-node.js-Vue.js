<template>
  <section class="container-fluid text-right">
    <div class="ticket-number mb-2">
      <h1>
        #{{ticket.ticket_id}}
        <span class="subtitle">مشاهده تیکت</span>
      </h1>
    </div>
    <div class="my-5">
      <h2 class="ticket-desc text-center py-3">{{ticket.title}}</h2>
      <div
        v-for="message of messages"
        :key="message.id"
        class="card-custom my-3"
        :class="message.user.id == ticket.user.id ? 'ml-5' : 'mr-5'"
      >
        <div class="ticket-meta d-flex justify-content-between row">
          <p class="ticket-user">
            <img :src="message.user.avatar" class="user-avatar avatar" v-if="message.user.avatar" />

            <!-- ORIGINAL CODE <img
              :src="message.user.avatar"
              :alt="message.user.name"
              class="user-avatar avatar"
              v-if="message.user.avatar"
            />-->
            <i class="pl-1 text-danger far fa-user" v-else></i>
            {{message.user.name}}
          </p>

          <p class="ticket-date">
            <span class="pl-2">{{ getTime(message.createdAt) }}</span>
            {{ getDate(message.createdAt) }}
          </p>
        </div>
        <div class="w-100 d-md-none"></div>

        <p class="pt-4 text-break" v-if="message.user.isAdmin" v-html="message.message"></p>
        <p class="pt-4 text-break" v-else>{{ message.message }}</p>

        <div class="text-left pt-2" v-if="isAdmin">
          <i @click="handleEdit(message)" class="fas fa-pencil-alt pl-3"></i>
          <i @click="handleDelete(message)" class="far fa-trash-alt pr-1"></i>
        </div>

        <hr v-if="message.files.length" />
        <ul v-if="message.files.length">
          <li v-for="file in message.files" :key="file.name">
            <a :href="'/api/v1' + file.downloadUrl">{{ file.name }}</a>
          </li>
        </ul>
      </div>

      <!--------------------------- Ticket Reply --------------------------->
      <form @submit.prevent="submitFormListener">
        <h4 class="pt-5">{{ editingMessage ? 'ویرایش پیام' : 'پاسخی ارسال کنید!' }}</h4>
        <base-input>
          <ckeditor
            v-if="isAdmin"
            @ready="onEditorReady"
            :editor="ckeditor.editor"
            v-model="message"
            :config="ckeditor.editorConfig"
          ></ckeditor>
          <textarea v-else class="form-control" placeholder="متن تیکت" rows="3" v-model="message"></textarea>
        </base-input>
        <div class="pt-3">
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
          >{{editingMessage ? 'ویرایش' : 'ارسال'}}</base-button>
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
import axios from 'axios';

import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code';
import StrikethroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import SubscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import SuperscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Font from '@ckeditor/ckeditor5-font/src/font';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import imageupload from '@ckeditor/ckeditor5-image/src/imageupload';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import Direction from 'ckeditor5-direction/src/direction';

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
      editingMessage: undefined,
      loadMessageInterval: undefined,
      ckeditor: {
        editor: ClassicEditor,
        editorConfig: {
          plugins: [
            Alignment,
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            CodePlugin,
            StrikethroughPlugin,
            SubscriptPlugin,
            SuperscriptPlugin,
            UnderlinePlugin,
            LinkPlugin,
            ParagraphPlugin,
            Heading,
            Font,
            PasteFromOffice,
            Indent,
            IndentBlock,
            HeadingButtonsUI,
            ParagraphButtonUI,
            Image,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            imageupload,
            Direction
          ],
          fontSize: {
            options: [9, 11, 13, 'default', 17, 19, 21]
          },
          toolbar: [
            'heading',
            '|',
            'outdent',
            'indent',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'subscript',
            'superscript',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'direction:ltr',
            'direction:rtl',
            'alignment',
            'undo',
            'redo',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'imageupload',
            'imageTextAlternative',
            '|',
            'imageStyle:full',
            'imageStyle:side',
          ]
        }
      }
    };
  },
  methods: {
    dataLoad(client) {
      if (!this.$route.params.ticket) {
        return;
      }
      if (!client) {
        client = backend;
      }

      client.get(`tickets/view/${this.$route.params.ticket}?${Date.now()}`).then(
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
      return moment(time).format('HH:mm');
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
    },
    onEditorReady(editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        class ImageUploadAdapter {
          constructor(loader) {
            this.loader = loader;
          }
          upload() {
            const uploader = file => {
              return new Promise((resolve, reject) => {
                const data = new FormData();
                data.append('file', file);
                backend
                  .post('admin/blog/images/upload', data, {
                    CancelToken: source.token,
                    onUploadProgress: progressEvent => {
                      loader.uploadTotal = progressEvent.total;
                      loader.uploaded = progressEvent.loaded;
                    }
                  })
                  .then(response => {
                    resolve({
                      default: response.data.image
                    });
                  }, reject);
              });
            };
            return loader.file.then(uploader);
          }
          abort() {
            source.cancel();
          }
        }
        return new ImageUploadAdapter(loader);
      };
    }
  },
  mounted() {
    this.dataLoad();
    if (!this.loadMessageInterval) {
      const client = axios.create({
        baseURL: backend.defaults.baseURL
      });
      this.loadMessageInterval = setInterval(() => {
        this.dataLoad(client);
      }, 4000);
    }
  },
  computed: {
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 2.5em;
  height: 2.5em;
  margin-left: 10px;
}

.ticket-number {
  h1,
  .subtitle {
    font-size: 1.4em;
    font-family: IranSans;
    color: rgba(0, 0, 0, 0.5);
  }
}

.ticket-desc {
  font-size: 1.4em;
  font-family: IranSansBold;
  color: rgb(51, 51, 51) !important;
}

.card-custom {
  background-color: rgb(240, 240, 240);
  border-radius: 25px;
  padding: 2em 3em;
  border: 1px solid rgba(230, 230, 230, 0.801);

  .ticket-date {
    font-family: IranSans;
    color: rgba(145, 145, 145, 0.85);

    span {
      font-family: IranSansBold;
    }
  }

  .ticket-user {
    font-family: IranSans;
    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.75);
  }

  i {
    font-size: 1.15em;
    color: rgba(145, 145, 145, 0.788);
  }

  i:hover {
    cursor: pointer;
    color: rgb(174, 0, 255);
  }
}

.send-buttons {
  i {
    color: white;
  }
}

.card-reply-left {
  margin-right: 1em;
  margin-left: -1em;
}

@media (max-width: 768px) {
  .ticket-user {
    font-size: 0.9em !important;
    width: 100%;
  }
  .ticket-date {
    font-size: 0.8em;
    width: 100%;
    display: block;
    color: rgba(0, 0, 0, 0.4) !important;
    font-family: IranSansBold !important;
  }

  .card-custom {
    padding: 15px !important;
    .main-ticket-text {
      font-size: 0.94em;
    }
  }

  .ticket-meta {
    padding-right: 1em;
  }

  .avatar {
    width: 1.8em;
    height: 1.8em;
    margin-left: 10px;
  }
}

.ck-editor__editable {
  min-height: 150px !important;
}

.ck.ck-editor__editable_inline {
  min-height: 150px !important;
}

.ticket-main-text {
  // font-size: 1.2em !important;
  font-family: IranSans;
}
</style>

