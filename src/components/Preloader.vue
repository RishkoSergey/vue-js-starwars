<template>
  <div class="preloader">
    <img src="../assets/preloader.png" class="preloader__image" />
  </div>
</template>

<style lang="scss">
.preloader {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 200px;
  &__image {
    animation: spin 3s infinite linear;
    transform-origin: 50% 100px;
  }
}
@keyframes spin {
  100% {
    opacity: 0;
    transform: rotate(1turn);
  }
}
</style>
