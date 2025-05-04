<template>
    <div id="app">
      <nav v-if="isLoggedIn">
        <div class="nav-container">
          <span class="brand">Auth App</span>
          <button @click="logout" class="btn-logout">Logout</button>
        </div>
      </nav>
      <div class="app-container">
        <router-view/>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'App',
    setup() {
      const store = useStore();
      const router = useRouter();
  
      const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
  
      const logout = () => {
        store.dispatch('auth/logout');
        router.push({ name: 'Login' });
      };
  
      return {
        isLoggedIn,
        logout
      };
    }
  });
  </script>
  
  <style>
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .app-container {
    flex: 1;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  
  nav {
    background-color: #4a6bff;
    color: white;
    padding: 15px 0;
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  
  .brand {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .btn-logout {
    background-color: transparent;
    border: 1px solid white;
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .btn-logout:hover {
    background-color: white;
    color: #4a6bff;
  }
  </style>
  