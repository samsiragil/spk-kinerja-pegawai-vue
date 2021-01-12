import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
	pegawai: [
		{
			id: '1610377142993',
			code: 'A01',
			name: 'Samsi Ragil',
			position: 'Manager',
			team: 'Bisnis'
		},
		{
			id: '1610377143948',
			code: 'A02',
			name: 'Oka Graha',
			position: 'Support Officer',
			team: 'Development'
		},
		{
			id: '1610377155286',
			code: 'A03',
			name: 'Ari Jhosua',
			position: 'Mobile Developer',
			team: 'Development'
		},
		{
			id: '1610377160423',
			code: 'A04',
			name: 'Setia Lokanata',
			position: 'Designer',
			team: 'Bisnis'
		},
	],
	kriteria: [
		{
			id: '1610378223025',
			code: 'K01',
			name: 'Absensi',
			desc: 'Kedisiplinan dalam melakukan absensi (jam kerja, cuti, izin, dll).'
		},
		{
			id: '1610378224190',
			code: 'K02',
			name: 'Hasil Pekerjaan',
			desc: 'Hasil dari suatu pekerjaan apakah memuaskan atau tidak.'
		},
		{
			id: '1610378224379',
			code: 'K03',
			name: 'Kedisiplinan',
			desc: 'Dalam lingkungan pekerjaan, kedisiplinan sangatlah penting.'
		}
	],
	selected_kriteria: []
}

const getters = {
	getPegawai: state => state.pegawai,
	getKriteria: state => state.kriteria,
	getSelectedKriteria: state => state.selected_kriteria
}

const mutations = {
	setPegawai(state,payload){
		let record = state.pegawai.find(x=> x.code == payload.code)
		if(!record){
			state.pegawai.push(payload)
		}
	},
	updatePegawai(state,payload){
		let record = state.pegawai.findIndex(x=> x.id == payload.id)
		if(record != -1){
			state.pegawai[record] = payload
		}
	},
	deletePegawai(state,payload){
		let record = state.pegawai.findIndex(x=> x.id == payload)
		if(record != -1){
			state.pegawai.splice(record,1)
		}
	},
	setKriteria(state,payload){
		let record = state.kriteria.find(x=> x.code == payload.code)
		if(!record){
			state.kriteria.push(payload)
		}
	},
	updateKriteria(state,payload){
		let record = state.kriteria.findIndex(x=> x.id == payload.id)
		if(record != -1){
			state.kriteria[record] = payload
		}
	},
	deleteKriteria(state,payload){
		let record = state.kriteria.findIndex(x=> x.id == payload)
		if(record != -1){
			state.kriteria.splice(record,1)
		}
	},
	setSelectedKriteria(state,payload){
		state.selected_kriteria = payload
	}
}

const actions = {

}

export default new Vuex.Store({
  strict: debug,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  plugins: [createPersistedState()],
})