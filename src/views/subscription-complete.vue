<template>
  <div class="subscription-page">
    <div class="subscription-header">Congratulation, you successfully subscribed our service</div>
    <div class="subscription-header">Please check your details</div>

    <div class="subciption-content">
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="first-name">Username</label>
              <md-input v-model="username" :disabled="true"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="first-name">Amount Paid</label>
              <md-input v-model="amountPaid" :disabled="true"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="first-name">Type Of Subscription</label>
              <md-input  v-model="subscriptionType" :disabled="true"/>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label for="first-name">Invoice Date</label>
              <md-input  v-model="invoiceDate" :disabled="true"/>
            </md-field>
          </div>
        </div>
      </md-card-content>
    </div>
  </div>
</template>
<script>

  export default {
    data: () => ({
      username: sessionStorage.getItem('username'),
      amountPaid: sessionStorage.getItem('amountPaid'),
      subscriptionType: sessionStorage.getItem('subscriptionType'),
      invoiceDate: sessionStorage.getItem('invoiceDate')

    }),
  }
</script>
<style lang="css" scoped>

.subscription-page {
  margin: 20px;
}

.subscription-header {
  margin: 50px 0px 0px 50px;
  font-size: 20px;
  font-weight: bold;
  color: green;
  line-height: 1.2;
}

.subciption-content {
  margin: 20px 50px;
  font-size: 20px;
  color: gray;
  font-weight: bold;
}

</style>
