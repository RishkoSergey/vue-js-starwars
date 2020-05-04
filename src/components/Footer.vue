<template>
  <div class="footer">
    <div class="footer__text">
      STAR WARS CHARACTER Encyclopedia, 2019
    </div>
  </div>
</template>

<style lang="scss">
.footer {
  width: 100%;
  height: 120px;
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.11em;
  &__text {
    text-align: center;
  }
  @media (max-width: 767px) {
    height: 102px;
    font-size: 14px;
    line-height: 16px;
    &__text {
      padding: 0 57px;
    }
  }
}
</style>
