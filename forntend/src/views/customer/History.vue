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
    </v-app-bar>
    <v-simple-table fixed-header bordered>
      <thead>
        <tr>
          <th
            style="vertical-align: middle; color: black"
            colspan="1"
            class="text-h5"
          >
            <span class="text-right">History</span>
          </th>
          <th
            colspan="2"
            class="text-h6 text-right"
            style="vertical-align: middle; color: black"
          >
            <span>Status: {{ status }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orderedCart" :key="index">
          <td
            style="
              vertical-align: middle;
              border-bottom: 1px solid #e0e0e0;
              width: 100px;
            "
          >
            <span class="text-body-1">{{ item.menu_name }}</span>
          </td>
          <td
            style="
              vertical-align: middle;
              border-bottom: 1px solid #e0e0e0;
              width: 100px;
            "
            class="text-right"
          >
            <span class="text-body-1">x {{ item.amount }}</span>
          </td>
          <td
            style="
              vertical-align: middle;
              border-bottom: 1px solid #e0e0e0;
              width: 100px;
            "
            class="text-right"
          >
            <span class="text-body-1">{{ item.total_price }} ฿</span>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <footer class="footer" style="background-color: white">
      <div class="content has-text-centered">
        <v-btn @click="checkBill()" color="success">
          Checkbill
          <v-icon class="fa fa-check" small></v-icon>
        </v-btn>
      </div>
    </footer>
    <v-bottom-navigation background-color="#00B0FF" dark shift fixed>
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
      orderedCart: [],
      status: "",
      receipts: [],
    };
  },
  mounted() {
    this.getuser(this.$route.params.id);
    this.getorderd(this.$route.params.id);
    this.getreceive(this.$route.params.id);
  },
  methods: {
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
    getorderd(userid) {
      axios
        .get(`http://localhost:3000/history/${userid}`)
        .then((response) => {
          this.orderedCart = response.data.orders;
          this.status = this.orderedCart[0].status;
        })
        .catch((error) => {
          this.error = error.response.data.message;
          console.log(error);
        });
    },
    getreceive(userid){
      axios
        .get(`http://localhost:3000/receipt/${userid}`)
        .then((response) => {
          this.receipts = response.data.receipt
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },
    checkBill() {
      if (this.status == "served") {
        if (this.receipts.length == 0) {
          axios
            .post(`http://localhost:3000/checkbill/${this.$route.params.id}`)
            .then((response) => {
              this.$router.push({ path: `/${this.$route.params.no}/checkbill/${this.$route.params.id}`});
            })
            .catch((error) => {
              this.error = error.response.data.message;
              console.log(error);
            });
        }else{
          this.$router.push({ path: `/${this.$route.params.no}/checkbill/${this.$route.params.id}`});
        }
      } else {
        alert("Please wait for status to served");
      }
    },
  },
};
</script>