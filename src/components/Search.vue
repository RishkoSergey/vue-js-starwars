<template>
  <div class="search">
    <input
      type="text"
      v-model="keywords"
      @keyup.enter="enterData"
      placeholder="Search by name"
    />
    <img src="../assets/search.png" />
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
    }, 200),
    enterData: function() {
      this.search(this.keywords);
    }
  }
};
</script>

<style lang="scss">
.search {
  overflow: hidden;
  background-color: #333333;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #808080;
  max-width: 90%;
  margin: 0 320px;
  margin-bottom: 80px;
  input {
    background-color: transparent;
    padding: 6px 0;
    border: none;
    outline: none;
    font-size: 18px;
    line-height: 21px;
    font-weight: 500;
    width: 100%;
  }
  img {
    width: 23px;
    height: 23px;
  }
  @media (max-width: 767px) {
    margin: 0 24px;
    margin-bottom: 45px;
    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
