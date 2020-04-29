<template>
  <div class="header">
    <img src="../assets/header_text.png" class="header__text" />
  </div>
</template>

<style lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 33vh;
  background-image: url(../assets/header.png);
  background-size: contain;
  margin-bottom: 100px;
  &__text {
    height: 50%;
  }
}
</style>
