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
          <img src="@/assets/images/banner.jpg" alt />
          <rect width="120%" height="120%" fill="#777" />

          <div class="container">
            <div class="carousel-caption text-left">
              <h1>Example headline.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/banner2.jpg" alt />

          <div class="container">
            <div class="carousel-caption">
              <h1>Another example headline.</h1>
              <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/banner3.jpg" alt />

          <div class="container">
            <div class="carousel-caption text-right">
              <h1>專業種植經驗</h1>
              <p>城市小農選擇優質並富基肥的德國進口泥炭土，不僅保肥力佳、清潔乾淨無臭味、且不含病菌害蟲，對初學者來說好用且便利，適用於種植蔬菜、育苗、扦插與盆栽</p>
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
            <h2 class="product-title">造景花</h2>

            <hr />
          </div>
        </div>
        <div class="row">
          <div
            class="col-md-3 col-sm-4 col-xs-12 pd-bottom"
            v-for="item in products"
            :key="item.id"
          >
            <div class="group-product">
              <div class="pic">
                <img class="image-position product-size" :src="item.imageUrl" alt />
              </div>

              <div class="text-product">
                <p>
                  <router-link class :to="'show/'+`${item.id}`">{{item.title}}</router-link>
                  <br />
                  <span class="unit">單位:{{ item.unit }}</span>
                </p>
                <span
                  class="origin_price line-through"
                  v-if="item.origin_price"
                >建議售價 {{ item.origin_price }} 元</span>
                <br />
                <span class="price" v-if="item.price">特價 {{ item.price }}</span>
                <a class="add-cart" @click.prevent="addToCart(item.id)" type="button">
                  <i class="fas fa-cart-plus"></i>
                  <i v-if="status.loadingItem === item.id" class="fas fa-spinner fa-spin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-end">
          <p>
            <a href>
              <strong>看更多其他...</strong>
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- services  -->
    <div class="container marketing">
      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">
            造景花
            <span class="text-muted">優秀的工作團隊</span>
          </h2>
          <p class="lead">
            成為花藝設計師之前，平日裡喜歡蒔花弄草，與花草為伴、品味生活。隨著時間推移，「花藝」已漸漸成為她的陽光、空氣、水，是她生命中不可或缺的重要存在。
            <br />相信世上所有花草都擁有美麗的靈魂，我們認真且輕柔地對待，從修剪、搭配、組合，所有細節無不精心設計，每一個作品都蘊含了花藝師想傳遞的精神與意涵。我們不吝惜付出時間與心思，只願為你築起一座美麗且值得探索的花園。
          </p>
          <p>
            <a class="btn btn-lg btn-primary" href="#" role="button">了解更多</a>
          </p>
        </div>
        <div class="col-md-5">
          <div class="side-pic">
            <img src="@/assets/images/side-bg-1.png" alt />
          </div>
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">
            專業種植
            <span class="text-muted">專業材料</span>
          </h2>
          <p
            class="lead"
          >城市小農選擇優質並富基肥的德國進口泥炭土，不僅保肥力佳、清潔乾淨無臭味、且不含病菌害蟲，對初學者來說好用且便利，適用於種植蔬菜、育苗、扦插與盆栽等多種用途，倒入植栽盒中便可直接使用，亦或與舊土混合使用。</p>
          <p>
            <a class="btn btn-lg btn-primary" href="#" role="button">了解更多</a>
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          <div class="side-pic">
            <img src="@/assets/images/side-bg-2.png" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="message" id="mark-1">
      <div class="container marketing pd-bottom-ms">
        <hr class="featurette-divider" />

        <div class="row featurette justify-content-center align-items-center">
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">姓名</label>
                <input type="text" class="form-control" id="inputPassword4" placeholder="name" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
              </div>
            </div>

            <div class="form-group">
              <label for="inputAddress">住址</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">留言</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">送出</button>
          </form>
        </div>
      </div>
    </div>
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

      carts: {},
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      this.$http.get(api).then((response) => {
        this.products = response.data.products.filter(
          (product) => product.category == "造景"
        );

        this.isLoading = false;
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
        this.status.loadingItem = "";
        this.isLoading = false;
      });
    },
  },

  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>




