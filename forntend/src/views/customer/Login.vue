<template>
  <div>
    <div class="container" :style="height">
      <div
        class="
          row
          text-center
          d-flex
          flex-column
          justify-content-center
          align-items-center
          mb-5
          mt-4
          px-10
        "
      >
        <span class="text-h4 has-text-weight-bold  mb-2">Pillar Restaurant</span>
        <span>Welcome to Pillar Restaurant</span>
        <br />
        <v-btn outlined color="primary" @click="loginasGuest()">
          Guest Login
        </v-btn>
        <v-divider></v-divider>
        <v-btn dark color="amber darken-1" @click="showLogin = !showLogin">
          Login as Member
        </v-btn>
      </div>
      <v-form class="mb-5 mt-4 px-10" v-if="showLogin">
        <v-text-field
          v-model="username"
          label="Username"
          :rules="usernamerules"
          type="text"
          prepend-icon="fa fa-user is-small"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          :rules="passwordrules"
          type="password"
          prepend-icon="fa fa-lock is-small"
        ></v-text-field>
        <v-btn
          left
          color="#00E676"
          error-messages="abc"
          block
          dark
          @click="loginasMember()"
          >Login</v-btn
        >
        <v-alert
          class="my-3"
          type="error"
          transition="scale-transition"
          :value="validate"
          >username or password is wrong</v-alert
        >
      </v-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showLogin: false,
      username: "",
      password: "",
      validate: false,
      passwordrules: [(value) => !!value || "password is required"],
      usernamerules: [(value) => !!value || "username is required"],
      tableId: "",
      height: {"margin-top": window.innerHeight / 5 + "px"},
    };
  },
  methods: {
    loginasGuest() {
      axios
        .post(`http://localhost:3000/${this.tableId}/guest`)
        .then((res) => {
          console.log(res);
          this.$router.push({ path: `/${this.tableId}/home/${res.data}` });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loginasMember() {
      this.validate = false;
      const data = {
        username: this.username,
        password: this.password,
      }
      axios.post(`http://localhost:3000/${this.tableId}/member`, data)
        .then(res => {
          console.log(res.data.customer_id)
          this.$router.push({ path: `/${this.tableId}/home/${res.data.customer_id}`});
        })
        .catch((err) => {
          console.log(err)
          this.validate = true
        })
    },
  },
  created() {
    this.tableId = this.$route.params.no;
  },
};
</script>