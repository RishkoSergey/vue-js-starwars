<template>
  <div class="popup-list-item">
    <img :src="img" class="popup-list-item__image" />
    <div class="popup-list-item__name">{{ name }}</div>
    <div v-if="!res[0]">—</div>
    <div v-else-if="res[0].length > 1" class="popup-list-item__res-list">
      <p v-for="film in res" :key="film">
        {{ film }}
      </p>
    </div>
    <div v-else class="popup-list-item__res">{{ res }}</div>
  </div>
</template>

<script>
export default {
  props: ["name", "res", "img"]
};
</script>

<style lang="scss">
.popup-list-item {
  display: flex;
  align-items: flex-start;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 20px;
  &__image {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
  &__name {
    font-weight: normal;
    color: #808080;
    width: 100px !important;
  }
  &__res {
    font-weight: bold;
    color: white;
  }
  &__res-list {
    font-weight: bold;
    color: white;
    p {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  @media (max-width: 767px) {
    font-size: 16px;
    line-height: 19px;
    &__res-list {
      width: calc(100% - 130px);
    }
  }
}
</style>
