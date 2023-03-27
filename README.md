# Vue snippet

## Virtual DOM

## Models

Simple state. To use it in component use interpolation `{{value}}`.

## Double link conception

We need this concept to simply link our input to our object and vice versa. Use `v-bind`
or `:value` directive to bind our data to tag.

The best vay to create double link conception is to use `v-model` directive.

Use `.trim` modifier to remove spaces. 

Use `.number` to set number value automatically.

## Get started


Install vue cli
### `npm install -g @vue/cli`

Now with cli we can create a project
### `vue create .`

Then manually create a setup for your project.

## First component

Create file `App.vue`. Here we can describe 3 main sections:

```vue
<template>
   <button v-on:click="like">Like</button>
   <div>Likes: {{likes}}</div>
</template>

<script>
export default {
   data() {
      return {
         likes: 0
      }
   },
   methods: {
      like() {
         this.likes += 1
      }
   }
}
</script>

<style>
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}
</style>
```

1. template - simple jsx
2. script - describe component logic here. Always need to export default object. 
   - data field is for models(like state in react). To reach this data use interpolation
   in template tag.
   - method field is for methods. In vue there are a lot of directives. For example to add
   click event use `v-on` or `@` directive with property `click`.
3. styles for creating styles.
   - you can create it like scoped or global.

## Debugging

Install `Vue.js devtools` in Chrome. Allow local file loading in settings.

## Working with list of components(`v-for`)

Create model in `script` tag and use it in template via directive `v-for`.

```vue
<template>
  <div class="app">
      <form class="form" @submit.prevent>
        <h4>Post creation</h4>
        <input @input="title = $event.target.value"  v-bind:value="title" class="input" type="text" placeholder="Name"/>
        <input @input="body = $event.target.value"  v-bind:value="body" class="input" type="text" placeholder="Desc"/>
        <button class="btn" @click="createPost">Create post</button>
      </form>
    <div class="post" v-for="post in posts">
      <div><strong>Name:</strong> {{post.title}}</div>
      <div><strong>Description:</strong> {{post.body}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        {id: 1, title: 'JS1', body: 'Description1'},
        {id: 2, title: 'JS2', body: 'Description2'},
        {id: 3, title: 'JS3', body: 'Description3'}
      ],
      title: '',
      body: ''
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      this.posts.push(newPost)
      this.body = ''
      this.title = ''
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.app {
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  border: 1px solid teal;
  color: teal;
}
</style>
```

To bind our model to input use `v-bind` or `:value` directive. 
To bind it in other way create method and add `@input` event. We can do it in 2 ways:

```vue
<template>
<input @input="inputValue" v-bind:value="title" class="input" type="text" placeholder="Name"/>
</template>

<script>
export default {
     methods: {
        
        inputValue(event) {
           this.title = event.target.value
        }
     }
}
</script>
```

OR

```vue
<template>
<input @input="title = $event.target.value" 
       v-bind:value="title" 
       class="input" 
       type="text" 
       placeholder="Name"/>
</template>
```

To prevent submit browser action use `modifiers`.

## Decomposition

Import components in script section. Register component in `components` block. Use
`props` block to pass props to children.

```vue
<template>
  <div class="app">
    <post-form/>
    <post-list :posts="posts"/>
  </div>
</template>

<script>
import PostForm from "@/components/post-form/post-form.vue";
import PostList from "@/components/post-list/post-list.vue";
export default {
  components: {
    PostForm, PostList
  },
  data() {
    return {
      posts: [
        {id: 1, title: 'JS1', body: 'Description1'},
        {id: 2, title: 'JS2', body: 'Description2'},
        {id: 3, title: 'JS3', body: 'Description3'}
      ],
      title: '',
      body: ''
    }
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body
      }
      this.posts.push(newPost)
      this.body = ''
      this.title = ''
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


.app {
  padding: 20px;
}


</style>
```

## Exchange data between parent and child

Create custom event and then subscribe on it. Use `this.$emit({event name}, ...arg)`.
Then in parent component subscribe on it like this `@{event name}`.

Use `<slot></slot>` to add children. You can also use named slot and access them via
`<template v-slot:{name}></template>`.

## Optimize inputs

Create `index.ts` file in your ui-kit and export default array with your components:

```typescript
import CustomButton from "@/UI/button/custom-button.vue";

export default [
    CustomButton
]
```

Then move to `main.ts` and register components globally:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import uiComponents from '@/UI'

const app = createApp(App)

uiComponents.forEach((component)=>{
    app.component(component.name, component)
})

app.mount('#app')
```

## Conditional rendering

Use `v-if` and `v-else` or `v-else-if` directive.

```vue
<template>
   <div v-if="{condition}">if</div>
   <div v-else>else</div>
</template>
```

You can use directive `v-show` to not delete element from DOM, just make it `display: none`.


## Async 

Simply create async function in `methods` block and call it then.

## Vue lifecycle

![](vue-lifecycle.png)

## Watch and computed

- Watch === useEffect
- Computed === useMemo

```vue
<script>
//...
watch: {
   selectedSort(newValue) {

   }
}
//...
</script>
```

## Name function like name of prop in your model!!!

To make wathch deep property add `deep` prop:

```vue
<script>
//...
watch: {
   selectedSort: {
     handler(newValue) {

      },
      deep: true
   }
}
//...
</script>
```

```vue
<script>
//...

watch: {
   selectedSort(newValue) {
      this.posts.sort((post1,post2)=>{
         return post1[newValue].localeCompare(post2[newValue])
      })
   }
},
computed: {
   sortedPost() {
      return [...this.posts].sort((post1,post2)=>{
         return post1[this.selectedSort].localeCompare(post2[this.selectedSort])
      })
   }
}
//...
</script>
```

## Animations

Use ` <transition-group name="post-list"></transition-group>` to add animations on 
`v-for` directive.

For dynamic classes use this annotation: 

`:class="{
'current-page': page===pageNumber
}"`

## Vue router

```typescript
import Main from "@/pages/main.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router
```

In `main.ts` connect router:

```typescript
app.use(router)
```

Add `<router-view></router-view>` in your `App.vue`.

To navigate between pages use `<router-link to="/">Main</router-link>`.

## Custom directives

Register our directive in `main.ts`:

```typescript
app.directive('intersection', VIntersection)
```

```typescript
export default {
    mounted(el: HTMLElement, binding) {
        console.log(el, binding)
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if(entries[0].isIntersecting) {
                binding.value()
            }
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(el)
    },
    name: 'intersection'
}
```

## Mixin

Use mixin to reuse logic.

```typescript
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideModal() {
            this.$emit('update:show', false)
        }
    },
    mounted() {
        console.log('mixin mounted')
    }
    // ...
}
```

```vue
  mixins: [toggleMixin]
```

## VueX

State manager for vue. 

```typescript
import {createStore} from "vuex";

export default createStore({
   state: {

   },
   getters: {

   },
   mutations: {

   },
   actions: {

   }
})
```

In `main.ts`:

```typescript
app.use(store)
```

To use state: `$store.state.{value}`
To use getter: `$store.getters.{name}`
To use mutation: `$store.commit({mutation name})`

```vue
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
```

## Composition API