<template>
  <div class="group-product">
    <div class="pic">
      <router-link class :to="'show/' + `${product.id}`">
        <img class="image-position product-size" :src="product.imageUrl" alt />
      </router-link>
    </div>

    <div class="text-product">
      <p>
        <router-link class :to="'show/' + `${product.id}`">{{
          product.title
        }}</router-link>
        <br />
        <span class="unit">單位:{{ product.unit }}</span>
      </p>
      <span class="origin_price line-through" v-if="product.origin_price"
        >建議售價 {{ product.origin_price }} 元</span
      >
      <br />
      <span class="price" v-if="product.price">特價 {{ product.price }}</span>
      <a class="add-cart" @click.prevent="addItem(product.id)" type="button">
        <i class="fas fa-cart-plus"></i>
        <i
          v-if="status.loadingItem === product.id"
          class="fas fa-spinner fa-spin"
        ></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 內部元件 click觸發 用emit addToCard
    addItem: function(id) {
      console.log(id);
      this.$emit("add", id);
    }
  },
  props: ["product", "status"]
};
</script>
