<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container"> 
			  <a class="navbar-brand" href="#">#</a>
			  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			    <span class="navbar-toggler-icon"></span>
			  </button>
			  <div class="collapse navbar-collapse" id="navbarNav">
			    <ul class="navbar-nav">
			      <li class="nav-item" :class="{'active':active_link == 'Pegawai'}">
			      	<router-link to="/" class="nav-link">
			      		Pegawai
			      	</router-link>
			      </li>
			      <li class="nav-item" :class="{'active':active_link == 'Kriteria'}">
			      	<router-link to="/kriteria" class="nav-link">
			      		Kriteria 
			      	</router-link>
			      </li>
			      <li class="nav-item" :class="{'active':active_link == 'BobotKriteria'}">
			      	<router-link to="/bobot-kriteria" class="nav-link">
			      		Bobot Kriteria 
			      	</router-link>
			      </li>
			      <li class="nav-item" :class="{'active':active_link == 'PenilaianAkhir'}">
			      	<router-link to="/" class="nav-link">
			      		Penilaian Akhir 
			      	</router-link>
			      </li>
			    </ul>
			  </div>
			</div>
		</nav>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				active_link: 'Pegawai'
			}
		},
		watch:{
			$route(to,from){
				this.active_link = to.name
      }
		},
		mounted(){
			this.active_link = this.$route.name
		}
	}
</script>