<template>
  <div class="list">
    <div class="list__item" v-for="card in getCards" :key="card.name">
      <div class="list__item__info">{{ card.name }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: ["scrollToEnd"],
  computed: mapGetters(["getCards"]),
  methods: mapActions(["fetchCards"]),
  async mounted() {
    this.fetchCards();
  },
  watch: {
    scrollToEnd: async function() {
      this.fetchCards();
    }
  }
};
</script>

<style lang="scss">
.list {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 160px;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 16px);
    height: 320px;
    background-color: #1a1a1a;
    border-radius: 8px;
    margin-bottom: 32px;
    &:nth-child(odd) {
      margin-right: 32px;
    }
    &:nth-last-child(-n + 2) {
      margin-bottom: 0;
    }
  }
}
</style>
