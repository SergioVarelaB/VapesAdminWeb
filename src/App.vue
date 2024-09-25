<template>
  <div id="app">
    <!-- This is where the matched route component will be rendered -->
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  created() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // Si el token existe, redirigir al dashboard correspondiente
    if (token) {
      if (user.isAdmin) {
        this.$router.push('/dashboard-admin');
      } else {
        this.$router.push('/dashboard-user');
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
