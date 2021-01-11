import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
	pegawai: []
}

const getters = {
	getPegawai: state => state.pegawai
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