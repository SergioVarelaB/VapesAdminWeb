<!-- Modal.vue -->
<template>
    <div v-if="isOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="amount">Cantidad:</label>
            <input type="number" id="amount" v-model="amount" required class="form-control" />
          </div>

          <div class="form-group">
            <label for="phone">Telefono del cliente:</label>
            <input type="string" id="phone" v-model="phone" required class="form-control" />
          </div>

          <div class="form-group">
            <label for="items">Piezas vendidas:</label>
            <input type="number" id="items" v-model="items" required class="form-control" />
          </div>  
  
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

          <button type="submit" class="btn btn-primary">Click Me</button>
  
        </form>
  
      </div>
    </div>
  </template>
  
  <script>
  import { createSale } from '../../Api/Dashboard/dashboard.js';
  import { toast } from 'vue3-toastify';
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        amount: '',
        showPassword: false,
        errorMessage: '',
        items: '',
        phone: ''
      };
    },
    methods: {
      async submitForm() {
        if (this.validateForm()) {
          try {
            const Order = {
                amount: this.amount,
                items: this.items,
                clientPhone: this.phone,
                user: this.user
            }
            const response = await createSale(Order);
            if(response.status === 201){
              //Show toast
              toast.success("Venta creado correctamente");
              this.closeModal();
            }else{
                toast.error(response.message)
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
      closeModal() {
        this.$emit('close');
        this.amount = '';
        this.items = '';
        this.phone = '';
      },
      isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      },
      validateForm() {
        if (!this.amount || !this.items || !this.phone) {
          this.errorMessage = "Todos los campos son requeridos";
          return false;
        }

        if (this.phone.length < 9) {
          this.errorMessage = "El telefono debe de ser de por lo menos 9 digitos";
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