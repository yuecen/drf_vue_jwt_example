<template>
  <div class="profile">
    <div class="container">
      <h1>Your Profile</h1>
    </div>
  </div>

</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      usersdata: ''
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$http.get('http://127.0.0.1:8000/users/' + this.$store.state.user.user_id + '/')
      .then(response => {
        console.log('response => ', response)
        if (response.data) {
          this.usersdata = response.data
        }
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
