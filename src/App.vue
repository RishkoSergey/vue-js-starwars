<template>
  <div id="app" @scroll="onScroll">
    <Header />
    <div class="container">
      <List :scrollToEnd="scrollToEnd" @fetched="checkFirst = true" />
    </div>
    <Footer />
  </div>
</template>

<script>
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    List,
    Footer
  },
  data() {
    return {
      scrollToEnd: 0,
      checkFirst: true
    };
  },
  methods: {
    onScroll: function(event) {
      const endOfList = event.target.lastElementChild.getBoundingClientRect().top;
      if (
        window.pageYOffset + endOfList <
          window.pageYOffset + document.documentElement.clientHeight &&
        this.checkFirst
      ) {
        this.scrollToEnd++;
        this.checkFirst = false;
      }
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
