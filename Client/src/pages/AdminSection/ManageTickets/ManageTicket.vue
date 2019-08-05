<template>
  <section class="pt-3">
    <h4 v-if="isAdmin" slot="header" class="card-title">Send Ticket</h4>
    <card>
      <form class="text-rtl pt-2" @submit="submitFormListener">
        <div class="form-row">
          <div class="col-md-5">
            <label class="pull-right">عنوان</label>
            <base-input v-model="data.title" :error="fieldErrors.title"></base-input>
          </div>

          <div class="col-md-3" v-if="isAdmin">
            <label class="pull-right">مربوط به</label>
            <autocomplete
              class="d-flex"
              source="/api/v1/admin/users?filter="
              results-property="docs"
              :initialValue="data.user"
              :initialDisplay="data.userName"
              v-model="data.user"
              @selected="onSelectUser"
              :error="fieldErrors.user"
              input-class="form-control">
            </autocomplete>
          </div>

          <div class="col-md-2">
            <label class="pull-right">اهمیت</label>
            <base-input>
              <select class="form-control" v-model="data.priority" :error="fieldErrors.priority">
                <option selected>عادی</option>
                <option>مهم</option>
                <option>فوری</option>
              </select>
            </base-input>
          </div>

          <div class="col-md-2">
            <label class="pull-right">دپارتمان</label>
            <base-input>
              <select class="form-control" v-model="data.department" :error="fieldErrors.department">
                <option selected>پشتیبانی</option>
                <option>فروش و مالی</option>
                <option>آموزش</option>
              </select>
            </base-input>
          </div>
          <div class="col-md-2" v-if="data.status">
            <label class="pull-right">وضعیت</label>
            <base-input>
              <select class="form-control" v-model="data.status" :error="fieldErrors.status">
                <option value="1">Open</option>
                <option value="2">Answered</option>
                <option value="3">In Progress</option>
                <option value="4">On Hold</option>
                <option value="5">Closed</option>
              </select>
            </base-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 pt-5" v-if="formErrors.length">
            <p class="text-right text-rtl">
              <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </p>
          </div>
        </div>
        <base-input v-if="!data.id">
          <ckeditor v-if="isAdmin" @ready="onEditorReady" :editor="ckeditor.editor" v-model="data.message" :config="ckeditor.editorConfig"></ckeditor>
          <textarea
            class="form-control"
            placeholder="متن تیکت"
            rows="3"
            v-model="data.message" :error="fieldErrors.message"
            v-else
          ></textarea>
        </base-input>
        <div class="btn-group pt-3">
          <file-upload v-if="isAdmin && !data.id" @change="onFileSelect" class="animation-on-hover"/>
          <image-upload v-else-if="!data.id" @change="onFileSelect" select-text="پیوست فایل" class="animation-on-hover mb-0"/>
          <base-button class="animation-on-hover" type="danger" native-type="Submit" :loading="loading">
            <!-- <i class="pl-2 far fa-paper-plane"></i> -->
            {{ data.id ? "ویرایش" : "ارسال" }}
          </base-button>
        </div>
      </form>
    </card>
  </section>
</template>

<script>
import { ImageUpload } from 'src/components/index';
import Autocomplete from 'vuejs-auto-complete';
import fileUpload from "./Components/FileUpload";
import backend from '../../../backend';

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

