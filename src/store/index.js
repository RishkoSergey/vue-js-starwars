import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async fetchCards(ctx) {
      if (ctx.state.nextUrl !== null) {
        await axios
          .get(ctx.state.nextUrl || "https://swapi.dev/api/people/?page=1")
          .then(res => {
            ctx.commit("updateCards", res.data);
          });
      }
    }
  },
  mutations: {
    updateCards(state, data) {
      state.cards = state.cards.concat(data.results);
      state.nextUrl = data.next;
    }
  },
  state: {
    cards: [],
    nextUrl: ""
  },
  getters: {
    getCards(state) {
      return state.cards;
    }
  }
});
