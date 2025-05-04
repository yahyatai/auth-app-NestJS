<template>
    <div class="form-container">
      <h1 class="form-title">Sign In</h1>
      
      <div v-if="error" class="alert alert-error">
        {{ error }}
      </div>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            required
            placeholder="Enter your email"
          />
          <div v-if="validationErrors.email" class="form-error">
            {{ validationErrors.email }}
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            required
            placeholder="Enter your password"
          />
          <div v-if="validationErrors.password" class="form-error">
            {{ validationErrors.password }}
          </div>
        </div>
        
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
        
        <div class="form-footer">
          Don't have an account? <router-link to="/signup">Sign Up</router-link>
        </div>
      </form>
    </div>
  </template>

<script>
import { defineComponent, reactive, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    
    const form = reactive({
      email: '',
      password: ''
    });
    
    const validationErrors = reactive({
      email: '',
      password: ''
    });
    
    const loading = computed(() => store.getters['auth/loading']);
    const error = computed(() => store.getters['auth/error']);
    
    const validateForm = () => {
      let isValid = true;
      
      // Reset validation errors
      validationErrors.email = '';
      validationErrors.password = '';
      
      // Validate email
      if (!form.email) {
        validationErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        validationErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Validate password
      if (!form.password) {
        validationErrors.password = 'Password is required';
        isValid = false;
      }
      
      return isValid;
    };
    
    const handleSubmit = async () => {
      if (!validateForm()) return;
      
      try {
        await store.dispatch('auth/login', {
          email: form.email,
          password: form.password
        });
        
        // Redirect to the requested page or home
        const redirectPath = route.query.redirect || '/';
        router.push(redirectPath);
      } catch (error) {
        // Error is handled in the store
      }
    };
    
    return {
      form,
      validationErrors,
      loading,
      error,
      handleSubmit
    };
  }
});
</script>
