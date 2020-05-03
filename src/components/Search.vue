<template>
  <div class="search">
    <input type="text" v-model="keywords" placeholder="Search.." />
  </div>
</template>

<script>
import { mapActions } from "vuex";

const debounce = function(f, ms) {
  let timer = null;
  return function(...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(onComplete, ms);
  };
};

export default {
  data: () => {
    return {
      keywords: ""
    };
  },
  watch: {
    keywords() {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions(["search"]),
    fetchData: debounce(function() {
      this.search(this.keywords);
    }, 200)
  }
};
</script>

<style lang="scss">
.search {
  overflow: hidden;
  background-color: #333333;
  display: flex;
  justify-content: center;
  margin-bottom: 80px;
}
/* Style the search box inside the navigation bar */
.search input[type="text"] {
  padding: 6px;
  border: none;
  font-size: 17px;
  width: 60%;
}
</style>
