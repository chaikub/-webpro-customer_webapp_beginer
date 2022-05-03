<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item is-size-4">
          My restaurant emem {{$route.params.account_id}}
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

      <div id="navbarBasicExample" class="navbar-menu">

        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <span class="pl-3">username</span>
            </a>
            <div class="navbar-dropdown">
              <router-link :to="'/employee/profile/' + this.account_id"  class="navbar-item">Profile</router-link>
              <router-link to="/" class="navbar-item">Log out</router-link>
            </div>
          </div>
        </div>
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
          <form action="" class="box m-1 p-6">
            <div class="field">
              <label for="" class="label">Username</label>
              <div class="control has-icons-left">
                <input type="text" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Password</label>
              <div class="control has-icons-left">
                <input type="password" class="input" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
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
      account_id: this.$route.params.account_id
    }
  },
}
</script>