export default {
  props: [
		'id',
		'title',
		'user',
		'priority',
    'department',
    'status',
  ],
  components: {
    Autocomplete,
    fileUpload,
    ImageUpload,
		ckeditor: CKEditor.component,
  },
  data() {
    return {
      data: {
        id: undefined,
        title: "",
        user: undefined,
        userName: "",
        priority: "",
        department: "",
        message: "",
        file: undefined,
      },
      fieldErrors: {},
      formErrors: {},
      loading: false,
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
					],
					fontSize: {
						options: [
							9,
							11,
							13,
							'default',
							17,
							19,
							21
						]
					},
					toolbar: [
						'heading', '|',
						'outdent', 'indent', '|',
						'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript',
						'link',
						'bulletedList', 'numberedList', 'blockQuote',
						'alignment',
						'undo', 'redo',
						'fontSize', 'fontColor', 'fontBackgroundColor',
						'imageupload', 'imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:side'
					],
				},
			},
    };
  },
  methods: {
    onFileSelect(file) {
      this.data.file = file;
    },
		onSelectUser(item) {
			this.data.user = item.value;
    },
    submitFormListener(e) {
      e.preventDefault();
      const isAdmin = this.$root.$data.user && this.$root.$data.user.admin;
      let haveError = false;
			if (! this.data.title) {
				this.fieldErrors.title = 'نام تیکت مورد نیاز است';
				haveError = true;
			}
			if (isAdmin && ! this.data.user) {
				this.fieldErrors.user = 'کاربر تیکت مورد نیاز است';
				haveError = true;
			}
			if (! this.data.priority) {
				this.fieldErrors.priority = 'اولویت تیکت مورد نیاز است';
				haveError = true;
			}
			if (! this.data.department) {
				this.fieldErrors.department = 'دپارتمان تیکت مورد نیاز است';
				haveError = true;
			}
			if (! this.data.id && ! this.data.message) {
				this.fieldErrors.message = 'متن تیکت مورد نیاز است';
				haveError = true;
			}
			if (haveError) {
				return;
      }
      let data = {};
      if (! isAdmin) {
        this.data.user = this.$root.$data.user.id;
      }
			if (this.data.file instanceof File) {
				data = new FormData();
        for (const item in this.data) {
          data.append(item, this.data[item]);
        }
			} else {
				data = {...this.data};
			}
			this.loading = true;
			const errorHandler = (response) => {
				if (response && response.data && response.data.status === "error") {
					this.formErrors = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
					return;
				};
      }
      let url = '';
      if (isAdmin) {
        url = this.data.id ? `admin/tickets/${this.data.id}/edit` : `admin/tickets/add`;
      } else {
        url = `tickets/add`;
      }
			backend.post(url, data).then(response => {
				this.loading = false;
				if (response.data.status === "error") {
					errorHandler(response);
					return;
				}
				this.$notify({
					type: 'success',
					message: 'تیکت با موفقیت اضافه شد.',
					icon: 'tim-icons icon-bell-55'
        });
        this.$emit('ticket', response.data.ticket);
        this.reset();
			}).catch((error) => {
				this.loading = false;
				errorHandler(error.response);
			});
    },
    reset() {
      for (const key in this.data) {
        this.data[key] = undefined;
      }
    },
    onEditorReady(editor) {
			editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
				class ImageUploadAdapter {
					constructor(loader) {
						this.loader = loader
					}
					upload() {
						const uploader = (file) => {
							return new Promise((resolve, reject) => {
								const data = new FormData();
								data.append("file", file);
								backend.post("admin/blog/images/upload", data, {
									CancelToken: source.token,
									onUploadProgress: progressEvent => {
										loader.uploadTotal = progressEvent.total;
										loader.uploaded = progressEvent.loaded;
									},
								}).then(response => {
									resolve({
										default: response.data.image,
									});
								}, reject);
							});
						};
						return loader.file.then( uploader );
					}
					abort() {
						source.cancel();
					}
				}
				return new ImageUploadAdapter( loader );
			};
		},
  },
  watch: {
    id: function(value, old) {
      this.data.id = value;
    },
    title: function(value, old) {
      this.data.title = value;
    },
    priority: function(value, old) {
      this.data.priority = value;
    },
    department: function(value, old) {
      this.data.department = value;
    },
    status: function(value, old) {
      this.data.status = value;
    },
    user: function(value, old) {
      this.data.user = value.id;
      this.data.userName = value.name;
    },
  },
  computed: {
    isAdmin() {
      return this.$root.$data.user && this.$root.$data.user.admin;
    }
  }
};
</script>

<style lang="scss">

.white-content .el-table table > thead > tr > th {
  text-align: center !important;
}

.white-content .el-table table > tbody > tr > td {
  text-align: center !important;
}
.ck-editor__editable {
    min-height: 300px;
}
</style>

