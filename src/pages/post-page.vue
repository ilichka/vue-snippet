<template>
  <div>
    <custom-select
        v-model:value="selectedSort"
        :options="sortOptions"
    />
    <custom-input v-model:value="searchQuery">Search</custom-input>
    <custom-modal v-model:show="modalIsOpen" >
      <post-form   @create='createPost'/>
    </custom-modal>
    <custom-button @click="openModal">Create Post</custom-button>
    <post-list @remove="removePost" :posts="searchPosts" v-if="!isLoading"/>
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePages"/><!--ref="observer" -->
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
export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [],
      modalIsOpen: false,
      isLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0,
      sortOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By body'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
    },
    removePost(post) {
      this.posts = this.posts.filter(postItem => postItem.id !== post.id)
    },
    openModal() {
      this.modalIsOpen = true
    },
    async fetchPost() {
      try {
        this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        console.log(e.message)
      } finally {
        this.isLoading = false
      }

    },
    async loadMorePages() {
      this.page +=1
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts,...response.data]
      } catch (e) {
        console.log(e.message)
      }

    },
    /* changePage(pageNumber) {
       this.page = pageNumber
     }*/
  },
  mounted() {
    this.fetchPost()
   /* const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting && this.page < this.totalPage) {
        this.loadMorePages()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)*/
  },
  watch: {
    selectedSort(newValue) {
      this.posts.sort((post1,post2)=>{
        return post1[newValue].localeCompare(post2[newValue])
      })
    },
    /* page() {
       this.fetchPost()
     }*/
  },
  computed: {
    searchPosts() {
      return this.posts.filter(post=>post.title.includes(this.searchQuery))
    }
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