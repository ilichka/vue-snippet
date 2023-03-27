<template>
  <div>
    <custom-select
        :value="selectedSort"
        @update:value="setSelectedSort"
        :options="sortOptions"
    />
    <custom-input :value="searchQuery"
                  @update:value="setSearchQuery">Search</custom-input>
    <custom-modal v-model:show="modalIsOpen" >
      <post-form   @create='createPost'/>
    </custom-modal>
    <custom-button @click="openModal">Create Post</custom-button>
    <post-list @remove="removePost" :posts="searchPosts" v-if="!isLoading"/>
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts"/><!--ref="observer" -->
    <!--    <div class="page-wrapper">
          <div v-for="pageNumber in totalPage" :key="page" class="page"
               :class="{
                  'current-page': page===pageNumber
               }"
               @click="changePage(pageNumber)"
               >{{pageNumber}}</div>
        </div>-->

  </div>
</template>

<script>
import PostForm from "@/components/post-form/post-form.vue";
import PostList from "@/components/post-list/post-list.vue";
import axios from "axios";
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      modalIsOpen: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions
    }),
    ...mapGetters({
      searchPosts: 'post/searchPosts'
    })
  }
}
</script>

<style>


.page-wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}
</style>