<template>
  <div id="app" @scroll="onScroll">
    <div :class="{ blur: showPopup }">
      <Header />
      <Preloader v-if="isPreloader" />
      <div v-else>
        <Search />
        <List @popupClick="popupClick($event)" />
      </div>
      <Footer />
    </div>
    <Popup :data="popupData" v-if="showPopup" @close="showPopup = false" />
  </div>
</template>

<script>
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Popup from "./components/Popup";
import Search from "./components/Search";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer,
    Preloader,
    Popup,
    Search
  },
  data() {
    return {
      checkFirst: true,
      showPopup: false,
      popupData: {}
    };
  },
  computed: {
    ...mapGetters(["getCards"]),
    isPreloader: function() {
      return this.getCards.length ? false : true;
    }
  },
  mounted() {
    setTimeout(() => this.fetchCards(), 1500);
  },
  methods: {
    ...mapActions(["fetchCards", "updateCards"]),
    onScroll: function(event) {
      const endList = event.target.firstElementChild.lastElementChild.getBoundingClientRect()
        .top;
      if (endList < document.documentElement.clientHeight && this.checkFirst) {
        this.updateCards();
        this.checkFirst = false;
      }
    },
    popupClick: function(event) {
      this.popupData = event;
      this.showPopup = true;
    }
  },
  watch: {
    getCards: function() {
      this.checkFirst = true;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Roboto, sans-serif;
  width: 100%;
  height: 100vh;
  background-color: #333333;
  overflow-y: scroll;
  color: white;
}
.blur {
  filter: blur(7px);
}
</style>
