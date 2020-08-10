<template>
  <div class="app">
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Create Subscription</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('userName')">
                <label for="first-name">Username</label>
                <md-input name="username" id="username" v-model="form.userName" />
                <span class="md-error" v-if="!$v.form.userName.required">Username is required</span>
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('invoiceAmount')">
                <label for="first-name">Invoice Amount</label>
                <md-input type="number" name="invoice-amount" id="invoice-amount" v-model="form.invoiceAmount" />
                <span class="md-error" v-if="!$v.form.invoiceAmount.required">Amount per invoice required</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('subscriptionType')">
                <label for="subscriptionType">Subscription Type</label>
                <md-select name="subscriptionType" id="subscriptionType" v-model="form.subscriptionType" >
                  <md-option value="daily">Daily</md-option>
                  <md-option value="weekly">Weekly</md-option>
                  <md-option value="monthly">Monthly</md-option>
                </md-select>
                <span class="md-error">Subscription Type is required</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div v-if="form.subscriptionType === 'weekly'" class="md-layout-item md-small-size-100">
              <md-field>
                <label for="dayOfWeek">Day of Week</label>
                <md-select name="dayOfWeek" id="dayOfWeek" v-model="form.dayOfWeek">
                  <md-option value="1">Monday</md-option>
                  <md-option value="2">Tuesday</md-option>
                  <md-option value="3">Wednesday</md-option>
                  <md-option value="4">Thursday</md-option>
                  <md-option value="5">Friday</md-option>
                  <md-option value="6">Saturday</md-option>
                  <md-option value="7">Sunday</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div v-if="form.subscriptionType === 'monthly'" >Day of Month</div>
          <div v-if="form.subscriptionType === 'monthly'" class="md-layout md-gutter">
            <div   class="md-layout-item md-small-size-100">
              <md-datepicker type="date" name="dayOfMonth" id="dayOfMonth" v-model="form.dayOfMonth" />
            </div>
          </div>      


         <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <div>Start Date</div>
              <md-datepicker type="date" name="startDate" id="startDate" v-model="form.startDate" />
            </div>

            <div class="md-layout-item md-small-size-100">
              <div>End Date</div>
              <md-datepicker type="date" name="endDate" id="endDate" v-model="form.endDate" />
            </div>
          </div>      

        </md-card-content>
        
        <md-card-actions>
          <md-button @click="clearForm" class="md-primary" >Clear</md-button>
          <md-button type="submit" class="md-primary">Create</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <md-dialog :md-active.sync="showErrorDialog">
      <div class="error-dialog">
        Currently our server is busy, your subscription request not able to process. Please try again later.
      </div>
      <md-card-actions>
        <md-button class="md-primary md-raised" @click="showErrorDialog = false">OK</md-button>
      </md-card-actions>
    </md-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import { validationMixin } from 'vuelidate'
  import {
    required,
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
 
    data: () => ({
      form: {
        userName: '',
        invoiceAmount: '',
        subscriptionType: '',
        dayOfWeek: (new Date()).getDay(),
        dayOfMonth: new Date(),
        startDate: new Date(),
        endDate: new Date(),
      },
      showErrorDialog: false
    }),
    validations: {
      form: {
        userName: {
          required,
        },
        invoiceAmount: {
          required,
        },
        subscriptionType: {
          required
        },
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.userName = ''
        this.form.invoiceAmount = ''
        this.form.subscriptionType = ''
      },
      saveUser () {
        console.log
        console.log(this.form)
        axios.post('http://localhost:5000/',this.form )
        .then(response => {
          console.log(response)
          sessionStorage.setItem('username', response.data.userName)
          sessionStorage.setItem('amountPaid', response.data.invoiceAmount)
          sessionStorage.setItem('subscriptionType', response.data.subscriptionType)
          sessionStorage.setItem('invoiceDate', response.data.invoiceDate)

          this.$router.push('/subscriptionComplete')
        })
        .catch(function (error) {
          console.log(error);
          this.showErrorDialog = true
        });
      
        // alert(JSON.stringify(this.form))
        // Instead of this timeout, here you can call your API
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .app {
    margin: 30px;
  }

  .error-dialog {
    margin: 20px;
  }
</style>