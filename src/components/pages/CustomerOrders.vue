<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h5" v-if="!item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                v-if="status.loadingItem === item.id"
                class="fas fa-spinner fa-spin"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click.prevent="addToCart(product.id, num)"
            >
              <i
                v-if="status.loadingItem === item.id"
                class="fas fa-spinner fa-spin"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="" />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.origin_price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click="addToCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="num in pagination.total_pages"
          :class="{ active: num === pagination.current_page }"
          :key="num"
        >
          <a class="page-link" href="#" @click.prevent="getProducts(num)">{{
            num
          }}</a>
        </li>

        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      isLoading: false,
      status: {
        loadingItem: false
      },
      products: [],
      product: {},
      pagination: [],
      carts: []
    };
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;

      this.$http.get(api).then(response => {
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
      this.$http.get(api).then(response => {
        this.product = response.data.product;
        console.log("response single==", response.data);
        this.status.loadingItem = "";
      });
    },
    addToCart(id, qty = 1) {
      this.status.loadingItem = id;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      this.$http
        .post(api, {
          data: {
            product_id: id,
            qty
          }
        })
        .then(response => {
          console.log("response cart==", response.data);
          this.status.loadingItem = "";
          this.getCart();
        });
      $("#productModal").modal("hide");
    },
    getCart() {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      this.$http.get(api).then(response => {
        this.carts = response.data.carts;
        console.log("response cart==", response.data);
        this.status.loadingItem = "";
        this.isLoading = false;
      });
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
