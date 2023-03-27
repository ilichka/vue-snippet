<template>
  <div class="post">
    <div>
      <div><strong>Name:</strong> {{post.title}}</div>
      <div><strong>Description:</strong> {{post.body}}</div>
    </div>
    <div>
      <custom-button @click="$router.push(`/posts/${post.id}`)">Open</custom-button>
      <custom-button @click="this.$emit('remove',post)">Delete</custom-button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>