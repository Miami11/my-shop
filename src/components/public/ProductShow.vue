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
                <div class="origin_price" v-if="!product.price">{{ product.origin_price }} 元</div>
                <del class="origin_price" v-if="product.price">原價 {{ product.origin_price }}</del>
                <div class="price" v-if="product.price">現在只要 {{ product.price }} 元</div>
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

    createOrder() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      // vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            console.log("訂單已建立", response.data.orderId);
            // vm.getCart();
            if (response.data.success) {
              vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
        }
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