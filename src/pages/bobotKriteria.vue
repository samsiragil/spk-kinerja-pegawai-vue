<template>
	<div class="container mt-4">
		<div class="w-100 border-bottom py-3 mb-4 d-table">
			<h2 class="float-left">
				Bobot Kriteria
			</h2>
		</div>
		<div class="w-100 text-left">
			<p class="font-weight-bold">Silahkan pilih kriteria yang akan digunakan :</p>
			<div class="w-75">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th class="w-10 text-center">#</th>
							<th class="w-40 text-left">Nama</th>
							<th class="w-50 text-left">Deskripsi</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="kriteria in getKriteria()">
							<td class="w-10 text-center">
								<div class="form-check">
								  <input class="form-check-input" v-model="selected_kriteria" type="checkbox" :value="kriteria" :id="kriteria.id">
								</div>
							</td>
							<td class="w-40 text-left"><label class="mb-0" :for="kriteria.id">{{kriteria.name}}</label></td>
							<td class="w-50 text-left"><label class="mb-0" :for="kriteria.id">{{kriteria.desc}}</label></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- <table class="table table-bordered">
		  <thead>
		    <tr>
		      <th scope="col" class="w-10" v-for="(data,key) in table2">{{data[0]}}</th>
		    </tr>
		  </thead>
		  <tbody>
		  	<template v-for="(data,key) in table2">
			    <tr v-if="key != 0">
			    	<template v-for="(data2,key) in data">
			      	<th v-if="key==0" scope="row" class="w-10">{{data2}}</th>
			      	<td v-else class="w-10">{{data2}}</td>
			    	</template>
			    </tr>
		  	</template>
		  </tbody>
		</table> -->
		<!-- <table class="table table-bordered">
		  <thead>
		    <tr>
		      <th scope="col" class="w-10" v-for="(data,key) in table">{{key}}</th>
		    </tr>
		  </thead>
		  <tbody>
		  	<template v-for="(data,key) in table">
			    <tr v-if="key != 'kriteria'">
			    	<template v-for="(data2,key2) in data">
			      	<th v-if="data2 == key" scope="row" class="w-10">{{data2}}</th>
			      	<td v-else class="w-10">{{data2}}</td>
			    	</template>
			    </tr>
		  	</template>
		  </tbody>
		</table> -->
	</div>
</template>
<script>
	import {mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				table2:[
					['#',0,0,0],
					['K01',2,1,8],
					['K02',3,2,6],
					['K02',5,4,2]
				],
				table:{
					kriteria:{
						column: '#',
						K01: 2,
						K02: 1,
						K03: 9
					},
					K01:{
						column: 'K01', 
						K01: 2,
						K02: 1,
						K03: 9
					},
					K02:{
						column: 'K02',
						K01: 3,
						K02: 2,
						K03: 6
					},
					K03:{
						column: 'K03',
						K01: 5,
						K02: 4,
						K03: 2
					},
				},
				selected_kriteria:[]
			}
		},
		watch:{
			selected_kriteria(){
				console.log("selected_kriteria :", this.selected_kriteria)
			}
		},
		methods:{
			...mapGetters(['getKriteria','getSelectedKriteria']),
			...mapMutations(['setSelectedKriteria'])
		}
	}
</script>