<template>
  <div>
    <div class="cart-bg parallax" v-if="cartList.total > 0">
      <h5 class="cart-title">選購商品列表</h5>
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
          <tr v-for="(item, index) in cartList.carts" :key="item.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td>{{ item.product.description }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.product.price }}</td>
            <td>{{ item.product.unit }}</td>
            <td>
              <button class="btn btn-outline-secondary btn-sm" @click="deleteItem(item.id)">
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
              Code:
              <input type="text" v-model="code" />
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
              {{
              errors.first("email")
              }}
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
            <span class="text-danger" v-if="errors.has('tel')">請輸入收件人電話</span>
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
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
          </div>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name
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
    <div v-else class="cart-bg parallax">
      <p class="featurette-divider">購物車尚未有商品</p>
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
    deleteItem(id) {
      this.$store.dispatch("REMOVE_CARTS", id);
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
      vm.isLoading = true;
      this.$validator.validate().then((result) => {
        if (result) {
          this.$http.post(url, { data: order }).then((response) => {
            console.log("訂單已建立", response.data.orderId);

            if (response.data.success) {
              vm.$router.push(`/fermi/checkout/${response.data.orderId}`);
            }
            vm.isLoading = false;
          });
        } else {
          console.log("欄位不完整");
        }
      });
    },
  },
  computed: {
    cartList() {
      return this.$store.getters["getCartList"];
    },
  },
};
</script>
