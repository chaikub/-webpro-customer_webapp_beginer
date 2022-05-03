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

    <div style="background:#FFF2E1; padding-top:3%; position:absolute; width:100%; min-height:877px">
      <div class="container is-fullwidth">
        <section class="hero box" style="padding:2%; background:#FFDFD3">
          <div class="hero-body">
            <p class="title has-text-centered is-size-2">
              Employee Register
            </p>
          </div>
          <form action="" class="box m-1 p-6">
            <div class="field">
              <label for="" class="label">FirstName</label>
              <div class="control has-icons-left">
                <input type="text" class="input" v-model="fname" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">LastName</label>
              <div class="control has-icons-left">
                <input type="text" class="input" v-model="lname" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
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
                <input type="password" class="input" placeholder="6 characters minimum" v-model="password" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Cofirm Password</label>
              <div class="control has-icons-left">
                <input type="password" class="input" placeholder="6 characters minimum" v-model="confirmpass" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="has-background-danger-light has-text-danger p-3" v-if="error != ''">{{error}}</div>
            <div class="has-background-success-light has-text-success p-3" v-if="status != ''">{{status}}</div>
            <div class="columns">
              <div class="column is-2"></div>
              <div class="column">
                <button class="button is-primary mt-5" style="width:100%" @click="signUpButton()">Sign up</button>
              </div>
              <div class="column">
                <button class="button is-info mt-5" style="width:100%" @click="goButton()">Go to Login</button>
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
      fname: "",
      lname: "",
      username: "",
      password: "",
      confirmpass: "",
      error: "",
      status: ""
    }
  },
  methods: {
    signUpButton(){
      if(this.fname == "" || this.lname == "" || this.username == "" || this.password == "" || this.confirmpass == ""){
        this.error = "Please insert all field"
        this.status = ""
      }
      else if(this.password.length < 6){
        this.error = "Password must have a minimum 6 characters"
        this.status = ""
      }
      else if(this.password != this.confirmpass){
        this.error = "Password do not match"
        this.status = ""
      }
      else{
        axios
        .post(`http://localhost:3000/employee/register`, {
          firstName: this.fname,
          lastName: this.lname,
          username: this.username,
          password: this.password
        })
        .then((response) => {
          if(response.data.status == "success"){
            this.status = "Success"
            this.error = ""
            this.fname = ""
            this.lname = ""
            this.username = ""
            this.password = ""
            this.confirmpass = ""
          }
          else{
            this.error = "This username is in use"
            this.status = ""
          }
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      }
      
    },
    goButton(){
      this.$router.push({name: 'employee-login'})
    }
  }
}
</script>