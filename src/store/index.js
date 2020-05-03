import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async fetchCards(ctx) {
      await axios.get("https://swapi.dev/api/people/?page=1").then(res => {
        const promiseArr = [];
        res.data.results.forEach(card => {
          if (!card.speciesRes) {
            if (card.species[0]) {
              promiseArr.push(
                axios
                  .get(card.species[0])
                  .then(res => (card.speciesRes = res.data.name))
              );
            } else {
              card.speciesRes = "";
            }
          }
        });
        Promise.all(promiseArr).then(() => {
          ctx.commit("fetchCards", res.data);
        });
      });
    },
    async updateCards(ctx) {
      if (ctx.state.nextUrl !== null) {
        await axios.get(ctx.state.nextUrl).then(res => {
          const promiseArr = [];
          res.data.results.forEach(card => {
            if (!card.speciesRes) {
              if (card.species[0]) {
                promiseArr.push(
                  axios
                    .get(card.species[0])
                    .then(res => (card.speciesRes = res.data.name))
                );
              } else {
                card.speciesRes = "";
              }
            }
          });
          Promise.all(promiseArr).then(() => {
            ctx.commit("updateCards", res.data);
          });
        });
      }
    },
    fullInfo(ctx, card) {
      if (!card.homeworldRes && !card.filmsRes) {
        const promiseArr = [];
        promiseArr.push(
          axios.get(card.homeworld).then(hw => {
            card.homeworldRes = hw.data.name;
          })
        );
        card.filmsRes = [];
        card.films.forEach(film => {
          promiseArr.push(
            axios.get(film).then(res => card.filmsRes.push(res.data.title))
          );
        });
        Promise.all(promiseArr).then(() => {
          ctx.commit("setFullInfo", card);
        });
      } else ctx.commit("setFullInfo", card);
    },
    async search(ctx, keywords) {
      await axios
        .get(`https://swapi.dev/api/people/?search=${keywords}`)
        .then(res => {
          ctx.commit("fetchCards", res.data);
        });
    }
  },
  mutations: {
    fetchCards(state, data) {
      state.cards = data.results;
      state.nextUrl = data.next;
    },
    updateCards(state, data) {
      state.cards = state.cards.concat(data.results);
      state.nextUrl = data.next;
    },
    setFullInfo(state, card) {
      state.currentPopup = card;
    }
  },
  state: {
    cards: [],
    nextUrl: "",
    currentPopup: {}
  },
  getters: {
    getCards(state) {
      return state.cards;
    },
    getPopupInfo(state) {
      return state.currentPopup;
    }
  }
});
