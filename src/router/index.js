import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import {
  constantRouterMap
} from "@/config/router.config"



const router = new VueRouter({
  routes:constantRouterMap,
  mode: 'history',
  base: process.env.BASE_URL
})

export default router
