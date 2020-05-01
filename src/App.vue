<template>
  <div id="app" @scroll="onScroll">
    <Header />
    <Preloader v-if="isPreloader" />
    <div v-else>
      <List />
    </div>
    <Footer />
  </div>
</template>

<script>
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer,
    Preloader
  },
  data() {
    return {
      checkFirst: true
    };
  },
  computed: {
    ...mapGetters(["getCards"]),
    isPreloader: function() {
      return this.getCards.length ? false : true;
    }
  },
  mounted() {
    setTimeout(() => this.fetchCards(), 2000);
  },
  methods: {
    ...mapActions(["fetchCards"]),
    onScroll: function(event) {
      const endList = event.target.lastElementChild.getBoundingClientRect().top;
      if (
        window.pageYOffset + endList <
          window.pageYOffset + document.documentElement.clientHeight &&
        this.checkFirst
      ) {
        this.fetchCards();
        this.checkFirst = false;
      }
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
  width: 100%;
  height: 100vh;
  background-color: #333333;
  overflow-y: scroll;
  color: white;
}
</style>
