<template>
  <div>
    <div style="background:#FFF2E1;">
      <div class="container is-fullwidth">
        <section class="hero box" >
          <div class="hero-body">
            <p class="title has-text-centered">
              Welcome to My restaurant
            </p>
          </div>
          <div class="columns">
            <div class="column"></div>
            <div class="column">
              <button class="button is-large is-success is-fullwidth" @click="employeeButton()">Employee</button>
            </div>
            <div class="column"></div>
            <div class="column">
              <button class="button is-large is-info is-fullwidth" @click="customerButton()">Customer</button>
            </div>
            <div class="column"></div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  methods: {
    employeeButton(){
      this.$router.push({name: `employee-login`});
    },
    customerButton(){
      this.$router.push({name: `customer-login`})
    }
  }
}
</script>

