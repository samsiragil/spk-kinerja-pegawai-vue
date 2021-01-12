<template>
	<div class="container mt-4">
		<div class="w-100 border-bottom py-3 mb-4 d-table">
			<h2 class="float-left">
				Daftar Kriteria
			</h2>
			<button class="float-right btn btn-primary" @click="toggleModal('new')" >
				Tambah
			</button>
		</div>
		<table class="table table-bordered">
		  <thead>
		    <tr>
		      <th scope="col" class="w-10">Kode</th>
		      <th scope="col" class="w-30 text-left">Nama</th>
		      <th scope="col" class="w-40 text-left">Deskripsi</th>
		      <th scope="col" class="w-20">Action</th>
		    </tr>
		  </thead>
		  <tbody>
		  	<tr v-if="is_load">
		      <td colspan="5" class="text-center">
		      	<div class="spinner-border text-info" role="status">
						  <span class="sr-only">Loading...</span>
						</div>
		      </td>
		    </tr>
		    <template v-else>
			    <tr v-if="list.length == 0">
			      <td colspan="5" class="text-center">Masih belum ada daftar kriteria</td>
			    </tr>
			    <template v-else>
				    <tr v-for="(kriteria,index) in list">
				      <td class="w-10">{{kriteria.code}}</td>
				      <td class="w-30 text-left">{{kriteria.name}}</td>
				      <td class="w-40 text-left">{{kriteria.desc}}</td>
				      <td class="w-20">
				      	<button class="btn btn-warning btn-sm" @click="showEditForm(kriteria)">
				      		Ubah
				      	</button>
				      	<button class="btn btn-danger btn-sm" @click="showDeletePopup(kriteria.id)">
				      		Hapus
				      	</button>
				      </td>
				    </tr>
			    </template>
		    </template>
		  </tbody>
		</table>
		<!-- form -->
		<div class="modal fade" id="formModal" tabindex="-1" aria-labelledby="formModal" aria-hidden="true">
		  <div class="modal-dialog modal-lg">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="formModal">Tambah Data</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body text-left">
		      	<div class="row">
		      		<div class="col-6">
				        <div class="form-group">
							    <label>Kode</label>
							    <input v-model="form.code" @blur="checkCode" type="text" class="form-control" minlength="3" maxlength="3">
							    <small class="form-text" :class="{'text-danger': !is_code_valid,'text-muted': is_code_valid}">
							    	<template v-if="is_code_valid">
							    		Kode harus 3 karakter. Contoh : A01
							    	</template>
							    	<template v-else>
							    		Kode sudah digunakan 
							    	</template>
							    </small>
							  </div>
		      		</div>
		      		<div class="col-6">
				      	<div class="form-group">
							    <label>Nama</label>
							    <input v-model="form.name" type="text" class="form-control">
							  </div>
		      		</div>
		      		<div class="col-12">
				      	<div class="form-group">
							    <label>Deskripsi</label>
							    <textarea v-model="form.desc" class="form-control" rows="2"></textarea>
							  </div>
		      		</div>
		      	</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" @click="toggleModal" >Batal</button>
		        <button type="button" class="btn btn-primary" :disabled="!form_valid" @click="submit">Simpan</button>
		      </div>
		    </div>
		  </div>
		</div>

		<div class="modal fade" id="confirm" tabindex="-1" aria-labelledby="confirm" aria-hidden="true">
		  <div class="modal-dialog modal-sm">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="formModal">Konfirmasi</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body text-center">
		      	<p class="mb-4 w-100">Apakah anda yakin ingin menghapus data ini?</p>
		      	<div class="w-100">
		      		<button class="btn btn-secondary btn-sm" data-dismiss="modal">
			      		Batal
			      	</button>
			      	<button class="btn btn-danger btn-sm" @click="deleteSelectedPegawai">
			      		Hapus
			      	</button>
		      	</div>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	import moment from 'moment';
	export default{
		data(){
			return{
				list: [],
				is_load: true,
				form:{
					id: '',
					code: '',
					name: '',
					desc: ''
				},
				is_code_valid: true,
				is_update: false,
				active_code: '',
				active_id: ''
			}
		},
		computed:{
			form_valid(){
				if(this.form.code == '' || this.form.name == '' || this.form.desc == '' || this.is_code_valid == false){
					return false
				}
				return true
			},
		},
		mounted(){
			this.loadData()
		},
		methods:{
			...mapGetters(['getKriteria']),
			...mapMutations(['setKriteria','deleteKriteria','updateKriteria']),
			loadData(){
				this.is_load = true
				setTimeout(()=>{
					this.list = this.getKriteria()
					this.is_load = false
				},1000);
			},	
			toggleModal(data){
				if(data == 'new'){
					this.is_update = false	
				}
				if(!this.is_update){
					this.clearForm()
				}
				$('#formModal').modal('toggle')
			},
			checkCode(){
				if(this.getKriteria().length == 0){
					this.is_code_valid = true
				}else{
					this.is_code_valid = true
					for(let i=0;i < this.getKriteria().length;i++){
						if(this.getKriteria()[i].code == this.form.code){
							if(!this.is_update){
								this.is_code_valid = false
							}else{
								if(this.active_code != this.form.code){
									this.is_code_valid = false
								}
							}
							break;
						}
					}
				}
			},
			submit(){
				if(this.is_update){
					this.updateKriteria(this.form)
				}else{
					this.form.id = moment().valueOf()
					this.setKriteria(this.form)
				}
				this.toggleModal()
				this.loadData()
			},
			clearForm(){
				this.form={
					id: '',
					code: '',
					name: '',
					position: '',
					team: ''
				}
				this.active_code = ''
				this.active_id = ''
				this.is_code_valid = true
			},
			showDeletePopup(id){
				this.active_id = id
				$('#confirm').modal('show')
			},
			deleteSelectedPegawai(){
				this.deleteKriteria(this.active_id)
				$('#confirm').modal('hide')
				this.loadData()
			},
			showEditForm(data){
				this.is_update = true
				this.form = Object.assign({}, data)
				this.active_code = data.code
				this.toggleModal()
			}
		}
	}
</script>