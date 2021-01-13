<template>
	<div class="container my-4">
		<div class="w-100 border-bottom py-3 mb-4 d-table">
			<h2 class="float-left">
				Bobot Kriteria
			</h2>
		</div>
		<div class="w-100 text-left">
			<div class="w-100" v-if="getSelectedKriteria().length == 0">
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
					<button class="btn btn-info" :disabled="!is_selected" @click="submitSelectedKriteria()">
						Proses
					</button>
				</div>
			</div>
			<div class="w-100" v-else>
				<button class="btn btn-danger mb-3" @click="resetSelectedKriteria()">
					Pilih ulang kriteria
				</button>
				<div class="w-100 pb-3 mb-4 border-bottom">
					<p class="font-weight-bold">Kriteria yang akan diproses :</p>
					<table class="table table-bordered">
					  <thead>
					    <tr>
					      <th scope="col" class="w-30">Kode</th>
					      <th scope="col" class="w-70">Nama</th>
					    </tr>
					  </thead>
					  <tbody>
					  	<tr v-for="kriteria in getSelectedKriteria()">
					  		<td class="w-30">{{kriteria.code}}</td>
					  		<td class="w-70">{{kriteria.name}}</td>
					  	</tr>
					  </tbody>
					</table>
				</div>
				<div class="row">
					<div class="col-7">
						<p class="font-weight-bold">Penentuan Prioritas Secara Berpasangan :</p>
						<table class="table table-bordered">
						  <thead>
						    <tr>
						      <th scope="col" class="w-40 text-center">Kriteria A</th>
						      <th scope="col" class="w-20 text-center">Nilai Pembanding</th>
						      <th scope="col" class="w-40 text-center">Kriteria B</th>
						    </tr>
						  </thead>
						  <tbody>
						  	<tr v-for="(pair,index) in kriteria_pasangan">
						  		<td class="w-40">{{pair.a.code}} - {{pair.a.name}}</td>
						  		<td class="w-20">
						  			<div class="form-group mb-2">
									    <select class="form-control" v-model="pair.score">
									      <option v-for="n in 9" :value="n">{{n}}</option>
									    </select>
									  </div>
									  <div class="text-center w-100">
									  	<img @click="swapPairKriteria(index)" src="../assets/img/swap.png" class="cursor-pointer" height="20">
									  </div>
						  		</td>
						  		<td class="w-40">{{pair.b.code}} - {{pair.b.name}}</td>
						  	</tr>
						  </tbody>
						</table>
						<button class="btn btn-info" @click="submitPriorityKriteria()">
							Proses Data
						</button>
					</div>
					<div class="col-5">
						<p class="font-weight-bold">Skala Saaty :</p>
						<table class="table table-bordered">
						  <thead>
						    <tr>
						      <th scope="col" class="w-30">Nilai</th>
						      <th scope="col" class="w-70">Keterangan</th>
						    </tr>
						  </thead>
						  <tbody>
						  	<tr v-for="ss in skala_saaty">
						  		<td class="w-30">{{ss.score}}</td>
						  		<td class="w-70">{{ss.desc}}</td>
						  	</tr>
						  </tbody>
						</table>
					</div>
				</div>
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
				table_pair_kriteria: [],
				selected_kriteria:[],
				kriteria_pasangan: [],
				skala_saaty:[
					{
						score: 1,
						desc: "Sama Penting (equal)"
					},
					{
						score: 3,
						desc: "Cukup Penting (moderat)"
					},
					{
						score: 5,
						desc: "Lebih penting (strong)"
					},
					{
						score: 7,
						desc: "Sangat lebih penting (demonstrated)"
					},
					{
						score: 9,
						desc: "Mutlak lebih penting (extreme)"
					},
					{
						score: '2,4,6,8',
						desc: "Nilai tengah diantara nilai berdekatan (intermediate value)"
					},
				]
			}
		},
		computed:{
			is_selected(){
				if(this.selected_kriteria.length == 0){
					return false
				}else{
					return true
				}
			}
		},
		mounted(){
			if(this.getSelectedKriteria().length > 0){
				this.definePairKriteria()
			}
		},
		methods:{
			...mapGetters(['getKriteria','getSelectedKriteria']),
			...mapMutations(['setSelectedKriteria']),
			submitSelectedKriteria(){
				this.setSelectedKriteria(this.selected_kriteria)
				this.definePairKriteria()
			},
			definePairKriteria(){
				this.kriteria_pasangan = []
				let vuex_data = this.getSelectedKriteria()
				for(let i=0; i < vuex_data.length;i++){
					let counter1 = vuex_data.length-(i+1)
					if(counter1>0){
						for(let k=0; k < counter1;k++){
							let select_kriteria = {
								a:{
									code: vuex_data[i].code,
									name: vuex_data[i].name
								},
								b:{
									code: vuex_data[k+(i+1)].code,
									name: vuex_data[k+(i+1)].name
								},
								score: 1
							}
							this.kriteria_pasangan.push(select_kriteria)
						}
					}
				}
			},
			resetSelectedKriteria(){
				this.setSelectedKriteria([])
			},
			swapPairKriteria(index){
				let selected = this.kriteria_pasangan[index]
				let a = Object.assign({}, selected.a)
				let b = Object.assign({}, selected.b)
				this.kriteria_pasangan[index].a = b
				this.kriteria_pasangan[index].b = a
			},
			submitPriorityKriteria(){
				let x = this.getSelectedKriteria().length+1
				let vuex_data = this.getSelectedKriteria()
				for(let i=0;i < x;i++){
					if(i==0){
						let data = []
						for(let j=0;j<x;j++){
							if(j==0){
								data.push("Kode")
							}else{
								data.push(vuex_data[j-1].code)
							}
						}
						this.table_pair_kriteria.push(data)
					}else{
						let data = []
						for(let j=0;j<x;j++){
							if(j==0){
								data.push(vuex_data[i-1].code)
							}else{
								if(i-1 == 0 && j-1 == 0){
									// console.log("booms")
									data.push(1)
								}else{
									if(this.table_pair_kriteria[0][i]==this.table_pair_kriteria[0][j]){
										// console.log("["+this.table_pair_kriteria[0][i]+"]["+this.table_pair_kriteria[0][j]+"] = 1")
										data.push(1)
									}else{
										// console.log("["+this.table_pair_kriteria[0][i]+"]["+this.table_pair_kriteria[0][j]+"] = 0")
										// data.push(0)
										let x_data = this.kriteria_pasangan
										for(let k=0 ; k < x_data.length; k++){
											if(
												(x_data[k].a.code == this.table_pair_kriteria[0][i] || 
												 x_data[k].a.code == this.table_pair_kriteria[0][j]) && 
												(x_data[k].b.code == this.table_pair_kriteria[0][i] || 
												 x_data[k].b.code == this.table_pair_kriteria[0][j])
												){
												// console.log("x_data[k].a.code : ",x_data[k].a.code)
												// console.log("x_data[k].b.code : ",x_data[k].b.code)
												// console.log("this.table_pair_kriteria[0][i] : ",this.table_pair_kriteria[0][i])
												// console.log("this.table_pair_kriteria[0][j] : ",this.table_pair_kriteria[0][j])
												// console.log("=======================")
												if(x_data[k].a.code == this.table_pair_kriteria[0][i]){
													data.push(x_data[k].score)
												}else{
													let y_data = "1/"+x_data[k].score
													data.push(y_data)
												}
											}
										}
										// let record = this.kriteria_pasangan.findIndex(item=>{
										// 	if((item.a.code == this.table_pair_kriteria[0][i] || item.a.code == this.table_pair_kriteria[0][j]) && (item.b.code == this.table_pair_kriteria[0][i] || item.b.code == this.table_pair_kriteria[0][j])){
										// 		return item
										// 	}
										// })
										// if(record != -1){
										// 	data.push(this.kriteria_pasangan[record].score)
										// }
									}
								}
							}
						}
						this.table_pair_kriteria.push(data)
					}
				}
				console.table(this.table_pair_kriteria)
			}
		}
	}
</script>