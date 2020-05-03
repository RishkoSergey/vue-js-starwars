<template>
  <div class="popup">
    <Preloader v-if="isPreloader" />
    <div class="popup__container" v-else>
      <div class="popup__top-block">
        <div class="avatar" :style="{ backgroundColor: getColor }">
          {{ data.name.substr(0, 1) }}
        </div>
        <div class="popup__top-block__name">
          {{ data.name }}
        </div>
      </div>
      <div class="popup__bottom-block">
        <PopupListItem
          name="Birth year"
          :res="getPopupInfo.birth_year"
          :img="require('../assets/birth_year.png')"
        />
        <PopupListItem
          name="Species"
          :res="getPopupInfo.species"
          :img="require('../assets/species.png')"
        />
        <PopupListItem
          name="Gender"
          :res="getPopupInfo.gender"
          :img="require('../assets/gender.png')"
        />
        <PopupListItem
          name="Homeworld"
          :res="getPopupInfo.homeworldRes"
          :img="require('../assets/homeworld.png')"
        />
        <PopupListItem
          name="Films"
          :res="getPopupInfo.filmsRes"
          :img="require('../assets/films.png')"
        />
      </div>
    </div>
    <div class="popup__close" @click="closePopup">
      <img src="../assets/close.png" />
    </div>
  </div>
</template>

<script>
import Preloader from "./Preloader";
import PopupListItem from "./PopupListItem";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Preloader,
    PopupListItem
  },
  props: ["data"],
  computed: {
    ...mapGetters(["getPopupInfo"]),
    isPreloader: function() {
      return this.data.name === this.getPopupInfo.name ? false : true;
    },
    getColor: function() {
      let hash = 0;
      let color = "#";
      let value;
      if (!this.data.name) {
        return color + "333333";
      }
      const strLength = this.data.name.length;
      for (let i = 0; i < strLength; i++) {
        hash = this.data.name.charCodeAt(i) + ((hash << 5) - hash);
      }
      for (let i = 0; i < 3; i++) {
        value = (hash >> (i * 8)) & 0xff;
        color += ("00" + value.toString(16)).substr(-2);
      }
      return color;
    }
  },
  mounted() {
    setTimeout(() => this.fullInfo(this.data), 1500);
  },
  methods: {
    ...mapActions(["fullInfo"]),
    closePopup: function() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.popup {
  width: 800px;
  position: absolute;
  left: calc(50% - 400px);
  top: calc(50% - 246px);
  background-color: #1a1a1a;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  .preloader {
    margin-top: 150px;
  }
  &__container {
    padding: 0 80px;
  }
  &__top-block {
    display: flex;
    align-items: center;
    margin-top: 80px;
    padding-bottom: 80px;
    border-bottom: 2px solid #808080;
    .avatar {
      text-align: center;
      margin: 0;
      margin-right: 15px;
    }
  }
  &__bottom-block {
    margin: 80px 0;
    max-height: 130px;
    display: flex;
    flex-flow: column wrap;
    .popup-list-item {
      &:nth-child(3) {
        height: 80px;
      }
    }
  }
  &__close {
    position: absolute;
    right: 22px;
    top: 22px;
    cursor: pointer;
  }
}
</style>
