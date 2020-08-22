<template>
  <div>
    <div class="product-show">
      <div class="container marketing">
        <!-- contain -->

        <hr class="featurette-divider" />
        <div class="row featurette">
          <div class="col-md-7">
            <div class="card">
              <!-- show content -->

              <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <hr />
                <p class="card-text">
                  內容：{{ product.content }}
                  <br />
                  說明：{{ product.description }}
                </p>
                <!-- <div class="col-md-7"> -->

                <del class="origin_price" v-if="product.origin_price">原價 {{ product.origin_price }}</del>
                <div class="price" v-if="product.price">售價 {{ product.price }} 元</div>
                <!-- </div> -->
                <div class="form-group">
                  <select name class="form-control" v-model="product.num">
                    <option
                      :value="num"
                      v-for="num in 10"
                      :key="num"
                    >選購 {{ num }} {{ product.unit }}</option>
                  </select>
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="addToCart(product.id, product.num)"
                >
                  <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                  加到購物車
                </button>
              </div>
              <!-- card end -->
            </div>
          </div>
          <div class="col-md-5">
            <div class="pic-show">
              <img :src="product.imageUrl" class="img-fluid" alt />
            </div>
          </div>
        </div>

        <!-- </div> -->
        <hr class="featurette-divider" />
      </div>
    </div>
    <div class="show-message">
      <div class="container marketing">
        <div class="row featurette">
          <div class="col-md-6 col-xs-4">
            <div class="show-logo">
              <img src="@/assets/images/logo.png" alt />
            </div>
          </div>
          <div class="col-md-6 col-xs-8">
            <h3>注意事項</h3>
            <p>
              配送方式請一律選擇「宅配到府」，因商品為活體植栽為維了護品質，故無法提供「超商取貨」、「超商取貨付款」服務。
              2.植栽因生長過程受日照、季節等因素影響，預計出貨日為3-5工作天，寄出時會避開星期五，寄出後兩天內務必有人於收件地址收貨，若兩天內投遞不成功或久悶於紙箱中將有缺壞的可能，若因投遞不成功或較遲開箱而導致植栽損壞恕不負責，煩請配合留意，謝謝！
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr class="featurette-divider" />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: false,
      },
      products: [],
      product: {},
      pagination: [],
      carts: {},
      code: "",
      productId: "",
      // form: {
      //   user: {
      //     name: "",
      //     email: "",
      //     tel: "",
      //     address: "",
      //   },
      //   message: "",
      // },
    };
  },
  methods: {
    getProduct(id) {
      console.log("---id--" + id);
      this.status.loadingItem = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      console.log("---api--:" + api);
      this.$http.get(api).then((response) => {
        console.log(response);
        this.product = response.data.product;
        console.log("====product:" + this.product);
        this.status.loadingItem = "";
      });
    },
    addToCart(id, qty = 1) {
      this.status.loadingItem = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      console.log("----product----" + this.product);
      this.$http
        .post(api, {
          data: {
            product_id: id,
            qty,
          },
        })
        .then((response) => {
          console.log("response add cart==", response.data);

          // this.product.num = 1;
          this.status.loadingItem = "";
          this.getCart();
        });
      $("#productModal").modal("hide");
    },
    getCart() {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      this.$http.get(api).then((response) => {
        this.carts = response.data.data;
        console.log("response cart==", this.carts);
        this.status.loadingItem = "";
        this.isLoading = false;
      });
    },
  },

  created() {
    // this.getProducts();
    this.productId = this.$route.params.productId;
    this.getProduct(this.productId);
    this.getCart();
  },
};
</script>