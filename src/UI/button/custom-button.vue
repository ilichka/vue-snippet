<template>
  <button class="btn">
    <slot></slot>
    <slot name="a"></slot>
  </button>
</template>

<script>
export default {
  name: 'custom-button'
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  border: 1px solid teal;
  color: teal;
}
</style>