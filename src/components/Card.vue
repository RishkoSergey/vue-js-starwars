<template>
  <div class="card-info">
    <div class="avatar" :style="{ backgroundColor: getColor }">
      {{ card.name.substr(0, 1) }}
    </div>
    <p class="card-info__name">{{ card.name }}</p>
    <p class="card-info__species">{{ card.speciesRes }}</p>
  </div>
</template>

<script>
export default {
  props: ["card"],
  computed: {
    getColor: function() {
      let hash = 0;
      let color = "#";
      let value;
      if (!this.card.name) {
        return color + "333333";
      }
      const strLength = this.card.name.length;
      for (let i = 0; i < strLength; i++) {
        hash = this.card.name.charCodeAt(i) + ((hash << 5) - hash);
      }
      for (let i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).substr(-2);
      }
      return color;
    }
  }
};
</script>

<style lang="scss">
.card-info {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar {
  margin: 0 auto;
  width: 80px;
  height: 80px;
  font-weight: 500;
  font-size: 48px;
  line-height: 80px;
  border-radius: 50%;
  color: white;
}
</style>
