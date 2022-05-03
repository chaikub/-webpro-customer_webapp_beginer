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

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            <span class="pl-3">{{fullname}}</span>
                        </a>
                        <div class="navbar-dropdown">
                            <router-link :to="'/employee/profile/' + this.account_id"  class="navbar-item">Profile</router-link>
                            <router-link to="/employee" class="navbar-item">Log out</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div style="background:#FFF2E1; padding-top:3%; position:absolute; width:100%; min-height:877px">
            <div class="container is-fullwidth has-background-white p-6">
                <div class="is-size-3" style="text-decoration: underline;">Profile</div>

                <div class="columns pt-6">
                    <div class="column">
                        <div class="label is-3">
                            First name:
                            <div v-if="editable === false" class="has-text-weight-normal is-capitalized">{{fname}}</div>
                            <input v-else class="input" type="text" v-model="editfname"/>
                        </div>
                    </div>
                    <div class="column is-2"></div>
                    <div class="column">
                        <div class="label is-3">
                            Last name:
                            <div v-if="editable === false" class="has-text-weight-normal is-capitalized">{{lname}}</div>
                            <input v-else class="input" type="text" v-model="editlname"/>
                        </div>
                    </div>
                    <div class="column is-4"></div>
                </div>

                <div class="columns pt-5">
                    <div class="column is-8">
                        <div class="label">Address:</div>
                        <div v-if="editable === false" class="has-text-weight-normal">{{address}}</div>
                        <textarea v-else class="textarea" v-model="editaddress"></textarea>
                    </div>
                </div>

                <div class="columns pt-5">
                    <div class="column">
                        <div class="label is-4">
                            Phone:
                            <div v-if="editable === false" class="has-text-weight-normal">{{phone}}</div>
                            <input v-else class="input" type="text" v-model="editphone"/>
                        </div>
                    </div>
                    <div class="column is-2"></div>
                    <div class="column">
                        <div class="label is-4">
                            Salary:
                            <div v-if="editable === false" class="has-text-weight-normal">{{salary}}</div>
                            <input v-else class="input" type="number" v-model="editsalary"/>
                        </div>
                    </div>
                    <div class="column is-4"></div>
                </div>

                <div class="columns pt-5">
                    <div class="column">
                        <div class="label">Role:</div>
                        <div v-if="editable === false" class="has-text-weight-normal">{{role}}</div>
                        <div class="select" v-else>
                            <select v-model="editrole">
                            <option value="chef"> chef </option>
                            <option value="waitress"> waitress </option>
                            <option value="cleaner"> cleaner </option>
                            <option value="service_staff"> service_staff </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="columns pt-5">
                    <div class="column is-9"></div>
                    <div class="column">
                        <div class="level" v-if="editable == false">
                            <div class="level-item" >
                                <button class="button is-warning" @click="editButton()">
                                    <span>Edit</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="level-item">
                                <button class="button is-success" @click="changeButton()">
                                    <span>Change Password</span>
                                </button>
                            </div>
                        </div>

                        <div class="level" v-if="editable == true">
                            <div class="level-item" >
                                <button class="button is-success" @click="saveButton()">
                                    <span>Save</span>
                                    <span class="icon is-small">
                                        <i class="fas fa-edit"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="level-item">
                                <button class="button is-danger" @click="cancelButton()">
                                    <span>Cancel</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-close"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" v-bind:class="{'is-active': showModal}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Change password</p>
                    <button class="delete" aria-label="close" @click="showModal = false"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="" class="label">Enter new password</label>
                        <div class="control has-icons-left">
                            <input type="password" class="input" placeholder="6 characters minimum" v-model="password" required>
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div class="field">
                        <label for="" class="label">Confirm password</label>
                        <div class="control has-icons-left">
                            <input type="password" class="input" placeholder="6 characters minimum" v-model="confirmPassword" required>
                            <span class="icon is-small is-left">
                                <i class="fa fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div class="has-background-danger-light has-text-danger p-3" v-if="error != ''">{{error}}</div>
                    <div class="has-background-success-light has-text-success p-3" v-if="status != ''">{{status}}</div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="changePassword()">Save changes</button>
                    <button class="button" @click="showModal = false">Cancel</button>
                </footer>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      account_id: this.$route.params.account_id,
      editable: false,
      employee_id: "",
      fname: "",
      lname: "",
      address: "",
      phone: "",
      salary: "",
      role: "",
      editfname: "",
      editlname: "",
      editaddress: "",
      editphone: "",
      editsalary: "",
      editrole: "",
      showModal: false,
      status: "",
      password: "",
      confirmPassword: "",
      error: "",
    }
  },
  mounted() {
    this.getProfile(this.$route.params.account_id);
  },
  computed: {
      fullname(){
          return this.fname + ' ' + this.lname
      }
  },
  methods: {
      getProfile(account_id){
        axios
        .get(`http://localhost:3000/employee/profile/${account_id}`)
        .then((response) => {
          console.log(response.data)
          this.fname = response.data.fname
          this.lname = response.data.lname
          this.address = response.data.address
          this.phone = response.data.phone
          this.salary = response.data.salary
          this.role = response.data.role
          this.employee_id = response.data.employee_id
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      },
      editButton(){
        this.editable = true

        this.editfname = this.fname
        this.editlname = this.lname
        this.editaddress = this.address
        this.editphone = this.phone
        this.editsalary = this.salary
        this.editrole = this.role
      },
      saveButton(){
        this.editable = false

        this.fname = this.editfname
        this.lname = this.editlname
        this.address = this.editaddress
        this.phone = this.editphone
        this.salary = this.editsalary
        this.role = this.editrole

        axios
        .post('http://localhost:3000/employee/' + this.employee_id + '/profile', {
            fname: this.fname,
            lname: this.lname,
            address: this.address,
            phone: this.phone,
            salary: this.salary,
            role: this.role
        })
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
      },
      cancelButton(){
        this.editable = false
        this.error = ""
        this.status = ""
      },
      changeButton(){
        this.showModal = true
      },
      changePassword(){
        if(this.password == "" || this.confirmPassword == ""){
            this.error = "Please insert all field"
            this.status = ""
        }
        else if(this.password != this.confirmPassword){
            this.error = "Password do not match"
            this.status = ""
        }
        else if(this.password.length < 6){
            this.error = "Password must have a minimum 6 characters."
            this.status = ""
        }
        else{
            axios
            .put('http://localhost:3000/employee/' + this.account_id, {password: this.password})
            .then((response) => {
                if(response.data.status == "success"){
                    this.status = "success"
                    this.error = ""
                    this.password = ""
                    this.confirmPassword = ""
                }
            })
            .catch((error) => {
                this.error = error.response.data.message;
            });
        }
      }
  }
}
</script>