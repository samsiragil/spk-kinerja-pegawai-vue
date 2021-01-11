<template>
	<div class="container mt-5">
		<div class="w-100 border-bottom py-3 mb-4 d-table">
			<h2 class="float-left">
				Daftar Pegawai
			</h2>
			<button class="float-right btn btn-primary" data-toggle="modal" data-target="#formModal">
				Tambah
			</button>
		</div>
		<table class="table table-bordered">
		  <thead>
		    <tr>
		      <th scope="col">Kode</th>
		      <th scope="col">Nama</th>
		      <th scope="col">Email</th>
		      <th scope="col">Jabatan - Tim</th>
		      <th scope="col">Action</th>
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
				      <td>{{pegawai.code}}</td>
				      <td>{{pegawai.name}}</td>
				      <td>{{pegawai.email}}</td>
				      <td>{{pegawai.jabatan}} - {{pegawai.tim}}</td>
				      <td></td>
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
		      <div class="modal-body">
		        ...
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
		        <button type="button" class="btn btn-primary">Simpan</button>
		      </div>
		    </div>
		  </div>
		</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return{
				list: [],
				is_load: true
			}
		},
		mounted(){
			setTimeout(()=>{
				this.list = this.getPegawai()
				this.is_load = false
			},1000);
		},
		methods:{
			...mapGetters(['getPegawai']),
		}
	}
</script>