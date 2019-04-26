<template>
	<section>
		<div class="text-ltr">
			<div>
				<h2 class="text-center">Courses Overview</h2>
				<p class="text-center">
					Here is a list of all active courses on this site
					<a
						href="/courses"
						target="_blank"
					>ALL COURSES</a>
				</p>
			</div>
			<div class="mt-5">
				<div>
					<card card-body-classes="table-full-width">
						<div>
							<div
								class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
							>
								<el-select
									class="select-primary mb-3 pagination-select"
									v-model="pagination.perPage"
									placeholder="Per page"
									v-on:change="changeLimitListener"
								>
									<el-option
										class="select-primary"
										v-for="item in pagination.perPageOptions"
										:key="item"
										:label="item"
										:value="item"
									></el-option>
								</el-select>
							</div>
							<el-table :data="tableData">
								<el-table-column
									v-for="column in tableColumns"
									:key="column.label"
									:min-width="column.minWidth"
									:prop="column.prop"
									:label="column.label"
								></el-table-column>
								<el-table-column :min-width="105" align="center" label="Settings">
									<div slot-scope="props">
										<base-button
											@click.native="handleEdit(props.$index, props.row)"
											class="edit btn-link"
											type="warning"
											size="sm"
											icon
										>
											<i class="tim-icons icon-pencil"></i>
										</base-button>
										<base-button
											@click.native="handleDelete(props.$index, props.row)"
											class="remove btn-link"
											type="danger"
											size="sm"
											icon
										>
											<i class="tim-icons icon-simple-remove"></i>
										</base-button>
									</div>
								</el-table-column>
							</el-table>
						</div>
						<div
							v-if="tableData.length"
							slot="footer"
							class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
						>
							<div class>
								<p class="card-category">Showing {{ from + 1 }} to {{ to }} of {{ pagination.total }} entries</p>
							</div>
							<base-pagination
								v-model="pagination.currentPage"
								:value="pagination.currentPage"
								:per-page="pagination.perpage"
								:total="pagination.total"
								:pageCount="pagination.pages"
								v-on:input="changePageListener"
							></base-pagination>
						</div>
					</card>
				</div>
			</div>
		</div>
		<div class="pt-3">
			<CreateEditCourse v-bind="course" @course="addNewCourseListener"></CreateEditCourse>
		</div>
	</section>
</template>
<script>
import CreateEditCourse from './CreateEditCourse';
import { Table, TableColumn, Select, Option } from 'element-ui';
import { BasePagination } from 'src/components';
import courseoverviewdata from './courseoverviewdata';
import Swal from 'sweetalert';
import backend from '../../../backend';

export default {
	components: {
		CreateEditCourse,
		BasePagination,
		[Select.name]: Select,
		[Option.name]: Option,
		[Table.name]: Table,
		[TableColumn.name]: TableColumn,
	},
	computed: {
		to() {
			return Math.min(this.pagination.total, this.from + this.pagination.perPage);
		},
		from() {
			return this.pagination.perPage * (this.pagination.currentPage - 1);
		},
	},
	data() {
		return {
			pagination: {
				perPage: 15,
				currentPage: 1,
				perPageOptions: [5, 10, 15],
				total: 0,
				pages: 0,
			},
			propsToSearch: ['courseName', 'comments', 'courseUsers', 'courseType'],
			tableColumns: [
				{
					prop: 'title',
					label: 'Course Name',
					minWidth: 220
				},
				{
					prop: 'comments',
					label: 'comments',
					minWidth: 80
				},
				{
					prop: 'users',
					label: 'Course Users',
					minWidth: 80
				},
				{
					prop: 'type',
					label: 'Course Type',
					minWidth: 80
				}
			],
			tableData: [],
			searchedData: [],
			fuseSearch: null,
			course: undefined,
		};
	},
	methods: {
		dataLoad(page) {
			backend.get('/admin/courses?page=' + page + '&limit=' + this.pagination.perPage).then(response => {
				this.tableData = response.data.docs;
				this.pagination.currentPage = parseInt(response.data.page, 10);
				this.pagination.pages = response.data.pages;
				this.pagination.total = response.data.total;
				this.pagination.perPage = response.data.limit;
			});
    	},
		handleEdit(index, row) {
			Swal({
				title: `You want to edit ${row.title}`,
				buttonsStyling: false,
				confirmButtonClass: 'btn btn-info btn-fill'
			});
			this.course = row;
		},
		handleDelete(index, row) {
			Swal({
				title: 'Are you sure?',
				text: `You won't be able to revert this!`,
				type: 'warning',
				showCancelButton: true,
				confirmButtonClass: 'btn btn-success btn-fill',
				cancelButtonClass: 'btn btn-danger btn-fill',
				confirmButtonText: 'Yes, delete it!',
				buttonsStyling: false
			}).then(result => {
				if (result.value) {
					this.deleteRow(row);
					Swal({
						title: 'Deleted!',
						text: `You deleted ${row.title}`,
						type: 'success',
						confirmButtonClass: 'btn btn-success btn-fill',
						buttonsStyling: false
					});
				}
			});
		},
		deleteRow(row) {
			let indexToDelete = this.tableData.findIndex(
				tableRow => tableRow.id === row.id
			);
			if (indexToDelete >= 0) {
				this.tableData.splice(indexToDelete, 1);
			}
		},
		changePageListener(page) {
			this.dataLoad(page);
		},
		changeLimitListener(limit) {
			this.pagination.perPage = limit;
			this.dataLoad(1,);
		},
		addNewCourseListener(course) {
			this.tableData.push(course);
		}
	},
	mounted() {
		this.dataLoad(1);
	},
	watch: {}
};
</script>
<style>
.pagination-select,
.search-input {
	width: 200px;
}
</style>
