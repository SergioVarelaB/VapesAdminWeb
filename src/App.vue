<template>
  <div id="app">
    <header v-if="!this.isRootPath">
      <span class="logout" @click="logout">&times;</span>
      <br><br>
      <br><br>
    </header>
    <!-- This is where the matched route component will be rendered -->
    <router-view></router-view>
  </div>
</template>


<script>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue'; // Import computed from Vue

export default {
  name: 'App',
  setup() {
    // Get the current route using the Vue Router composable
    const route = useRoute();
    const router = useRouter();
    // Check if the current path is the root path ('/')
    const isRootPath = computed(() => route.path === '/');
    // Define the logout method
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/'); 
    };
    return {
      isRootPath,
      logout
    };
  },
  created() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    // Si el token existe, redirigir al dashboard correspondiente
    if (token) {
      if (user.isAdmin) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/dashboard');
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

.logout {
    color: #aaa;
    float: right;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    margin-right: 5rem;
}

.logout:hover,
.logout:focus {
    color: rgb(231, 53, 53);
    text-decoration: none;
    cursor: pointer;
}


/* Opcional: Ajusta las celdas en pantallas pequeñas */
@media screen and (max-width: 768px) {
  .logout {
    margin-right: .5rem;
}
}

</style>
