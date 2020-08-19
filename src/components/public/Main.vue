<template>
  <div>
    <!-- <main role="main"> -->
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <!-- <svg
              class="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="@/assets/images/banner.jpg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
          >-->
          <img src="@/assets/images/banner.jpg" alt />
          <rect width="100%" height="100%" fill="#777" />
          <!-- </svg> -->
          <div class="container">
            <div class="carousel-caption text-left">
              <h1>Example headline.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <p>
                <a class="btn btn-lg btn-primary" href="#" role="button">Sign up today</a>
              </p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <!-- <svg
              class="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="@/assets/images/banner2.jpg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
          >-->
          <img src="@/assets/images/banner2.jpg" alt />
          <rect width="100%" height="100%" fill="#777" />
          <!-- </svg> -->
          <div class="container">
            <div class="carousel-caption">
              <h1>Another example headline.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <p>
                <a class="btn btn-lg btn-primary" href="#" role="button">Learn more</a>
              </p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <!-- <svg
              class="bd-placeholder-img"
              width="100%"
              height="100%"
              xmlns="@/assets/images/banner3                    .jpg"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
              role="img"
          >-->
          <img src="@/assets/images/banner3.jpg" alt />
          <rect width="100%" height="100%" fill="#777" />
          <!-- </svg> -->
          <div class="container">
            <div class="carousel-caption text-right">
              <h1>One more for good measure.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
              <p>
                <a class="btn btn-lg btn-primary" href="#" role="button">Browse gallery</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!-- product -->

    <div class="product-bg parallax">
      <div class="container marketing">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="product-title">園藝花</h2>

            <hr />
          </div>
          <div class="col-md-3 col-sm-4 col-xs-12" v-for="item in products" :key="item.id">
            <div class="group-product">
              <div class="pic">
                <img class="image-position product-size" :src="item.imageUrl" alt />
                <!-- <span class="discount">-20%</span> -->
              </div>

              <div class="text-product">
                <p>
                  <a href>{{item.title}}</a>
                  <br />
                  <span class="unit">單位:{{ item.unit }}</span>
                </p>
                <span
                  class="origin_price line-through"
                  v-if="item.price"
                >原價 {{ item.origin_price }} 元</span>
                <br />
                <span class="price" v-if="item.price">售價 {{ item.price }} 元</span>
                <a class="add-cart" @click.prevent="addToCart(item.id)" type="button">
                  <i class="fas fa-cart-plus"></i>
                  <i v-if="status.loadingItem === item.id" class="fas fa-spinner fa-spin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- services  -->
    <hr class="featurette-divider" />
    <!-- FOOTER -->
    <footer class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>
        &copy; 2017-2020 Company, Inc. &middot;
        <a href="#">Privacy</a> &middot;
        <a href="#">Terms</a>
      </p>
    </footer>
    <!-- </main> -->
  </div>
</template>


<style  scoped>
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
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((response) => {
        this.products = response.data.products;
        this.pagination = response.data.pagination;
        console.log("response==", response.data);
        this.isLoading = false;
      });
    },
    getProduct(id) {
      this.status.loadingItem = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      $("#productModal").modal("show");
      this.$http.get(api).then((response) => {
        this.product = response.data.product;

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
    deleteItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        if (response.suceess) {
          alert("success");
        }
        console.log("response delete==", response);
        this.getCart();
      });
    },
    useCoupon() {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      let code = this.code;
      this.$http
        .post(api, {
          data: {
            code,
          },
        })
        .then((response) => {
          console.log("response coupon==", response);
          this.getCart();
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
    this.getProducts();
    this.getCart();
  },
};
</script>




