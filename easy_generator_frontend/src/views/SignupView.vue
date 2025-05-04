<template>
    <div class="form-container">
      <h1 class="form-title">Sign Up</h1>
      
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
          <label class="form-label" for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="form-control"
            required
            placeholder="Enter your name"
          />
          <div v-if="validationErrors.name" class="form-error">
            {{ validationErrors.name }}
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
        
        <div class="form-group">
          <label class="form-label" for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="form-control"
            required
            placeholder="Confirm your password"
          />
          <div v-if="validationErrors.confirmPassword" class="form-error">
            {{ validationErrors.confirmPassword }}
          </div>
        </div>
        
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Signing up...' : 'Sign Up' }}
        </button>
        
        <div class="form-footer">
          Already have an account? <router-link to="/login">Sign In</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { defineComponent, reactive, computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'SignupView',
    setup() {
      const store = useStore();
      const router = useRouter();
      
      const form = reactive({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      });
      
      const validationErrors = reactive({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
      });
      
      const loading = computed(() => store.getters['auth/loading']);
      const error = computed(() => store.getters['auth/error']);
      
      const validateForm = () => {
        let isValid = true;
        
        // Reset validation errors
        validationErrors.email = '';
        validationErrors.name = '';
        validationErrors.password = '';
        validationErrors.confirmPassword = '';
        
        // Validate email
        if (!form.email) {
          validationErrors.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
          validationErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        
        // Validate name
        if (!form.name) {
          validationErrors.name = 'Name is required';
          isValid = false;
        }
        
        // Validate password
        if (!form.password) {
          validationErrors.password = 'Password is required';
          isValid = false;
        } else if (form.password.length < 8) {
          validationErrors.password = 'Password must be at least 8 characters long';
          isValid = false;
        } else if (!/[A-Za-z]/.test(form.password)) {
          validationErrors.password = 'Password must contain at least one letter';
          isValid = false;
        } else if (!/\d/.test(form.password)) {
          validationErrors.password = 'Password must contain at least one number';
          isValid = false;
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(form.password)) {
          validationErrors.password = 'Password must contain at least one special character';
          isValid = false;
        }
        
        // Validate confirm password
        if (form.password !== form.confirmPassword) {
          validationErrors.confirmPassword = 'Passwords do not match';
          isValid = false;
        }
        
        return isValid;
      };
      
      const handleSubmit = async () => {
        if (!validateForm()) return;
        
        try {
          await store.dispatch('auth/signup', {
            email: form.email,
            name: form.name,
            password: form.password
          });
          
          router.push('/');
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