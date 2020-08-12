<template>
  <div>
    <h2>訂單列表</h2>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">姓名</th>
            <th scope="col">電話</th>
            <th scope="col">住址</th>
            <th scope="col">金額</th>
            <th scope="col">狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in orders" :key="item.id">
            <th scope="row">{{ index+1 }}</th>
            <td>{{item.user.name}}</td>
            <td>{{item.user.tel}}</td>
            <td>{{item.user.address}}</td>
            <td>{{item.total}}</td>
            <td>
              <span class="text-success" v-if="item.user.is_paid">已付</span>
              <span class="text-danger" v-else>未付</span>
            </td>
          </tr>
        </tbody>
      </table>
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
            <a class="page-link" href="#" @click.prevent="getProducts(num)">
              {{
              num
              }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: !pagination.has_next }">
            <a class="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orders: "",
      pagination: [],
    };
  },
  methods: {
    getOrders(page = 1) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/orders?page=${page}`;
      this.$http.get(api).then((response) => {
        this.orders = response.data.orders;
        this.pagination = response.data.pagination;
        console.log("response=orders=", response.data);
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>