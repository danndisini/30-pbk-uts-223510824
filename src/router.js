// router.js
import { createRouter, createWebHistory } from 'vue-router';
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';
import Albums from './components/Albums.vue';
import Photos from './components/Photos.vue';

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/photos', component: Photos }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
