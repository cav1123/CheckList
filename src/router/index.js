import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import CheckListView from '../views/CheckListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home', requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { title: 'Login', requiresAuth: false }
    },
    {
      path: '/checkList',
      name: 'checkList',
      component: CheckListView,
      meta: { title: 'CheckList', requiresAuth: true }
    }
  ]
})

// 画面遷移成功後にページタイトルを設定
router.afterEach((titleString) => {
  document.title = titleString.meta.title
});
// 画面遷移前にログイン済みかをチェックして、未ログイン時はログイン画面に強制遷移させる
router.beforeEach((to, from, next) => {
  const auth = getAuth()
  if (!to.matched.some(record => record.meta.requiresAuth) || auth.currentUser) {
    next()
  } else {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next()
      } else {
        next({ name: 'login' })
      }
    })
  }
})

export default router