import {createStore} from "vuex";
import {postModule} from "@/store/post-module";

export default createStore({
    state: {
        likes: 0
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        post: postModule
    }
})