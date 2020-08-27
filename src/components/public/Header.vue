<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/fermi/index">
          <img style="height:50px" src="@/assets/images/logo.png" alt />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/fermi/index">
                首頁
                <span class="sr-only">(current)</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/fermi/products">產品</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/fermi/products">新聞</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#mark-1">聯絡我們</a>
            </li>
          </ul>
          <div class="cart-number mt-2 mt-md-0">
            <div v-if="!updateNumber == 0" class="number">{{updateNumber}}</div>
            <router-link class="mr-sm-2 pd" to="/fermi/cart">
              <i class="fas fa-shopping-cart"></i>
            </router-link>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  computed: {
    updateNumber() {
      return this.$store.getters["coutCarts"];
    },
  },

  mounted() {
    this.$store.dispatch("INIT_CARTS");
  },
};
</script>
