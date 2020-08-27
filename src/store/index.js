import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    status: {
      loadingItem: false
    },
    carts: {},
    isLoading: false
  },
  getters: {
    coutCarts: state => {
      console.log(state.carts.length);
      return state.carts.length;
    },
    getCartList: state => {
      console.log("==form get");
      console.log(state.carts);
      return state.carts;
    }
  },
  mutations: {
    SET_CARTS(state, data) {
      state.carts = data;
      console.log("set carts");
      console.log(state.carts);
    },
    ADD_ITEM(state, data) {
      console.log("state carts:");
      console.log(state.carts);
      console.log("my push data:");
      console.log(data);
      state.carts.carts.push(data);
      console.log("add item");
      console.log(state.carts);
    },
    SET_STATUS(state, data) {
      state.status.loadingItem = data.product_id;
      console.log("set status");
      console.log(state.status);
    },
    REMOVE_ITEM(state, id) {
      state.carts.carts.forEach(function(item, index, arr) {
        if (item.id == id) {
          arr.splice(index, 1);
        }
      });
    }
  },
  actions: {
    INIT_CARTS({ commit }) {
      this.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios({
        method: "get",
        url: api
      }).then(response => {
        console.log("store");
        console.log(response.data.data);
        commit("SET_CARTS", response.data.data);
      });
    },
    ADD_CARTS({ commit }, data) {
      console.log("data:");
      console.log(data.data.product_id);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;

      axios
        .post(api, data)
        .then(function(response) {
          // console.log(response);
          console.log("add");
          commit("ADD_ITEM", response.data.data);
          commit("SET_STATUS", data.data.product_id);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    REMOVE_CARTS({ commit }, id) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;

      axios
        .delete(api)
        .then(function(response) {
          commit("REMOVE_ITEM", id);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  modules: {}
});
