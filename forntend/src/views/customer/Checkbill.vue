<template>
  <div>
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
      <v-toolbar-title
        style="color: white"
        class="text-h5 ma-2 has-text-weight-bold"
      >
        Billing
      </v-toolbar-title>
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
      >
        Table : {{ this.$route.params.no }}
      </v-toolbar-title>
    </v-app-bar>

    <div class="container justify-content-center align-items-center py-1">
      <div class="is-size-5-mobile has-text-weight-bold">Total</div>
      <div class="is-size-2-mobile has-text-weight-light">1000.00 ฿</div>
    </div>
    <div class="container py-1" >
      <div class="is-size-6-mobile has-text-weight-bold">Receipt Number</div>
      <div class="mx-2 my-2" v-for="(receipt,index) in receipts" :key="index">{{receipt.receipt_no}}</div>
    </div>
    <div class="container py-1">
      <div class="is-size-6-mobile has-text-weight-bold">Order List</div>
      <table class="table py-0 my-0">
        <tr v-for="(item, index) in orders" :key="index">
          <td class="py-1" style="border:0;width: 300px;">{{item.menu_name}}</td>
          <td class="text-right py-0" style="border:0;width: 50px;">x{{item.amount}}</td>
          <td class="text-right has-text-weight-bold py-0" style="border:0;width:100px;">
            {{item.total_price}} ฿
          </td>
        </tr>
      </table>
    </div>
    <v-divider></v-divider>
    <div class="container py-0">
      <div class="is-size-6-mobile has-text-weight-bold">Payment Methods</div>
      <v-card class="mx-auto">
        <v-list>
          <v-list-item-group
            v-model="paymethod"
            color="green"
            mandatory
            active-class="border"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-cash</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Cash</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-bank</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Mobile Banking</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-credit-card</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Debit/Credit Card</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <v-btn class="my-5" color="amber darken-3" @click="payment()" dark block>Pay</v-btn>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      paymethod: "",
      user: null,
      receipts: [],
      orders: [],
    };
  },
  mounted(){
    this.getuser(this.$route.params.id);
    this.getreceive(this.$route.params.id);
  },
  methods:{
    getuser(userid) {
      axios
        .get(`http://localhost:3000/customer/${userid}`)
        .then((response) => {
          this.user = response.data.customer;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    getreceive(userid){
      axios
        .get(`http://localhost:3000/receipt/${userid}`)
        .then((response) => {
          this.receipts = response.data.receipt
          this.orders = response.data.orders
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    payment(){
      axios
        .put(`http://localhost:3000/${this.$route.params.no}/payment/${this.$route.params.id}`)
        .then((res) => {
            this.$router.push({ path: `/${this.$route.params.no}/login`});
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    }
  }
};
</script>