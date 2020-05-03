<template>
  <div class="list">
    <div
      class="list__item"
      v-for="card in getCards"
      :key="card.name"
      @click="popupClick(card)"
    >
      <Card :card="card" />
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import { mapGetters } from "vuex";

export default {
  components: {
    Card
  },
  data: () => {
    return {
      showPopup: false
    };
  },
  computed: mapGetters(["getCards"]),
  methods: {
    popupClick(card) {
      this.$emit("popupClick", card);
    }
  }
};
</script>

<style lang="scss">
.list {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 128px;
  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 128px);
    height: 320px;
    background-color: #1a1a1a;
    border-radius: 8px;
    margin-bottom: 32px;
    margin-right: 112px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    &:nth-child(odd) {
      margin-right: 32px;
      margin-left: 112px;
    }
    &:active {
      box-shadow: 0 14px 28px rgba(96, 151, 168, 0.15),
        0 10px 10px rgba(96, 151, 168, 0.25);
    }
  }
  &__blur {
    filter: blur(5px);
  }
}
</style>
