import { createApp } from 'vue'
import App from './App.vue'
import uiComponents from '@/UI'
import router from "@/router/router";
import directives from "@/directives";
import store from "@/store";

const app = createApp(App)

uiComponents.forEach((component)=>{
    app.component(component.name, component)
})

directives.forEach((directive)=>{
    app.directive(directive.name, directive)
})

app.use(router)

app.use(store)

app.mount('#app')