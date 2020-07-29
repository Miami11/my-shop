<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary">建立新產品</button>
    </div>
    <div class="table mt-4">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enable" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary">編輯</button>
          </td>
        </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      console.log("====api" + api);
      const vm = this;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products;
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
