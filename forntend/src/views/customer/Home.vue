<template>
  <div style="height: auto">
    <v-app-bar
      app
      background-color="blue-grey"
      style="background-color: #00b0ff"
      elevation="0"
    >
      <v-btn class="text-none" icon large>
        <router-link
          :to="`/${this.$route.params.no}/home/${this.$route.params.id}`"
        >
          <v-icon style="color: white">mdi-home</v-icon>
        </router-link>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title
        style="color: white"
        class="text-body-2 ma-2"
        v-if="user"
      >
        {{ user.fname }} {{ user.lname }}
      </v-toolbar-title>
      <v-toolbar-title
        class="text-body-2"
        style="color: white"
        v-if="this.$route.params.no"
      >
        Table : {{ this.$route.params.no }}
      </v-toolbar-title>
      <v-btn class="text-none" icon @click="drawer = !drawer">
        <v-badge
          :content="cart.length"
          color="red"
          left
          overlap
          bordered
          v-if="cart.length != 0"
        >
          <v-icon v-show="true" style="color: white">mdi-cart</v-icon>
        </v-badge>
        <v-icon v-if="cart.length == 0" style="color: white">mdi-cart</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-toolbar class="text-h6" dark color="primary">
          Confirm to Order
        </v-toolbar>
        <v-card-actions>
          <v-btn
            color="success"
            @click="orderCreate()"
            dark
          >
            confrim
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="dialog = false"
            dark
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    <v-navigation-drawer right v-model="drawer" app>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                colspan="2"
                class="text-left text-h6 py-2"
                style="color: white; background-color: #00b0ff"
              >
                Cart
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="index">
              <td style="vertical-align: middle;font-size:15px;max-width:150px;border-bottom: 1px solid #e0e0e0" class="py-2 px-3">
                <span class="has-text-weight-bold">{{ item.menu_name }}</span>
                <br />
                <span v-if="item.member_price" style="color: black">{{item.member_price*item.quantity}} ฿</span>
                <span v-if="item.menu_price" style="color: black">{{item.menu_price*item.quantity}} ฿</span>
              </td>
              <td class="text-right" style="vertical-align: middle;border-bottom: 1px solid #e0e0e0">
                <v-btn
                  fab
                  dark
                  x-small
                  color="grey"
                  elevation="0"
                  width="25"
                  height="25"
                  @click="minusItem(index)"
                >
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
                <span style="display: inline;" class="px-2">{{item.quantity}}</span>
                <v-btn
                  fab
                  dark
                  x-small
                  width="25"
                  height="25"
                  color="grey"
                  elevation="0"
                  @click="item.quantity++, user ? priceTotal += item.member_price : priceTotal += item.menu_price"
                >
                  <v-icon dark>mdi-plus</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-main block></v-main>
      <template v-slot:append>
        <div class="text-h6 font-weight-light pl-2"><span class="font-weight-bold">Total:</span>
        {{priceTotal}} ฿
        </div>

        <div class="pa-1">
          <v-btn color="red" dark block @click="cart = [], priceTotal = 0"> Clear </v-btn>
        </div>
        <div class="pa-1">
          <v-btn color="#00E676" dark block @click="dialog = true">Order</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <div>
      <v-text-field v-model="search" label="Search" class="mt-8 mx-5" fixed>
      </v-text-field>
    </div>
    <v-simple-table fixed-header :height="height">
      <thead>
        <tr>
          <th colspan="3" class="text-h5" style="color: black">
            <span class="text-right">Menu</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(menu, index) in menu" :key="index">
          <td style="vertical-align: middle; border-bottom: 1px solid #e0e0e0">
            <span class="text-body-1">{{ menu.menu_name }}</span>
          </td>
          <td
            class="py-2"
            style="vertical-align: middle; border-bottom: 1px solid #e0e0e0"
          >
            <span v-if="!user" class="text-body-2">{{ menu.menu_price }}฿</span>
            <span v-if="user" class="text-body-2" style="color: #757575"
              ><s>{{ menu.menu_price }}฿</s></span
            ><br v-if="user" />
            <span v-if="user" class="text-body-2" style="color: #000000"
              >{{ menu.member_price }}฿</span
            >
          </td>
          <td style="vertical-align: middle; border-bottom: 1px solid #e0e0e0">
            <v-btn
              fab
              dark
              x-small
              color="orange"
              elevation="0"
              @click="addtoCart(menu.menu_id, index)"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <v-row justify="center">
    <v-dialog
      v-model="successdialog"
      max-width="280"
    >
      <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon class="fa fa-check-circle" color="success" dark large></v-icon>
        <span class="px-5">Order Created</span>
        <v-spacer></v-spacer>
      </v-card-title>
      </v-card>
    </v-dialog>
    </v-row>

    <v-bottom-navigation
      background-color="#00B0FF"
      dark
      shift
      fixed
    >
      <v-btn :to="`/${this.$route.params.no}/home/${this.$route.params.id}`">
        <span>Menu</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-btn :to="`/${this.$route.params.no}/history/${this.$route.params.id}`">
        <span>History</span>
        <v-icon small class="fa fa-history"> </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
      menu: null,
      orderId: null,
      cart: [],
      drawer: false,
      count: 0,
      items: 0,
      search: "",
      height: "",
      priceTotal: 0,
      dialog: false,
      successdialog: false,
      error: '',
    };
  },
  mounted() {
    this.getuser(this.$route.params.id);
    this.getmenu();
    this.height = window.innerHeight - 200;
  },
  computed:{
  },
  methods: {
    employeeButton() {
      this.$router.push("employee");
    },
    customerButton() {
      this.$router.push("customer");
    },
    getuser(userid) {
      axios
        .get(`http://localhost:3000/customer/${userid}`)
        .then((response) => {
          this.user = response.data.customer;
          this.orderId = response.data.order.order_id;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getmenu() {
      axios
        .get(`http://localhost:3000/menu`, )
        .then((response) => {
          this.menu = response.data.menu;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    orderCreate(){
      let itemTotal = 0
      for(let i = 0; i < this.cart.length;i++){
        itemTotal += this.cart[i].quantity
      }
      const data = {
        priceTotal: this.priceTotal,
        itemsTotal: itemTotal,
        items: this.cart
        }
      if(itemTotal != 0){
        axios
        .put(`http://localhost:3000/order/${this.orderId}`, data)
        .then((response) => {
          this.dialog = false
          this.successdialog = true;
          this.priceTotal = 0
          this.cart = []
        })
        .catch((error) => {
          this.error = error.response.data.message;
          console.log(this.error)
        });
      }else{
        this.dialog = false
        alert("Pleast input item to cart first")
      }
    },
    addtoCart(id, index) {
      let selectedMenu = this.menu.filter((e) => e.menu_id === id)[0];
      let smenu = Object.assign({},selectedMenu);
      smenu.quantity = 1;
      if (this.user) {
        delete smenu.menu_price;
      } else {
        delete smenu.member_price;
      }
      let hassome = this.cart.filter((e) => e.menu_id === smenu.menu_id)[0];
      if (this.cart.length == 0 || hassome == undefined) {
        this.cart.push(smenu);
        if(this.user){
          this.priceTotal += smenu.member_price
        }else{
          this.priceTotal += smenu.menu_price
        }
      } else {
        let selectedMenu = this.cart.filter((e) => e.menu_id === id)[0];
        selectedMenu.quantity += 1;
        if(this.user){
          this.priceTotal += smenu.member_price
        }else{
          this.priceTotal += smenu.menu_price
        }
      }
    },minusItem(index){
      let member = this.cart[index].member_price
      let guest =  this.cart[index].menu_price
      if(this.cart[index].quantity == 1){
        this.cart.splice(index, 1)
        if(member){
          this.priceTotal -= member
        }else{
          this.priceTotal -= guest
        }
      }else if(this.user){
        this.priceTotal -= member
        this.cart[index].quantity--
      }else if(!this.user){
        this.priceTotal -= guest
        this.cart[index].quantity--
      }
    },
    },
};
</script>