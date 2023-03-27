import Main from "@/pages/main.vue";
import {createRouter, createWebHistory} from "vue-router";
import PostPage from "@/pages/post-page.vue";
import About from "@/pages/about.vue";
import PostPageId from "@/pages/post-page-id.vue";
import PostPageWithVuex from "@/pages/post-page-with-vuex.vue";
import PostPageCompositionApi from "@/pages/post-page-composition-api.vue";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostPageId
    },
    {
        path: '/store',
        component: PostPageWithVuex
    },
    {
        path: '/composition',
        component: PostPageCompositionApi
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router