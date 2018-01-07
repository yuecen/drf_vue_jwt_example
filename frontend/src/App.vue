<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <router-link class="navbar-brand" to="/" exact></router-link>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li></li>
            <li><router-link class="item" to="page">Page 1</router-link></li>
            <li><router-link class="item" to="page">Page 2</router-link></li>
            <li><router-link class="item" to="page">Page 3</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" v-if="token">
            <li><router-link class="item" to="logout">Log out</router-link></li>
            <li><router-link class="item" to="profile">Profile</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" v-else>
            <li><router-link class="item" to="login">Login</router-link></li>
            <li><router-link class="item" to="signup">Sign up</router-link></li>
          </ul>
        </div>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    token () {
      return this.$store.state.token
    }
  }
}
</script>

<style>
#app {
  margin-top: 10em;
}
.gap-right {
  margin-right: 10px;
}
.navbar-nav li a.item-add {
  color: black;
  font-weight: bold;
}
</style>
