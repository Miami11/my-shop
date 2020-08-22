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
              @click.prevent="addToCart(item.id)"
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

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">品名</th>
          <th scope="col">說明</th>
          <th scope="col">數量</th>
          <th scope="col">價格</th>
          <th scope="col">單位</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in carts.carts" :key="item.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
            </div>
          </td>
          <td>{{ item.product.description }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.product.price }}</td>
          <td>{{ item.product.unit }}</td>
          <td>
            <button
              class="btn btn-outline-secondary btn-sm"
              @click="deleteItem(item.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="6" class="text-right">總計</td>
          <td class="text-left">{{ carts.total }}</td>
        </tr>
        <!-- 優惠後 -->
        <tr v-if="carts.total != carts.final_total">
          <td colspan="6" class="text-right text-success">折扣價</td>
          <td class="text-left">{{ carts.final_total }}</td>
        </tr>
        <tr>
          <td colspan="6" class="text-right">
            Code:<input type="text" v-model="code" />
          </td>
          <td class="text-left">
            <button @click.prevent="useCoupon">
              <i class="fas fa-ticket-alt"></i>套用優惠卷
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-validate="'required|email'"
            :class="{ 'is-invalid': errors.has('email') }"
            v-model="form.user.email"
            placeholder="請輸入 Email"
          />
          <span class="text-danger" v-if="errors.has('email')">
            {{ errors.first("email") }}
          </span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            v-validate="'required'"
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            :class="{ 'is-invalid': errors.has('name') }"
          />
          <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            v-validate="'required'"
            type="tel"
            class="form-control"
            id="usertel"
            name="tel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
            :class="{ 'is-invalid': errors.has('tel') }"
          />
          <span class="text-danger" v-if="errors.has('tel')"
            >請輸入收件人電話</span
          >
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            v-validate="'required'"
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
          />
          <span class="text-danger" v-if="errors.has('address')"
            >地址欄位不得留空</span
          >
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name=""
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
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
        loadingItem: false
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
          address: ""
        },
        message: ""
      }
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
            qty
          }
        })
        .then(response => {
          console.log("response cart==", response.data);

          // this.product.num = 1;
          this.status.loadingItem = "";
          this.getCart();
        });
      $("#productModal").modal("hide");
    },
    getCart() {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      this.$http.get(api).then(response => {
        this.carts = response.data.data;
        console.log("response cart==", this.carts);
        this.status.loadingItem = "";
        this.isLoading = false;
      });
    },
    deleteItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(response => {
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
            code
          }
        })
        .then(response => {
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
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(url, { data: order }).then(response => {
            console.log("訂單已建立", response);
            // vm.getCart();
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
        }
      });
    }
  },

  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
