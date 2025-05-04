<template>
    <div class="welcome-container">
      <h1 class="welcome-title">Welcome to the application</h1>
      <p class="welcome-message" v-if="user">
        Hello, {{ user.name }}! You've successfully logged in.
      </p>
    </div>
  </template>
  
  <script>
   /* eslint-disable */
  import { computed, defineComponent } from 'vue';
  import { useStore } from 'vuex';
  
  export default defineComponent({
    name: 'HomeView',
    setup() {
      const store = useStore();
      const user = computed(() => store.getters['auth/user']);
  
      return {
        user
      };
    }
  });
  </script>