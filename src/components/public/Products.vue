<template>
  <div>
    <!-- products -->
    <div class="product-bg parallax">
      <div class="container marketing">
        <div class="row">
          <div class="col-lg-12">
            <hr class="featurette-divider" />
            <h2 class="product-title">產品</h2>
            <hr />
          </div>
        </div>
        <div class="row">
          <h5>裝飾</h5>
          <p>
            永生花指的是透過特殊加工的鮮花。通過特殊處理，它的保存期間比鮮花更長久。
            在台灣，除了「永生花」的稱呼之外，也被稱為「不凋花」，與乾燥花有些不同。最初這個技術只在花藝設計師之間流傳，現在已經普及到一般大眾也可以取得的程度。由於永生花的顏色變化豐富，非常適合當作送禮的選項。
          </p>
        </div>
        <div class="row">
          <div
            class="col-md-3 col-sm-4 col-xs-12 pd-bottom"
            v-for="item in filterData('裝飾')"
            :key="item.id"
          >
            <ItemCard :product="item" :status="false" v-on:add="addToCart"></ItemCard>
          </div>
        </div>
        <div class="row">
          <h5>禮品</h5>
          <p>
            各式各樣高品質與價格合理花束、花藍、盆景等，提供配送安排，立即訂購！
            節日大小事「花落」一品。花語傳情-傳遞最真摯的心意。再遠的距離都讓我幫您傳情。
          </p>
        </div>
        <div class="row">
          <div
            class="col-md-3 col-sm-4 col-xs-12 pd-bottom"
            v-for="item in filterData('禮品')"
            :key="item.id"
          >
            <ItemCard :product="item" :status="false" v-on:add="addToCart"></ItemCard>
          </div>
        </div>
        <div class="row">
          <h5>造景</h5>
          <p>庭院是讓你身在水泥叢林中也可以感受到遠方自然氣息的重要場地，庭院中的植栽以及流水可以舒緩你的身心，讓你更有活力，因此是非常值得費心思規劃設計的區域。如果說你有心要打造一個專屬於你的庭院，但是卻毫無頭緒的話，接下來我們將提供給你一些關於庭院規劃設計以及維護的實用資訊。</p>
        </div>
        <div class="row">
          <div
            class="col-md-3 col-sm-4 col-xs-12 pd-bottom"
            v-for="item in filterData('造景')"
            :key="item.id"
          >
            <ItemCard :product="item" :status="false" v-on:add="addToCart"></ItemCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>

<script>
import $ from "jquery";
import ItemCard from "./ItemCard.vue";
export default {
  components: { ItemCard },
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: false,
      },
      products: [],
      carts: {},
    };
  },

  created() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      this.$http.get(api).then((response) => {
        console.log(response);
        this.products = response.data.products;
        this.pagination = response.data.pagination;
        console.log(this.products);
        this.isLoading = false;
      });
    },
    addToCart: function (id, qty = 1) {
      var data = { data: { product_id: id, qty } };
      this.$store.dispatch("ADD_CARTS", data);
    },
    filterData(category) {
      return this.products.filter((item) => category == item.category);
    },
  },
};
</script>
