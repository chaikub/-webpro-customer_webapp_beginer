<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-4">
          My restaurant
        </router-link>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
  
    <div style="background:#FFF2E1; padding-top:5%; position:absolute; width:100%; min-height:877px">
      <div class="container is-fullwidth">
        <section class="hero box" style="padding:5%; background:#FFDFD3">
          <div class="hero-body">
            <p class="title has-text-centered is-size-2">
              Employee Login
            </p>
          </div>
          <form class="box m-1 p-6">
            <div class="field">
              <label for="" class="label">Username</label>
              <div class="control has-icons-left">
                <input type="text" class="input" v-model="username" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" class="input" v-model="password" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="has-background-danger-light has-text-danger p-3" v-if="error != ''">{{error}}</div>
            <div class="columns">
              <div class="column is-2"></div>
              <div class="column">
                <button class="button is-info mt-5" style="width:100%" @click="loginButton()">Login</button>
              </div>
              <div class="column">
                <button class="button is-primary mt-5" style="width:100%" @click="registerButton()">Register</button>
              </div>
              <div class="column is-2"></div>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
      logId: ""
    }
  },
  methods: {
    loginButton(){
      if(this.username == "" || this.password == ""){
        this.error = "Please insert all field"
      }
      else{
        axios
        .post(`http://localhost:3000/employee/login`, {
          username: this.username,
          password: this.password
        })
        .then((response) => {
          if(response.data.status == "notFound"){
            this.error = "username or password incorrect"
          }
          else{
            this.logId = response.data.id
            this.$router.push({path: `employee/main/${this.logId}`})
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      }
    },
    registerButton(){
      this.$router.push({name:'employee-register'});
    },
  }
}
</script>