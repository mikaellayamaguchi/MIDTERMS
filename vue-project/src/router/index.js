import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/home.vue';
import UserPage from '../components/user.vue';
import StudentPage from '../components/student.vue';
import AdminPage from '../components/admin.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/user', component: UserPage },
  { path: '/student', component: StudentPage },
  { path: '/admin', component: AdminPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;