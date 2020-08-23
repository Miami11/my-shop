import Vue from "vue";
import Router from "vue-router";
// import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/pages/Login";
import Dashboard from "@/components/Dashboard";
import Products from "@/components/pages/Products";
import Coupons from "@/components/pages/Coupons";
import Orders from "@/components/pages/Orders";
import Index from "@/components/public/Index";
import Main from "@/components/public/Main";
import Show from "@/components/public/ProductShow";
import PublicProducts from "@/components/public/Products";
import Cart from "@/components/public/Cart";
import Checkout from "@/components/public/Checkout";
import CustomerOrders from "@/components/pages/CustomerOrders";
import CustomerCheckout from "@/components/pages/CustomerCheckout";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    // {
    //   path: "/",
    //   name: "HelloWorld",
    //   component: HelloWorld,
    //   meta: { requiresAuth: true }
    // },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/admin",
      name: "HelloWorld",
      component: Dashboard,
      children: [
        {
          path: "products",
          name: "Products",
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: "Coupons",
          name: "Coupons",
          component: Coupons,
          meta: { requiresAuth: true }
        },
        {
          path: "orders",
          name: "orders",
          component: Orders,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
      children: [
        {
          path: "customer_order",
          name: "CustomerOrder",
          component: CustomerOrders
        },
        {
          path: "customer_checkout/:orderId",
          name: "CustomerCheckout",
          component: CustomerCheckout
        }
      ]
    },
    {
      path: "/fermi",
      name: "Index",
      component: Index,
      redirect: "fermi/index",
      children: [
        {
          path: "show/:productId",
          name: "Show",
          component: Show
        },
        {
          path: "index",
          name: "index",
          component: Main
        },
        {
          path: "products",
          name: "index",
          component: PublicProducts
        },
        {
          path: "cart",
          name: "Index",
          component: Cart
        },
        {
          path: "checkout/:orderId",
          name: "Index",
          component: Checkout
        }
      ]
    }
  ]
});
