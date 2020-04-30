<template>
  <div id="app" @scroll="onScroll">
    <Header />
    <div class="container">
      <List />
    </div>
    <Footer />
  </div>
</template>

<script>
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer
  },
  data() {
    return {
      checkFirst: true
    };
  },
  computed: mapGetters(["getCards"]),
  mounted() {
    this.$store.dispatch("fetchCards");
  },
  methods: {
    onScroll: function(event) {
      const endList = event.target.lastElementChild.getBoundingClientRect().top;
      if (
        window.pageYOffset + endList <
          window.pageYOffset + document.documentElement.clientHeight &&
        this.checkFirst
      ) {
        this.$store.dispatch("fetchCards");
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
.container {
  padding: 0 112px;
}
</style>
