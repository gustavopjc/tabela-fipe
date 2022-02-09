<template>
  <div class="modal">
    <div class="content" :class="[size]">
      dsadasdas
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoModelModal',
  props: {
    size: {
      default: 'regular',
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  background: rgba(#fff, .8);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 1000;
}
</style>