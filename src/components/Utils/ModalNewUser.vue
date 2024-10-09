<!-- Modal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal(false)">&times;</span>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <div class="password-wrapper">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required minlength="6"
              class="form-control" />
            <button type="button" @click="togglePassword" class="toggle-password-btn">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="name">Nombre:</label>
          <input type="string" id="name" v-model="name" required class="form-control" />
        </div>

        <div class="form-group">
          <label for="phone">Telefono:</label>
          <input type="string" id="phone" v-model="phone" required class="form-control" />
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>


        <button type="submit" class="btn btn-primary">Agregar usuario</button>

      </form>

    </div>
  </div>
</template>

<script>
import { createUser } from '../../Api/Users/usersApi.js';
import { toast } from 'vue3-toastify';
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
      name: '',
      phone: ''
    };
  },
  methods: {
    async submitForm() {
      if (this.validateForm()) {
        try {
          const user = {
            email: this.email,
            password: this.password,
            name: this.name,
            phone: this.phone
          }
          const response = await createUser(user);
          if(response.status === 201){
            //Show toast
            toast.success("Usuario creado correctamente");
            this.closeModal(true);
          }else{
            this.errorMessage = response.message;
          }
        } catch (error) {
          // Handle error response
          toast.error("Ha ocurrido un error al crear el usuario");
          if (error.response) {
            this.errorMessage = error.response.data.message || 'Fallido';
          } else {
            this.errorMessage = 'An error occurred: ' + error.message;
          }
        }
      }
    },
    closeModal(created) {
      if(created){
        this.$emit('created');
      }else{
        this.$emit('close');
      }
      this.email = '';
      this.password = '';
      this.showPassword = false;
      this.errorMessage = '';
      this.name = '';
      this.phone = '';
    },
    isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    togglePassword() {
      this.showPassword = !this.showPassword;  // Toggle the password visibility
    },
    validateForm() {
      if (!this.email || !this.password || !this.name || !this.phone) {
        this.errorMessage = "Todos los campos son requeridos";
        return false;
      }

      if (!this.isValidEmail(this.email)) {
        this.errorMessage = "Invalid email format.";
        return false;
      }

      if (this.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters.";
        return false;
      }

      this.errorMessage = "";
      return true;
    },
  }
};
</script>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fff;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  margin-left: auto;
}

.close:hover,
.close:focus {
  color: rgb(231, 53, 53);
  text-decoration: none;
  cursor: pointer;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.password-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.toggle-password-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>