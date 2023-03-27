<template>
  <form class="form" @submit.prevent>
    <h4>Post creation</h4>
    <custom-input v-model:value="post.title" class="input" type="text" placeholder="Name"/>
    <custom-input v-model:value="post.body" class="input" type="text" placeholder="Desc"/>
    <custom-button class="post-btn" @click="createPost">Create post</custom-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }

    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        body: '',
        title: ''
      }
    }
  }
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}


.post-btn {
  margin-top: 15px;
  align-self: flex-end;
}
</style>