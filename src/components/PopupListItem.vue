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
  width: 50%;
}
</style>
