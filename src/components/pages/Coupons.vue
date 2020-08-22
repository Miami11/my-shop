<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        data-toggle="modal"
        @click="openModal(true)"
      >
        建立新優惠卷
      </button>
    </div>
    <div class="table mt-4">
      <table>
        <thead>
          <tr>
            <th>標題</th>
            <th>折扣數%</th>
            <th>折扣碼</th>
            <th>過期時間</th>
            <th>是否啟用</th>
            <th>編輯</th>
            <th>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <td>{{ item.title }}</td>
            <td class="text-right">{{ item.percent }}</td>
            <td class="text-right">{{ item.code }}</td>
            <td class="text-right">{{ item.due_date }}</td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button
                class="btn btn-outline-primary"
                @click="openModal(false, item)"
              >
                編輯
              </button>
            </td>
            <td>
              <button
                class="btn btn-outline-primary"
                @click="openDelModal(item)"
              >
                刪除
              </button>
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
            v-for="page in pagination.total_pages"
            :key="page"
            :class="{ active: pagination.current_page === page }"
          >
            <a class="page-link" href="#" @click.prevent="getCoupons(page)">{{
              page
            }}</a>
          </li>

          <li class="page-item">
            <a
              class="page-link"
              :class="{ disabled: !pagination.has_next }"
              href="#"
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- Modal -->
      <div
        class="modal fade"
        id="productModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>新增產品</span>
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
              <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempCoupon.title"
                      placeholder="請輸入標題"
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="percent">折扣數</label>
                      <input
                        type="number"
                        class="form-control"
                        id="percent"
                        v-model="tempCoupon.percent"
                        placeholder="請輸入折扣數"
                      />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="percent">折扣碼</label>
                      <input
                        type="text"
                        class="form-control"
                        id="percent"
                        v-model="tempCoupon.code"
                        placeholder="折扣碼"
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempCoupon.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="date"
                        v-model="tempCoupon.due_date"
                        id="due_date"
                      />
                      <label class="form-check-label" for="due_date">
                        過期時間
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateCoupon"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="delProductModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
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
              是否刪除
              <strong class="text-danger">{{ tempCoupon.title }}</strong>
              商品(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteCoupon(tempCoupon)"
              >
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: []
    };
  },
  methods: {
    getCoupons(page = 1) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;

      // const vm = this;
      // arrow function
      this.$http.get(api).then(response => {
        console.log(response.data);
        this.coupons = response.data.coupons;
        this.pagination = response.data.pagination;
        console.log("QQQQQ", response.data);
        this.isLoading = false;
      });
    },

    updateCoupon() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      // const vm = this;
      if (!this.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.tempCoupon.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: this.tempCoupon }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          this.getCoupons();
        } else {
          $("#productModal").modal("hide");
          this.getCoupons();
          console.log("新增失敗");
        }
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.isNew = false;
        this.tempCoupon = Object.assign({}, item);
      }
      $("#productModal").modal("show");
    },
    openDelModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    deleteCoupon(item) {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${item.id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          this.getCoupons();
        } else {
          $("#delProductModal").modal("hide");
          this.getCoupons();
          console.log("刪除失敗");
        }
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>
