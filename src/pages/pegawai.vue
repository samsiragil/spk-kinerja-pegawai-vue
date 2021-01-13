<template>
	<div class="container mt-4">
		<div class="w-100 border-bottom py-3 mb-4 d-table">
			<h2 class="float-left">
				Daftar Pegawai
			</h2>
			<button class="float-right btn btn-primary" @click="toggleModal('new')" >
				Tambah
			</button>
		</div>
		<table class="table table-bordered">
		  <thead>
			<tr>
			  <th scope="col" class="w-10 text-center">Kode</th>
			  <th scope="col" class="w-30 text-left">Nama</th>
			  <th scope="col" class="w-40 text-left">Jabatan - Tim</th>
			  <th scope="col" class="w-20 text-center">Action</th>
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
				  <td colspan="5" class="text-center">Masih belum ada daftar pegawai</td>
				</tr>
				<template v-else>
					<tr v-for="(pegawai,index) in list">
					  <td class="w-10 text-center">{{pegawai.code}}</td>
					  <td class="w-30 text-left">{{pegawai.name}}</td>
					  <td class="w-40 text-left">{{pegawai.position}} - {{pegawai.team}}</td>
					  <td class="w-20 text-center">
						<button class="btn btn-warning btn-sm" @click="showEditForm(pegawai)">
							Ubah
						</button>
						<button class="btn btn-danger btn-sm" @click="showDeletePopup(pegawai.id)">
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
					<div class="col-6">
						<div class="form-group">
								<label>Jabatan</label>
								<select class="form-control" v-model="form.position" >
								  <option v-for="position in positions" :value="position">{{position}}</option>
								</select>
							  </div>
					</div>
					<div class="col-6">
						<div class="form-group">
								<label>Tim</label>
								<select class="form-control" v-model="form.team" >
								  <option v-for="team in teams" :value="team">{{team}}</option>
								</select>
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
				teams: ['Development','Bisnis'],
				positions: ['Manager','Support Officer','Mobile Developer','Web Developer', 'Designer'],
				form:{
					id: '',
					code: '',
					name: '',
					position: '',
					team: ''
				},
				is_code_valid: true,
				is_update: false,
				active_code: '',
				active_id: ''
			}
		},
		computed:{
			form_valid(){
				if(this.form.code == '' || this.form.name == '' || this.form.position == '' || this.form.team == '' || this.is_code_valid == false){
					return false
				}
				return true
			},
		},
		mounted(){
			this.loadData()
		},
		methods:{
			...mapGetters(['getPegawai']),
			...mapMutations(['setPegawai','deletePegawai','updatePegawai']),
			loadData(){
				this.is_load = true
				setTimeout(()=>{
					this.list = this.getPegawai()
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
				if(this.getPegawai().length == 0){
					this.is_code_valid = true
				}else{
					this.is_code_valid = true
					for(let i=0;i < this.getPegawai().length;i++){
						if(this.getPegawai()[i].code == this.form.code){
							if(this.is_update && this.active_code != this.form.code){
								this.is_code_valid = false
							}
							break;
						}
					}
				}
			},
			submit(){
				if(this.is_update){
					this.updatePegawai(this.form)
				}else{
					this.form.id = moment().valueOf()
					this.setPegawai(this.form)
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
			},
			showDeletePopup(id){
				this.active_id = id
				$('#confirm').modal('show')
			},
			deleteSelectedPegawai(){
				this.deletePegawai(this.active_id)
				$('#confirm').modal('hide')
				this.loadData()
			},
			showEditForm(data){
				this.is_update = true
				console.log("form : ", data)
				this.form = Object.assign({}, data)
				this.active_code = data.code
				this.toggleModal()
			}
		}
	}
</script>