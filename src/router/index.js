import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

nprogress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import("@/views/Welcome.vue"), },
    { path: '/test', component: () => import("@/views/Test.vue"), },
    { path: '/login', component: () => import("@/views/login.vue"), },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/views/system/notFound.vue") }, // 通配符路由
  ],
})

router.beforeEach(async (to, from, next) => {
  try {
    nprogress.start()
    next();
  } catch (error) {
    next(false); // 停止导航
  }


  nprogress.done()
});


export default router
